
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, AlertTriangle } from 'lucide-react';
import TextToSpeech from '@/components/TextToSpeech';
import { Template } from './TemplateSelection';
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ContentEditorProps {
  selectedTemplate: string | null;
  templates: Template[];
  onBack: () => void;
  onContinue: () => void;
}

// Form validation schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  scenes: z.array(
    z.object({
      id: z.string(),
      text: z.string().min(1, "Scene text is required"),
      imageUrl: z.string().optional(),
      duration: z.number().min(1, "Minimum duration is 1 second").max(60, "Maximum duration is 60 seconds"),
    })
  ).min(1, "At least one scene is required"),
});

const ContentEditor = ({ 
  selectedTemplate, 
  templates,
  onBack,
  onContinue
}: ContentEditorProps) => {
  const template = templates.find(t => t.id === selectedTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Initialize form with template data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: template?.content?.title || template?.title || '',
      description: template?.content?.description || template?.description || '',
      scenes: template?.content?.scenes || [{ 
        id: '1', 
        text: '', 
        imageUrl: template?.thumbnailUrl, 
        duration: 5 
      }],
    },
  });

  // Track form changes
  useEffect(() => {
    const subscription = form.watch(() => setHasChanges(true));
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const addScene = () => {
    const currentScenes = form.getValues("scenes");
    form.setValue("scenes", [
      ...currentScenes, 
      { 
        id: Date.now().toString(), 
        text: '', 
        imageUrl: template?.thumbnailUrl,
        duration: 5 
      }
    ]);
    setHasChanges(true);
    toast.success("New scene added");
  };

  const removeScene = (index: number) => {
    const currentScenes = form.getValues("scenes");
    if (currentScenes.length <= 1) {
      toast.error("You need at least one scene");
      return;
    }
    const updatedScenes = [...currentScenes];
    updatedScenes.splice(index, 1);
    form.setValue("scenes", updatedScenes);
    setHasChanges(true);
    toast.success("Scene removed");
  };

  const saveChanges = async (data: z.infer<typeof formSchema>) => {
    setIsSaving(true);
    
    try {
      // Simulate saving to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Changes saved successfully", {
        duration: 5000,
        position: "top-center",
      });
      
      setHasChanges(false);
      onContinue();
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmNavigation = () => {
    if (hasChanges) {
      const confirmed = window.confirm("You have unsaved changes. Are you sure you want to go back?");
      if (confirmed) {
        onBack();
      }
    } else {
      onBack();
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(saveChanges)} className="space-y-6">
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
                    <div className="flex flex-col items-center text-slate-500 dark:text-slate-400">
                      <AlertTriangle className="mb-2" />
                      <p>Select a template first</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter a title for your video"
                            className="focus-ring"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter a description for your video"
                            className="focus-ring min-h-[80px]"
                            autoResize
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Scenes</h3>
                    <Button type="button" size="sm" onClick={addScene}>
                      <Plus size={16} className="mr-2" />
                      Add Scene
                    </Button>
                  </div>
                  
                  {form.watch("scenes").map((scene, index) => (
                    <div key={scene.id} className="border rounded-lg p-4 space-y-3 transition-all hover:border-primary/30">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Scene {index + 1}</h4>
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeScene(index)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`scenes.${index}.text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Scene Text</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter text for this scene"
                                className="min-h-[80px]"
                                autoResize
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`scenes.${index}.duration`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (seconds)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                min="1"
                                max="60"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value, 10) || 1)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <TextToSpeech />
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button type="button" variant="outline" onClick={confirmNavigation}>
                Back to Templates
              </Button>
              <Button type="submit" disabled={isSaving || !hasChanges}>
                {isSaving ? (
                  <>
                    <Save size={16} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save & Continue to Preview
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContentEditor;
