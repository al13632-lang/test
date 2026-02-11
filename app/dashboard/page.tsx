'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
    TrendingUp,
    DollarSign,
    ShoppingBag,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    AlertCircle
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const data = [
    { name: 'Lun', sales: 4000 },
    { name: 'Mar', sales: 3000 },
    { name: 'Mie', sales: 2000 },
    { name: 'Jue', sales: 2780 },
    { name: 'Vie', sales: 1890 },
    { name: 'Sab', sales: 2390 },
    { name: 'Dom', sales: 3490 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600" />
            </div>
            {trend && (
                <div className={cn(
                    "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                    trend === 'up' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                )}>
                    {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {trendValue}
                </div>
            )}
        </div>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
);

import { cn } from '@/lib/utils';

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Resumen Ejecutivo</h1>
                    <p className="text-slate-500">Bienvenido de nuevo, esto es lo que está pasando hoy.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Ventas de Hoy"
                        value="$12,450.00"
                        icon={DollarSign}
                        trend="up"
                        trendValue="+12%"
                    />
                    <StatCard
                        title="Órdenes"
                        value="48"
                        icon={ShoppingBag}
                        trend="up"
                        trendValue="+5%"
                    />
                    <StatCard
                        title="Clientes Nuevos"
                        value="12"
                        icon={Users}
                        trend="down"
                        trendValue="-2%"
                    />
                    <StatCard
                        title="Ticket Promedio"
                        value="$259.00"
                        icon={TrendingUp}
                        trend="up"
                        trendValue="+8%"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Ventas de la Semana</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorSales)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Inventory Alarms */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Alertas de Inventario</h3>
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: 'Carne de Res', stock: '2.5kg', min: '5kg' },
                                { name: 'Tomate Saladet', stock: '1.2kg', min: '3kg' },
                                { name: 'Aceite Vegetal', stock: '0.5L', min: '2L' },
                            ].map((item) => (
                                <div key={item.name} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{item.name}</p>
                                        <p className="text-xs text-amber-700">Stockcrítico: {item.stock}</p>
                                    </div>
                                    <button className="text-xs font-bold text-amber-800 hover:underline">
                                        Pedir
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200">
                            Ver todo el inventario
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
