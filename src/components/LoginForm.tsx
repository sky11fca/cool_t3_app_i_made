import Link from "next/link";

export default function LoginForm() {
    return (
        <main>
            <form action="https://www.youtube.com/watch?v=jApPYNjl_dk&pp=ygUabXVyZGVyIGRyb25lcyBzb25nIGJpdGUgbWU%3D" method="POST">
            <h2>Login</h2>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <div>
                <p>
                    No account? <Link href="/register">Register</Link>
                </p>
            </div>
            <button type="submit">Login</button>
        </form>
        </main>
        
    );
}