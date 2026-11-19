
export enum Theme {
  NORA = 'Nora',
  AURA  = 'Aura',
  LARA = 'Lara',
}

export const isTheme: (value: unknown)=> value is Theme = (value: unknown): value is Theme =>
  Object.values(Theme).some( theme => theme === value);
