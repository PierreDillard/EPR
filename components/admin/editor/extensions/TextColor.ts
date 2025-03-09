import { Extension } from '@tiptap/core'
import { TextStyle } from '@tiptap/extension-text-style'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textColor: {
      /**
       * Set the text color
       */
      setTextColor: (color: string) => ReturnType,
      /**
       * Unset the text color
       */
      unsetTextColor: () => ReturnType,
    }
  }
}


export const TextColorExtension = TextStyle.extend({
  name: 'textColor',
})

// Extension qui ajoute l'attribut de couleur et les commandes associées
export const TextColor = Extension.create({
  name: 'textColor',
  
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          color: {
            default: null,
            parseHTML: element => element.style.color,
            renderHTML: attributes => {
              if (!attributes.color) return {}
              return { style: `color: ${attributes.color}` }
            },
          }
        }
      }
    ]
  },
  
  addCommands() {
    return {
      setTextColor: (color: string) => ({ chain }) => {
        return chain()
          .focus()
          .toggleMark('textStyle', { color }) // Utiliser toggleMark
          .run()
      },
      unsetTextColor: () => ({ chain }) => {
        return chain()
          .focus()
          .unsetMark('textStyle')
          .run()
      },
    }
  },
})

export default TextColor