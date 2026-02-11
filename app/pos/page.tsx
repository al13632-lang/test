'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ShoppingCart, Plus, Minus, Search, Trash2, CreditCard, Banknote } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const categories = ['Todos', 'Entradas', 'Platos Fuertes', 'Bebidas', 'Postres', 'Alcohol'];
const products = [
    { id: '1', name: 'Hamburguesa Clásica', price: 185, category: 'Platos Fuertes', image: '🍔' },
    { id: '2', name: 'Papas Fritas', price: 65, category: 'Entradas', image: '🍟' },
    { id: '3', name: 'Tacos de Pastor (5)', price: 120, category: 'Platos Fuertes', image: '🌮' },
    { id: '4', name: 'Coca Cola', price: 35, category: 'Bebidas', image: '🥤' },
    { id: '5', name: 'Cerveza Artesanal', price: 85, category: 'Alcohol', image: '🍺' },
    { id: '6', name: 'Guacamole con Totopos', price: 95, category: 'Entradas', image: '🥑' },
    { id: '7', name: 'Pastel de Chocolate', price: 110, category: 'Postres', image: '🍰' },
];

export default function POSPage() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [cart, setCart] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(p =>
        (selectedCategory === 'Todos' || p.category === selectedCategory) &&
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addToCart = (product: any) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <DashboardLayout>
            <div className="flex gap-6 h-[calc(100vh-160px)]">
                {/* Products Section */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Toolbar */}
                    <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                                        selectedCategory === cat
                                            ? "bg-blue-600 text-white"
                                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 overflow-y-auto grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-4">
                        {filteredProducts.map(product => (
                            <button
                                key={product.id}
                                onClick={() => addToCart(product)}
                                className="group bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all text-left flex flex-col items-center justify-center gap-3 animate-slide-up"
                            >
                                <span className="text-4xl">{product.image}</span>
                                <div className="text-center">
                                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase text-sm">
                                        {product.name}
                                    </h4>
                                    <p className="text-lg font-black text-slate-900 mt-1">
                                        ${product.price}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cart Section */}
                <div className="w-96 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-blue-600" />
                            Cuenta Actual
                        </h3>
                        <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full uppercase">
                            Mesa 05
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-50">
                                <ShoppingCart className="w-12 h-12" />
                                <p className="text-sm font-medium">El carrito está vacío</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex items-center gap-3 animate-slide-up">
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-xl">
                                        {item.image}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                                        <p className="text-xs text-slate-500">${item.price} x {item.quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-400 hover:text-red-600 p-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-slate-500">
                                <span>Subtotal</span>
                                <span>${(total / 1.16).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-500">
                                <span>IVA (16%)</span>
                                <span>${(total - (total / 1.16)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-black text-slate-900 pt-2 border-t border-slate-200">
                                <span>TOTAL</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all text-sm">
                                <Banknote className="w-4 h-4" />
                                Efectivo
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 bg-blue-600 rounded-xl font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all text-sm">
                                <CreditCard className="w-4 h-4" />
                                Tarjeta
                            </button>
                        </div>

                        <button
                            disabled={cart.length === 0}
                            className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-slate-200 uppercase tracking-widest"
                        >
                            Confirmar Orden
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
