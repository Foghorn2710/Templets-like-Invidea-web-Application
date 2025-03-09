
import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface VoiceOption {
  id: string;
  name: string;
  gender: 'male' | 'female';
  accent: string;
  emotionRange: 'neutral' | 'expressive' | 'very expressive';
}

const voiceOptions: VoiceOption[] = [
  { id: 'roger', name: 'Roger', gender: 'male', accent: 'American', emotionRange: 'neutral' },
  { id: 'sarah', name: 'Sarah', gender: 'female', accent: 'British', emotionRange: 'expressive' },
  { id: 'brian', name: 'Brian', gender: 'male', accent: 'British', emotionRange: 'neutral' },
  { id: 'emma', name: 'Emma', gender: 'female', accent: 'American', emotionRange: 'very expressive' },
  { id: 'james', name: 'James', gender: 'male', accent: 'Australian', emotionRange: 'expressive' },
  { id: 'lily', name: 'Lily', gender: 'female', accent: 'American', emotionRange: 'very expressive' },
];

const TextToSpeech = () => {
  const [text, setText] = useState('Welcome to KreativAI. This is an example of AI-generated speech that you can use in your videos.');
  const [selectedVoice, setSelectedVoice] = useState('sarah');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would trigger audio playback/pause
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      // In a real implementation, this would fetch audio from an API
    }, 1500);
  };

  return (
    <Card className="w-full max-w-xl mx-auto glass-panel">
      <CardHeader>
        <CardTitle>Text to Speech</CardTitle>
        <CardDescription>
          Convert your text into natural-sounding speech for your video
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="speech-text">Text</Label>
          <Textarea
            id="speech-text"
            placeholder="Enter the text you want to convert to speech..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-32 resize-none focus-ring"
          />
        </div>

        <div className="space-y-2">
          <Label>Voice</Label>
          <RadioGroup value={selectedVoice} onValueChange={setSelectedVoice} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {voiceOptions.map((voice) => (
              <div key={voice.id} className="relative">
                <RadioGroupItem
                  value={voice.id}
                  id={`voice-${voice.id}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`voice-${voice.id}`}
                  className="flex flex-col p-3 border rounded-md cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-colors"
                >
                  <span className="font-medium">{voice.name}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {voice.gender === 'male' ? '👨' : '👩'} {voice.accent} • {
                      voice.emotionRange === 'neutral' ? 'Neutral' : 
                      voice.emotionRange === 'expressive' ? 'Expressive' : 'Very Expressive'
                    }
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="pt-2 space-y-4">
          <div className="flex items-center space-x-3">
            <Button 
              onClick={handlePlayPause} 
              variant="outline" 
              size="icon" 
              disabled={isGenerating}
              className="h-10 w-10 rounded-full"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </Button>
            
            <Button 
              onClick={toggleMute} 
              variant="ghost" 
              size="icon" 
              disabled={isGenerating}
              className="h-8 w-8"
            >
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
            
            <div className="flex-grow">
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                disabled={isGenerating}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleGenerate} 
            className="w-full"
            disabled={isGenerating || text.trim().length === 0}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={16} className="mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Speech'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToSpeech;
