export const colors = {
  primary: {
    black: "#000",
  },
  secondary: {
    yellow: "#cdff33",
    white: "#fff",
    grey: "#d1d1d4",
    blue: "#3250a8",
  },
} as const;

export type Colors = keyof typeof colors;
