"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/ui/primitives/popover";
// import { useContext } from "react";
// import { AppContext } from "../app/providers";
// import { FontDefault, FontSerif, FontMono } from "@/ui/icons";
import { Check, Menu as MenuIcon, Monitor, Moon, SunDim } from "lucide-react";
import { useTheme } from "next-themes";

// const fonts = [
//   {
//     font: "Default",
//     icon: <FontDefault className="tw-h-4 tw-w-4" />,
//   },
//   {
//     font: "Serif",
//     icon: <FontSerif className="tw-h-4 tw-w-4" />,
//   },
//   {
//     font: "Mono",
//     icon: <FontMono className="tw-h-4 tw-w-4" />,
//   },
// ];
const appearances = [
  {
    theme: "System",
    icon: <Monitor className="tw-h-4 tw-w-4" />,
  },
  {
    theme: "Light",
    icon: <SunDim className="tw-h-4 tw-w-4" />,
  },
  {
    theme: "Dark",
    icon: <Moon className="tw-h-4 tw-w-4" />,
  },
];

export default function Menu() {
  // const { font: currentFont, setFont } = useContext(AppContext);
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger className="hover:tw-bg-stone-100 active:tw-bg-stone-200 tw-absolute tw-bottom-5 tw-right-5 tw-z-10 tw-flex tw-h-8 tw-w-8 tw-items-center tw-justify-center tw-rounded-lg tw-transition-colors tw-duration-200 sm:tw-bottom-auto sm:tw-top-5">
        <MenuIcon className="tw-text-stone-600" width={16} />
      </PopoverTrigger>
      <PopoverContent
        className="tw-divide-stone-200 tw-w-52 tw-divide-y"
        align="end"
      >
        {/* <div className="tw-p-2">
          <p className="tw-p-2 tw-text-xs tw-font-medium text-stone-500">Font</p>
          {fonts.map(({ font, icon }) => (
            <button
              key={font}
              className="tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded tw-px-2 tw-py-1 tw-text-sm text-stone-600 hover:bg-stone-100"
              onClick={() => {
                setFont(font);
              }}
            >
              <div className="tw-flex tw-items-center tw-space-x-2">
                <div className="tw-rounded-sm tw-border border-stone-200 tw-p-1">
                  {icon}
                </div>
                <span>{font}</span>
              </div>
              {currentFont === font && <Check className="tw-h-4 tw-w-4" />}
            </button>
          ))}
        </div> */}
        <div className="tw-p-2">
          <p className="tw-p-2 tw-text-xs tw-font-medium tw-text-stone-500">
            Appearance
          </p>
          {appearances.map(({ theme, icon }) => (
            <button
              key={theme}
              className="tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded tw-px-2 tw-py-1.5 tw-text-sm tw-text-stone-600 hover:tw-bg-stone-100"
              onClick={() => {
                setTheme(theme.toLowerCase());
              }}
            >
              <div className="tw-flex tw-items-center tw-space-x-2">
                <div className="tw-rounded-sm tw-border tw-border-stone-200 tw-p-1">
                  {icon}
                </div>
                <span>{theme}</span>
              </div>
              {currentTheme === theme.toLowerCase() && (
                <Check className="tw-h-4 tw-w-4" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
