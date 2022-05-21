import React from "react";
import { useRecoilValue } from "recoil";
import { pixelColor, pixelIdsWithinAreaSelector } from "state";
import './ZoomArea.scss'

export const ZoomArea = () => {
  const zoomedPixels = useRecoilValue(pixelIdsWithinAreaSelector('zoom'))

  return (
    <div className="ZoomArea">
      <h5>Zoom Area</h5>
      <div className="ZoomArea__grid">
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