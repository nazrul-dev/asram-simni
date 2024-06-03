import React, { ReactNode } from 'react';
import RootLayout from './RootLayout';


const GuestLayout = ({ children }:{children: ReactNode}) => (
  <RootLayout>
   
    <main className='max-w-screen-sm p-10 mx-auto'>{children}</main>

  </RootLayout>
);

export default GuestLayout;
