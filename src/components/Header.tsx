import { Button } from "@/components/ui/button";
import { Github, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <header className="border-b border-card-border glass-morphism sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary cyber-glow">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-cyber font-bold text-foreground">
                MemeFusion
              </h1>
              <p className="text-sm text-muted-foreground">
                Y2K Meme Generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="glass-morphism border-card-border hover:bg-card/50"
              asChild
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};