"use client";

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, LayoutDashboard, Utensils, Settings, LogOut, ChevronRight, Upload, ImageIcon, X, Images, ShoppingCart, Clock, MapPin, Monitor, Search, CreditCard, Banknote, User, Phone, Ticket, BarChart3, PieChart, DollarSign, TrendingUp, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product, Category, StoreConfig } from '@/lib/data';
import { BRANDING } from '@/lib/branding';

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'products' | 'categories' | 'config' | 'banners' | 'coupons' | 'analytics' | 'pdv'>('home');
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [activeAdminCategory, setActiveAdminCategory] = useState<string>("all");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const lastOrderCount = React.useRef<number>(0);

    // Estados do Caixa
    const [cashierModal, setCashierModal] = useState({ show: false, initialValue: 0 });

    // Estados do PDV
    const [pdvCart, setPdvCart] = useState<any[]>([]);
    const [pdvSearch, setPdvSearch] = useState("");
    const [pdvCustomerName, setPdvCustomerName] = useState("");
    const [pdvCustomerPhone, setPdvCustomerPhone] = useState("");
    const [pdvPaymentMethod, setPdvPaymentMethod] = useState("Efectivo");
    const [pdvObservation, setPdvObservation] = useState("");

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [lockError, setLockError] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // SENHA DEFINIDA AQUI: "Cliente1@"
        if (passwordInput === "Cliente1@") {
            setIsAuthenticated(true);
        } else {
            setLockError(true);
            setTimeout(() => setLockError(false), 2000);
        }
    };

    const fetchOrders = (isPolling = false) => {
        if (!isPolling) setLoading(true);
        fetch('/api/data')
            .then(res => res.json())
            .then(json => {
                setData(json);
                if (!isPolling) setLoading(false);
            })
            .catch(() => {
                if (!isPolling) setLoading(false);
            });
    };

    // Polling de pedidos (cada 30 segs)
    useEffect(() => {
        const interval = setInterval(() => {
            fetchOrders(true);
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    // Monitorar novos pedidos para tocar som
    useEffect(() => {
        if (data?.orders?.length > lastOrderCount.current) {
            if (lastOrderCount.current > 0 && soundEnabled) {
                try {
                    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS56+OdTgwOUKXh8LZjHAU7k9nyz3osBSh+zPLaizsKFGCz6OyrWBUIR6Hh8r5sIAUsgs/y2Ik2Bxdlu+vjnU4LDlCl4fC2YxwFO5PZ8s96LAUofszy2os7ChRgs+jsq1gVCEeh4fK+bCAFLILP8tiJNgcXZbvr451OCw5QpeHwtmMcBTuT2fLPeiwFKH7M8tqLOwoUYLPo7KtYFQhHoeHyvmwgBSyCz/LYiTYHF2W76+OdTgsOUKXh8LZjHAU7k9nyz3osBSh+zPLaizsKFGCz6OyrWBUIR6Hh8r5sIAUsgs/y2Ik2Bxdlu+vjnU4LDlCl4fC2YxwFO5PZ8s96LAUofszy2os7ChRgs+jsq1gVCEeh4fK+bCAFLILP8tiJNgcXZbvr451OCw5QpeHwtmMcBTuT2fLPeiwFKH7M8tqLOwoUYLPo7KtYFQhHoeHyvmwgBSyCz/LYiTYHF2W76+OdTgsOUKXh8LZjHAU7k9nyz3osBSh+zPLaizsKFGCz6OyrWBUIR6Hh8r5sIAUsgs/y2Ik2Bxdlu+vjnU4LDlCl4fC2YxwFO5PZ8s96LAUofszy2os7ChRgs+jsq1gVCEeh4fK+bCAFLILP8tiJNgcXZbvr451OCw5QpeHwtmMcBTuT2fLPeiwFKH7M8tqLOwoUYLPo7KtYFQhHoeHyvmwgBSyCz/LYiTYHF2W76+OdTgsOUKXh8LZjHAU7k9nyz3osBSh+zPLaizsKFGCz6OyrWBUIR6Hh8r5sIAUsgs/y2Ik2Bxdlu+vjnU4LDlCl4fC2YxwFO5PZ8s96LAUofszy2os7ChRgs+jsq1gVCEeh4fK+bCAFLILP8tiJNgcXZbvr451OCw5QpeHwtmMcBTuT2fLPeiwFKH7M8tqLOwoUYLPo7KtYFQhHoeHyvmwgBSyCz/LYiTYHF2W76+OdTgsOUKXh8LZjHAU7k9nyz3osBSh+zPLaizsKFGCz6OyrWBUIR6Hh8r5sIAUsgs/y2Ik2Bxdlu+vjnU4LDlCl4fC2YxwFO5PZ8s96LAUofszy2os7ChRgs+jsq1gVCEeh4fK+bCAFLILP8tiJNgcXZbvr451OCw5QpeHwtmMcBTuT2fLPeiwFKH7M8tqLOwoUYLPo7KtYFQhHoeHyvmwgBSyCz/LYiTYHF2W76+OdTgsOUKXh8LZjHAU7k9nyz3osBSh+zPLaizsKFGCz6OyrWBUIR6Hh8r5sIAUsgs/y2Ik2Bxdlu+vjnU4LDlCl4fC2YxwFO5PZ8s96LAUofszy2os7ChRgs+jsq1gVCEeh4fK+bCAFLILP8tiJNgcXZbvr451OCw5QpeHwtmMcBTuT2fLPeiwFKH7M8tqLOwoUYLPo7KtYFQ==');
                    audio.volume = 0.8;
                    audio.play().catch(() => {
                        const notification = document.createElement('div');
                        notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#E63946;color:white;padding:20px;border-radius:15px;font-weight:bold;z-index:9999;animation:slideIn 0.3s;box-shadow:0 10px 30px rgba(0,0,0,0.3);';
                        notification.innerHTML = '🔔 ¡NUEVO PEDIDO RECIBIDO!';
                        document.body.appendChild(notification);
                        setTimeout(() => notification.remove(), 3000);
                    });
                } catch (e) {
                    console.log("Error de audio:", e);
                }
            }
            lastOrderCount.current = data.orders.length;
        }
    }, [data?.orders, soundEnabled]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateCategory = (id: string, name: string) => {
        setData((prev: any) => ({
            ...prev,
            categories: prev.categories.map((c: Category) => c.id === id ? { ...c, name } : c)
        }));
    };

    const addCategory = () => {
        const newCat: Category = {
            id: Math.random().toString(36).substr(2, 9),
            name: "Nueva Categoría",
            icon: "Utensils"
        };
        setData((prev: any) => ({ ...prev, categories: [...prev.categories, newCat] }));
    };

    const deleteCategory = (id: string) => {
        if (confirm("¿Estás seguro? Esto puede afectar los productos vinculados a esta categoría.")) {
            setData((prev: any) => ({
                ...prev,
                categories: prev.categories.filter((c: Category) => c.id !== id)
            }));
        }
    };

    const handleImageUpload = async (file: File, path: string, callback: (url: string) => void) => {
        const formData = new FormData();
        formData.append('file', file);

        setUploading(path);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error al subir la imagen');
            }

            const result = await res.json();
            callback(result.url);
        } catch (error: any) {
            alert(`Aviso: ${error.message}\n\nConsejo: Copie el enlace de la imagen y péguelo directamente en el campo de texto.`);
        } finally {
            setUploading(null);
        }
    };


    const handleOpenCashier = (initialBalance: number) => {
        const newStatus = {
            isOpen: true,
            openingTime: new Date().toLocaleString('es-PY'),
            initialBalance,
            currentBalance: initialBalance
        };
        const newData = { ...data, store: { ...data.store, cashierStatus: newStatus } };
        setData(newData);
        handleSave(newData);
    };

    const handleCloseCashier = () => {
        if (confirm("¿Desea realmente cerrar la caja?")) {
            const newStatus = {
                ...data.store.cashierStatus,
                isOpen: false,
                closingTime: new Date().toLocaleString('es-PY')
            };
            const newData = { ...data, store: { ...data.store, cashierStatus: newStatus } };
            setData(newData);
            handleSave(newData);
            alert(`¡Caja cerrada con éxito! Saldo Final: Gs. ${data.store.cashierStatus.currentBalance.toLocaleString('es-PY')}`);
        }
    };

    // Funções de Cupom
    const addCoupon = () => {
        const newCoupon = { code: "BIENVENIDO", discount: 10, type: 'percent' };
        setData((prev: any) => ({
            ...prev,
            store: { ...prev.store, coupons: [...(prev.store.coupons || []), newCoupon] }
        }));
    };

    const updateCoupon = (index: number, field: string, value: any) => {
        setData((prev: any) => {
            const newCoupons = [...(prev.store.coupons || [])];
            newCoupons[index] = { ...newCoupons[index], [field]: value };
            return { ...prev, store: { ...prev.store, coupons: newCoupons } };
        });
    };

    const deleteCoupon = (index: number) => {
        setData((prev: any) => {
            const newCoupons = prev.store.coupons.filter((_: any, i: number) => i !== index);
            return { ...prev, store: { ...prev.store, coupons: newCoupons } };
        });
    };

    // Funções do PDV
    const addToPdvCart = (product: Product) => {
        setPdvCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1, observation: '' }];
        });
    };

    const updatePdvQuantity = (id: string, delta: number) => {
        setPdvCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const finishPdvSale = () => {
        if (pdvCart.length === 0) {
            alert("¡El carrito está vacío!");
            return;
        }

        const total = pdvCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        const newOrder = {
            id: Math.floor(Math.random() * 10000).toString(),
            date: new Date().toLocaleString('es-PY'),
            status: 'Entregado', // PDV já sai como entregue/finalizado geralmente, ou pendente se for delivery
            total: total,
            payment: pdvPaymentMethod,
            items: pdvCart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                observation: item.observation
            })),
            customer: {
                name: pdvCustomerName || "Cliente Mostrador",
                phone: pdvCustomerPhone,
                address: "Retiro en Local"
            },
            type: 'PDV', // Identificador de venda balcão
            observation: pdvObservation
        };

        // Atualizar estoque se necessário (se tiver controle de estoque implementado)
        // Por enquanto apenas salva o pedido

        const newOrders = [newOrder, ...(data.orders || [])];
        const newData = { ...data, orders: newOrders };
        setData(newData);
        handleSave(newData);

        // Limpar PDV
        setPdvCart([]);
        setPdvCustomerName("");
        setPdvCustomerPhone("");
        setPdvObservation("");
        alert("¡Venta registrada con éxito!");
    };

    const handleSave = async (customData?: any) => {
        setSaving(true);
        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                body: JSON.stringify(customData || data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                alert("!Cambios guardados con éxito!");
            } else {
                const errorData = await res.json().catch(() => ({ message: res.statusText }));
                alert(`Error al guardar: ${errorData.message || "Error desconocido"}`);
            }
        } catch (error: any) {
            console.error("Save error:", error);
            alert(`Error de conexión: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const updateProduct = (id: string, field: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            products: prev.products.map((p: Product) => p.id === id ? { ...p, [field]: value } : p)
        }));
    };

    const addProduct = () => {
        const newProduct: Product = {
            id: Math.random().toString(36).substr(2, 9),
            name: "Nuevo Producto",
            description: "Descripción aquí",
            price: 0,
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
            category: activeAdminCategory === "all" ? data.categories[0].id : activeAdminCategory,
            available: true
        };
        setData((prev: any) => ({ ...prev, products: [...prev.products, newProduct] }));
    };

    const deleteProduct = (id: string) => {
        if (confirm("¿Estás seguro de que deseas eliminar?")) {
            setData((prev: any) => ({
                ...prev,
                products: prev.products.filter((p: Product) => p.id !== id)
            }));
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-muted/20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
                <form onSubmit={handleLogin} className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl space-y-6">
                    <div className="text-center space-y-2">
                        <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Utensils className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="font-bold text-2xl text-slate-800">Panel del Restaurante</h1>
                        <p className="text-slate-500 text-sm">Ingrese su contraseña para acceder</p>
                    </div>

                    <div className="space-y-2">
                        <input
                            type="password"
                            autoFocus
                            placeholder="Contraseña de acceso"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className={cn(
                                "w-full bg-slate-50 border-2 rounded-2xl p-4 font-bold text-center text-lg outline-none transition-all placeholder:font-normal",
                                lockError ? "border-red-500 bg-red-50 text-red-500 animate-shake" : "border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10"
                            )}
                        />
                        {lockError && <p className="text-xs text-center text-red-500 font-bold">Contraseña incorrecta</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white h-14 rounded-2xl font-bold text-lg hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row font-sans">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col gap-8 shadow-xl">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black">AD</div>
                    <h1 className="font-black text-xl tracking-tight uppercase">Panel App</h1>
                </div>

                <nav className="flex flex-col gap-2 flex-1">
                    <button
                        onClick={() => setActiveTab('home')}
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group",
                            activeTab === 'home' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                        )}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Inicio
                        <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'home' ? "rotate-90" : "")} />
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group",
                            activeTab === 'orders' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                        )}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Pedidos
                        <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'orders' ? "rotate-90" : "")} />
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group",
                            activeTab === 'products' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                        )}
                    >
                        <Utensils className="w-5 h-5" />
                        Menú
                        <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'products' ? "rotate-90" : "")} />
                    </button>
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group",
                            activeTab === 'categories' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                        )}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Categorías
                        <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'categories' ? "rotate-90" : "")} />
                    </button>
                    <button
                        onClick={() => setActiveTab('config')}
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group",
                            activeTab === 'config' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                        )}
                    >
                        <Settings className="w-5 h-5" />
                        Ajustes
                        <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'config' ? "rotate-90" : "")} />
                    </button>
                    <button
                        onClick={() => setActiveTab('banners')}
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group",
                            activeTab === 'banners' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                        )}
                    >
                        <Images className="w-5 h-5" />
                        Banners
                        <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'banners' ? "rotate-90" : "")} />
                    </button>
                    <button
                        onClick={() => setActiveTab('coupons')}
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group",
                            activeTab === 'coupons' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                        )}
                    >
                        <Ticket className="w-5 h-5" />
                        Cupones
                        <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'coupons' ? "rotate-90" : "")} />
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group",
                            activeTab === 'analytics' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                        )}
                    >
                        <BarChart3 className="w-5 h-5" />
                        Reportes
                        <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'analytics' ? "rotate-90" : "")} />
                    </button>
                    <button
                        onClick={() => setActiveTab('pdv')}
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group",
                            activeTab === 'pdv' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                        )}
                    >
                        <Monitor className="w-5 h-5" />
                        Punto de Venta
                        <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'pdv' ? "rotate-90" : "")} />
                    </button>
                </nav>

                <button className="flex items-center gap-3 p-4 rounded-2xl opacity-40 hover:opacity-100 hover:bg-red-500/10 text-red-400 font-bold transition-all">
                    <LogOut className="w-5 h-5" /> Salir
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight capitalize">
                            {activeTab === 'orders' ? 'Pedidos Recibidos' :
                                activeTab === 'products' ? 'Gestionar Menú' :
                                    activeTab === 'categories' ? 'Gestionar Categorías' :
                                        activeTab === 'banners' ? 'Gestionar Banners' :
                                            activeTab === 'coupons' ? 'Cupones de Descuento' :
                                                activeTab === 'analytics' ? 'Reportes de Ventas' :
                                                    activeTab === 'pdv' ? 'Punto de Venta' :
                                                        activeTab === 'home' ? 'Panel Principal' :
                                                            'Ajustes de la Tienda'}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-muted-foreground">Administre su tienda en tiempo real.</p>
                            {activeTab === 'orders' && (
                                <button onClick={() => fetchOrders()} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold hover:bg-primary/20 transition-all uppercase">
                                    🔄 Actualizar Lista
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className={cn(
                                "p-4 rounded-2xl shadow-xl transition-all font-bold flex items-center gap-2",
                                soundEnabled ? "bg-blue-600 text-white shadow-blue-600/20" : "bg-slate-200 text-slate-500"
                            )}
                        >
                            {soundEnabled ? "🔊 Sonido Activado" : "🔇 Sonido Silenciado"}
                        </button>
                        <button
                            onClick={() => {
                                const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS56+OdTgwOUKXh8LZjHAU7k9nyz3osBSh+zPLaizsKFGCz6OyrWBUIR6Hh8r5sIAUsgs/y2Ik2Bxdlu+vjnU4LDlCl4fC2YxwFO5PZ8s96LAUofszy2os7ChRgs+jsq1gVCEeh4fK+bCAFLILP8tiJNgcXZbvr451OCw5QpeHwtmMcBTuT2fLPeiwFKH7M8tqLOwoUYLPo7KtYFQhHoeHyvmwgBSyCz/LYiTYHF2W76+OdTgsOUKXh8LZjHAU7k9nyz3osBSh+zPLaizsKFGCz6OyrWBUIR6Hh8r5sIAUsgs/y2Ik2Bxdlu+vjnU4LDlCl4fC2YxwFO5PZ8s96LAUofszy2os7ChRgs+jsq1gVCEeh4fK+bCAFLILP8tiJNgcXZbvr451OCw5QpeHwtmMcBTuT2fLPeiwFKH7M8tqLOwoUYLPo7KtYFQhHoeHyvmwgBSyCz/LYiTYHF2W76+OdTgsOUKXh8LZjHAU7k9nyz3osBSh+zPLaizsKFGCz6OyrWBUIR6Hh8r5sIAUsgs/y2Ik2Bxdlu+vjnU4LDlCl4fC2YxwFO5PZ8s96LAUofszy2os7ChRgs+jsq1gVCEeh4fK+bCAFLILP8tiJNgcXZbvr451OCw5QpeHwtmMcBTuT2fLPeiwFKH7M8tqLOwoUYLPo7KtYFQhHoeHyvmwgBSyCz/LYiTYHF2W76+OdTgsOUKXh8LZjHAU7k9nyz3osBSh+zPLaizsKFGCz6OyrWBUIR6Hh8r5sIAUsgs/y2Ik2Bxdlu+vjnU4LDlCl4fC2YxwFO5PZ8s96LAUofszy2os7ChRgs+jsq1gVCEeh4fK+bCAFLILP8tiJNgcXZbvr451OCw5QpeHwtmMcBTuT2fLPeiwFKH7M8tqLOwoUYLPo7KtYFQhHoeHyvmwgBSyCz/LYiTYHF2W76+OdTgsOUKXh8LZjHAU7k9nyz3osBSh+zPLaizsKFGCz6OyrWBUIR6Hh8r5sIAUsgs/y2Ik2Bxdlu+vjnU4LDlCl4fC2YxwFO5PZ8s96LAUofszy2os7ChRgs+jsq1gVCEeh4fK+bCAFLILP8tiJNgcXZbvr451OCw5QpeHwtmMcBTuT2fLPeiwFKH7M8tqLOwoUYLPo7KtYFQ==');
                                audio.volume = 0.8;
                                audio.play();
                            }}
                            className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-xl shadow-green-600/20 font-bold hover:bg-green-700 transition-all"
                        >
                            🔔 Probar Sonido
                        </button>
                        <button
                            onClick={() => handleSave()}
                            disabled={saving}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl shadow-xl shadow-green-600/20 flex items-center justify-center gap-3 font-bold transition-all active:scale-95 disabled:opacity-50"
                        >
                            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save className="w-5 h-5" />}
                            GUARDAR CAMBIOS
                        </button>
                    </div>
                </header>

                {/* MODAL DE CAIXA */}
                {cashierModal.show && (
                    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                            <h3 className="font-black text-2xl text-slate-800 mb-2 uppercase tracking-tight">Abrir Caja</h3>
                            <p className="text-slate-500 text-sm mb-6 font-medium">Ingrese el saldo inicial en efectivo.</p>

                            <div className="space-y-4">
                                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-primary/20">
                                    <label className="text-[10px] font-black uppercase text-primary mb-2 block">Saldo Inicial (Gs.)</label>
                                    <input
                                        type="number"
                                        autoFocus
                                        value={cashierModal.initialValue}
                                        onChange={(e) => setCashierModal({ ...cashierModal, initialValue: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-transparent border-none font-black text-3xl text-slate-800 outline-none"
                                    />
                                </div>

                                <button
                                    onClick={() => {
                                        handleOpenCashier(cashierModal.initialValue);
                                        setCashierModal({ show: false, initialValue: 0 });
                                    }}
                                    className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/30 transition-all active:scale-95"
                                >
                                    Confirmar Apertura
                                </button>
                                <button
                                    onClick={() => setCashierModal({ show: false, initialValue: 0 })}
                                    className="w-full text-slate-400 py-2 font-bold hover:text-slate-600 transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* EDIÇÃO RÁPIDA DO NOME - LOGO NO TOPO */}
                <div className="mb-8 bg-primary/5 p-6 rounded-[2.5rem] border-2 border-primary/20">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <label className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">Nombre de la Aplicación / Restaurante</label>
                        <button
                            onClick={() => {
                                if (confirm("¿Restaurar nombre predeterminado del sistema?")) {
                                    setData({ ...data, store: { ...data.store, name: BRANDING.name } });
                                }
                            }}
                            className="text-[10px] bg-primary text-white px-3 py-1 rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            Resetear a Código
                        </button>
                    </div>
                    <input
                        value={data.store.name}
                        onChange={(e) => setData({ ...data, store: { ...data.store, name: e.target.value } })}
                        className="w-full bg-white border-none rounded-3xl p-5 font-black text-2xl text-slate-800 shadow-sm focus:ring-4 focus:ring-primary/20 outline-none"
                        placeholder="Escriba el nombre aquí..."
                    />
                </div>

                {activeTab === 'home' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    label: 'Abrir/Cerrar Caja', desc: 'Gestionar turno y saldo', icon: <ShoppingCart className="w-8 h-8" />, color: 'bg-emerald-500', action: () => {
                                        if (data.store.cashierStatus?.isOpen) {
                                            handleCloseCashier();
                                        } else {
                                            setCashierModal({ ...cashierModal, show: true });
                                        }
                                    }
                                },
                                { label: 'Nuevo Pedido', desc: 'Registrar venta manual (PDV)', icon: <Plus className="w-8 h-8" />, color: 'bg-blue-500', action: () => setActiveTab('pdv') },
                                { label: 'Gestionar Stock', desc: 'Control de cantidades', icon: <TrendingUp className="w-8 h-8" />, color: 'bg-orange-500', action: () => setActiveTab('products') },
                                { label: 'Reportes Pro', desc: 'Ventas y rentabilidad', icon: <BarChart3 className="w-8 h-8" />, color: 'bg-slate-800', action: () => setActiveTab('analytics') },
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    onClick={item.action}
                                    className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all group text-left flex flex-col gap-4"
                                >
                                    <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/10 group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-800 text-xl uppercase tracking-tighter">{item.label}</h3>
                                        <p className="text-slate-400 text-sm font-medium">{item.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Status Rápido */}
                        <div className="bg-slate-900 rounded-[3rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                            <div className="flex items-center gap-6">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Estado del Sistema</p>
                                    <h4 className="text-xl font-black uppercase">Tienda Abierta & Caja {data.store.cashierStatus?.isOpen ? 'Abierto' : 'Cerrado'}</h4>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-6">
                                {data.store.cashierStatus?.isOpen && (
                                    <>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Saldo en Caja</p>
                                            <h4 className="text-xl font-black text-green-400">Gs. {data.store.cashierStatus.currentBalance.toLocaleString('es-PY')}</h4>
                                        </div>
                                        <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                                    </>
                                )}
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Ventas Hoy</p>
                                    <h4 className="text-xl font-black text-primary">Gs. {(data.orders || []).filter((o: any) => o.date.includes(new Date().toLocaleDateString('pt-BR'))).reduce((acc: number, o: any) => acc + o.total, 0).toLocaleString('es-PY')}</h4>
                                </div>
                                <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Pendientes</p>
                                    <h4 className="text-xl font-black text-orange-400">{(data.orders || []).filter((o: any) => o.status === 'Pendente').length}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'coupons' && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-[3rem] text-white shadow-2xl flex justify-between items-center">
                            <div>
                                <h3 className="text-3xl font-black uppercase tracking-tight mb-2">🎟️ Cupones Activos</h3>
                                <p className="text-pink-100 font-medium">Gestione las campañas de descuento</p>
                            </div>
                            <button onClick={addCoupon} className="bg-white text-pink-600 px-6 py-3 rounded-2xl font-black shadow-lg hover:scale-105 transition-transform">
                                + Nuevo Cupón
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(data.store.coupons || []).map((coupon: any, index: number) => (
                                <div key={index} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600">
                                            <Ticket className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Código del Cupón</label>
                                            <input
                                                value={coupon.code}
                                                onChange={(e) => updateCoupon(index, 'code', e.target.value.toUpperCase())}
                                                className="w-full font-black text-xl text-slate-800 bg-transparent outline-none uppercase placeholder:text-slate-300"
                                                placeholder="EJ: VERANO2025"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1 bg-slate-50 p-4 rounded-2xl">
                                            <label className="text-[10px] font-black text-slate-400 uppercase">Descuento</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={coupon.discount}
                                                    onChange={(e) => updateCoupon(index, 'discount', parseFloat(e.target.value))}
                                                    className="w-full bg-transparent font-bold text-lg outline-none"
                                                />
                                                <select
                                                    value={coupon.type}
                                                    onChange={(e) => updateCoupon(index, 'type', e.target.value)}
                                                    className="bg-white rounded-lg text-xs font-bold p-1 border-none outline-none"
                                                >
                                                    <option value="percent">%</option>
                                                    <option value="fixed">Gs.</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteCoupon(index)}
                                            className="bg-red-50 text-red-500 w-14 rounded-2xl flex items-center justify-center hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-slate-200">
                        <BarChart3 className="w-20 h-20 text-slate-200 mx-auto mb-6" />
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Reportes en Construcción</h3>
                        <p className="text-slate-400">Pronto tendrá gráficos detallados de sus ventas aquí.</p>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        {(!data.orders || data.orders.length === 0) ? (
                            <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold">Aún no se han recibido pedidos.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {data.orders.map((order: any) => (
                                    <div key={order.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all">
                                        <div className="space-y-1 text-left">
                                            <div className="flex items-center gap-2">
                                                <span className="bg-slate-100 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider text-slate-500">#{order.id}</span>
                                                <span className="text-xs text-slate-400">{order.date}</span>
                                            </div>
                                            <div className="font-black text-slate-800 text-lg">
                                                {order.items.length} productos - Gs. {order.total.toLocaleString('es-PY')}
                                            </div>
                                            <div className="text-sm text-slate-500 font-medium">
                                                Pago: <span className="text-primary font-bold uppercase">{order.payment}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setTimeout(() => window.print(), 100);
                                                }}
                                                className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-primary/90 transition-all"
                                            >
                                                <Save className="w-3 h-3" /> Imprimir
                                            </button>

                                            {/* Seletor de Status */}
                                            <select
                                                value={order.status || 'Pendiente'}
                                                onChange={(e) => {
                                                    const newStatus = e.target.value;
                                                    const newOrders = data.orders.map((o: any) =>
                                                        o.id === order.id ? { ...o, status: newStatus } : o
                                                    );
                                                    const newData = { ...data, orders: newOrders };
                                                    setData(newData);
                                                    handleSave(newData);

                                                    // Se o status for "Saindo para Entrega", avisa no Zap
                                                    if (newStatus === 'En camino') {
                                                        const msg = encodeURIComponent(`*¡Hola! ¡Tu pedido de ${data.store.name} está en camino ahora mismo!* 🛵🍔`);
                                                        window.open(`https://wa.me/${data.store.whatsapp.replace(/\D/g, '')}?text=${msg}`, '_blank');
                                                    }
                                                }}
                                                className={cn(
                                                    "text-[10px] font-bold px-3 py-2 rounded-xl border-none ring-1 ring-slate-200 focus:ring-primary/20",
                                                    order.status === 'Entregado' ? "bg-green-50 text-green-600" :
                                                        order.status === 'En camino' ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                                                )}
                                            >
                                                <option value="Pendiente">⏳ Pendiente</option>
                                                <option value="Preparando">🔥 Preparando</option>
                                                <option value="En camino">🛵 En camino</option>
                                                <option value="Entregado">✅ Entregado</option>
                                            </select>

                                            {/* Botão de Avaliação */}
                                            {order.status === 'Entregado' && data.store.reviewLink && (
                                                <button
                                                    onClick={() => {
                                                        const msg = encodeURIComponent(`*¡Hola! ¡Esperamos que hayas disfrutado tu pedido!* 😍\n\nSi puedes calificarnos en Google, ayuda mucho a nuestro trabajo: \n${data.store.reviewLink}`);
                                                        window.open(`https://wa.me/${data.store.whatsapp.replace(/\D/g, '')}?text=${msg}`, '_blank');
                                                    }}
                                                    className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-yellow-200 transition-all"
                                                >
                                                    ⭐ Pedir Calificación
                                                </button>
                                            )}

                                            <button
                                                onClick={() => {
                                                    if (confirm("¿Deseas eliminar este pedido? Para su seguridad, será borrado permanentemente después de la confirmación.")) {
                                                        const newOrders = data.orders.filter((o: any) => o.id !== order.id);
                                                        const newData = { ...data, orders: newOrders };
                                                        setData(newData);
                                                        handleSave(newData);
                                                    }
                                                }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Layout Oculto para Impressora Térmica */}
                {selectedOrder && (
                    <div id="printable-receipt" className="hidden print:block text-left">
                        <div className="text-center font-bold border-b-2 border-dashed border-black pb-2 mb-2">
                            <h3 className="uppercase">{data.store.name}</h3>
                            <p className="text-[10px] font-normal">{data.store.address}</p>
                            <p className="text-[10px] font-normal">{selectedOrder.date}</p>
                        </div>

                        <div className="space-y-1 mb-2">
                            <p className="font-bold border-b border-black">PRODUCTOS DEL PEDIDO</p>
                            {selectedOrder.items.map((item: any, i: number) => (
                                <div key={i} className="flex justify-between text-[11px]">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>Gs. {(item.price * item.quantity).toLocaleString('es-PY')}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 border-dashed border-black pt-2 space-y-1 text-[11px]">
                            <p className="flex justify-between font-black text-[13px]">
                                <span>TOTAL:</span>
                                <span>Gs. {selectedOrder.total.toLocaleString('es-PY')}</span>
                            </p>
                            <p><strong>PAGO:</strong> {selectedOrder.payment}</p>
                            {selectedOrder.observation && (
                                <p><strong>OBS:</strong> {selectedOrder.observation}</p>
                            )}
                            {selectedOrder.location && (
                                <p className="text-[10px]"><strong>GPS:</strong> {selectedOrder.location.lat}, {selectedOrder.location.lng}</p>
                            )}
                        </div>

                        <div className="text-center mt-4 pt-4 border-t border-black">
                            <p className="text-[10px]">¡Gracias por su preferencia!</p>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="space-y-6">
                        {/* Selector de Categoría para Administrador */}
                        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                            <button
                                onClick={() => setActiveAdminCategory("all")}
                                className={cn(
                                    "px-6 py-2 rounded-xl font-bold text-sm transition-all",
                                    activeAdminCategory === "all" ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-slate-50 text-slate-500"
                                )}
                            >
                                TODAS
                            </button>
                            {data.categories.map((cat: Category) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveAdminCategory(cat.id)}
                                    className={cn(
                                        "px-6 py-2 rounded-xl font-bold text-sm transition-all uppercase",
                                        activeAdminCategory === cat.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-slate-50 text-slate-500"
                                    )}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={addProduct}
                            className="w-full border-2 border-dashed border-primary/30 text-primary p-6 rounded-[2.5rem] hover:bg-primary/5 transition-all flex items-center justify-center gap-3 font-black uppercase tracking-widest text-sm"
                        >
                            <Plus className="w-6 h-6" /> Añadir en {activeAdminCategory === "all" ? "General" : data.categories.find((c: any) => c.id === activeAdminCategory)?.name}
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {data.products
                                .filter((p: Product) => activeAdminCategory === "all" || p.category === activeAdminCategory)
                                .map((p: Product) => (
                                    <div key={p.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-4 hover:shadow-xl hover:border-primary/10 transition-all group">
                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center gap-2 px-1">
                                                <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-inner flex-shrink-0 relative group/img">
                                                    <img src={p.image} className="w-full h-full object-cover" alt="" />
                                                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 cursor-pointer transition-opacity">
                                                        <Upload className="w-6 h-6 text-white" />
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) handleImageUpload(file, 'products', (url) => updateProduct(p.id, 'image', url));
                                                            }}
                                                        />
                                                    </label>
                                                    {uploading === 'products' && (
                                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                        </div>
                                                    )}
                                                </div>
                                                <label className="text-[9px] font-black text-primary cursor-pointer hover:underline uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md">
                                                    Cambiar Foto
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleImageUpload(file, 'products', (url) => updateProduct(p.id, 'image', url));
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <input
                                                    value={p.name}
                                                    onChange={(e) => updateProduct(p.id, 'name', e.target.value)}
                                                    className="font-bold text-lg w-full bg-slate-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20"
                                                />
                                                <div className="flex items-center gap-3">
                                                    <select
                                                        value={p.category}
                                                        onChange={(e) => updateProduct(p.id, 'category', e.target.value)}
                                                        className="text-[10px] font-black uppercase tracking-widest bg-slate-100 border-none rounded-lg px-2 py-1 focus:ring-1 focus:ring-primary/20"
                                                    >
                                                        {data.categories.map((c: any) => (
                                                            <option key={c.id} value={c.id}>{c.name}</option>
                                                        ))}
                                                    </select>
                                                    <span className="text-sm font-bold text-slate-400">Gs.</span>
                                                    <input
                                                        type="number"
                                                        value={p.price}
                                                        onChange={(e) => updateProduct(p.id, 'price', parseFloat(e.target.value))}
                                                        className="font-black text-primary text-xl w-32 bg-slate-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <textarea
                                            value={p.description}
                                            onChange={(e) => updateProduct(p.id, 'description', e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-600 min-h-[80px] focus:ring-2 focus:ring-primary/20"
                                            placeholder="Descripción del producto..."
                                        />

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-3">
                                                <label className="text-xs font-black uppercase text-slate-400">Disponible</label>
                                                <input
                                                    type="checkbox"
                                                    checked={p.available}
                                                    onChange={(e) => updateProduct(p.id, 'available', e.target.checked)}
                                                    className="w-6 h-6 text-primary rounded-lg border-slate-200 focus:ring-2 focus:ring-primary/20"
                                                />
                                            </div>
                                            <button
                                                onClick={() => deleteProduct(p.id)}
                                                className="p-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
                {activeTab === 'categories' && (
                    <div className="space-y-6">
                        <button
                            onClick={addCategory}
                            className="w-full border-2 border-dashed border-primary/30 text-primary p-6 rounded-[2.5rem] hover:bg-primary/5 transition-all flex items-center justify-center gap-3 font-black uppercase tracking-widest text-sm"
                        >
                            <Plus className="w-6 h-6" /> Añadir Categoría
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.categories.map((cat: Category) => (
                                <div key={cat.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all font-black">
                                        {cat.name[0]}
                                    </div>
                                    <input
                                        value={cat.name}
                                        onChange={(e) => updateCategory(cat.id, e.target.value)}
                                        className="font-bold text-lg w-full bg-transparent border-none focus:ring-0"
                                    />
                                    <button
                                        onClick={() => deleteCategory(cat.id)}
                                        className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'config' && (
                    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 max-w-2xl space-y-8">
                        <div className="grid gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between pl-2">
                                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Nombre de la Tienda</label>
                                    <button
                                        onClick={() => {
                                            if (confirm("¿Desea volver al nombre estándar de Branding?")) {
                                                setData({ ...data, store: { ...data.store, name: BRANDING.name } });
                                            }
                                        }}
                                        className="text-[10px] text-primary hover:underline font-bold"
                                    >
                                        Rescatar del Branding
                                    </button>
                                </div>
                                <input
                                    value={data.store.name}
                                    onChange={(e) => setData({ ...data, store: { ...data.store, name: e.target.value } })}
                                    placeholder="Ingrese el nombre del restaurante aquí..."
                                    className="w-full bg-slate-50 border-2 border-primary/10 rounded-2xl p-5 font-bold text-xl text-primary focus:ring-4 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-2">WhatsApp (con código de país)</label>
                                <input
                                    value={data.store.whatsapp}
                                    onChange={(e) => setData({ ...data, store: { ...data.store, whatsapp: e.target.value } })}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-lg focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-2 flex items-center gap-2">
                                    <Clock className="w-3 h-3" /> Tiempo Medio de Entrega
                                </label>
                                <input
                                    value={data.store.deliveryTime || ''}
                                    onChange={(e) => setData({ ...data, store: { ...data.store, deliveryTime: e.target.value } })}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-lg focus:ring-2 focus:ring-primary/20"
                                    placeholder="Ej: 40-60 min"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-2 flex items-center justify-between">
                                    <span>URL del Logotipo</span>
                                    <label className="text-primary cursor-pointer hover:underline flex items-center gap-1 lowercase">
                                        <Upload className="w-3 h-3" />
                                        {uploading === 'logo' ? 'Enviando...' : 'Hacer Upload'}
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleImageUpload(file, 'logo', (url: string) => setData({ ...data, store: { ...data.store, logo: url } }));
                                            }}
                                        />
                                    </label>
                                </label>
                                <input
                                    value={data.store.logo}
                                    onChange={(e) => setData({ ...data, store: { ...data.store, logo: e.target.value } })}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-2">Dirección</label>
                                <textarea
                                    value={data.store.address}
                                    onChange={(e) => setData({ ...data, store: { ...data.store, address: e.target.value } })}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm min-h-[100px] focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="font-bold text-slate-900">Formas de Pago</h3>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-2">Clave de Pago (E-mail, RUT o Teléfono)</label>
                                    <input
                                        value={data.store.pixKey || ''}
                                        onChange={(e) => setData({ ...data, store: { ...data.store, pixKey: e.target.value } })}
                                        placeholder="Ej: 11999999999"
                                        className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-lg focus:ring-2 focus:ring-primary/20"
                                    />
                                    <p className="text-xs text-slate-400 pl-2">Deje en blanco si no desea aceptar transferencias directas</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-2 flex items-center justify-between">
                                        <span>QR Code de Pago (Opcional)</span>
                                        <label className="text-primary cursor-pointer hover:underline flex items-center gap-1 lowercase">
                                            <Upload className="w-3 h-3" />
                                            {uploading === 'qrcode' ? 'Enviando...' : 'Hacer Upload'}
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleImageUpload(file, 'qrcode', (url) => setData({ ...data, store: { ...data.store, pixQrCode: url } }));
                                                }}
                                            />
                                        </label>
                                    </label>
                                    {data.store.pixQrCode && (
                                        <div className="bg-slate-50 p-4 rounded-2xl flex justify-center mb-2 relative group">
                                            <img src={data.store.pixQrCode} alt="QR Code" className="w-32 h-32 object-contain" />
                                            <button
                                                onClick={() => setData({ ...data, store: { ...data.store, pixQrCode: "" } })}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.store.acceptsCard !== false}
                                            onChange={(e) => setData({ ...data, store: { ...data.store, acceptsCard: e.target.checked } })}
                                            className="w-5 h-5 text-primary rounded-lg border-slate-300 focus:ring-primary/20"
                                        />
                                        <span className="font-bold text-slate-700">Aceptar Tarjeta (Crédito/Débito)</span>
                                    </label>

                                    <label className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.store.acceptsCash !== false}
                                            onChange={(e) => setData({ ...data, store: { ...data.store, acceptsCash: e.target.checked } })}
                                            className="w-5 h-5 text-primary rounded-lg border-slate-300 focus:ring-primary/20"
                                        />
                                        <span className="font-bold text-slate-700">Aceptar Efectivo</span>
                                    </label>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-slate-900">Horario de Funcionamiento</h3>
                                        <Clock className="w-5 h-5 text-slate-400" />
                                    </div>

                                    <div className="grid gap-3">
                                        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                                            const labels: any = {
                                                monday: 'Lunes', tuesday: 'Martes', wednesday: 'Miércoles',
                                                thursday: 'Jueves', friday: 'Viernes', saturday: 'Sábado', sunday: 'Domingo'
                                            };
                                            const schedule = (data.store.openingHours && data.store.openingHours[day]) || (BRANDING as any).openingHours[day];
                                            return (
                                                <div key={day} className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                                                    <span className="w-20 font-bold text-xs uppercase text-slate-500">{labels[day]}</span>

                                                    {!schedule.closed ? (
                                                        <div className="flex items-center gap-2 flex-1">
                                                            <input
                                                                type="time"
                                                                value={schedule.open}
                                                                onChange={(e) => setData({
                                                                    ...data,
                                                                    store: {
                                                                        ...data.store,
                                                                        openingHours: {
                                                                            ...(data.store.openingHours || (BRANDING as any).openingHours),
                                                                            [day]: { ...schedule, open: e.target.value }
                                                                        }
                                                                    }
                                                                })}
                                                                className="bg-white border-none rounded-lg p-2 text-xs font-bold focus:ring-2 focus:ring-primary/20"
                                                            />
                                                            <span className="text-slate-300">hasta</span>
                                                            <input
                                                                type="time"
                                                                value={schedule.close}
                                                                onChange={(e) => setData({
                                                                    ...data,
                                                                    store: {
                                                                        ...data.store,
                                                                        openingHours: {
                                                                            ...(data.store.openingHours || (BRANDING as any).openingHours),
                                                                            [day]: { ...schedule, close: e.target.value }
                                                                        }
                                                                    }
                                                                })}
                                                                className="bg-white border-none rounded-lg p-2 text-xs font-bold focus:ring-2 focus:ring-primary/20"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span className="flex-1 text-center font-bold text-red-400 text-xs italic">CERRADO TODO EL DÍA</span>
                                                    )}

                                                    <button
                                                        onClick={() => setData({
                                                            ...data,
                                                            store: {
                                                                ...data.store,
                                                                openingHours: {
                                                                    ...(data.store.openingHours || (BRANDING as any).openingHours),
                                                                    [day]: { ...schedule, closed: !schedule.closed }
                                                                }
                                                            }
                                                        })}
                                                        className={cn(
                                                            "ml-auto text-[10px] font-black uppercase px-3 py-1 rounded-lg transition-all",
                                                            schedule.closed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                                        )}
                                                    >
                                                        {schedule.closed ? "Abrir" : "Cerrar"}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Tarifas de Entrega por Barrio */}
                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-slate-900">Tarifas de Entrega (Barrios)</h3>
                                        <MapPin className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div className="grid gap-2">
                                        {(data.store.deliveryFees || []).map((bairro: any, index: number) => (
                                            <div key={bairro.id} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl">
                                                <input
                                                    className="flex-1 bg-white border-none rounded-lg p-2 text-xs font-bold"
                                                    value={bairro.name}
                                                    onChange={(e) => {
                                                        const newFees = [...data.store.deliveryFees];
                                                        newFees[index].name = e.target.value;
                                                        setData({ ...data, store: { ...data.store, deliveryFees: newFees } });
                                                    }}
                                                />
                                                <div className="flex items-center bg-white rounded-lg px-2">
                                                    <span className="text-[10px] font-bold text-slate-400 mr-1">Gs.</span>
                                                    <input
                                                        type="number"
                                                        className="w-16 bg-white border-none rounded-lg p-2 text-xs font-bold text-right"
                                                        value={bairro.fee}
                                                        onChange={(e) => {
                                                            const newFees = [...data.store.deliveryFees];
                                                            newFees[index].fee = parseFloat(e.target.value) || 0;
                                                            setData({ ...data, store: { ...data.store, deliveryFees: newFees } });
                                                        }}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const newFees = data.store.deliveryFees.filter((_: any, i: number) => i !== index);
                                                        setData({ ...data, store: { ...data.store, deliveryFees: newFees } });
                                                    }}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => {
                                                const newBairro = { id: Math.random().toString(36).substr(2, 9), name: "Nuevo Barrio", fee: 0 };
                                                setData({ ...data, store: { ...data.store, deliveryFees: [...(data.store.deliveryFees || []), newBairro] } });
                                            }}
                                            className="text-xs font-bold text-primary flex items-center gap-1 p-2 hover:bg-primary/5 rounded-xl w-fit transition-all active:scale-95"
                                        >
                                            <Plus className="w-4 h-4" /> Añadir Barrio
                                        </button>
                                    </div>
                                </div>

                                {/* Link de Calificación */}
                                <div className="space-y-2 pt-4 border-t border-slate-100">
                                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-2 flex items-center gap-2">
                                        <ShoppingCart className="w-3 h-3" /> Enlace de Calificación (Google/Otro)
                                    </label>
                                    <input
                                        value={data.store.reviewLink || ''}
                                        onChange={(e) => setData({ ...data, store: { ...data.store, reviewLink: e.target.value } })}
                                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-medium focus:ring-2 focus:ring-primary/20"
                                        placeholder="https://g.page/su-tienda/review"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'banners' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            {/* Nuevo Banner */}
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center p-8 border-2 border-dashed border-primary/20 gap-4">
                                <div className="p-4 bg-primary/5 rounded-full">
                                    <Images className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-center">
                                    <h3 className="font-black text-slate-800">Añadir Nuevo Banner</h3>
                                    <p className="text-sm text-slate-400">Pegue la URL de la imagen o haga upload</p>
                                </div>
                                <div className="flex gap-2 w-full max-w-md">
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const val = (e.target as HTMLInputElement).value;
                                                if (val) setData((prev: any) => ({ ...prev, banners: [...(prev.banners || []), val] }));
                                                (e.target as HTMLInputElement).value = '';
                                            }
                                        }}
                                    />
                                    <label className="bg-primary text-white px-6 rounded-xl flex items-center justify-center font-bold cursor-pointer hover:bg-primary/90 transition-all text-sm uppercase">
                                        Subir Foto
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleImageUpload(file, 'banners', (url) => setData((prev: any) => ({ ...prev, banners: [...(prev.banners || []), url] })));
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Lista de Banners */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.banners?.map((banner: string, index: number) => (
                                    <div key={index} className="relative group rounded-2xl overflow-hidden shadow-md aspect-video bg-slate-100">
                                        <img src={banner} className="w-full h-full object-cover" alt="Banner" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => {
                                                    const newBanners = [...data.banners];
                                                    newBanners.splice(index, 1);
                                                    setData({ ...data, banners: newBanners });
                                                }}
                                                className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'pdv' && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-[3rem] text-white shadow-2xl">
                            <h3 className="text-3xl font-black uppercase tracking-tight mb-2">🛒 Punto de Venta (PDV)</h3>
                            <p className="text-blue-100 font-medium">Registrar ventas directas en mostrador o por teléfono</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Coluna Esquerda: Produtos */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Busca */}
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Buscar productos..."
                                        value={pdvSearch}
                                        onChange={(e) => setPdvSearch(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-sm text-lg font-bold focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        autoFocus
                                    />
                                </div>

                                {/* Grid de Produtos */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {data.products
                                        .filter((p: Product) => p.available && p.name.toLowerCase().includes(pdvSearch.toLowerCase()))
                                        .map((p: Product) => (
                                            <button
                                                key={p.id}
                                                onClick={() => addToPdvCart(p)}
                                                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-500/30 hover:-translate-y-1 transition-all text-left group flex flex-col h-full"
                                            >
                                                <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
                                                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name} />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                                                        <Plus className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all" />
                                                    </div>
                                                </div>
                                                <h4 className="font-bold text-slate-800 leading-tight mb-1 line-clamp-2">{p.name}</h4>
                                                <p className="text-blue-600 font-black mt-auto">Gs. {p.price.toLocaleString('es-PY')}</p>
                                            </button>
                                        ))}
                                </div>
                            </div>

                            {/* Coluna Direita: Carrinho */}
                            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col h-[calc(100vh-140px)] sticky top-6">
                                <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-[2.5rem]">
                                    <h3 className="font-black text-xl flex items-center gap-2 text-slate-800">
                                        <ShoppingCart className="w-5 h-5" /> Carrito
                                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{pdvCart.reduce((acc, item) => acc + item.quantity, 0)} items</span>
                                    </h3>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    {pdvCart.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4">
                                            <ShoppingCart className="w-16 h-16 opacity-20" />
                                            <p className="font-medium text-sm">Tu carrito está vacío</p>
                                        </div>
                                    ) : (
                                        pdvCart.map((item) => (
                                            <div key={item.id} className="flex gap-3 bg-slate-50 p-3 rounded-2xl group">
                                                <img src={item.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-sm text-slate-800 truncate pr-2">{item.name}</h4>
                                                        <p className="font-black text-xs text-slate-600 whitespace-nowrap">
                                                            Gs. {(item.price * item.quantity).toLocaleString('es-PY')}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex items-center bg-white rounded-lg border border-slate-200">
                                                            <button
                                                                onClick={() => updatePdvQuantity(item.id, -1)}
                                                                className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 text-slate-500 transition-colors"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updatePdvQuantity(item.id, 1)}
                                                                className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 text-slate-500 transition-colors"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <input
                                                            placeholder="Obs..."
                                                            value={item.observation}
                                                            onChange={(e) => {
                                                                setPdvCart(prev => prev.map(i => i.id === item.id ? { ...i, observation: e.target.value } : i));
                                                            }}
                                                            className="flex-1 bg-transparent text-[10px] border-b border-transparent focus:border-slate-300 outline-none px-1"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="p-6 bg-slate-50 border-t border-slate-100 rounded-b-[2.5rem] space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    placeholder="Nombre del Cliente (Opcional)"
                                                    value={pdvCustomerName}
                                                    onChange={(e) => setPdvCustomerName(e.target.value)}
                                                    className="w-full pl-9 pr-3 py-2 rounded-xl border-none text-xs font-bold focus:ring-2 focus:ring-blue-500/20"
                                                />
                                            </div>
                                            <div className="relative w-1/3">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    placeholder="Teléfono"
                                                    value={pdvCustomerPhone}
                                                    onChange={(e) => setPdvCustomerPhone(e.target.value)}
                                                    className="w-full pl-9 pr-3 py-2 rounded-xl border-none text-xs font-bold focus:ring-2 focus:ring-blue-500/20"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            {['Efectivo', 'Tarjeta', 'Transferencia'].map(method => (
                                                <button
                                                    key={method}
                                                    onClick={() => setPdvPaymentMethod(method)}
                                                    className={cn(
                                                        "py-2 rounded-xl text-[10px] font-black uppercase transition-all flex flex-col items-center gap-1",
                                                        pdvPaymentMethod === method
                                                            ? "bg-slate-800 text-white shadow-lg shadow-slate-800/20 scale-105"
                                                            : "bg-white text-slate-400 hover:bg-white hover:text-slate-600"
                                                    )}
                                                >
                                                    {method === 'Efectivo' && <Banknote className="w-4 h-4" />}
                                                    {method === 'Tarjeta' && <CreditCard className="w-4 h-4" />}
                                                    {method === 'Transferencia' && <Phone className="w-4 h-4" />}
                                                    {method}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between border-t border-slate-200 pt-4">
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase">Total a Pagar</p>
                                            <p className="text-3xl font-black text-slate-800">
                                                Gs. {pdvCart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString('es-PY')}
                                            </p>
                                        </div>
                                        <button
                                            onClick={finishPdvSale}
                                            disabled={pdvCart.length === 0}
                                            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-black uppercase tracking-wide shadow-lg shadow-green-500/30 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                                        >
                                            <Save className="w-5 h-5" /> Finalizar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
