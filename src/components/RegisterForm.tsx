import Link from "next/link";

export default function RegisterForm() {
    return (
        <main>
            <form action="/login" method="POST">
            <h2>Register</h2>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required />
            </div>
            <div>
                <p>
                    Already have an account? <Link href="/login">Login</Link>
                </p>
            </div>
            <button type="submit">Register</button>
        </form>
        </main>
    );
}