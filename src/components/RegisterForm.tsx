"use client"

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/trpc/react";
import "../styles/registration.css"

export default function RegisterForm() {
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const [errors, setErrors] = useState({
      general: "",
      username: "",
      email: "",
      password: "",
    })

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const signupMutation = api.signup.register.useMutation({
        onSuccess: (data) => {
            void router.push("/");
        },
        onError: (error) => {
            setErrors({...errors, general: error.message});
        },
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(formData.username === "") {
          setErrors({...errors, username: "Username is required", general: "Invalid credentials"});
          return;
        }

        if(formData.email === "") {
          setErrors({...errors, email: "Email is required", general: "Invalid credentials"});
          return;
        }

        if(formData.password === "") {
          setErrors({...errors, password: "Password is required", general: "Invalid credentials"});
          return;
        }
        else if(formData.password !== formData.confirmPassword) {
          setErrors({...errors, password: "Passwords do not match", general: "Invalid credentials"});
          return
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

          {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
          <div>
            <p>Username: {errors.username ? "*" + errors.username : null}</p>
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
            <p>Email: {errors.email ? "*" + errors.email : null}</p>
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
            <p>Password: {errors.password ? "*" + errors.password : null}</p>
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