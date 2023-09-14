import { cn, getUrlFromString } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { Check, Trash } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkSelector: FC<LinkSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  return (
    <div className="relative">
      <button
        type="button"
        className="tw-flex tw-h-full tw-items-center tw-space-x-2 tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-stone-600 hover:tw-bg-stone-100 active:tw-bg-stone-200"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p className="tw-text-base">↗</p>
        <p
          className={cn(
            "tw-underline tw-decoration-stone-400 tw-underline-offset-4",
            {
              "tw-text-blue-500": editor.isActive("link"),
            }
          )}
        >
          Link
        </p>
      </button>
      {isOpen && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.target[0] as HTMLInputElement;
            const url = getUrlFromString(input.value);
            url && editor.chain().focus().setLink({ href: url }).run();
            setIsOpen(false);
          }}
          className="tw-fixed tw-top-full tw-z-[99999] tw-mt-1 tw-flex tw-w-60 tw-overflow-hidden tw-rounded tw-border tw-border-stone-200 tw-bg-white tw-p-1 tw-shadow-xl tw-animate-in tw-fade-in tw-slide-in-from-top-1"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Paste a link"
            className="tw-flex-1 tw-bg-white tw-p-1 tw-text-sm tw-outline-none"
            defaultValue={editor.getAttributes("link").href || ""}
          />
          {editor.getAttributes("link").href ? (
            <button
              type="button"
              className="tw-flex tw-items-center tw-rounded-sm tw-p-1 tw-text-red-600 tw-transition-all hover:tw-bg-red-100"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setIsOpen(false);
              }}
            >
              <Trash className="tw-h-4 tw-w-4" />
            </button>
          ) : (
            <button className="tw-flex tw-items-center tw-rounded-sm tw-p-1 tw-text-stone-600 tw-transition-all hover:tw-bg-stone-100">
              <Check className="tw-h-4 tw-w-4" />
            </button>
          )}
        </form>
      )}
    </div>
  );
};
