
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Play, Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Video autoplay handling
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900/20 dark:to-background -z-10"></div>
      
      {/* Abstract shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Announcement chip */}
          <div 
            className={`bg-white/70 dark:bg-black/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-full px-4 py-1.5 mb-8 transform transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-xs font-medium mr-2">✨ New</span>
            <span className="text-xs text-slate-600 dark:text-slate-300">AI-powered video templates</span>
          </div>
          
          {/* Main heading */}
          <h1 
            className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Create stunning videos with 
            <span className="text-gradient"> AI intelligence</span>
          </h1>
          
          {/* Subheading */}
          <p 
            className={`text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Transform your ideas into professional videos effortlessly. Our AI-powered platform handles the tedious parts, so you can focus on creating content that inspires.
          </p>
          
          {/* CTA buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center gap-4 mb-16 transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link to="/create">
              <Button size="lg" className="group h-12 px-6">
                <Sparkles size={18} className="mr-2" />
                Create Your First Video
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-12 px-6">
              <Play size={16} className="mr-2" />
              Watch Demo
            </Button>
          </div>
          
          {/* Video showcase */}
          <div 
            className={`w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800/80 transition-all duration-700 delay-400 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <video 
              ref={videoRef}
              className="w-full aspect-video object-cover"
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop"
            >
              <source src="https://mazwai.com/videvo_files/video/free/2019-01/small_watermarked/190111_13_Music-Clip-25_preview.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
