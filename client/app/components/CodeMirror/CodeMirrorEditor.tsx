import * as React from 'react'

import { EditorView, basicSetup } from 'codemirror'
import { html } from '@codemirror/lang-html'
import { oneDark } from '@codemirror/theme-one-dark'
import { ViewUpdate } from '@codemirror/view'

type Props = {
  content: string
  onUpdate?: (update: ViewUpdate) => void
} & React.HTMLAttributes<HTMLDivElement>

const CodeMirrorEditor = ({ content, onUpdate }: Props) => {
  const divRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const listener = EditorView.updateListener.of((update) => {
      onUpdate?.(update)
    })

    const view = new EditorView({
      extensions: [basicSetup, html(), oneDark, listener],
      parent: divRef.current || undefined,
      doc: content
    })

    return () => view.destroy()
  }, [])

  return <div className="max-h-96 overflow-y-auto" ref={divRef} />
}

export { CodeMirrorEditor }
