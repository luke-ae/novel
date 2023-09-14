import { Editor } from "@tiptap/core";
import { Check, ChevronDown } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import * as Popover from "@radix-ui/react-popover";

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "var(--novel-black)",
  },
  {
    name: "Purple",
    color: "#9333EA",
  },
  {
    name: "Red",
    color: "#E00000",
  },
  {
    name: "Yellow",
    color: "#EAB308",
  },
  {
    name: "Blue",
    color: "#2563EB",
  },
  {
    name: "Green",
    color: "#008A00",
  },
  {
    name: "Orange",
    color: "#FFA500",
  },
  {
    name: "Pink",
    color: "#BA4081",
  },
  {
    name: "Gray",
    color: "#A8A29E",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "var(--novel-highlight-default)",
  },
  {
    name: "Purple",
    color: "var(--novel-highlight-purple)",
  },
  {
    name: "Red",
    color: "var(--novel-highlight-red)",
  },
  {
    name: "Yellow",
    color: "var(--novel-highlight-yellow)",
  },
  {
    name: "Blue",
    color: "var(--novel-highlight-blue)",
  },
  {
    name: "Green",
    color: "var(--novel-highlight-green)",
  },
  {
    name: "Orange",
    color: "var(--novel-highlight-orange)",
  },
  {
    name: "Pink",
    color: "var(--novel-highlight-pink)",
  },
  {
    name: "Gray",
    color: "var(--novel-highlight-gray)",
  },
];

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );

  return (
    <Popover.Root open={isOpen}>
      <div className="relative h-full">
        <Popover.Trigger
          className="tw-flex tw-h-full tw-items-center tw-gap-1 tw-p-2 tw-text-sm tw-font-medium tw-text-stone-600 hover:tw-bg-stone-100 active:tw-bg-stone-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className="tw-rounded-sm tw-px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>

          <ChevronDown className="tw-h-4 tw-w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="tw-z-[99999] tw-my-1 tw-flex tw-max-h-80 tw-w-48 tw-flex-col tw-overflow-hidden tw-overflow-y-auto tw-rounded tw-border tw-border-stone-200 tw-bg-white tw-p-1 tw-shadow-xl tw-animate-in tw-fade-in tw-slide-in-from-top-1"
        >
          <div className="tw-my-1 tw-px-2 tw-text-sm tw-text-stone-500">
            Color
          </div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetColor();
                name !== "Default" &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || "")
                    .run();
                setIsOpen(false);
              }}
              className="tw-flex tw-items-center tw-justify-between tw-rounded-sm tw-px-2 tw-py-1 tw-text-sm tw-text-stone-600 hover:tw-bg-stone-100"
              type="button"
            >
              <div className="tw-flex tw-items-center tw-space-x-2">
                <div
                  className="tw-rounded-sm tw-border tw-border-stone-200 tw-px-1 tw-py-px tw-font-medium"
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("textStyle", { color }) && (
                <Check className="tw-h-4 tw-w-4" />
              )}
            </button>
          ))}

          <div className="tw-mb-1 tw-mt-2 tw-px-2 tw-text-sm tw-text-stone-500">
            Background
          </div>

          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight();
                name !== "Default" && editor.commands.setHighlight({ color });
                setIsOpen(false);
              }}
              className="tw-flex tw-items-center tw-justify-between tw-rounded-sm tw-px-2 tw-py-1 tw-text-sm tw-text-stone-600 hover:tw-bg-stone-100"
              type="button"
            >
              <div className="tw-flex tw-items-center tw-space-x-2">
                <div
                  className="tw-rounded-sm tw-border tw-border-stone-200 tw-px-1 tw-py-px tw-font-medium"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("highlight", { color }) && (
                <Check className="tw-h-4 tw-w-4" />
              )}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
