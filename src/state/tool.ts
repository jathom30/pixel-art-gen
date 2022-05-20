import { atom, DefaultValue, selector } from "recoil";
import { Tool } from "typings";
import { columnsAtom, pixelIdsSelector, rowsAtom } from "./artboard";
import { currentPixelAtom, pixelColor, pixelOpacity, prevPixelColor } from "./pixel";

export const selectedTool = atom<Tool>({
  key: 'selectedToolAtom',
  default: 'pointer'
})

export const brushColorAtom = atom({
  key: 'brushColorAtom',
  default: '#000000'
})

export const presetColorsAtom = atom({
  key: 'presetColorsAtom',
  default: ['#000000', '#ffffff']
})

export const canBrushSelector = selector({
  key: 'canBrushSelector',
  get: ({ get }) => {
    const tool = get(selectedTool)
    return tool === 'brush'
  }
})

export const canEraseSelector = selector({
  key: 'canEraseSelector',
  get: ({ get }) => {
    const tool = get(selectedTool)
    return tool === "eraser"
  }
})

export const eraserSizeAtom = atom({
  key: 'eraserSizeAtom',
  default: 1,
})

export const pixelIdsWithinAreaSelector = selector({
  key: 'pixelIdsWithinAreaSelector',
  get: ({ get }) => {
    const currentPixelId = get(currentPixelAtom)
    const pixelIds = get(pixelIdsSelector)
    const cols = get(columnsAtom)
    const rows = get(rowsAtom)
    const eraserSize = get(eraserSizeAtom)
    const radius = Math.floor(eraserSize / 2)

    const pixelIndex = pixelIds.findIndex(id => id === currentPixelId)
    const pixelRow = Math.floor(pixelIndex / rows)
    const pixelCol = pixelIndex % cols

    const pixelCoords =  {x: pixelCol, y: pixelRow}
    
    const minX = pixelCoords.x - radius < 0 ? 0 : pixelCoords.x - radius
    const maxX = pixelCoords.x + radius > cols - 1 ? cols - 1 : pixelCoords.x + radius
    const xRange = Array.from({length: maxX + 1 - minX}, (_, i) => i + minX)
    
    const minY = pixelCoords.y - radius < 0 ? 0 : pixelCoords.y - radius
    const maxY = pixelCoords.y + radius > rows - 1 ? rows - 1 : pixelCoords.y + radius
    const yRange = Array.from({length: maxY + 1 - minY}, (_, i) => i + minY)

    const coordsWithinRange = xRange.map(x => {
      return yRange.map(y => ({x, y}))
    }).flat()

    const coordIds = coordsWithinRange.map(coord => {
      const index = coord.y * rows + coord.x
      return pixelIds[index]
    })

    return coordIds
  }
})

export const erasePixelsWithinAreaSelector = selector<{mouseDown: boolean; mouseLeave: boolean}>({
  key: 'erasePixelsWithinAreaSelector',
  get: () => ({mouseDown: true, mouseLeave: true}),
  set: ({get, set}, mouse) => {
    const canErase = get(canEraseSelector)
    if (!canErase) return
    if (mouse instanceof DefaultValue) return
    const ids = get(pixelIdsWithinAreaSelector)
    ids.forEach(id => {
      // const prevColor = get(prevPixelColor(id))
      const color = get(pixelColor(id))
      if (mouse.mouseDown) {
        set(prevPixelColor(id), color)
        set(pixelColor(id), '#ffffff')
        set(pixelOpacity(id), 1)
      } else {
        if (mouse.mouseLeave) {
          set(pixelOpacity(id), 1)
        } else {
          set(pixelOpacity(id), 0.5)
        }
      }
    })
  }
})