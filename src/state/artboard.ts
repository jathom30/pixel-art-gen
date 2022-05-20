import { atom, selector } from "recoil";
import { v4 as uuid } from 'uuid'

export const columnsAtom = atom({
  key: 'columnsAtom',
  default: 30,
})
export const rowsAtom = atom({
  key: 'rowsAtom',
  default: 30,
})

export const showGridAtom = atom({
  key: 'showGridAtom',
  default: true,
})

export const pixelIdsSelector = selector({
  key: 'totalPixelsSelector',
  get: ({ get }) => {
    const cols = get(columnsAtom)
    const rows = get(rowsAtom)
    const totalPixels = cols * rows
    return Array.from({length: totalPixels}).map(_ => uuid())
  }
})