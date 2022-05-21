import React, { MouseEvent } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { brushColorAtom, canBrushSelector, canEraseSelector, currentPixelAtom, pixelColor, erasePixelsWithinAreaSelector, presetColorsAtom, pixelOpacity, prevPixelColor, canFillSelector, fillSelector, highlightPixelsWithinAreaSelector, canZoomSelector } from "state";
import './Pixel.scss'

export const Pixel = ({id}: {id: string}) => {
  const setCurrentPixel = useSetRecoilState(currentPixelAtom)
  const [color, setColor] = useRecoilState(pixelColor(id))
  const [prevColor, setPrevColor] = useRecoilState(prevPixelColor(id))
  const [opacity, setOpacity] = useRecoilState(pixelOpacity(id))
  const brushColor = useRecoilValue(brushColorAtom)
  const canBrush = useRecoilValue(canBrushSelector)
  const canErase = useRecoilValue(canEraseSelector)
  const canFill = useRecoilValue(canFillSelector)
  const canZoom = useRecoilValue(canZoomSelector)
  const setPresetColors = useSetRecoilState(presetColorsAtom)
  const setErasePixels = useSetRecoilState(erasePixelsWithinAreaSelector)
  const setHighlightPixels = useSetRecoilState(highlightPixelsWithinAreaSelector)
  const setFill = useSetRecoilState(fillSelector)

  const colorPixel = () => {
    if (canFill) {
      setFill(brushColor)
    }
    if (canBrush) {
      setColor(brushColor)
      setOpacity(1)
    }
    if (canErase) {
      setErasePixels({mouseDown: true, mouseLeave: false})
    }
    setPresetColors(prevColors => {
      const isNewColor = prevColors.every(color => color !== brushColor)
      if (isNewColor) {
        return [...prevColors, brushColor]
      }
      return prevColors
    })
  }

  const hoverPixel = () => {
    if (canZoom) {
      setHighlightPixels({mouseLeave: false})
    }
    if (canBrush) {
      setColor(brushColor)
      setOpacity(0.5)
      setPrevColor(color)
    }
    if (canErase) {
      setErasePixels({mouseDown: false, mouseLeave: false})
    }
  }

  const handleMouseDown = () => {
    colorPixel()
  }

  const handleMouseUp = () => {
    if (!(canBrush || canErase)) return
    setPrevColor(brushColor)
  }

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    setCurrentPixel(id)
    e.stopPropagation()
    const mouseDown = e.buttons === 1
    // if left mouse button is clicked
    if (mouseDown) {
      colorPixel()
    } else { // if no buttons are clicked
      hoverPixel()
    }
  }

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const mouseDown = e.buttons === 1
    if (canBrush) {
      const newColor = mouseDown ? brushColor : prevColor
      setColor(newColor)
    }
    if (canErase) {
      setErasePixels({mouseDown, mouseLeave: true})
    }
    if (canZoom) {
      setHighlightPixels({mouseLeave: true})
    }
    setOpacity(1)
  }


  return (
    <div
      className="Pixel"
      style={{ background: color, opacity }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}