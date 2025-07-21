import Link from "next/link";
import { useSession, signOut} from "next-auth/react";
import "../styles/navbar.css"

export default function Navbar() {
  console.log(process.env.NODE_ENV);
  const{data: session} = useSession();

  const handleLogout = async () => {
    await signOut();
  }

  return(
    <div>
    {session ? (
      <div className="navbar">
        <div className="navbar-left-side">
          <Link href="/">{session.user.name}</Link>
        </div>
        <div className="navbar-right-side">
          <Link href="/" onClick={handleLogout}>Logout</Link>
        </div>
      </div>
      ):
      (
        <div className="navbar">
          <div className="navbar-left-side">
            <Link href="/">GUEST</Link>
          </div>
          <div className="navbar-right-side">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        </div>
      )}
    </div>
  )
}