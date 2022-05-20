import React from "react";
import './Artboard.scss'
import { Pixel } from "components";
import { useRecoilValue } from "recoil";
import { columnsAtom, pixelIdsSelector, showGridAtom } from "state";



export const Artboard = () => {
  const showGrid = useRecoilValue(showGridAtom)
  const cols = useRecoilValue(columnsAtom)
  const pixelIds = useRecoilValue(pixelIdsSelector)
  
  return (
    <div className="Artboard" style={{gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: showGrid ? '1px' : 0}}>
      {pixelIds.map(id => (
        <Pixel key={id} id={id} />
      ))}
    </div>
  )
}