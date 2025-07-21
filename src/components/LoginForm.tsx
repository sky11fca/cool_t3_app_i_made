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

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const result = await signIn("credentials", {
          username: formData.username,
          password: formData.password,
            redirect: false,
        });

        if (result == null) {
          setMessage("invalid credentials");
        } else {
          void router.push("/");
        }
      } catch (error) {
          setError("An error occurred during login. Please try again.");
          if (error instanceof Error) {
            setError(`Login failed: ${error.message}`);
          }
      }
    };

    return (
      <main className="registration-form">
        <h2>Login</h2>
        <form method="POST">
          <div>
            {message && <p style={{ color: "red" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div className="registration-form-username">
            <p>Username:</p>
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
            <p>Password:</p>
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