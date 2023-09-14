import { Editor } from "@tiptap/core";
import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  TextQuote,
  ListOrdered,
  TextIcon,
} from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { Dispatch, FC, SetStateAction } from "react";
import { BubbleMenuItem } from ".";

interface NodeSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NodeSelector: FC<NodeSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items: BubbleMenuItem[] = [
    {
      name: "Text",
      icon: TextIcon,
      command: () =>
        editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: Heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Heading 2",
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "Bullet List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      name: "Quote",
      icon: TextQuote,
      command: () =>
        editor
          .chain()
          .focus()
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
      isActive: () => editor.isActive("blockquote"),
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: "Multiple",
  };

  return (
    <Popover.Root open={isOpen}>
      <div className="tw-relative tw-h-full">
        <Popover.Trigger
          className="tw-flex tw-h-full tw-items-center tw-gap-1 tw-whitespace-nowrap tw-p-2 tw-text-sm tw-font-medium tw-text-stone-600 hover:tw-bg-stone-100 active:tw-bg-stone-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{activeItem?.name}</span>
          <ChevronDown className="tw-h-4 tw-w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="tw-z-[99999] tw-my-1 tw-flex tw-max-h-80 tw-w-48 tw-flex-col tw-overflow-hidden tw-overflow-y-auto tw-rounded tw-border tw-border-stone-200 tw-bg-white tw-p-1 tw-shadow-xl tw-animate-in tw-fade-in tw-slide-in-from-top-1"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
              className="tw-flex tw-items-center tw-justify-between tw-rounded-sm tw-px-2 tw-py-1 tw-text-sm tw-text-stone-600 hover:tw-bg-stone-100"
              type="button"
            >
              <div className="tw-flex tw-items-center tw-space-x-2">
                <div className="tw-rounded-sm tw-border tw-border-stone-200 tw-p-1">
                  <item.icon className="tw-h-3 tw-w-3" />
                </div>
                <span>{item.name}</span>
              </div>
              {activeItem.name === item.name && (
                <Check className="tw-h-4 tw-w-4" />
              )}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
