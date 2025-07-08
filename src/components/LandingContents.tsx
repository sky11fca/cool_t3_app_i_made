import Link from "next/link";

export default function LandingContents() {
    return (
        <main>
            <div>
                <p>Pick your poison:</p>
                <div>
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                    <span> | </span>
                    <Link href="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </main>
    );
}