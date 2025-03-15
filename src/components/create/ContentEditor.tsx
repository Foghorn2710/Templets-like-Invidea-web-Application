
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from 'lucide-react';
import TextToSpeech from '@/components/TextToSpeech';
import { Template } from './TemplateSelection';
import { toast } from "sonner";

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
  const [title, setTitle] = useState(template?.content?.title || template?.title || '');
  const [description, setDescription] = useState(template?.content?.description || template?.description || '');
  const [scenes, setScenes] = useState(
    template?.content?.scenes || [{ id: '1', text: '', imageUrl: template?.thumbnailUrl, duration: 5 }]
  );

  const addScene = () => {
    setScenes([...scenes, { 
      id: Date.now().toString(), 
      text: '', 
      imageUrl: template?.thumbnailUrl,
      duration: 5 
    }]);
    toast.success("New scene added");
  };

  const removeScene = (id: string) => {
    if (scenes.length <= 1) {
      toast.error("You need at least one scene");
      return;
    }
    setScenes(scenes.filter(scene => scene.id !== id));
    toast.success("Scene removed");
  };

  const updateSceneText = (id: string, text: string) => {
    setScenes(scenes.map(scene => 
      scene.id === id ? { ...scene, text } : scene
    ));
  };

  const updateSceneDuration = (id: string, duration: number) => {
    setScenes(scenes.map(scene => 
      scene.id === id ? { ...scene, duration } : scene
    ));
  };

  const saveChanges = () => {
    toast.success("Changes saved successfully");
    onContinue();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="focus-ring"
                />
              </div>
              
              <div>
                <Label htmlFor="video-description">Description</Label>
                <Textarea 
                  id="video-description" 
                  placeholder="Enter a description for your video"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="focus-ring min-h-[80px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Scenes</h3>
                <Button size="sm" onClick={addScene}>
                  <Plus size={16} className="mr-2" />
                  Add Scene
                </Button>
              </div>
              
              {scenes.map((scene, index) => (
                <div key={scene.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Scene {index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeScene(scene.id)}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </div>
                  
                  <div>
                    <Label htmlFor={`scene-text-${scene.id}`}>Scene Text</Label>
                    <Textarea 
                      id={`scene-text-${scene.id}`}
                      placeholder="Enter text for this scene"
                      value={scene.text || ''}
                      onChange={(e) => updateSceneText(scene.id, e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`scene-duration-${scene.id}`}>Duration (seconds)</Label>
                    <Input 
                      id={`scene-duration-${scene.id}`}
                      type="number"
                      min="1"
                      max="60"
                      value={scene.duration || 5}
                      onChange={(e) => updateSceneDuration(scene.id, parseInt(e.target.value, 10))}
                    />
                  </div>
                </div>
              ))}
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
          <Button onClick={saveChanges}>
            Save & Continue to Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentEditor;
