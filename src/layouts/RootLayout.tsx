
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";
import axiosInstance from "@/lib/axios";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";


const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({
    children,
}: {
    children: React.ReactNode | any;
}) {
    const router = useRouter();
    return (

        <NextUIProvider navigate={router.push} className={`bg-gray-50 dark:bg-background min-h-screen antialiased ${inter.className}`}>
            <ThemeProvider attribute="class" defaultTheme="light">
                <SWRConfig
                    value={{
                        fetcher: (url: string) =>
                            axiosInstance.get(url).then((res: any) => {
                                return {
                                    ...res?.data,
                                    status: res?.status,
                                };
                            }
                            )
                    }}
                >
                    {children}
                </SWRConfig>
            </ThemeProvider>
        </NextUIProvider>



    );
}

