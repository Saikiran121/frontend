"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { cart, removeFromCart, addToCart, totalPrice, totalItems } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-white/10 shadow-2xl z-[101] flex flex-col"
                    >
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                                <h2 className="text-xl font-bold">Your Cart ({totalItems})</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <ShoppingBag className="w-12 h-12 mb-4" />
                                    <p>Your cart is empty.</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/5">
                                            <span className="text-[10px] font-bold opacity-30">AURA</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <h3 className="font-bold text-sm">{item.name}</h3>
                                                <p className="font-bold text-sm">${(typeof item.price === 'string' ? parseFloat((item.price as string).replace('$', '')) : item.price).toFixed(2)}</p>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3">Item ID: {item.id}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-white/5">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-1 hover:bg-white/5 rounded-md transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="px-3 text-xs font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => addToCart(item)}
                                                        className="p-1 hover:bg-white/5 rounded-md transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-white/20 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-6 bg-slate-900/50 backdrop-blur-xl border-t border-white/5 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Subtotal</span>
                                <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button disabled={cart.length === 0} className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-2xl transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]">
                                Checkout Now
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
