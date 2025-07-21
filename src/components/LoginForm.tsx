import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    })

  const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Handle login logic here

      console.log("Username:", formData.username);
      console.log("Password:", formData.password);

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
      <main>
        <form method="POST">
          <h2>Login</h2>
          <div>
            {message && <p style={{ color: "red" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div>
            <label htmlFor="username">Username:</label>
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
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div>
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