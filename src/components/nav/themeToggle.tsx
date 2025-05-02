import { useTheme } from '@/providers/themeProvider';
import { MoonIcon, SunIcon } from 'lucide-react';

import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from '@/components/ui/tooltip';
import { Button } from '../ui/button';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      className="bg-background h-8 w-8 rounded-full"
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-transform duration-500 ease-in-out dark:scale-100 dark:rotate-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 transition-transform duration-500 ease-in-out dark:scale-0 dark:-rotate-90" />
      <span className="sr-only">Switch Theme</span>
    </Button>
  );
}
