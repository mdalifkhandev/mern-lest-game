import { ProvidersProps } from '@/src/app/providers';
import UserProvider from '@/src/contex/user.provider';
import { HeroUIProvider } from '@heroui/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import React from 'react';

const queryclient=new QueryClient()

const Providers = ({children,themeProps}: ProvidersProps) => {

    const router=useRouter()
    return (
        <QueryClientProvider client={queryclient}>
            <UserProvider>
                <HeroUIProvider navigate={router.push} >   
                        {children}
                </HeroUIProvider>
            </UserProvider>
        </QueryClientProvider>
    );
};

export default Providers;