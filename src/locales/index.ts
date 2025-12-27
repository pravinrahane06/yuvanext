import { en } from "./en";
import { mr } from "./mr";

export const translations = {
  en,
  mr,
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof en;
