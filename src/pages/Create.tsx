
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import Navbar from '@/components/Navbar';
import CreateHeader from '@/components/create/CreateHeader';
import TemplateSelection from '@/components/create/TemplateSelection';
import ContentEditor from '@/components/create/ContentEditor';
import VideoPreview from '@/components/create/VideoPreview';
import { Template } from '@/components/create/TemplateSelection';

// Sample template data
const templates: Template[] = [
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <CreateHeader 
            projectTitle={projectTitle}
            setProjectTitle={setProjectTitle}
          />
          
          {/* Main content */}
          <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="edit">Edit Content</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates" className="animate-fade-in">
                <TemplateSelection 
                  templates={templates}
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={handleSelectTemplate}
                  onContinue={() => setActiveTab('edit')}
                />
              </TabsContent>
              
              <TabsContent value="edit" className="animate-fade-in">
                <ContentEditor 
                  selectedTemplate={selectedTemplate}
                  templates={templates}
                  onBack={() => setActiveTab('templates')}
                  onContinue={() => setActiveTab('preview')}
                />
              </TabsContent>
              
              <TabsContent value="preview" className="animate-fade-in">
                <VideoPreview 
                  selectedTemplate={selectedTemplate}
                  templates={templates}
                  onBack={() => setActiveTab('edit')}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
