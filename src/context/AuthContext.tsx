"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string) => void;
    signup: (username: string, email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Persistence (mock)
    useEffect(() => {
        const savedUser = localStorage.getItem("aura_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (email: string) => {
        // In a real app, verify with backend
        const mockUser = { username: email.split('@')[0], email };
        setUser(mockUser);
        localStorage.setItem("aura_user", JSON.stringify(mockUser));
    };

    const signup = (username: string, email: string) => {
        const newUser = { username, email };
        setUser(newUser);
        localStorage.setItem("aura_user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("aura_user");
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
