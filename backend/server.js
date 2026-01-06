import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// --- IN-MEMORY LEDGER (For Demo Reliability) ---
// Since local Mongo is down and remote has SSL issues, we use RAM.
const USERS = [
    // Default user for testing
    {
        email: 'test@atomapi.dev',
        password: 'password123',
        nanoKey: 'nk-demo-key',
        balance: 100.00,
        dailyLimit: null,
        logs: []
    }
];

// --- The Vault (Mock Keys) ---
const MASTER_KEYS = {
    gemini: process.env.MASTER_GEMINI_KEY || 'mock-gemini-master-key',
    openai: process.env.MASTER_OPENAI_KEY || 'mock-openai-master-key'
};

const COSTS = {
    gemini: 0.5,
    openai: 1.0
};

// --- Routes ---

app.post('/v1/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Email and password are required" });
        }

        const existingUser = USERS.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ success: false, error: "Email already registered" });
        }

        const nanoKey = 'nk-' + Math.random().toString(36).substring(7);
        const user = {
            email,
            password, // In a real app, hash this!
            nanoKey,
            balance: 100.00,
            dailyLimit: null,
            logs: []
        };
        USERS.push(user);
        res.status(201).json({ success: true, nanoKey, balance: user.balance, message: "Welcome to AtomAPI! You have ₹100 free credit." });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/v1/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = USERS.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        res.json({ success: true, nanoKey: user.nanoKey, balance: user.balance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/v1/wallet/balance', async (req, res) => {
    const { nanokey } = req.headers;
    if (!nanokey) return res.status(401).json({ error: "NanoKey required" });

    const user = USERS.find(u => u.nanoKey === nanokey);
    if (!user) return res.status(404).json({ error: "Invalid NanoKey" });

    // Expose email and nanoKey for the dashboard
    res.json({
        balance: user.balance,
        logs: user.logs.slice(-5).reverse(),
        email: user.email,
        nanoKey: user.nanoKey
    });
});

app.post('/v1/wallet/limit', async (req, res) => {
    const { nanokey } = req.headers;
    const { limit, enabled } = req.body;

    const user = USERS.find(u => u.nanoKey === nanokey);
    if (!user) return res.status(404).json({ error: "Invalid NanoKey" });

    user.dailyLimit = enabled ? parseFloat(limit) : null;
    res.json({ success: true, dailyLimit: user.dailyLimit });
});

app.post('/v1/wallet/topup', async (req, res) => {
    const { nanokey } = req.headers;
    const { amount } = req.body;

    const user = USERS.find(u => u.nanoKey === nanokey);
    if (!user) return res.status(404).json({ error: "Invalid NanoKey" });

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
    }

    user.balance += amountNum;
    res.json({ success: true, balance: user.balance, message: `Added INR ${amountNum} to wallet.` });
});

app.post('/v1/proxy', async (req, res) => {
    const { prompt, provider = 'gemini' } = req.body;
    const nanoKey = req.headers['x-nano-key'];

    if (!nanoKey) return res.status(401).json({ error: "Missing x-nano-key header" });
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    try {
        const user = USERS.find(u => u.nanoKey === nanoKey);
        if (!user) return res.status(403).json({ error: "Invalid NanoKey" });

        const cost = COSTS[provider] || 0.5;

        // 1. Check Balance
        if (user.balance < cost) {
            return res.status(402).json({ error: "Insufficient Balance. Please Top Up." });
        }

        // 2. Check Daily Limit (Simple implementation: checks if *current* usage today > limit)
        // For demo, we'll just check if the COST itself pushes them over, or a simple flag check
        // Real implementation would sum up logs from today.
        if (user.dailyLimit !== null) {
            // Calculate today's spend
            const today = new Date().toDateString();
            const spentToday = user.logs
                .filter(l => new Date(l.timestamp).toDateString() === today)
                .reduce((acc, curr) => acc + curr.cost, 0);

            if (spentToday + cost > user.dailyLimit) {
                return res.status(429).json({ error: `Daily Limit of INR ${user.dailyLimit} Reached.` });
            }
        }

        console.log(`[Proxy] Forwarding request to ${provider}...`);
        await new Promise(resolve => setTimeout(resolve, 800));

        const aiResponse = `[${provider.toUpperCase()} PROXY RESPONSE] I received your prompt: "${prompt}". (Charged INR ${cost})`;

        user.balance -= cost;
        user.logs.push({
            api: provider,
            cost: cost,
            timestamp: new Date()
        });

        res.json({
            success: true,
            data: aiResponse,
            meta: {
                cost_deducted: cost,
                remaining_balance: user.balance
            }
        });

    } catch (error) {
        console.error("Proxy Error:", error);
        res.status(500).json({ error: "Internal Proxy Error" });
    }
});

app.listen(PORT, () => {
    console.log(`AtomAPI Gateway running on port ${PORT} (In-Memory Mode)`);
});
