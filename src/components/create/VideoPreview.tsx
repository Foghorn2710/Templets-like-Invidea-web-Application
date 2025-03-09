
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Template } from './TemplateSelection';

interface VideoPreviewProps {
  selectedTemplate: string | null;
  templates: Template[];
  onBack: () => void;
}

const VideoPreview = ({ 
  selectedTemplate, 
  templates,
  onBack 
}: VideoPreviewProps) => {
  const template = templates.find(t => t.id === selectedTemplate);

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-medium mb-6">Preview Your Video</h2>
        
        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-6">
          {selectedTemplate ? (
            <img 
              src={template?.thumbnailUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-slate-500 dark:text-slate-400">Select a template first</p>
          )}
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back to Editing
          </Button>
          <Button>
            <Download size={16} className="mr-2" />
            Export Video
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
