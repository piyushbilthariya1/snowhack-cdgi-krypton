import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nanoKey: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    logs: [{
        api: String, // 'gemini' | 'openai'
        cost: Number,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

export default mongoose.model('UserV2', userSchema);
