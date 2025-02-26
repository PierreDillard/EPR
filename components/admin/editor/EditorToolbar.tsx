'use client';

import { Editor } from '@tiptap/react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bold, Italic } from 'lucide-react';



type FontSizeKey = 'small' | 'normal' | 'large' | 'xlarge';

const FONT_SIZES: Record<FontSizeKey, string> = {
  small: '0.875rem',
  normal: '1rem',
  large: '1.25rem',
  xlarge: '1.5rem',
} as const;

interface EditorToolbarProps {
  editor: Editor | null;
}
export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  const setFontSize = (value: FontSizeKey) => {
    editor.chain().focus().setFontSize(FONT_SIZES[value]).run();
  };

  return (
    <div className="border-b p-2 flex flex-wrap gap-2 items-center bg-white">
      <div className="flex items-center gap-1 border-r pr-2">
        <Button
          size="sm"
          variant={editor.isActive('bold') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          type="button"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive('italic') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type="button"
        >
          <Italic className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Select onValueChange={setFontSize}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Taille" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Petit</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="large">Grand</SelectItem>
            <SelectItem value="xlarge">Très grand</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}