import { useState } from "react";
import { MemeEditor } from "@/components/MemeEditor";
import { TemplateSelector } from "@/components/TemplateSelector";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import heroBackground from "@/assets/y2k-hero-bg.jpg";

const Index = () => {
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

  return (
    <div 
      className="min-h-screen bg-gradient-cyber relative"
      style={{
        backgroundImage: `linear-gradient(rgba(13, 13, 46, 0.8), rgba(13, 13, 46, 0.9)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-cyber font-black mb-4 neon-text animate-glow-pulse">
            MEME FUSION
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-cyber-drift">
            Create epic Y2K memes with electric style ⚡
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Template Selector */}
          <div className="lg:col-span-1">
            <TemplateSelector 
              onTemplateSelect={handleTemplateSelect}
              selectedTemplate={selectedTemplate}
            />
          </div>

          {/* Meme Editor */}
          <div className="lg:col-span-2">
            <MemeEditor 
              templateUrl={selectedTemplate}
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