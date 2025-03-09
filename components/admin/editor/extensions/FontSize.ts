import { Extension } from '@tiptap/core'
import { TextStyle } from '@tiptap/extension-text-style'

// Déclarations de types pour étendre l'API de TipTap
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (fontSize: string) => ReturnType,
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType,
    }
  }
}


export const FontSizeExtension = TextStyle.extend({
  name: 'fontSize',
})

export const FontSize = Extension.create({
  name: 'fontSize',
  
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize,
            renderHTML: attributes => {
              if (!attributes.fontSize) return {}
              return { style: `font-size: ${attributes.fontSize}` }
            },
          }
        }
      }
    ]
  },
  
  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }) => {
        return chain()
          .focus()
          .toggleMark('textStyle', { fontSize }) // Clé du changement
          .run()
      },
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .focus()
          .unsetMark('textStyle')
          .run()
      },
    }
  },
})

export default FontSize