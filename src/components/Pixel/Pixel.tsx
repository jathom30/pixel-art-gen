import React, { MouseEvent } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { brushColorAtom, canBrushSelector, canEraseSelector, currentPixelAtom, pixelColor, erasePixelsWithinAreaSelector, presetColorsAtom, pixelOpacity, prevPixelColor } from "state";
import './Pixel.scss'

export const Pixel = ({id}: {id: string}) => {
  const [color, setColor] = useRecoilState(pixelColor(id))
  const [prevColor, setPrevColor] = useRecoilState(prevPixelColor(id))
  const setCurrentPixel = useSetRecoilState(currentPixelAtom)
  const [opacity, setOpacity] = useRecoilState(pixelOpacity(id))
  const brushColor = useRecoilValue(brushColorAtom)
  const canBrush = useRecoilValue(canBrushSelector)
  const canErase = useRecoilValue(canEraseSelector)
  const setPresetColors = useSetRecoilState(presetColorsAtom)
  const setErasePixels = useSetRecoilState(erasePixelsWithinAreaSelector)

  const colorPixel = () => {
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
    if (!(canBrush || canErase)) return
    e.stopPropagation()
    const mouseDown = e.buttons === 1
    setCurrentPixel(id)
    // if left mouse button is clicked
    if (mouseDown) {
      colorPixel()
    } else 
    // if no buttons are clicked
    {
      hoverPixel()
    }
  }

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (!(canBrush || canErase)) return
    const mouseDown = e.buttons === 1
    if (canBrush) {
      const newColor = mouseDown ? brushColor : prevColor
      setColor(newColor)
    }
    // if (mouseDown) {
    setErasePixels({mouseDown, mouseLeave: true})
    // }
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