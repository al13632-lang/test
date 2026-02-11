'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Package, Plus, Search, Filter, AlertTriangle, ArrowUpDown, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

const inventoryItems = [
    { id: '1', name: 'Carne de Res (Sirloin)', unit: 'kg', stock: 12.5, min: 20, cost: 245, category: 'Proteínas' },
    { id: '2', name: 'Pan Brioche', unit: 'piezas', stock: 45, min: 30, cost: 8.5, category: 'Panadería' },
    { id: '3', name: 'Queso Cheddar', unit: 'kg', stock: 3.2, min: 5, cost: 180, category: 'Lácteos' },
    { id: '4', name: 'Aceite Vegetal', unit: 'litros', stock: 15, min: 10, cost: 35, category: 'Abarrotes' },
    { id: '5', name: 'Tomate Saladet', unit: 'kg', stock: 4.8, min: 10, cost: 22, category: 'Verduras' },
];

export default function InventoryPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Control de Inventario</h1>
                        <p className="text-slate-500">Gestiona tus insumos y niveles de stock en tiempo real.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                        <Plus className="w-4 h-4" />
                        Agregar Insumo
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o categoría..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                            <Filter className="w-4 h-4" />
                            Categoría
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                            <ArrowUpDown className="w-4 h-4" />
                            Ordenar
                        </button>
                    </div>
                </div>

                {/* Inventory Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Insumo</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Categoría</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Actual</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Costo p/u</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {inventoryItems.map((item) => {
                                const isLowStock = item.stock < item.min;
                                return (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
                                                    <Package className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span className="text-sm font-bold text-slate-900">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-700">
                                                {item.stock} {item.unit}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-900">
                                                ${item.cost.toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {isLowStock ? (
                                                <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs uppercase">
                                                    <AlertTriangle className="w-3.5 h-3.5" />
                                                    Stock Bajo
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-green-600 font-bold text-xs uppercase">
                                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                                    Óptimo
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-slate-600 p-1">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 p-6 rounded-xl text-white">
                        <p className="text-slate-400 text-sm font-medium">Valor Total Inventario</p>
                        <p className="text-3xl font-black mt-1">$45,820.00</p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Actualizado hace 5 min
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <p className="text-slate-500 text-sm font-medium">Insumos Críticos</p>
                        <p className="text-3xl font-black text-amber-600 mt-1">12</p>
                        <button className="mt-4 text-sm font-bold text-blue-600 hover:underline">
                            Generar lista de compras
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <p className="text-slate-500 text-sm font-medium">Última Ajuste</p>
                        <p className="text-xl font-bold text-slate-900 mt-1">Suministro de Carne</p>
                        <p className="mt-1 text-sm text-slate-400">Hoy, 10:45 AM</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
