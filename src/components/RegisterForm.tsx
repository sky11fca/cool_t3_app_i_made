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
      <main className="registration-form">
        <h2>Register</h2>
        <form method="POST">

          {message && <p style={{ color: "red" }}>{message}</p>}
          <div>
            <p>Username:</p>
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
            <p>Email:</p>
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
            <p>Password:</p>
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
            <p>Confirm Password:</p>
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
          <div className="registration-form-external">
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