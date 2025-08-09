import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ToolSearchContainer } from '@/components/tool-search-container';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className={cn("container mx-auto px-4 py-8")}>
          <ToolSearchContainer />
        </div>
      </main>
      <Footer />
    </div>
  );
}
