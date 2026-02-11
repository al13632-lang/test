'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Check, Zap, Rocket, ShieldCheck } from 'lucide-react';

const plans = [
    { name: 'Básico', price: '49', features: ['1 Sucursal', 'POS Ilimitado', 'Reportes Básicos', '500 Productos'], trial: '14 días gratis' },
    { name: 'Pro', price: '99', features: ['3 Sucursales', 'Inventario Avanzado', 'CRM', 'Pedidos Online', 'Soporte 24/7'], recommended: true, trial: '14 días gratis' },
    { name: 'Premium', price: '199', features: ['Sucursales Ilimitadas', 'API Avanzada', 'Multi-tenant Full', 'Custom Branding', 'Account Manager'], trial: '14 días gratis' },
];

export default function SubscriptionsPage() {
    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black text-slate-900">Planes y Suscripción</h1>
                    <p className="text-slate-500 max-w-lg mx-auto">Escala tu negocio con las herramientas adecuadas. Cambia de plan en cualquier momento.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={cn(
                                "relative bg-white p-8 rounded-3xl border-2 flex flex-col shadow-sm transition-all hover:shadow-xl",
                                plan.recommended ? "border-blue-600 scale-105" : "border-slate-100"
                            )}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                                    Recomendado
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-slate-900 uppercase">{plan.name}</h3>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-slate-900">${plan.price}</span>
                                    <span className="text-slate-500 font-bold uppercase text-xs">/ mes</span>
                                </div>
                            </div>
                            <ul className="space-y-4 flex-1 mb-8">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                        <Check className="w-4 h-4 text-green-500" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button className={cn(
                                "w-full py-4 rounded-xl font-black uppercase tracking-tighter transition-all shadow-md active:scale-95",
                                plan.recommended
                                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100"
                                    : "bg-slate-900 text-white hover:bg-slate-800"
                            )}>
                                Empezar 14 días gratis
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-50 p-8 rounded-3xl flex items-center gap-6 border border-blue-100">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <ShieldCheck className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-900">Seguridad Garantizada</h4>
                        <p className="text-sm text-slate-500 font-medium">Todos los pagos son procesados de forma segura a través de Stripe. No almacenamos los datos de tu tarjeta.</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

import { cn } from '@/lib/utils';
