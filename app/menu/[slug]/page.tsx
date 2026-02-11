'use client';

import React, { useState } from 'react';
import { ShoppingBag, ChevronRight, Clock, MapPin, Star, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OnlineOrderPage() {
    const [cart, setCart] = useState<any[]>([]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Section */}
            <div className="relative h-64 w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Restaurante"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center p-2">
                            <h1 className="text-2xl font-black text-slate-900 italic">LOGO</h1>
                        </div>
                        <div className="text-white">
                            <h2 className="text-4xl font-black tracking-tight">The Gourmet Burger Loft</h2>
                            <div className="flex items-center gap-4 mt-2 text-sm font-medium">
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 25-35 min</span>
                                <span className="flex items-center gap-1 text-amber-400"><Star className="w-4 h-4 fill-amber-400" /> 4.8 (200+)</span>
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> San Pedro Garza García</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-10 flex gap-10">
                {/* Menu Section */}
                <div className="flex-1 space-y-12">
                    {['Populares', 'Hambuguesas', 'Entradas', 'Bebidas'].map((section) => (
                        <div key={section} className="space-y-6">
                            <h3 className="text-2xl font-black text-slate-900 border-b-4 border-blue-600 inline-block pb-2">
                                {section}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-50 transition-all group flex items-start gap-4 cursor-pointer">
                                        <div className="flex-1 space-y-1">
                                            <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase">Classic Beef Burger</h4>
                                            <p className="text-xs text-slate-500 line-clamp-2">Carne de res 200g, queso cheddar, cebolla caramelizada y salsa secreta.</p>
                                            <p className="text-lg font-black text-slate-900 mt-2">$210.00</p>
                                        </div>
                                        <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden relative">
                                            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <Plus className="w-8 h-8 text-white" />
                                            </div>
                                            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1599&auto=format&fit=crop" alt="product" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sticky Cart Sidebar */}
                <div className="w-96">
                    <div className="sticky top-10 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
                        <div className="p-6 bg-slate-900 text-white">
                            <h3 className="text-lg font-black uppercase tracking-widest flex items-center justify-between">
                                Tu Pedido
                                <ShoppingBag className="w-6 h-6" />
                            </h3>
                        </div>
                        <div className="p-8 space-y-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-10 space-y-4 opacity-30">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                                        <ShoppingBag className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Tu bolsa está vacía</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Cart items would go here */}
                                </div>
                            )}

                            <div className="pt-6 border-t border-slate-100 space-y-4">
                                <div className="flex justify-between text-slate-500 font-medium">
                                    <span>Subtotal</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between text-slate-500 font-medium">
                                    <span>Envío</span>
                                    <span>$35.00</span>
                                </div>
                                <div className="flex justify-between text-2xl font-black text-slate-900 pt-2">
                                    <span>Total</span>
                                    <span>$35.00</span>
                                </div>
                                <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-100 uppercase tracking-widest mt-4">
                                    Pedir Ahora
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
