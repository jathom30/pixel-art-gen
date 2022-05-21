import { atom, atomFamily } from "recoil";

export const pixelColor = atomFamily({
  key: 'pixelColorAtom',
  default: '#ffffff',
})

export const prevPixelColor = atomFamily({
  key: 'prevPixelColorAtom',
  default: '#ffffff',
})

export const pixelOpacity = atomFamily({
  key: 'pixelOpacityAtom',
  default: 1
})

export const currentPixelAtom = atom<string | undefined>({
  key: 'currentPixelAtom',
  default: undefined
})