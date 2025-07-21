"use client"

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
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
  
        if(formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        
        signupMutation.mutate({
            username: formData.username,
            email: formData.email,
            password: formData.password,
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
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>
          <div>
            <p>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
          <button type="submit" onClick={handleSubmit}>
            Register
          </button>
        </form>
      </main>
    );
}