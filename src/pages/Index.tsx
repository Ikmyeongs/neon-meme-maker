import { useState } from "react";
import { MemeEditor } from "@/components/MemeEditor";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import heroBackground from "@/assets/y2k-hero-bg.jpg";
import lightBackground from "@/assets/y2k-light-bg.jpg";
import { useTheme } from "@/components/theme-provider";

const Index = () => {
  const { theme } = useTheme();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    setUploadedImage(null); // Clear uploaded image when template is selected
    toast("Template loaded! Ready to create your meme!");
  };

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setSelectedTemplate(null); // Clear template when image is uploaded
    toast("Image uploaded! Add your text to create a meme!");
  };

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const bgImage = isDark ? heroBackground : lightBackground;

  return (
    <div 
      className="min-h-screen bg-gradient-cyber relative"
      style={{
        backgroundImage: `linear-gradient(${isDark ? 'rgba(13, 13, 46, 0.8), rgba(13, 13, 46, 0.9)' : 'rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9)'}), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-cyber font-black mb-4 neon-text animate-glow-pulse">
            MEME CREATOR
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-cyber-drift">
            Create epic Y2K memes with electric style ⚡
          </p>
        </div>

        <div className="grid">
          <div className="lg:col-span-2">
            <MemeEditor 
              uploadedImage={uploadedImage}
              onImageUpload={handleImageUpload}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;