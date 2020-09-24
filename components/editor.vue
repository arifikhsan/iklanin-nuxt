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
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          Strike
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
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          Paragraph
        </button>

        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          UL
        </button>

        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          OL
        </button>

        <button
          type="button"
          class="p-2 transition duration-500 rounded-md hover:bg-gray-200"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          Quote
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
          @click="commands.horizontal_rule"
        >
          Hr
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
      class="w-full mt-2 prose form-textarea"
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
  Link,
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
        new Link(),
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
