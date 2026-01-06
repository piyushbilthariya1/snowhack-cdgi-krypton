import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import {
    ArrowRight,
    Zap,
    Shield,
    Code,
    CheckCircle2,
    Terminal,
    Cpu,
    Globe,
    Github
} from "lucide-react"

export default function LandingPage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/20">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Cpu className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                            AtomAPI
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <a href="#features" className="hover:text-primary transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
                        <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                            Log in
                        </Button>
                        <Button size="sm" onClick={() => navigate("/signup")}>
                            Get Started
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-20 pb-32 overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

                    <div className="container mx-auto px-4 text-center">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-8 gap-2">
                            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            v1.0 is now live
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                            The Atomic <br /> AI Proxy Gateway
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                            Secure, metered access to LLMs with nano-precision control.
                            Manage budgets, set daily limits, and aggregate multiple providers through a single unified API.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="h-12 px-8 text-base" onClick={() => navigate("/signup")}>
                                Start Building Free <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base" onClick={() => window.open('https://github.com', '_blank')}>
                                <Github className="mr-2 h-4 w-4" /> Star on GitHub
                            </Button>
                        </div>

                        {/* Code Snippet */}
                        <div className="mt-20 mx-auto max-w-3xl rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden text-left">
                            <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
                                <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                <span className="ml-2 text-xs text-muted-foreground font-mono">example.js</span>
                            </div>
                            <div className="p-4 overflow-x-auto bg-[#0a0a0a]">
                                <pre className="text-sm font-mono leading-relaxed">
                                    <span className="text-purple-400">const</span> <span className="text-blue-400">response</span> = <span className="text-purple-400">await</span> fetch(<span className="text-green-400">'https://api.atomapi.dev/v1/chat'</span>, {'{'}
                                    {'\n'}  method: <span className="text-green-400">'POST'</span>,
                                    {'\n'}  headers: {'{'}
                                    {'\n'}    <span className="text-green-400">'Authorization'</span>: <span className="text-green-400">'Bearer nano_key_...'</span>,
                                    {'\n'}    <span className="text-green-400">'Content-Type'</span>: <span className="text-green-400">'application/json'</span>
                                    {'\n'}  {'}'},
                                    {'\n'}  body: JSON.<span className="text-yellow-400">stringify</span>({'{'}
                                    {'\n'}    model: <span className="text-green-400">'gpt-4-turbo'</span>,
                                    {'\n'}                                    messages: [<span className="text-purple-400">{'{'}</span>{' '}
                                    role: <span className="text-green-400">'user'</span>,
                                    content: <span className="text-green-400">'Hello world!'</span>
                                    {' '}<span className="text-purple-400">{'}'}</span>]
                                    {'\n'}  {'}'})
                                    {'\n'}{'}'});
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-24 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to scale</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Built for developers who need control, visibility, and reliability when integrating LLMs.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Zap className="h-6 w-6 text-yellow-500" />,
                                    title: "Instant Access",
                                    description: "Generate a NanoKey and start making calls instantly. No complex approvals or waitlists."
                                },
                                {
                                    icon: <Shield className="h-6 w-6 text-blue-500" />,
                                    title: "Budget Control",
                                    description: "Set hard daily limits to prevent cost overruns. Your wallet, your rules, your peace of mind."
                                },
                                {
                                    icon: <Terminal className="h-6 w-6 text-green-500" />,
                                    title: "Unified API",
                                    description: "Switch between providers like OpenAI, Anthropic, and Google with a single line of code."
                                },
                                {
                                    icon: <Globe className="h-6 w-6 text-purple-500" />,
                                    title: "Global Edge",
                                    description: "Requests are routed through our global edge network for minimal latency."
                                },
                                {
                                    icon: <Code className="h-6 w-6 text-indigo-500" />,
                                    title: "Developer First",
                                    description: "Typed SDKs, comprehensive documentation, and community-driven examples."
                                },
                                {
                                    icon: <CheckCircle2 className="h-6 w-6 text-emerald-500" />,
                                    title: "99.9% Uptime",
                                    description: "Enterprise-grade reliability with redundant failovers and status monitoring."
                                }
                            ].map((feature, index) => (
                                <div key={index} className="p-8 bg-background rounded-xl border hover:shadow-lg transition-all hover:-translate-y-1">
                                    <div className="mb-4 p-3 bg-muted/50 rounded-lg w-fit">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="py-24">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold tracking-tight mb-6">Integration in minutes, not days</h2>
                                <div className="space-y-8">
                                    {[
                                        { step: "01", title: "Create an account", desc: "Sign up instantly with your email or GitHub account." },
                                        { step: "02", title: "Generate a NanoKey", desc: "Create a secured API key with custom spend limits." },
                                        { step: "03", title: "Start coding", desc: "Use our compatible API endpoint in your favorite language." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="font-mono text-xl font-bold text-primary/40">{item.step}</div>
                                            <div>
                                                <h4 className="font-bold mb-1">{item.title}</h4>
                                                <p className="text-muted-foreground text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Button onClick={() => navigate("/signup")}>
                                        Get Your API Key
                                    </Button>
                                </div>
                            </div>
                            <div className="flex-1 w-full relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 blur-3xl rounded-full"></div>
                                <div className="relative bg-card border rounded-xl shadow-2xl p-6">
                                    <div className="space-y-2">
                                        <div className="h-2 w-20 bg-muted rounded"></div>
                                        <div className="h-2 w-full bg-muted/50 rounded"></div>
                                        <div className="h-2 w-3/4 bg-muted/50 rounded"></div>
                                        <div className="h-2 w-full bg-muted/50 rounded"></div>
                                    </div>
                                    <div className="mt-6 flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                                        <div className="text-sm font-medium">Usage Limit</div>
                                        <div className="text-sm font-bold text-green-500">$5.00 / day</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 border-t bg-muted/20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8 mb-8">
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <Cpu className="h-5 w-5 text-primary" />
                                    <span className="font-bold text-lg">AtomAPI</span>
                                </div>
                                <p className="text-muted-foreground text-sm max-w-xs">
                                    Empowering developers with the building blocks for the next generation of AI applications.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Product</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li><a href="#" className="hover:text-foreground">Features</a></li>
                                    <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                                    <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Company</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li><a href="#" className="hover:text-foreground">About</a></li>
                                    <li><a href="#" className="hover:text-foreground">Blog</a></li>
                                    <li><a href="#" className="hover:text-foreground">Careers</a></li>
                                    <li><a href="#" className="hover:text-foreground">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                            <p>© 2026 AtomAPI. All rights reserved.</p>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-foreground">Privacy Policy</a>
                                <a href="#" className="hover:text-foreground">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    )
}
