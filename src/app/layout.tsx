import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/language-context';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Hammer } from 'lucide-react';
import { LanguageSelector } from '@/components/language-selector';
import { ThemeToggle } from '@/components/theme-toggle';
import { AppSidebar } from '@/components/app-sidebar';
import { Footer } from '@/components/footer';


export const metadata: Metadata = {
  title: 'Tools Hub Express',
  description: 'Over 200+ tools to make your life easier.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={cn('font-body antialiased')}>
        <LanguageProvider>
          <SidebarProvider>
            <Sidebar>
              <SidebarContent className="p-2">
                <div className="flex h-12 items-center px-2">
                  <Link href="/" className="flex items-center gap-2">
                    <Hammer className="size-6 text-sidebar-primary" />
                    <span className="text-lg font-semibold">Tools Hub</span>
                  </Link>
                </div>
                <AppSidebar />
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div className="flex flex-col min-h-screen">
                <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                  <SidebarTrigger className="sm:hidden" />
                  <div className="ml-auto flex items-center gap-2">
                    <LanguageSelector />
                    <ThemeToggle />
                  </div>
                </header>
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
