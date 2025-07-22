import Link from "next/link";
import {api} from "~/trpc/react";
import {useSession} from "next-auth/react";

export default function LandingContents() {

  const {data: offlineLinks} = api.getLinks.getOfflineUserLinks.useQuery();
  const {data: onlineLinks} = api.getLinks.getOnlineUserLinks.useQuery();
  const {data: session} = useSession();


  return (
    <main>
      <div className="landing-content">
        <div className="landing-content-offline">
          <p>RANDOM CONTENT</p>
          <ul className="landing-content-links-offline">
            {offlineLinks?.map((link) => (
              link.url ? (
                <li key={link.id}>
                  <Link href={link.url}>{link.name}</Link>
                </li>
              ) : null
            ))}
          </ul>
        </div>
        <div className="landing-content-online">
          <p>RANDOM CONTENT DELUXE</p>
          {session ? (
            <ul className="landing-content-links-online">
              {onlineLinks?.map((link) => (
                link.url ? (
                  <li key={link.id}>
                    <Link href={link.url}>{link.name}</Link>
                  </li>
                ) : null
              ))}
            </ul>
          ) : (
            <div className="landing-content-prompt">
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
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