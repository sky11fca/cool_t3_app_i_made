import Link from "next/link";
import { useSession, signOut} from "next-auth/react";

export default function Navbar() {
  console.log(process.env.NODE_ENV);
  const{data: session} = useSession();

  const handleLogout = async () => {
    await signOut();
  }

  return(
    <div>
    {session ? (
      <div>
        <Link href="/">{session.user.name}</Link>
        <span> | </span>
        <Link href="/" onClick={handleLogout}>Logout</Link>
      </div>
      ):
      (
        <div>
          <Link href="/">GUEST</Link>
          <span> | </span>
          <Link href="/login">Login</Link>
          <span> | </span>
          <Link href="/register">Register</Link>
        </div>
      )}
    </div>
  )
}