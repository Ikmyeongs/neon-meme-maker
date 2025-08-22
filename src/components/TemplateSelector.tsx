import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Template {
  id: string;
  name: string;
  url: string;
  popular: boolean;
}

const templates: Template[] = [
  {
    id: "drake",
    name: "Drake Pointing",
    url: "https://imgflip.com/s/meme/Drake-Pointing.jpg",
    popular: true
  },
  {
    id: "distracted-bf",
    name: "Distracted Boyfriend",
    url: "https://imgflip.com/s/meme/Distracted-Boyfriend.jpg",
    popular: true
  },
  {
    id: "change-my-mind",
    name: "Change My Mind",
    url: "https://imgflip.com/s/meme/Change-My-Mind.jpg",
    popular: false
  },
  {
    id: "expanding-brain",
    name: "Expanding Brain",
    url: "https://imgflip.com/s/meme/Expanding-Brain.jpg",
    popular: true
  },
  {
    id: "woman-yelling",
    name: "Woman Yelling at Cat",
    url: "https://imgflip.com/s/meme/Woman-Yelling-At-Cat.jpg",
    popular: true
  },
  {
    id: "success-kid",
    name: "Success Kid",
    url: "https://imgflip.com/s/meme/Success-Kid.jpg",
    popular: false
  }
];

interface TemplateSelectorProps {
  onTemplateSelect: (templateUrl: string) => void;
  selectedTemplate: string | null;
}

export const TemplateSelector = ({ onTemplateSelect, selectedTemplate }: TemplateSelectorProps) => {
  return (
    <Card className="glass-morphism border-card-border cyber-glow p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-cyber font-bold text-foreground">
            Quick Templates
          </h2>
          <Badge 
            variant="secondary" 
            className="bg-gradient-secondary text-secondary-foreground animate-neon-flicker"
          >
            Popular
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {templates.map((template) => (
            <Button
              key={template.id}
              variant="outline"
              className={`h-auto p-3 justify-start text-left border transition-all duration-300 ${
                selectedTemplate === template.url
                  ? "border-primary bg-primary/10 shadow-glow-primary"
                  : "border-card-border glass-morphism hover:border-primary/50 hover:bg-card/50"
              }`}
              onClick={() => onTemplateSelect(template.url)}
            >
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="font-medium text-foreground">
                    {template.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Classic meme format
                  </div>
                </div>
                {template.popular && (
                  <Badge 
                    variant="outline" 
                    className="ml-2 border-accent text-accent animate-glow-pulse"
                  >
                    🔥
                  </Badge>
                )}
              </div>
            </Button>
          ))}
        </div>

        <div className="pt-4 border-t border-card-border">
          <p className="text-sm text-muted-foreground text-center">
            Or upload your own image in the editor →
          </p>
        </div>
      </div>
    </Card>
  );
};