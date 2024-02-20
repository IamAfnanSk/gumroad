import * as React from 'react'
import classNames from 'classnames'
import { Editor } from '@tiptap/react'

import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeSSlashLine,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiParagraph,
  RiListOrdered,
  RiListUnordered,
  RiCodeBoxLine,
  RiLink,
  RiLinkUnlink,
  RiDoubleQuotesL,
  RiSeparator,
  RiTextWrap,
  RiFormatClear,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiTaskLine
} from 'react-icons/ri'

import { setLink } from '@/lib/tiptapHelpers'

import './Toolbar.css'

type ToolbarProps = {
  editor: Editor
}

function Toolbar({ editor }: ToolbarProps) {
  const isCursorOverLink = editor.getAttributes('link').href

  return (
    <div className={'rounded border-border border'}>
      <div className="flex flex-wrap items-center">
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('bold')
          })}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <RiBold />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('italic')
          })}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <RiItalic />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('strike')
          })}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <RiStrikethrough />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('code')
          })}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <RiCodeSSlashLine />
        </div>
        <div className="tiptap-toolbar-divider"></div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('heading', { level: 1 })
          })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <RiH1 />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('heading', { level: 2 })
          })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <RiH2 />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('heading', { level: 3 })
          })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <RiH3 />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('heading', { level: 4 })
          })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <RiH4 />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('heading', { level: 5 })
          })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          <RiH5 />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('heading', { level: 6 })
          })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
        >
          <RiH6 />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('paragraph')
          })}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <RiParagraph />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('bulletList')
          })}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <RiListUnordered />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('orderedList')
          })}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <RiListOrdered />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('taskList')
          })}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
        >
          <RiTaskLine />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('codeBlock')
          })}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <RiCodeBoxLine />
        </div>
        <div className="tiptap-toolbar-divider"></div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': isCursorOverLink
          })}
          onClick={() => setLink(editor)}
        >
          <RiLink />
        </div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            disabled: !isCursorOverLink
          })}
          onClick={() => setLink(editor)}
        >
          <RiLinkUnlink />
        </div>
        <div className="tiptap-toolbar-divider"></div>
        <div
          className={classNames('tiptap-toolbar-icon', {
            'is-active': editor.isActive('blockquote')
          })}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <RiDoubleQuotesL />
        </div>
        <div
          className="tiptap-toolbar-icon"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <RiSeparator />
        </div>
        <div className="tiptap-toolbar-divider"></div>
        <div
          className="tiptap-toolbar-icon"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <RiTextWrap />
        </div>
        <div
          className="tiptap-toolbar-icon"
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
        >
          <RiFormatClear />
        </div>
        <div className="tiptap-toolbar-divider"></div>
        <div
          className="tiptap-toolbar-icon"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <RiArrowGoBackLine />
        </div>
        <div
          className="tiptap-toolbar-icon"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RiArrowGoForwardLine />
        </div>
      </div>
    </div>
  )
}

export { Toolbar }
