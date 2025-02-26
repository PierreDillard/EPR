
'use client';

import dynamic from 'next/dynamic';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import { Extension } from '@tiptap/core';
import Image from '@tiptap/extension-image';
import { Mark } from '@tiptap/core';
import { useEffect } from 'react';

// Types pour l'extension FontSize
interface FontSizeAttributes {
  size: string;
}

interface HTMLElementWithStyle extends HTMLElement {
  style: CSSStyleDeclaration;
}

// Extension personnalisée pour la taille de police
const FontSize = Mark.create({
  name: 'fontSize',
  addAttributes() {
    return {
      size: {
        default: '1rem',
        parseHTML: element => element.style.fontSize,
        renderHTML: attributes => {
          return { style: `font-size: ${attributes.size}` };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (dom: HTMLElement) => ({ size: dom.style.fontSize }),
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },
  addCommands() {
    return {
      setFontSize: size => ({ commands }) => {
        return commands.setMark(this.name, { size });
      },
    };
  },
});
// Import dynamique de la barre d'outils pour éviter les erreurs SSR
const DynamicEditorToolbar = dynamic(
  () => import('./EditorToolbar').then(mod => mod.EditorToolbar),
  {
    ssr: false,
    loading: () => <div className="h-12 bg-gray-50 animate-pulse" />,
  }
);

interface MeditationEditorProps {
  initialContent: string;
  onSave: (content: string) => Promise<void>;
}

export function MeditationEditor({ initialContent, onSave }: MeditationEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontSize,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none w-full focus:outline-none min-h-[400px] px-4 py-2',
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Mise à jour automatique du contenu
      onSave(editor.getHTML()).catch(console.error);
    },
  });

  // S'assurer que l'éditeur est initialisé avec le bon contenu
  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-white">
      <DynamicEditorToolbar editor={editor} />
      <div className="min-h-[400px] relative">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

// Type declaration pour le module
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
    };
  }
}

export default MeditationEditor;