<template>
  <div class="mt-1">
    <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
      <div class="flex flex-wrap text-sm">
        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          Bold
        </button>
        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          Italic
        </button>
        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          Underline
        </button>

        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          Code
        </button>

        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          Code
        </button>

        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          @click="commands.undo"
        >
          Undo
        </button>

        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          @click="commands.redo"
        >
          Redo
        </button>
      </div>
    </editor-menu-bar>
    <editor-content
      class="w-full mt-2 leading-normal prose form-textarea"
      :editor="editor"
      required
    ></editor-content>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  props: ['value'],
  data() {
    return {
      editor: null,
      emitAfterOnUpdate: false,
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
      ],
      content: this.value,
      onUpdate: ({ getHTML }) => {
        this.emitAfterOnUpdate = true
        this.$emit('input', getHTML())
      },
    })
    this.editor.setContent(this.value)
  },
  beforeDestroy() {
    if (this.editor) this.editor.destroy()
  },
  watch: {
    value(val) {
      // so cursor doesn't jump to start on typing
      if (this.emitAfterOnUpdate) {
        this.emitAfterOnUpdate = false
        return
      }
      if (this.editor) this.editor.setContent(val, true)
    },
  },
}
</script>

<style>
.ProseMirror:focus {
  outline: none;
}
</style>
