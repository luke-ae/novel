import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapUnderline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Markdown } from "tiptap-markdown";
import Highlight from "@tiptap/extension-highlight";
import SlashCommand from "./slash-command";
import { InputRule } from "@tiptap/core";
import UploadImagesPlugin from "@/ui/editor/plugins/upload-images";
import UpdatedImage from "./updated-image";

export const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "tw-list-disc tw-list-outside tw-leading-3 -tw-mt-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "tw-list-decimal tw-list-outside tw-leading-3 -tw-mt-2",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "tw-leading-normal -tw-mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "tw-border-l-4 tw-border-stone-700",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class:
          "tw-rounded-sm tw-bg-stone-100 tw-p-5 tw-font-mono tw-font-medium tw-text-stone-800",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "tw-rounded-md tw-bg-stone-200 tw-px-1.5 tw-py-1 tw-font-mono tw-font-medium tw-text-stone-900",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  }),
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end)
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: "tw-mt-4 tw-mb-6 tw-border-t tw-border-stone-300",
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        "tw-text-stone-400 tw-underline tw-underline-offset-[3px] hover:tw-text-stone-600 tw-transition-colors tw-cursor-pointer",
    },
  }),
  TiptapImage.extend({
    addProseMirrorPlugins() {
      return [UploadImagesPlugin()];
    },
  }).configure({
    allowBase64: true,
    HTMLAttributes: {
      class: "tw-rounded-lg tw-border tw-border-stone-200",
    },
  }),
  UpdatedImage.configure({
    HTMLAttributes: {
      class: "tw-rounded-lg tw-border tw-border-stone-200",
    },
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands, or '++' for AI autocomplete...";
    },
    includeChildren: true,
  }),
  SlashCommand,
  TiptapUnderline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "tw-not-prose tw-pl-2",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "tw-flex tw-items-start tw-my-4",
    },
    nested: true,
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true,
  }),
];
