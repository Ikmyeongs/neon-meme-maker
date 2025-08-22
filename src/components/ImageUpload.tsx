import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

export const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("올바른 이미지 파일을 선택해주세요!");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("이미지가 너무 커요! 10MB 이하로 부탁드려요!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      onImageUpload(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("올바른 이미지 파일을 넣어주세요!");
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-4">
      <Card
        className="glass-morphism border-card-border border-dashed border-2 p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-gradient-primary/20">
              <ImageIcon className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-cyber font-bold text-foreground mb-2">
              Upload Your Image
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag & drop or click to select an image
            </p>
            <p className="text-sm text-muted-foreground">
              Supports: JPG, PNG, GIF (max 10MB)
            </p>
          </div>
        </div>
      </Card>

      <Button
        onClick={handleClick}
        className="w-full bg-gradient-secondary cyber-glow font-medium"
      >
        <Upload className="w-4 h-4 mr-2" />
        Choose Image File
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};