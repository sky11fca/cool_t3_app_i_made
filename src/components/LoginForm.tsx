import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";
import "../styles/registration.css"

export default function LoginForm() {
    
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
      username: "",
      password: "",
      general: ""
    });

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        if(formData.username === "") {
          setErrors({...errors, username: "Username is required", general: "Invalid credentials"});
          return;
        }

        if(formData.password === "") {
          setErrors({...errors, password: "Password is required", general: "Invalid credentials"});
          return;
        }
        else if(formData.password.length<6){
          setErrors({...errors, password: "Password must be at least 6 characters", general: "Invalid credentials"});
          return;
        }



        const result = await signIn("credentials", {
          username: formData.username,
          password: formData.password,
            redirect: false,
        });

        if (!result) {
          setErrors({...errors, general: "login failed"});
        }
        

        void router.push("/");
      } catch (error) {
        setErrors({...errors, general: "UNKNOWN ERROR"});
          if (error instanceof Error) {
            setErrors({...errors, general: "Login failed"});
          }
      }
    };

    return (
      <main className="registration-form">
        <h2>Login</h2>
        <form method="POST">
          {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
          <div className="registration-form-username">
            <div>
              <p>Username:{errors.username ? "*"+ errors.username  : null}</p>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div>
            <p>Password:{errors.password ? "*" + errors.password : null}</p>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
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
          <div className="registration-form-external">
            <p>
              No account? <Link href="/register">Register</Link>
            </p>
          </div>
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </main>
    );
}