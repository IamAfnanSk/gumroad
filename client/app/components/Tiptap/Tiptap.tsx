import * as React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'

import type { Extensions } from '@tiptap/react'

import { common, createLowlight } from 'lowlight'

import { Toolbar } from './TiptapToolbar'

import './Tiptap.css'

type Props = {
  content?: string
  editable?: boolean
  placeholder?: string
  onUpdate?: (editor: Editor) => void
}

const Tiptap = ({
  content = '',
  editable = true,
  placeholder = 'Start typing...',
  onUpdate
}: Props) => {
  const extensions: Extensions = [
    StarterKit.configure({
      codeBlock: false
    }),
    Typography,
    Link.configure({
      linkOnPaste: false,
      openOnClick: false
    }),
    CodeBlockLowlight.configure({
      lowlight: createLowlight(common)
    }),
    TaskList,
    TaskItem,
    Placeholder.configure({
      placeholder
    })
  ]

  const editor = useEditor({
    content,
    extensions,
    editable,
    onUpdate: ({ editor }) => {
      onUpdate?.(editor)
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none'
      }
    }
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <div className="relative">
        {editable && <Toolbar editor={editor} />}

        <div className={`${editable ? 'mt-4' : ''}`}>
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  )
}

export { Tiptap }
