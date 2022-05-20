import { atom, atomFamily } from "recoil";

export const pixelColor = atomFamily({
  key: 'pixelColorAtom',
  default: 'white',
})

export const prevPixelColor = atomFamily({
  key: 'prevPixelColorAtom',
  default: 'white',
})

export const pixelOpacity = atomFamily({
  key: 'pixelOpacityAtom',
  default: 1
})

export const currentPixelAtom = atom<string | undefined>({
  key: 'currentPixelAtom',
  default: undefined
})