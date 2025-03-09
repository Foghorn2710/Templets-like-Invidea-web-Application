
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Zap, 
  MessageSquare, 
  VideoIcon, 
  Paintbrush, 
  MagicWand, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-black/40 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent"></div>
          
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                Craft videos with <span className="text-gradient">powerful AI tools</span>
              </h2>
              <p className={`text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                Our platform combines cutting-edge AI technology with intuitive design to make video creation effortless.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-fade-in">
              <FeatureCard
                icon={<VideoIcon size={24} />}
                title="Smart Templates"
                description="Access hundreds of professionally designed templates, customized to fit your specific needs."
                index={0}
              />
              <FeatureCard
                icon={<Sparkles size={24} />}
                title="Text to Speech"
                description="Convert your script into natural-sounding voiceovers with emotional expression."
                index={1}
              />
              <FeatureCard
                icon={<Paintbrush size={24} />}
                title="Style Adaptation"
                description="Automatically adapt visuals to match your brand's unique style and color palette."
                index={2}
              />
              <FeatureCard
                icon={<MessageSquare size={24} />}
                title="Script Enhancement"
                description="Get AI-powered suggestions to improve your script's clarity and impact."
                index={3}
              />
              <FeatureCard
                icon={<Zap size={24} />}
                title="One-Click Export"
                description="Export your videos in multiple formats with a single click, optimized for any platform."
                index={4}
              />
              <FeatureCard
                icon={<MagicWand size={24} />}
                title="Scene Intelligence"
                description="AI automatically suggests the best transitions and effects between scenes."
                index={5}
              />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/20 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How it works
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Create professional-quality videos in minutes, not hours
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose a template</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Browse our library of templates or let AI suggest the perfect match for your content.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalize content</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Add your text, images, and videos. Let AI enhance your script and generate voiceovers.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Export & share</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Preview your video, make any final adjustments, and export in your preferred format.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/create">
                <Button size="lg" className="group">
                  Start Creating Now
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Call-to-Action Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10"></div>
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400/10 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 animate-float"></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: '3s' }}></div>
          
          <div className="container mx-auto px-6">
            <div className="glass-panel rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-xl">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to transform your <span className="text-gradient">video creation</span>?
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of creators who have simplified their workflow and elevated their content.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                  <Link to="/create">
                    <Button size="lg" className="w-full sm:w-auto group">
                      <Sparkles size={18} className="mr-2" />
                      Start Free Trial
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Pricing
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-primary mr-2" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-primary mr-2" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-primary mr-2" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-black border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-primary/80 flex items-center justify-center">
                <Play size={16} className="text-white ml-0.5" fill="white" />
              </div>
              <span className="font-display text-xl tracking-tight">KreativAI</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-4 md:mb-0">
              <a href="#" className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">About</a>
              <a href="#" className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">Features</a>
              <a href="#" className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">Pricing</a>
              <a href="#" className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">Support</a>
            </div>
            
            <div className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} KreativAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
