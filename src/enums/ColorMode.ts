export enum ColorMode {
  DARK = "dark",
  LIGHT = "light",
}

export const isColorMode: (value: unknown)=> value is ColorMode = (value: unknown): value is ColorMode =>
  Object.values(ColorMode).some( colorMode => colorMode === value);
