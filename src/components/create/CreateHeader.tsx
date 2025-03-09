
import { useState } from 'react';
import { ArrowLeft, Save, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateHeaderProps {
  projectTitle: string;
  setProjectTitle: (title: string) => void;
}

const CreateHeader = ({ projectTitle, setProjectTitle }: CreateHeaderProps) => {
  return (
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
  );
};

export default CreateHeader;
