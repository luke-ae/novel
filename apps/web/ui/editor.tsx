"use client";

import { useState } from "react";
import { Editor as NovelEditor } from "novel";

export default function Editor() {
  const [saveStatus, setSaveStatus] = useState("Saved");

  return (
    <div className="tw-relative tw-w-full tw-max-w-4xl">
      <div className="tw-absolute tw-right-5 tw-top-5 tw-z-10 tw-mb-5 tw-rounded-lg tw-bg-stone-100 tw-px-2 tw-py-1 tw-text-sm tw-text-stone-400">
        {saveStatus}
      </div>
      <NovelEditor
        onUpdate={() => {
          setSaveStatus("Unsaved");
        }}
        onDebouncedUpdate={() => {
          setSaveStatus("Saving...");
          // Simulate a delay in saving.
          setTimeout(() => {
            setSaveStatus("Saved");
          }, 500);
        }}
      />
    </div>
  );
}
