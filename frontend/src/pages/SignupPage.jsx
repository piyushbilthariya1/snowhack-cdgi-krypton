import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/api';
import { Copy, Check, ArrowRight, Loader2 } from "lucide-react"

export default function SignupPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [nanoKey, setNanoKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/v1/auth/register', formData);
            if (res.data.success) {
                setNanoKey(res.data.nanoKey);
                // Auto login context locally
                localStorage.setItem('nanokey', res.data.nanoKey);
            }
        } catch (err) {
            console.error("Registration failed", err);
            setError(err.response?.data?.error || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (nanoKey) {
            navigator.clipboard.writeText(nanoKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background/50 p-4">
            <Card className="w-full max-w-md border-muted/40 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>Enter your email below to create your account and generate your NanoKey.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!nanoKey ? (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {loading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                                <h3 className="text-green-500 font-semibold mb-1">Registration Successful!</h3>
                                <p className="text-sm text-muted-foreground">Your NanoKey has been generated.</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Your NanoKey</Label>
                                <div className="flex space-x-2">
                                    <Input value={nanoKey} readOnly className="font-mono bg-muted" />
                                    <Button variant="outline" size="icon" onClick={copyToClipboard}>
                                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground text-amber-500 font-semibold flex items-center gap-1">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                    Save this key securely!
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    {nanoKey ? (
                        <Button className="w-full" onClick={() => navigate('/dashboard')}>
                            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/login" className="underline underline-offset-4 hover:text-primary">
                                Login
                            </Link>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
