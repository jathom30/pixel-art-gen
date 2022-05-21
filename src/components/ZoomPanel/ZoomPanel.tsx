import React from "react";
import { useRecoilValue } from "recoil";
import { pixelColor, pixelIdsWithinAreaSelector } from "state";
import './ZoomPanel.scss'

export const ZoomPanel = () => {
  const zoomedPixels = useRecoilValue(pixelIdsWithinAreaSelector('zoom'))

  return (
    <div className="ZoomPanel">
      <h5>Zoom Panel</h5>
      <div className="ZoomPanel__grid">
        {zoomedPixels.map(id => (
          <DisplayPixel key={id} id={id} />
        ))}
      </div>
    </div>
  )
}

const DisplayPixel = ({id}: {id: string}) => {
  const color = useRecoilValue(pixelColor(id))
  return (
    <div className="DisplayPixel" style={{background: color}} />
  )
}