import { atom, selectorFamily } from "recoil";
import { v4 as uuid } from 'uuid'

export const columnsAtom = atom({
  key: 'columnsAtom',
  default: 31,
})

export const rowsAtom = atom({
  key: 'rowsAtom',
  default: 31,
})

export const showGridAtom = atom({
  key: 'showGridAtom',
  default: false,
})

export const pixelIdsSelector = selectorFamily({
  key: 'totalPixelsSelector',
  get: () => ({ get }) => {
    const cols = get(columnsAtom)
    const rows = get(rowsAtom)
    const totalPixels = cols * rows
    return Array.from({length: totalPixels}, () => uuid())
  }
})

export const saveImageAtom = atom({
  key: 'saveImageAtom',
  default: false,
})

export const currentArtboardAtom = atom({
  key: 'currentArtboardIdAtom',
  default: 'initial',
})

export const artboardIdsAtom = atom({
  key: 'artboardCountAtom',
  default: ['initial'],
})

