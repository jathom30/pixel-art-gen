import React, { useEffect, useRef } from "react";
import './Artboard.scss'
import { Pixel } from "components";
import { useRecoilState, useRecoilValue } from "recoil";
import { columnsAtom, pixelIdsSelector, saveImageAtom, showGridAtom } from "state";
import domtoimage from 'dom-to-image';

export const Artboard = () => {
  const artboardRef = useRef<HTMLDivElement>(null)
  const showGrid = useRecoilValue(showGridAtom)
  const cols = useRecoilValue(columnsAtom)
  const pixelIds = useRecoilValue(pixelIdsSelector)
  const [saveImage, setSaveImage] = useRecoilState(saveImageAtom)

  useEffect(() => {
    if (!artboardRef.current) return
    if (saveImage) {
      domtoimage.toJpeg(artboardRef.current, {quality: 0.95})
        .then(dataUrl => {
          const link = document.createElement('a')
          link.download = 'pixel-art.jpeg'
          link.href = dataUrl
          link.click()
        }).finally(() => setSaveImage(false))
    }
  }, [saveImage, setSaveImage])
  
  return (
    <div ref={artboardRef} className="Artboard" style={{gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: showGrid ? '1px' : 0}}>
      {pixelIds.map(id => (
        <Pixel key={id} id={id} />
      ))}
    </div>
  )
}