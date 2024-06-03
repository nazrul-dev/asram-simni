import React, { ReactNode } from 'react';
import RootLayout from './RootLayout';
import { useSession } from 'next-auth/react';
import NavHeader from '@/components/navbar';


const ProtectedLayout = ({ children }: { children: ReactNode }) => {
     const { data: session, status } = useSession()
    console.log(session)
    return (
        <RootLayout>
            <NavHeader  user={session?.user || {}}/>
            <main className='bg-gray-200 min-h-screen '>
               <div className='max-w-screen-xl mx-auto p-5'>
               {children}
               </div>
            </main>
        </RootLayout>
    )
};

export default ProtectedLayout;
