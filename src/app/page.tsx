import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ToolSearchContainer } from '@/components/tool-search-container';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className={cn("flex flex-col min-h-screen text-foreground", "animated-background")}>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ToolSearchContainer />
      </main>
      <Footer />
    </div>
  );
}
