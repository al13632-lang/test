'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Loader2, UtensilsCrossed } from 'lucide-react';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up">
                <div className="p-10">
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100 mb-4 animate-bounce">
                            <UtensilsCrossed className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Restora<span className="text-blue-600">OS</span></h1>
                        <p className="text-slate-500 font-medium mt-1">Gestión inteligente para tu restaurante</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email Corporativo</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    placeholder="nombre@restaurante.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-slate-700">Contraseña</label>
                                <Link href="#" className="text-xs font-bold text-blue-600 hover:underline px-1">¿Olvidaste tu contraseña?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 uppercase tracking-widest active:scale-95"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Iniciar Sesión"}
                        </button>
                    </form>

                    <p className="text-center text-slate-400 text-xs font-medium mt-8">
                        ¿No tienes una cuenta? <Link href="#" className="text-blue-600 font-black hover:underline px-1">Solicitar Demo</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
