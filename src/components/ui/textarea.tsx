
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoResize = false, onChange, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    
    // Merge refs to access the textarea element
    const handleRef = React.useCallback((element: HTMLTextAreaElement) => {
      textareaRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    }, [ref]);
    
    const resizeTextarea = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize) return;
      
      // Reset height to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set the height to match content
      textarea.style.height = `${textarea.scrollHeight}px`;
    }, [autoResize]);
    
    React.useEffect(() => {
      if (autoResize) {
        resizeTextarea();
        // Also resize on window resize for responsiveness
        window.addEventListener('resize', resizeTextarea);
        return () => window.removeEventListener('resize', resizeTextarea);
      }
    }, [autoResize, resizeTextarea]);
    
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) onChange(e);
      if (autoResize) resizeTextarea();
    }, [onChange, autoResize, resizeTextarea]);
    
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={handleRef}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
