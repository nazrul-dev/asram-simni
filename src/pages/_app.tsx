

import type { AppProps as NextAppProps } from 'next/app'
import "@/styles/globals.css";
import ErrorBoundary from './_error';
import React from 'react'
import { SessionProvider } from 'next-auth/react';
import { NextComponentType } from 'next';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import 'dayjs/locale/id';
import dayjs from 'dayjs';
dayjs.locale('id');
type GetLayout = (page: React.ReactNode) => React.ReactNode;

type ComponentProp = NextComponentType & {
    getLayout?: GetLayout;
};

type AppProps = NextAppProps & { Component: ComponentProp };
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const getLayout =
        Component.getLayout || ((page) => <ProtectedLayout>{page}</ProtectedLayout>)
    return (
        <ErrorBoundary>
            <React.StrictMode>
                <SessionProvider session={session}>

                    {getLayout(<Component {...pageProps} />)}
                </SessionProvider>
            </React.StrictMode>
        </ErrorBoundary>
    );
}

export default MyApp;

