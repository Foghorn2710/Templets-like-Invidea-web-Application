
import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Save, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import VideoTemplate from '@/components/VideoTemplate';
import TextToSpeech from '@/components/TextToSpeech';

// Sample template data
const templates = [
  {
    id: 'template-1',
    title: 'Modern Business Presentation',
    description: 'Professional slides with clean animations and modern typography',
    thumbnailUrl: 'https://images.unsplash.com/photo-1664574654529-b60630f33fdb?q=80&w=1200&auto=format&fit=crop',
    category: 'Business',
    duration: '2:30',
    isNew: true
  },
  {
    id: 'template-2',
    title: 'Product Showcase',
    description: 'Highlight your product features with elegant transitions',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop',
    category: 'Marketing',
    duration: '1:45',
    isPremium: true
  },
  {
    id: 'template-3',
    title: 'Social Media Story',
    description: 'Vertical template optimized for Instagram and TikTok',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop',
    category: 'Social Media',
    duration: '0:30'
  },
  {
    id: 'template-4',
    title: 'Corporate Explainer',
    description: 'Clear and concise visual explanations for complex topics',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1200&auto=format&fit=crop',
    category: 'Business',
    duration: '3:15',
    isPremium: true
  },
  {
    id: 'template-5',
    title: 'Travel Vlog',
    description: 'Dynamic transitions and text animations for travel content',
    thumbnailUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200&auto=format&fit=crop',
    category: 'Travel',
    duration: '2:15'
  },
  {
    id: 'template-6',
    title: 'Minimalist Slideshow',
    description: 'Clean and simple slideshow with elegant typography',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop',
    category: 'Photography',
    duration: '1:30',
    isNew: true
  }
];

const Create = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState('Untitled Project');
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
    toast({
      title: "Template Selected",
      description: `You've selected: ${templates.find(t => t.id === id)?.title}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <ArrowLeft size={18} />
                </Button>
              </Link>
              <div>
                <Input
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="border-transparent bg-transparent px-1 text-xl font-medium hover:border-input focus:border-input h-9 max-w-[280px]"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <Save size={16} className="mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
              <Button size="sm" className="h-9">
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Main content */}
          <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="edit">Edit Content</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates" className="animate-fade-in">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-medium">Choose a Template</h2>
                      <Button variant="outline" size="sm" className="h-9">
                        <Sparkles size={16} className="mr-2" />
                        AI Suggest
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
                        onClick={() => setActiveTab('edit')} 
                        disabled={!selectedTemplate}
                      >
                        Continue to Editing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="edit" className="animate-fade-in">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg aspect-video flex items-center justify-center mb-4">
                          {selectedTemplate ? (
                            <img 
                              src={templates.find(t => t.id === selectedTemplate)?.thumbnailUrl}
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
                              defaultValue={selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.title : ''}
                              className="focus-ring"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="video-description">Description</Label>
                            <Input 
                              id="video-description" 
                              placeholder="Enter a description for your video"
                              defaultValue={selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.description : ''}
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
                      <Button variant="outline" onClick={() => setActiveTab('templates')}>
                        Back to Templates
                      </Button>
                      <Button onClick={() => setActiveTab('preview')}>
                        Continue to Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preview" className="animate-fade-in">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-medium mb-6">Preview Your Video</h2>
                    
                    <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-6">
                      {selectedTemplate ? (
                        <img 
                          src={templates.find(t => t.id === selectedTemplate)?.thumbnailUrl}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <p className="text-slate-500 dark:text-slate-400">Select a template first</p>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab('edit')}>
                        Back to Editing
                      </Button>
                      <Button>
                        <Download size={16} className="mr-2" />
                        Export Video
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
