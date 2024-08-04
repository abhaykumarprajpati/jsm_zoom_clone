import StreamVideoProvider from '@/providers/StreamClientProviders'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'


export const metadata: Metadata = {
    title: "YOOM",
    description: "Video Calling App",
    icons:{
      icon:'/icons/logo.svg'
    }
  };

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            {/* Navbar */}
            <StreamVideoProvider>
                {children}
            </StreamVideoProvider>

            {/* Footer */}
        </main>
    )
}

export default RootLayout
