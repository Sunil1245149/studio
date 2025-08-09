import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ToolSearchContainer } from '@/components/tool-search-container';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ToolSearchContainer />
      </main>
      <Footer />
    </div>
  );
}
