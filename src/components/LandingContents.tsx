import Link from "next/link";
import {api} from "~/trpc/react";
import {useSession} from "next-auth/react";

export default function LandingContents() {

  const {data: offlineLinks} = api.getLinks.getOfflineUserLinks.useQuery();
  const {data: onlineLinks} = api.getLinks.getOnlineUserLinks.useQuery();
  const {data: session} = useSession();


  return (
    <main>
      <div>
        <p>Pick your poison:</p>
        <div>
          <p>RANDOM CONTENT</p>
          <ul>
            {offlineLinks?.map((link) => (
              link.url ? (
              <li key={link.id}>
                <Link href={link.url}>{link.name}</Link>
              </li>
              ) : null
            ))}
          </ul>
          <p>RANDOM CONTENT DELUXE</p>
          {session ? (
            <ul>
              {onlineLinks?.map((link) => (
                link.url ? (
                <li key={link.id}>
                  <Link href={link.url}>{link.name}</Link>
                </li>
                ) : null
              ))}
            </ul>
          ) : (
            <div>
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
              <span> | </span>
              <Link href="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}