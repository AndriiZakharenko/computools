export const fonts = {
  arial_regular: ["Arial-Regular", "sans-serif"],
  arial_bold: ["Arial-Bold", "sans-serif"],
} as const;

export type FontFamily = keyof typeof fonts;
