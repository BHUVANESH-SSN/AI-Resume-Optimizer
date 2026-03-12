"use client";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { apiGet, clearAuth, getAuth } from "@/lib/api";
import {
    ArrowLeft,
    ChevronRight,
    Cloud,
    Compass,
    Cpu,
    Database,
    ExternalLink,
    FileText,
    Layers,
    Layout,
    LogOut,
    Map as MapIcon,
    Palette,
    Server,
    Shield,
    Smartphone,
    Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ── DESIGN SYSTEM ── */
const C = {
    ink: '#0f172a',
    paper: '#f8fafc',
    surface: '#ffffff',
    accent: '#7c3aed',
    accentSoft: '#ede9fe',
    accent2: '#ef4444',
    muted: '#64748b',
    border: '#e2e8f0',
};

/* ── HELPERS ── */
function useScrollReveal(delay = 0) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setVisible(true);
        }, { threshold: 0.1 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms` } as React.CSSProperties };
}


/* ── ROLES DATA ── */
const ROLES = [
    { id: 'frontend', name: 'Frontend', icon: <Layout size={20} />, color: '#3b82f6', desc: 'Build stunning user interfaces using React, Next.js, and CSS.' },
    { id: 'backend', name: 'Backend', icon: <Server size={20} />, color: '#10b981', desc: 'Design robust APIs, databases, and server-side logic.' },
    { id: 'fullstack', name: 'Full Stack', icon: <Layers size={20} />, color: '#8b5cf6', desc: 'Master both ends of the web and build complete applications.' },
    { id: 'devops', name: 'DevOps', icon: <Cloud size={20} />, color: '#f59e0b', desc: 'Automate deployments, scale infra, and master CI/CD.' },
    { id: 'android', name: 'Android', icon: <Smartphone size={20} />, color: '#34d399', desc: 'Create amazing mobile experiences for the Android ecosystem.' },
    { id: 'ios', name: 'iOS', icon: <Smartphone size={20} />, color: '#000000', desc: 'Build premium mobile apps for iPhone and iPad using Swift.' },
    { id: 'dataanalyst', name: 'Data Analyst', icon: <Database size={20} />, color: '#ec4899', desc: 'Extract insights from data using Python, SQL, and Excel.' },
    { id: 'datascientist', name: 'Data Scientist', icon: <Cpu size={20} />, color: '#06b6d4', desc: 'Build ML models and predictive systems with advanced math.' },
    { id: 'cybersecurity', name: 'Cyber Security', icon: <Shield size={20} />, color: '#ef4444', desc: 'Protect systems from threats and master ethical hacking.' },
    { id: 'uideveloper', name: 'UI Developer', icon: <Palette size={20} />, color: '#f43f5e', desc: 'Focus on perfect pixel implementation and motion design.' },
    { id: 'productmanager', name: 'Product Manager', icon: <Compass size={20} />, color: '#6366f1', desc: 'Define product vision, strategy, and lead delivery teams.' },
];

/* ── ROADMAP VIEW ── */
const ROADMAP_DETAILS: Record<string, any> = {
    frontend: {
        title: "Frontend Developer",
        steps: [
            { name: "Fundamentals", items: [{ n: "HTML5", l: "https://developer.mozilla.org/en-US/docs/Web/HTML" }, { n: "CSS3 Flex/Grid", l: "https://web.dev/learn/css/" }, { n: "JavaScript ES6+", l: "https://javascript.info/" }, { n: "DOM API", l: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" }] },
            { name: "Frameworks", items: [{ n: "React.js", l: "https://react.dev" }, { n: "Next.js", l: "https://nextjs.org" }, { n: "TypeScript", l: "https://www.typescriptlang.org/" }, { n: "State Management", l: "https://zustand-demo.pmnd.rs/" }] },
            { name: "Tools", items: [{ n: "Git/GitHub", l: "https://git-scm.com/" }, { n: "Vite/Webpack", l: "https://vitejs.dev/" }, { n: "NPM/PNPM", l: "https://pnpm.io/" }, { n: "Chrome DevTools", l: "https://developer.chrome.com/docs/devtools/" }] },
            { name: "Performance", items: [{ n: "Lazy Loading", l: "https://web.dev/browser-level-image-lazy-loading/" }, { n: "Code Splitting", l: "https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading" }] }
        ]
    },
    backend: {
        title: "Backend Developer",
        steps: [
            { name: "Languages", items: [{ n: "Python/FastAPI", l: "https://fastapi.tiangolo.com/" }, { n: "Node.js/Express", l: "https://nodejs.org/" }, { n: "Java/Spring", l: "https://spring.io/projects/spring-boot" }, { n: "Go", l: "https://go.dev/learn/" }] },
            { name: "Databases", items: [{ n: "PostgreSQL", l: "https://www.postgresql.org/" }, { n: "MongoDB", l: "https://www.mongodb.com/docs/" }, { n: "Redis", l: "https://redis.io/docs/" }] },
            { name: "Architecture", items: [{ n: "REST APIs", l: "https://restfulapi.net/" }, { n: "Microservices", l: "https://microservices.io/" }, { n: "WebSockets", l: "https://socket.io/" }] },
            { name: "Cloud", items: [{ n: "Docker", l: "https://www.docker.com/" }, { n: "Kubernetes", l: "https://kubernetes.io/" }, { n: "CI/CD", l: "https://github.com/features/actions" }] }
        ]
    },
    fullstack: {
        title: "Full Stack Developer",
        steps: [
            { name: "Frontend", items: [{ n: "React/Next.js", l: "https://nextjs.org" }, { n: "Tailwind CSS", l: "https://tailwindcss.com" }] },
            { name: "Backend", items: [{ n: "Node.js", l: "https://nodejs.org" }, { n: "SQL/NoSQL", l: "https://www.postgresql.org" }] }
        ]
    },
    android: {
        title: "Android Developer",
        steps: [
            { name: "Languages", items: [{ n: "Kotlin", l: "https://kotlinlang.org/" }, { n: "Java", l: "https://www.java.com/en/" }] },
            { name: "UI", items: [{ n: "Jetpack Compose", l: "https://developer.android.com/jetpack/compose" }, { n: "Material Design", l: "https://m3.material.io/" }] },
            { name: "Networking", items: [{ n: "Retrofit", l: "https://square.github.io/retrofit/" }, { n: "Room DB", l: "https://developer.android.com/training/data-storage/room" }] }
        ]
    }
};

/* ── MIND MAP COMPONENT ── */
function MindMap({ data }: { data: any }) {
    const reveal = useScrollReveal(100);
    const steps = data.steps || [];
    const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#f43f5e'];

    return (
        <div ref={reveal.ref} style={{ ...reveal.style, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 32, padding: 60, overflowX: 'auto', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 100, position: 'relative' }}>

                {/* Center Node */}
                <div style={{
                    background: C.surface, border: `3px solid ${C.accent}`, borderRadius: 16, padding: '20px 32px',
                    boxShadow: `0 10px 30px ${C.accent}20`, zIndex: 10, textAlign: 'center', minWidth: 220,
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 900, color: C.ink, fontSize: 18
                }}>
                    Role: {data.title}
                </div>

                {/* Branches Container */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                    {steps.map((step: any, i: number) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 40, position: 'relative' }}>

                            {/* SVG Line towards Center */}
                            <svg style={{ position: 'absolute', left: -100, top: '50%', width: 100, height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
                                <path
                                    d={`M 0 0 C 40 0, 60 ${0}, 100 0`}
                                    stroke={colors[i % colors.length]}
                                    strokeWidth="2.5"
                                    fill="none"
                                    opacity="0.6"
                                />
                            </svg>

                            {/* Step Node */}
                            <div style={{
                                background: '#fff', border: `2px solid ${colors[i % colors.length]}40`, borderRadius: 12, padding: '12px 20px',
                                fontWeight: 800, fontSize: 15, color: C.ink, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', whiteSpace: 'nowrap', zIndex: 5
                            }}>
                                {step.name}
                            </div>

                            {/* Sub-items Container */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {step.items.map((item: any, j: number) => (
                                    <a key={j} href={item.l} target="_blank" rel="noopener noreferrer"
                                        style={{ display: 'flex', alignItems: 'center', gap: 15, position: 'relative', textDecoration: 'none' }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
                                        <div style={{ width: 12, height: 2, background: `${colors[i % colors.length]}40` }} />
                                        <div style={{
                                            background: C.paper, border: `1px solid ${C.border}`, borderRadius: 8, padding: '6px 12px',
                                            fontSize: 12, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6,
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)', transition: 'all 0.2s'
                                        }}>
                                            {item.n}
                                            <ExternalLink size={10} color={C.accent} />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function RoadmapPage() {
    const router = useRouter();
    const [auth, setAuth] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [sbHover, setSbHover] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'mindmap'>('mindmap');

    const SB_MIN = 88;
    const SB_MAX = 285;
    const NAV_H = 60;

    useEffect(() => {
        const a = getAuth();
        if (!a) { router.push('/login'); return; }
        setAuth(a);
        if (a.email) {
            apiGet(`/form/get-profile/${encodeURIComponent(a.email)}`)
                .then(setProfile)
                .catch(() => { });
        }
    }, [router]);

    const logout = () => { clearAuth(); router.push('/login'); };
    const displayName = profile?.full_name || auth?.name || auth?.email?.split('@')[0] || 'User';
    const initials = displayName.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2);

    const RoadmapView = ({ roleId }: { roleId: string }) => {
        const data = ROADMAP_DETAILS[roleId] || { title: `${roleId.charAt(0).toUpperCase() + roleId.slice(1)} Roadmap`, steps: [] };
        const isFrontend = roleId === 'frontend';

        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                    <button
                        onClick={() => setSelectedRole(null)}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: C.accent, fontWeight: 700, cursor: 'pointer', padding: 0 }}
                    >
                        <ArrowLeft size={18} />
                        Back to Roles
                    </button>

                    <div style={{ background: C.border, padding: 4, borderRadius: 12, display: 'flex', gap: 4 }}>
                        <button
                            onClick={() => setViewMode('list')}
                            style={{
                                background: viewMode === 'list' ? '#fff' : 'none', border: 'none', padding: '8px 16px', borderRadius: 8,
                                display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                color: viewMode === 'list' ? C.accent : C.muted, boxShadow: viewMode === 'list' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Layout size={16} /> List
                        </button>
                        <button
                            onClick={() => setViewMode('mindmap')}
                            style={{
                                background: viewMode === 'mindmap' ? '#fff' : 'none', border: 'none', padding: '8px 16px', borderRadius: 8,
                                display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                color: viewMode === 'mindmap' ? C.accent : C.muted, boxShadow: viewMode === 'mindmap' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        >
                            <MapIcon size={16} /> Mind Map
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
                    <div>
                        <h2 style={{ fontWeight: 900, fontSize: 32, color: C.ink, marginBottom: 12 }}>{data.title}</h2>
                        <p style={{ color: C.muted, fontWeight: 500, margin: 0 }}>Master {data.title} landscape to become a world-class engineer.</p>
                    </div>
                    {isFrontend && (
                        <div style={{
                            background: '#fff', border: `1px solid ${C.border}`, borderRadius: 20, padding: '12px 24px',
                            display: 'flex', alignItems: 'center', gap: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                        }}>
                            <div>
                                <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', marginBottom: 4 }}>Readiness Score</p>
                                <p style={{ fontSize: 24, fontWeight: 900, color: C.accent, margin: 0 }}>84%</p>
                            </div>
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.accent }}>
                                <Sparkles size={20} />
                            </div>
                        </div>
                    )}
                </div>

                {viewMode === 'mindmap' ? (
                    <MindMap data={data} />
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative', paddingLeft: 30 }}>
                        <div style={{ position: 'absolute', top: 0, left: 6, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${C.accent}, transparent)` }} />
                        {data.steps.map((step: any, i: number) => (
                            <div key={i} style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: -30, top: 2, width: 14, height: 14, borderRadius: '50%', background: C.accent, border: '3px solid #fff', zIndex: 2 }} />
                                <h4 style={{ fontWeight: 800, fontSize: 18, color: C.ink, margin: '0 0 12px' }}>{step.name}</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                    {step.items.map((item: any, j: number) => (
                                        <a key={j} href={item.l} target="_blank" rel="noopener noreferrer"
                                            style={{
                                                background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '8px 16px',
                                                fontSize: 13, fontWeight: 600, color: C.ink, boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'none'; }}>
                                            {item.n}
                                            <ExternalLink size={12} color={C.accent} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* APPLY SUITE for Frontend */}
                {isFrontend && (
                    <div style={{ marginTop: 60, background: C.ink, borderRadius: 32, padding: 48, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, boxShadow: '0 20px 40px rgba(15,23,42,0.15)' }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontWeight: 900, fontSize: 32, marginBottom: 12 }}>Ready to <span style={{ color: '#a78bfa' }}>Apply</span>?</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.6, marginBottom: 0 }}>
                                You've mastered the roadmap. Now, let AIRO bridge the gap between learning and landing your dream job.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 16 }}>
                            <button onClick={() => router.push('/resume')} style={{ background: '#a78bfa', color: '#fff', border: 'none', borderRadius: 16, padding: '16px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <FileText size={18} /> Tailor Resume
                            </button>
                            <button style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 16, padding: '16px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Sparkles size={18} /> Mock Interview
                            </button>
                        </div>
                    </div>
                )}

                {data.steps.length === 0 && (
                    <div style={{ background: C.accentSoft, borderRadius: 20, padding: 40, textAlign: 'center' }}>
                        <Compass size={48} color={C.accent} style={{ marginBottom: 16 }} />
                        <p style={{ fontWeight: 700, color: C.accent }}>Roadmap coming soon for this role!</p>
                        <p style={{ fontSize: 13, color: C.muted }}>Our AI is still crafting the perfect path for {selectedRole}.</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#f8fafc 0%,#eef2ff 60%,#f5f3ff 100%)', fontFamily: 'Montserrat, sans-serif' }}>
            <Navbar active="Roadmap" />

            {/* SIDEBAR */}
            <aside
                onMouseEnter={() => setSbHover(true)}
                onMouseLeave={() => setSbHover(false)}
                style={{
                    position: 'fixed', top: NAV_H, left: 0, width: sbHover ? SB_MAX : SB_MIN, height: `calc(100vh - ${NAV_H}px)`,
                    overflowX: 'hidden', overflowY: 'auto', borderRight: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(20px)', padding: sbHover ? '40px 28px 40px 34px' : '40px 14px', display: 'flex',
                    flexDirection: 'column', alignItems: sbHover ? 'flex-start' : 'center', zIndex: 100, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', scrollbarWidth: 'none'
                }}>
                <div style={{
                    width: sbHover ? 72 : 52, height: sbHover ? 72 : 52, borderRadius: '50%', background: `linear-gradient(135deg, ${C.accent}, #9f67ff)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: sbHover ? 24 : 18,
                    marginBottom: sbHover ? 16 : 32, flexShrink: 0, boxShadow: `0 12px 30px ${C.accent}45`, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', overflow: 'hidden'
                }}>
                    {initials}
                </div>

                <div style={{ opacity: sbHover ? 1 : 0, height: sbHover ? 'auto' : 0, transition: 'all 0.3s', visibility: sbHover ? 'visible' : 'hidden', width: '100%' }}>
                    <p style={{ fontWeight: 800, fontSize: 18, color: C.ink, margin: '0 0 4px', whiteSpace: 'nowrap' }}>{displayName}</p>
                    <p style={{ fontSize: 12, color: C.muted, margin: '0 0 24px', wordBreak: 'break-all' }}>{auth?.email}</p>
                </div>

                <div style={{ flex: 1 }} />

                <button onClick={logout}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent2; e.currentTarget.style.color = C.accent2; e.currentTarget.style.background = '#fff0f0'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'none'; }}
                    style={{
                        width: sbHover ? '100%' : 44, height: 44, display: 'flex', alignItems: 'center', gap: 12, justifyContent: sbHover ? 'flex-start' : 'center',
                        background: 'none', border: `1.5px solid ${C.border}`, borderRadius: 12, padding: sbHover ? '10px 14px' : '0', fontFamily: 'Montserrat, sans-serif',
                        fontSize: 13.5, fontWeight: 600, cursor: 'pointer', color: C.muted, transition: 'all 0.2s', flexShrink: 0
                    }} title={!sbHover ? 'Logout' : ''}>
                    <LogOut size={18} />
                    {sbHover && <span>Logout</span>}
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <main style={{
                marginLeft: sbHover ? SB_MAX : SB_MIN, paddingTop: NAV_H + 40, paddingBottom: 100,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0, 1)', minHeight: '100vh',
            }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>

                    {!selectedRole ? (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: 60 }}>
                                <h1 style={{ fontWeight: 900, fontSize: 48, color: C.ink, margin: '0 0 16px', letterSpacing: '-2px' }}>
                                    Explore Your <span style={{ color: C.accent }}>Future</span>
                                </h1>
                                <p style={{ fontSize: 18, color: C.muted, fontWeight: 500, maxWidth: 600, margin: '0 auto' }}>
                                    Step into a curated journey of career possibilities and clear the path to your dream role.
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
                                {ROLES.map((role, i) => {
                                    const reveal = useScrollReveal(i * 50);
                                    return (
                                        <div
                                            key={role.id}
                                            ref={reveal.ref}
                                            style={{ ...reveal.style }}
                                        >
                                            <div
                                                onClick={() => setSelectedRole(role.id)}
                                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.12)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = '0 4px 12px rgba(15,23,42,0.04)'; }}
                                                style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 24, padding: 32, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)', boxShadow: '0 4px 12px rgba(15,23,42,0.04)', height: '100%', display: 'flex', flexDirection: 'column' }}
                                            >
                                                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${role.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: role.color, marginBottom: 20 }}>
                                                    {role.icon}
                                                </div>
                                                <h3 style={{ fontWeight: 800, fontSize: 20, color: C.ink, marginBottom: 12 }}>{role.name}</h3>
                                                <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.6, flex: 1 }}>{role.desc}</p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.accent, fontWeight: 700, fontSize: 13, marginTop: 24 }}>
                                                    View Roadmap <ChevronRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <RoadmapView roleId={selectedRole} />
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
}
