import { Extension } from '@tiptap/core'
import TextStyle from '@tiptap/extension-text-style'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontFamily: {
      /**
       * Set the font family
       */
      setFontFamily: (fontFamily: string) => ReturnType,
      /**
       * Unset the font family
       */
      unsetFontFamily: () => ReturnType,
    }
  }
}

export const FontFamily = Extension.create({
  name: 'fontFamily',
  
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: element => element.style.fontFamily,
            renderHTML: attributes => {
              if (!attributes.fontFamily) return {}
              return { style: `font-family: ${attributes.fontFamily}` }
            }
          }
        }
      }
    ]
  },
  

  addCommands() {
    return {
      setFontFamily: (fontFamily: string) => ({ chain }) => {
        return chain()
          .focus()
          .toggleMark('textStyle', { fontFamily }) // Utiliser toggleMark
          .run()
      },
      unsetFontFamily: () => ({ chain }) => {
        return chain()
          .focus()
          .unsetMark('textStyle')
          .run()
      },
    }
  },
})