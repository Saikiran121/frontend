"use client";

import React, { useState } from "react";
import { ShoppingCart, User, Menu, Search } from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CartDrawer } from "@/components/CartDrawer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>
                <LayoutContent>{children}</LayoutContent>
            </CartProvider>
        </AuthProvider>
    );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalItems } = useCart();
    const { user, isLoggedIn, logout } = useAuth();

    return (
        <>
            {/* Background Effects */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            {/* Global Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        <a href="/" className="text-2xl font-bold tracking-tighter text-gradient">
                            AURA
                        </a>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
                            <a href="http://localhost:8761" target="_blank" className="hover:text-cyan-400 transition-colors">Registry</a>
                            <a href="http://localhost:8085/api/products" target="_blank" className="hover:text-cyan-400 transition-colors">Products API</a>
                            <a href="http://localhost:8085/api/orders" target="_blank" className="hover:text-cyan-400 transition-colors">Orders API</a>
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden sm:flex items-center bg-slate-900/50 border border-white/5 rounded-full px-3 py-1.5 gap-2">
                            <Search className="w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search assets..."
                                className="bg-transparent border-none text-xs focus:ring-0 outline-none w-32 lg:w-48 placeholder:text-slate-600"
                            />
                        </div>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="p-2 text-slate-400 hover:text-white transition-colors relative"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-0.5 bg-cyan-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {isLoggedIn ? (
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs hover:bg-white/10 transition-all font-bold"
                            >
                                <User className="w-4 h-4 text-cyan-400" />
                                <span className="hidden lg:block truncate max-w-[80px]">{user?.username}</span>
                            </button>
                        ) : (
                            <a href="/auth" className="p-2 text-slate-400 hover:text-white transition-colors">
                                <User className="w-5 h-5" />
                            </a>
                        )}

                        <button className="md:hidden p-2 text-slate-400 hover:text-white transition-colors">
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative">{children}</main>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <footer className="border-t border-white/5 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm text-slate-500">© 2026 Aura Technologies. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}
