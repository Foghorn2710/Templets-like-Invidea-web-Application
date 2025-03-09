
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextToSpeech from '@/components/TextToSpeech';
import { Template } from './TemplateSelection';

interface ContentEditorProps {
  selectedTemplate: string | null;
  templates: Template[];
  onBack: () => void;
  onContinue: () => void;
}

const ContentEditor = ({ 
  selectedTemplate, 
  templates,
  onBack,
  onContinue
}: ContentEditorProps) => {
  const template = templates.find(t => t.id === selectedTemplate);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg aspect-video flex items-center justify-center mb-4">
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
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="video-title">Video Title</Label>
                <Input 
                  id="video-title" 
                  placeholder="Enter a title for your video"
                  defaultValue={template?.title || ''}
                  className="focus-ring"
                />
              </div>
              
              <div>
                <Label htmlFor="video-description">Description</Label>
                <Input 
                  id="video-description" 
                  placeholder="Enter a description for your video"
                  defaultValue={template?.description || ''}
                  className="focus-ring"
                />
              </div>
            </div>
          </div>
          
          <div>
            <TextToSpeech />
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back to Templates
          </Button>
          <Button onClick={onContinue}>
            Continue to Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentEditor;
