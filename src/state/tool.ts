import { atom, DefaultValue, selector, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Tool } from "typings";
import { columnsAtom, currentArtboardAtom, pixelIdsSelector, rowsAtom } from "./artboard";
import { currentPixelAtom, pixelColor, pixelOpacity, prevPixelColor } from "./pixel";

const { persistAtom } = recoilPersist()

export const selectedTool = atom<Tool>({
  key: 'selectedToolAtom',
  default: 'brush',
  effects: [persistAtom]
})

export const brushColorAtom = atom({
  key: 'brushColorAtom',
  default: '#000000',
  effects: [persistAtom]
})

export const presetColorsAtom = atom<string[]>({
  key: 'presetColorsAtom',
  default: ['#000000', '#ffffff'],
  effects: [persistAtom]
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
export const canFillSelector = selector({
  key: 'canFillSelector',
  get: ({ get }) => {
    const tool = get(selectedTool)
    return tool === "fill"
  }
})

export const canZoomSelector = selector({
  key: 'canZoomSelector',
  get: ({ get }) => {
    const tool = get(selectedTool)
    return tool === "zoom"
  }
})
export const isColorPickingAtom = atom({
  key: 'isColorPickingAtom',
  default: false,
})

export const eraserSizeAtom = atom({
  key: 'eraserSizeAtom',
  default: 5,
  effects: [persistAtom],
})

export const pixelIdsWithinAreaSelector = selectorFamily<string[], 'eraser' | 'zoom'>({
  key: 'pixelIdsWithinAreaSelector',
  get: (id) => ({ get }) => {
    const currentPixelId = get(currentPixelAtom)
    const currentArtboardId = get(currentArtboardAtom)
    const pixelIds = get(pixelIdsSelector(currentArtboardId))
    const cols = get(columnsAtom)
    const rows = get(rowsAtom)
    const eraserSize = get(eraserSizeAtom)
    // if radius is for eraser, use eraser size. otherwise, use set radius for zoom area
    const radius = id === 'eraser' ? Math.floor(eraserSize / 2) : 2

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
    const ids = get(pixelIdsWithinAreaSelector('eraser'))
    ids.forEach(id => {
      const color = get(pixelColor(id))
      if (mouse.mouseDown) {
        set(prevPixelColor(id), color)
        set(pixelColor(id), '#ffffff')
        set(pixelOpacity(id), 1)
      } else {
        set(pixelOpacity(id), mouse.mouseLeave ? 1 : 0.5)
      }
    })
  }
})

export const highlightPixelsWithinAreaSelector = selector<{mouseLeave: boolean}>({
  key: 'highlightPixelsWithinAreaSelector',
  get: () => ({mouseLeave: true}),
  set: ({ get, set }, mouse) => {
    const canZoom = get(canZoomSelector)
    if (!canZoom) return
    if (mouse instanceof DefaultValue) return
    const ids = get(pixelIdsWithinAreaSelector('zoom'))
    ids.forEach(id => {
      set(pixelOpacity(id), mouse.mouseLeave ? 1 : 0.5)
    })
  }
})

export const fillSelector = selector({
  key: 'fillSelector',
  get: () => '',
  set: ({get, set}, newColor) => {
    const currentArtboardId = get(currentArtboardAtom)
    const ids = get(pixelIdsSelector(currentArtboardId))
    const currentPixelId = get(currentPixelAtom)
    const currentColor = get(pixelColor(currentPixelId))
    const coloredPixels = ids.filter(id => {
      const color = get(pixelColor(id))
      return color === currentColor
    })
    coloredPixels.forEach(id => {
      set(pixelColor(id), newColor)
    })
  }
})
