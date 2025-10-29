'use client'

import * as React from 'react'
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Extension } from '@tiptap/core'

// Custom extensions
import TextColor from './extensions/TextColor'
import FontSize from './extensions/FontSize'
import TextAlign from './extensions/TextAlign'

// UI Components
import { Button } from '@/core/components/ui/button'
import { Dropdown } from '@/core/components/ui/dropdown'
import { ColorPicker } from '@/core/components/ui/color-picker'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/core/components/ui/dialog'
import { Input } from '@/core/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/ui/tabs'
import { Label } from '@/core/components/ui/label'

// Icons
import {
  Bold,
  Italic,Underline as UnderlineIcon, 
  Heading1,
  Heading2,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  FileImage,
  Upload,
  Camera,
  RotateCcw,
  RotateCw,
  ChevronDown,
  X,
} from 'lucide-react'
import { cn } from '@/core/utils/utils'

// Options for dropdowns
const FontSizeOptions = [
  { label: 'Petit', value: '0.875rem' },
  { label: 'Normal', value: '1rem' },
  { label: 'Grand', value: '1.25rem' },
  { label: 'Très grand', value: '1.5rem' },
  { label: 'Énorme', value: '2rem' }
]

const FontFamilyOptions = [
  { label: 'Sans-serif', value: 'Inter, sans-serif' },
  { label: 'Serif', value: 'Lora, serif' },
  { label: 'Montserrat', value: 'Montserrat, sans-serif' },
  { label: 'Cursive', value: 'Dancing Script, cursive' }
]

const ColorOptions = [
  { label: 'Noir', value: '#000000' },
  { label: 'Gris', value: '#6B7280' },
  { label: 'Blanc', value: '#FFFFFF' },
  { label: 'Rouge', value: '#EF4444' },
  { label: 'Orange', value: '#F97316' },
  { label: 'Jaune', value: '#EAB308' },
  { label: 'Vert', value: '#22C55E' },
  { label: 'Bleu', value: '#3B82F6' },
  { label: 'Indigo', value: '#6366F1' },
  { label: 'Violet', value: '#8B5CF6' },
  { label: 'Rose', value: '#EC4899' },
  { label: 'Primary', value: '#00AECE' },
  { label: 'Secondary', value: '#A8CC3D' },
  { label: 'Accent', value: '#FDAC00' }
]

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

interface MeditationEditorProps {
  initialContent: string
  onSave: (content: string) => Promise<void>
  placeholder?: string
  uploadImage?: (file: File) => Promise<string>
  className?: string
}

export function MeditationEditor({
  initialContent,
  onSave,
  placeholder = 'Commencez à écrire votre méditation...',
  uploadImage,
  className
}: MeditationEditorProps) {
  // États pour les dialogues et formulaires
  const [imageUrl, setImageUrl] = React.useState('')
  const [linkUrl, setLinkUrl] = React.useState('')
  const [linkText, setLinkText] = React.useState('')
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [isUploading, setIsUploading] = React.useState(false)
  const [showLinkDialog, setShowLinkDialog] = React.useState(false)
  const [showImageDialog, setShowImageDialog] = React.useState(false)
  const [isLinkSelection, setIsLinkSelection] = React.useState(false)

  // Référence aux données sélectionnées
  const selectionRef = React.useRef<{ text: string; range: any }>({ text: '', range: null })

  // Instanciation de l'éditeur
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-gray-300 pl-4 italic text-gray-700',
          },
        },
      }),
      TextStyle,
      Underline,
      FontFamily,
      TextColor,
      FontSize,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'blockquote'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Typography,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      Image.configure({
        allowBase64: true,
        inline: false,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-primary-main underline cursor-pointer hover:text-primary-dark',
        },
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      // Sauvegarde automatique du contenu
      onSave(editor.getHTML()).catch(console.error)
    },
    onSelectionUpdate: ({ editor }) => {
      // Capture la sélection actuelle pour l'utiliser dans les dialogues
      if (editor.state.selection.empty) return
      
      const text = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to
      )
      selectionRef.current = { 
        text,
        range: editor.state.selection
      }
      
      // Vérifie si la sélection est un lien
      setIsLinkSelection(editor.isActive('link'))
      if (isLinkSelection) {
        setLinkUrl(editor.getAttributes('link').href || '')
      }
    },
  })

  // Gestion des fichiers image
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        alert('Type de fichier non supporté. Utilisez JPG, PNG, ou WebP.')
        return
      }
      
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Insertion d'image (URL ou fichier)
  const handleInsertImage = async () => {
    if (!editor) return
    
    try {
      if (imageFile && uploadImage) {
        setIsUploading(true)
        const uploadedUrl = await uploadImage(imageFile)
        editor.chain().focus().setImage({ src: uploadedUrl }).run()
      } else if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl }).run()
      } else if (imagePreview) {
        editor.chain().focus().setImage({ src: imagePreview }).run()
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload de l\'image:', error)
      alert('Erreur lors de l\'upload de l\'image')
    } finally {
      setIsUploading(false)
      setImageUrl('')
      setImageFile(null)
      setImagePreview(null)
      setShowImageDialog(false)
    }
  }

  // Insertion ou mise à jour de lien
  const handleInsertLink = () => {
    if (!editor) return
    
    if (isLinkSelection) {
      // Mise à jour du lien existant
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
    } else if (linkUrl) {
      if (selectionRef.current.text) {
        // Ajout d'un lien sur la sélection existante
        editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
      } else if (linkText) {
        // Création d'un nouveau lien avec texte personnalisé
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run()
      } else {
        // Création d'un lien affichant l'URL
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkUrl}</a>`).run()
      }
    }
    
    // Réinitialisation
    setLinkUrl('')
    setLinkText('')
    setShowLinkDialog(false)
  }

  // Suppression du lien
  const handleRemoveLink = () => {
    if (!editor) return
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setShowLinkDialog(false)
  }

  if (!editor) {
    return <div className="h-64 border rounded-lg bg-gray-50 animate-pulse" />
  }

  return (
    <div className={cn("border rounded-lg overflow-hidden bg-white", className)}>
      {/* Barre d'outils principale */}
      <div className="p-2 flex flex-wrap gap-2 border-b bg-gray-50">
        {/* Groupe: Formatage de base */}
        <div className="flex gap-1 border-r pr-2">
          <Button 
            variant={editor.isActive('bold') ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Gras"
          >
            <Bold size={16} />
          </Button>
          <Button 
            variant={editor.isActive('italic') ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italique"
          >
            <Italic size={16} />
          </Button>
          <Button 
            variant={editor.isActive('underline') ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Souligné"
          >
            <UnderlineIcon size={16} /> 
          </Button>
        </div>

        {/* Groupe: Titres */}
        <div className="flex gap-1 border-r pr-2">
          <Button 
            variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            title="Titre 1"
          >
            <Heading1 size={16} />
          </Button>
          <Button 
            variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            title="Titre 2"
          >
            <Heading2 size={16} />
          </Button>
        </div>

        {/* Groupe: Listes */}
        <div className="flex gap-1 border-r pr-2">
          <Button 
            variant={editor.isActive('bulletList') ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Liste à puces"
          >
            <List size={16} />
          </Button>
          <Button 
            variant={editor.isActive('orderedList') ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Liste numérotée"
          >
            <ListOrdered size={16} />
          </Button>
        </div>

        {/* Groupe: Alignement */}
        <div className="flex gap-1 border-r pr-2">
          <Button 
            variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            title="Aligner à gauche"
          >
            <AlignLeft size={16} />
          </Button>
          <Button 
            variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            title="Centrer"
          >
            <AlignCenter size={16} />
          </Button>
          <Button 
            variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            title="Aligner à droite"
          >
            <AlignRight size={16} />
          </Button>
          <Button 
            variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            title="Justifier"
          >
            <AlignJustify size={16} />
          </Button>
        </div>

        {/* Groupe: Police et taille */}
        <div className="flex gap-2 items-center border-r pr-2">
          <Dropdown 
            options={FontFamilyOptions}
            value={editor.getAttributes('textStyle').fontFamily || 'Inter, sans-serif'}
            onChange={(value) => editor.chain().focus().setFontFamily(value).run()}
            placeholder="Police"
          />
          
          <Dropdown 
            options={FontSizeOptions}
            value={editor.getAttributes('textStyle').fontSize || '1rem'}
            onChange={(value) => editor.chain().focus().setMark('textStyle', { fontSize: value }).run()}
            placeholder="Taille"
          />

          <div className="relative inline-block">
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-1"
              onClick={(e) => {
                const target = e.currentTarget.nextElementSibling;
                if (target) {
                  target.classList.toggle('hidden');
                }
              }}
            >
              <div 
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: editor.getAttributes('textStyle').color || '#000000' }}
              />
              <ChevronDown size={12} />
            </Button>
            
            <div className="absolute mt-1 p-2 bg-white shadow-lg rounded-md z-10 w-[180px] hidden">
              <ColorPicker 
                colors={ColorOptions}
                value={editor.getAttributes('textStyle').color || '#000000'}
                onChange={(value) => {
                  editor.chain().focus().setMark('textStyle', { color: value }).run();
                  document.querySelectorAll('.color-picker-dropdown').forEach(el => 
                    el.classList.add('hidden')
                  );
                }}
              />
            </div>
          </div>
        </div>

        {/* Groupe: Éléments spéciaux */}
        <div className="flex gap-1">
          <Button 
            variant={editor.isActive('link') ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setShowLinkDialog(true)}
            title="Insérer un lien"
          >
            <LinkIcon size={16} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowImageDialog(true)}
            title="Insérer une image"
          >
            <ImageIcon size={16} />
          </Button>
          
          <Button 
            variant={editor.isActive('blockquote') ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Citation"
          >
            <Quote size={16} />
          </Button>
        </div>
      </div>

      {/* Contenu de l'éditeur */}
      <EditorContent 
        editor={editor} 
        className="prose prose-lg max-w-none w-full focus:outline-none min-h-[400px] p-4" 
      />

      {/* Dialog: Insérer un lien */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isLinkSelection ? "Modifier le lien" : "Insérer un lien"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://exemple.com"
              />
            </div>
            
            {!isLinkSelection && !selectionRef.current.text && (
              <div className="space-y-2">
                <Label htmlFor="link-text">Texte du lien</Label>
                <Input
                  id="link-text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Mon lien"
                />
              </div>
            )}
            
            <div className="flex justify-between pt-4">
              {isLinkSelection && (
                <Button variant="destructive" onClick={handleRemoveLink}>
                  Supprimer le lien
                </Button>
              )}
              
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={handleInsertLink} disabled={!linkUrl}>
                  {isLinkSelection ? "Mettre à jour" : "Insérer"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Insérer une image */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Insérer une image</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Télécharger</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Importer une image</Label>
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary-main transition-colors",
                    imagePreview && "border-primary-main"
                  )}
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageFileChange}
                  />
                  
         
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowImageDialog(false)}>
                  Annuler
                </Button>
                <Button 
                  onClick={handleInsertImage} 
                  disabled={!imagePreview || isUploading}
                >
                  {isUploading ? "Téléchargement..." : "Insérer"}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4 py-4">
         
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowImageDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={handleInsertImage} disabled={!imageUrl}>
                  Insérer
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Menu bulle qui apparaît lors de la sélection de texte */}
      {editor && (
        <BubbleMenu 
          editor={editor} 
          tippyOptions={{ duration: 150 }}
          className="bg-white shadow-lg border rounded-lg flex overflow-hidden divide-x"
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-none"
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-active={editor.isActive('bold')}
          >
            <Bold size={14} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-none"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-active={editor.isActive('italic')}
          >
            <Italic size={14} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-none"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            data-active={editor.isActive('underline')}
          >
            <UnderlineIcon size={14} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-none"
            onClick={() => setShowLinkDialog(true)}
            data-active={editor.isActive('link')}
          >
            <LinkIcon size={14} />
          </Button>
        </BubbleMenu>
      )}

      {/* Menu flottant qui apparaît lorsqu'une ligne est vide */}
      {editor && (
        <FloatingMenu 
          editor={editor} 
          tippyOptions={{ duration: 150 }}
          className="bg-white shadow-lg border rounded-lg p-1 flex flex-col gap-1"
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start gap-2"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 size={14} />
            <span>Titre principal</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start gap-2"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 size={14} />
            <span>Sous-titre</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start gap-2"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={14} />
            <span>Liste à puces</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start gap-2"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={14} />
            <span>Citation</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start gap-2"
            onClick={() => setShowImageDialog(true)}
          >
            <ImageIcon size={14} />
            <span>Image</span>
          </Button>
        </FloatingMenu>
      )}
    </div>
  )
}

export default MeditationEditor
