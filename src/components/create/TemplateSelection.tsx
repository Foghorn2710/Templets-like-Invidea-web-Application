
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VideoTemplate from '@/components/VideoTemplate';
import { toast } from "sonner";
import { useState } from "react";

// Template data type
export interface Template {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  duration: string;
  isNew?: boolean;
  isPremium?: boolean;
  content?: {
    title?: string;
    description?: string;
    scenes?: Array<{
      id: string;
      text?: string;
      imageUrl?: string;
      duration?: number;
    }>;
  };
}

interface TemplateSelectionProps {
  templates: Template[];
  selectedTemplate: string | null;
  setSelectedTemplate: (id: string) => void;
  onContinue: () => void;
}

const TemplateSelection = ({ 
  templates, 
  selectedTemplate, 
  setSelectedTemplate,
  onContinue
}: TemplateSelectionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
    const selectedTemplateName = templates.find(t => t.id === id)?.title;
    
    toast.success(`Template Selected: ${selectedTemplateName}`, {
      duration: 5000,
      position: "top-center",
      closeButton: true,
    });
  };

  const handleAiSuggest = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Simulate AI suggesting a random template
      const randomIndex = Math.floor(Math.random() * templates.length);
      const suggestedTemplate = templates[randomIndex];
      
      setSelectedTemplate(suggestedTemplate.id);
      
      toast.success(`AI suggested: ${suggestedTemplate.title}`, {
        duration: 5000,
        position: "top-center",
        closeButton: true,
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      onContinue();
    } else {
      toast.error("Please select a template first", {
        duration: 5000,
        position: "top-center",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">Choose a Template</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9"
            onClick={handleAiSuggest}
            disabled={isLoading}
          >
            <Sparkles size={16} className={`mr-2 ${isLoading ? 'animate-pulse' : ''}`} />
            {isLoading ? 'Thinking...' : 'AI Suggest'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <VideoTemplate
              key={template.id}
              {...template}
              index={index}
              onClick={() => handleSelectTemplate(template.id)}
              isSelected={template.id === selectedTemplate}
            />
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleContinue} 
            disabled={!selectedTemplate}
          >
            Continue to Editing
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelection;
