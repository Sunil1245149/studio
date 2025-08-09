import { ToolSearchContainer } from '@/components/tool-search-container';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className={cn("space-y-8")}>
      <ToolSearchContainer />
    </div>
  );
}
