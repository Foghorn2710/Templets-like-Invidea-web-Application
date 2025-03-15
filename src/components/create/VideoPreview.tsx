
import { useState } from 'react';
import { Download, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Template } from './TemplateSelection';
import { toast } from "sonner";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const scenes = template?.content?.scenes || [
    { id: '1', imageUrl: template?.thumbnailUrl, duration: 5 }
  ];
  
  const totalDuration = scenes.reduce((total, scene) => total + (scene.duration || 5), 0);
  
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast.success("Video playback started");
    } else {
      toast.info("Video playback paused");
    }
  };
  
  const handleNextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
      setProgress(((currentScene + 1) / scenes.length) * 100);
    }
  };
  
  const handlePrevScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
      setProgress(((currentScene - 1) / scenes.length) * 100);
    }
  };
  
  const handleExport = () => {
    toast.success("Video export started", {
      description: "Your video will be ready to download shortly."
    });
    
    // Simulate export delay
    setTimeout(() => {
      toast.success("Video export completed!", {
        description: "Your video is ready to download."
      });
    }, 3000);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-medium mb-6">Preview Your Video</h2>
        
        <div className="space-y-6">
          <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg relative overflow-hidden">
            {selectedTemplate ? (
              <>
                <img 
                  src={scenes[currentScene]?.imageUrl || template?.thumbnailUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-white text-2xl md:text-4xl font-bold text-center px-6 drop-shadow-lg">
                    {scenes[currentScene]?.text || template?.title}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-500 dark:text-slate-400">Select a template first</p>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Scene {currentScene + 1} of {scenes.length}</span>
              <span>
                {Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}
              </span>
            </div>
            
            <Progress value={progress} className="h-2" />
            
            <div className="flex justify-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrevScene}
                disabled={currentScene === 0}
              >
                <SkipBack size={16} />
              </Button>
              
              <Button 
                size="icon"
                onClick={handlePlay}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNextScene}
                disabled={currentScene === scenes.length - 1}
              >
                <SkipForward size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back to Editing
          </Button>
          <Button onClick={handleExport}>
            <Download size={16} className="mr-2" />
            Export Video
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
