import 'next/app'
import {SessionProvider} from "next-auth/react";
import type {AppType} from "next/app";
import type {Session} from "next-auth";
import {TRPCReactProvider} from "~/trpc/react";
import Head from "next/head";

const MyApp: AppType<{session: Session | null}> = ({
    Component,
    pageProps: {session, ...pageProps},
}) => {
    return(
        <>
            <Head>
                <title>Autism Corner</title>
            </Head>

            <SessionProvider session={session}>
                <TRPCReactProvider>
                    <Component {...pageProps}/>
                </TRPCReactProvider>
            </SessionProvider>
        </>
    );
};

export default MyApp;