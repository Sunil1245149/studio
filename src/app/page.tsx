import { ToolSearchContainer } from '@/components/tool-search-container';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main className={cn("flex-grow container mx-auto px-4 py-8")}>
      <ToolSearchContainer />
    </main>
  );
}
