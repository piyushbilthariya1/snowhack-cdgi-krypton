import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { LogOut, RefreshCw, Send, Wallet, Activity, ShieldAlert, User, Key, Copy, Check } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function Dashboard() {
    const [balance, setBalance] = useState(0);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [processing, setProcessing] = useState(false);
    const [userDetails, setUserDetails] = useState({ email: '', nanoKey: '' });
    const [copied, setCopied] = useState(false);

    // TopUp state
    const [topUpAmount, setTopUpAmount] = useState('');

    // Limit state
    const [limit, setLimit] = useState('');
    const [currentLimit, setCurrentLimit] = useState(null);

    const navigate = useNavigate();

    const fetchWallet = async () => {
        try {
            const res = await api.get('/v1/wallet/balance');
            setBalance(res.data.balance);
            setLogs(res.data.logs || []);
            setUserDetails({
                email: res.data.email,
                nanoKey: res.data.nanoKey
            });
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 404) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWallet();
    }, []);

    const logout = () => {
        localStorage.removeItem('nanokey');
        navigate('/login');
    };

    const handleTopUp = async () => {
        if (!topUpAmount) return;
        try {
            await api.post('/v1/wallet/topup', { amount: topUpAmount });
            setTopUpAmount('');
            fetchWallet();
        } catch (e) { console.error(e) }
    };

    const handleSetLimit = async () => {
        if (!limit) return;
        try {
            await api.post('/v1/wallet/limit', { limit, enabled: true });
            setCurrentLimit(limit);
            setLimit('');
        } catch (e) { console.error(e) }
    };

    const handleProxy = async () => {
        if (!prompt) return;
        setProcessing(true);
        setResponse('');
        try {
            const res = await api.post('/v1/proxy', { prompt });
            setResponse(res.data.data);
            fetchWallet(); // Update balance
        } catch (e) {
            setResponse("Error: " + (e.response?.data?.error || e.message));
        } finally {
            setProcessing(false);
        }
    }

    const copyToClipboard = () => {
        if (userDetails.nanoKey) {
            navigator.clipboard.writeText(userDetails.nanoKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-10">
            <nav className="border-b bg-card px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">AtomAPI</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">Dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                        <User className="h-3 w-3" />
                        {userDetails.email || "Loading..."}
                    </div>
                    <Button variant="ghost" size="sm" onClick={logout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
                {/* Account Overview */}
                <div className="grid md:grid-cols-4 gap-6">
                    <Card className="md:col-span-1 shadow-md bg-gradient-to-br from-card to-secondary/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Account Access</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-xs">Your NanoKey</Label>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <div className="flex-1 font-mono text-xs bg-background border rounded px-2 py-1.5 truncate">
                                            {userDetails.nanoKey || "Loading..."}
                                        </div>
                                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={copyToClipboard}>
                                            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                        </Button>
                                    </div>
                                </div>
                                <div className="pt-2 border-t">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">Status</span>
                                        <span className="text-emerald-500 font-medium flex items-center gap-1">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-1 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{balance.toFixed(2)}</div>
                            <div className="flex items-center gap-2 mt-4">
                                <Input
                                    placeholder="Amount"
                                    type="number"
                                    value={topUpAmount}
                                    onChange={e => setTopUpAmount(e.target.value)}
                                    className="h-8 text-sm"
                                />
                                <Button size="sm" onClick={handleTopUp}>Top Up</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-1 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Daily Limit</CardTitle>
                            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{currentLimit ? `₹${currentLimit}` : "Unlimited"}</div>
                            <div className="flex items-center gap-2 mt-4">
                                <Input
                                    placeholder="Limit"
                                    type="number"
                                    value={limit}
                                    onChange={e => setLimit(e.target.value)}
                                    className="h-8 text-sm"
                                />
                                <Button size="sm" variant="outline" onClick={handleSetLimit}>Set</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-1 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{logs.length}</div>
                            <p className="text-xs text-muted-foreground mt-4">Recent session logs</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Playground & Logs */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <Card className="h-full flex flex-col shadow-md border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Send className="h-5 w-5 text-primary" /> API Playground
                                </CardTitle>
                                <CardDescription>Test your NanoKey directly from the browser.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 flex-1">
                                <div className="space-y-2">
                                    <Label>Prompt</Label>
                                    <Input
                                        value={prompt}
                                        onChange={e => setPrompt(e.target.value)}
                                        placeholder="Type a prompt to test the AI proxy..."
                                        className="font-medium"
                                    />
                                </div>
                                <div className="rounded-lg bg-muted p-4 min-h-[150px] relative group">
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded pointer-events-none">
                                        Response Output
                                    </div>
                                    <pre className="text-sm font-mono whitespace-pre-wrap text-foreground/90">
                                        {response || <span className="text-muted-foreground italic">// Response will appear here...</span>}
                                    </pre>
                                </div>
                            </CardContent>
                            <div className="p-6 pt-0">
                                <Button onClick={handleProxy} disabled={processing} className="w-full">
                                    {processing ? (
                                        <>Processing Request <RefreshCw className="ml-2 h-4 w-4 animate-spin" /></>
                                    ) : (
                                        <>Send Request <Send className="ml-2 h-4 w-4" /></>
                                    )}
                                </Button>
                            </div>
                        </Card>
                    </div>

                    <div className="md:col-span-1">
                        <Card className="h-full shadow-sm">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Latest 5 transactions</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Time</TableHead>
                                            <TableHead>API</TableHead>
                                            <TableHead className="text-right">Cost</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {logs.map((log, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="text-xs text-muted-foreground">
                                                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </TableCell>
                                                <TableCell className="uppercase font-semibold text-xs">{log.api}</TableCell>
                                                <TableCell className="text-right text-xs">₹{log.cost}</TableCell>
                                            </TableRow>
                                        ))}
                                        {logs.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center text-muted-foreground py-8 text-sm">
                                                    No activity yet
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
