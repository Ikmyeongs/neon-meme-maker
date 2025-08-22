import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricText, FabricImage } from "fabric";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ImageUpload";
import { Download, Type, Palette } from "lucide-react";
import { toast } from "sonner";

interface MemeEditorProps {
  templateUrl: string | null;
  uploadedImage: string | null;
  onImageUpload: (imageUrl: string) => void;
}

export const MemeEditor = ({ templateUrl, uploadedImage, onImageUpload }: MemeEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(40);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: "#1a1a2e",
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    const imageUrl = uploadedImage || templateUrl;
    if (!imageUrl) return;

    // Clear canvas
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#1a1a2e";

    // Load image
    FabricImage.fromURL(imageUrl, {
      crossOrigin: 'anonymous'
    }).then((img) => {
      if (!fabricCanvas) return;

      // Scale image to fit canvas
      const canvasWidth = fabricCanvas.width!;
      const canvasHeight = fabricCanvas.height!;
      const imageWidth = img.width!;
      const imageHeight = img.height!;

      const scale = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight);
      
      img.set({
        scaleX: scale,
        scaleY: scale,
        left: (canvasWidth - imageWidth * scale) / 2,
        top: (canvasHeight - imageHeight * scale) / 2,
        selectable: false
      });

      fabricCanvas.add(img);
      fabricCanvas.renderAll();

      toast("Image loaded! Add text to create your meme!");
    }).catch((error) => {
      console.error("Error loading image:", error);
      toast.error("Failed to load image. Try a different one!");
    });
  }, [fabricCanvas, templateUrl, uploadedImage]);

  const addText = (text: string, position: 'top' | 'bottom') => {
    if (!fabricCanvas || !text.trim()) return;

    // Remove existing text at this position
    const existingTexts = fabricCanvas.getObjects('text') as FabricText[];
    existingTexts.forEach(textObj => {
      if ((textObj as any).memePosition === position) {
        fabricCanvas.remove(textObj);
      }
    });

    const canvasHeight = fabricCanvas.height!;
    const yPosition = position === 'top' ? fontSize : canvasHeight - fontSize;

    const textObj = new FabricText(text.toUpperCase(), {
      left: fabricCanvas.width! / 2,
      top: yPosition,
      fontFamily: 'Impact, Arial Black, sans-serif',
      fontSize: fontSize,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2,
      textAlign: 'center',
      originX: 'center',
      originY: position === 'top' ? 'top' : 'bottom',
      fontWeight: 900
    });

    // Store position data on the object
    (textObj as any).memePosition = position;

    fabricCanvas.add(textObj);
    fabricCanvas.renderAll();
  };

  useEffect(() => {
    addText(topText, 'top');
  }, [topText, fontSize, fabricCanvas]);

  useEffect(() => {
    addText(bottomText, 'bottom');
  }, [bottomText, fontSize, fabricCanvas]);

  const downloadMeme = () => {
    if (!fabricCanvas) return;

    try {
      const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2
      });

      const link = document.createElement('a');
      link.download = `meme-${Date.now()}.png`;
      link.href = dataURL;
      link.click();

      toast("Meme downloaded! Share it with the world! 🔥");
    } catch (error) {
      console.error("Error downloading meme:", error);
      toast.error("Failed to download meme. Try again!");
    }
  };

  const currentImage = uploadedImage || templateUrl;

  return (
    <div className="space-y-6">
      {/* Canvas */}
      <Card className="glass-morphism border-card-border cyber-glow p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-cyber font-bold text-foreground">
              Meme Editor
            </h2>
            <Button
              onClick={downloadMeme}
              disabled={!currentImage}
              className="bg-gradient-primary cyber-glow font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PNG
            </Button>
          </div>

          <div className="flex justify-center">
            <div className="relative rounded-lg overflow-hidden border-2 border-card-border shadow-glow-primary">
              <canvas 
                ref={canvasRef} 
                className="max-w-full h-auto"
              />
            </div>
          </div>

          {!currentImage && (
            <div className="text-center py-8">
              <ImageUpload onImageUpload={onImageUpload} />
            </div>
          )}
        </div>
      </Card>

      {/* Text Controls */}
      <Card className="glass-morphism border-card-border p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-cyber font-bold text-foreground">
              Text Controls
            </h3>
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="topText" className="text-foreground font-medium">
                Top Text
              </Label>
              <Input
                id="topText"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                placeholder="Enter top text..."
                className="bg-input border-input-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Label htmlFor="bottomText" className="text-foreground font-medium">
                Bottom Text
              </Label>
              <Input
                id="bottomText"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                placeholder="Enter bottom text..."
                className="bg-input border-input-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Label htmlFor="fontSize" className="text-foreground font-medium">
                Font Size: {fontSize}px
              </Label>
              <Input
                id="fontSize"
                type="range"
                min="20"
                max="80"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};