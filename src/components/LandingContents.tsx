export default function LandingContents() {
    return (
        <main>
            <div>
                <p>Pick your poison:</p>
                <div>
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                    <span> | </span>
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register
                    </a>
                </div>
            </div>
        </main>
    );
}