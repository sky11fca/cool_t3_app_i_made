"use client"

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const signupMutation = api.signup.register.useMutation({
        onSuccess: (data) => {
            setMessage(data.message);
            if (data.success) {
                void router.push("/login");
            }
        },
        onError: (error) => {
            setMessage(error.message);
        },
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setMessage("");
  
        if(password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        
        signupMutation.mutate({
            username,
            email,
            password,
        });
    };
    
    
    
    return (
        <main>
            <form method="POST">
            <h2>Register</h2>
            {message && <p style={{ color: "red" }}>{message}</p>}
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                type="text" 
                id="username" 
                name="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                 />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                type="password" 
                id="password" 
                name="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                 />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                 />
            </div>
            <div>
                <p>
                    Already have an account? <Link href="/login">Login</Link>
                </p>
            </div>
            <button 
            type="submit"
            onClick={handleSubmit}
            >Register</button>
        </form>
        </main>
    );
}