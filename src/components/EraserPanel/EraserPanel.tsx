import React from "react";
import { useRecoilState } from "recoil";
import { eraserSizeAtom } from "state";
import './EraserPanel.scss'

export const EraserPanel = () => {
  const [eraserSize, setEraserSize] = useRecoilState(eraserSizeAtom)
  return (
    <div className="EraserPanel">
      <h5>Eraser Panel</h5>
      <label>
        Size
        <input type="range" min={1} max={7} step={2} value={eraserSize} onChange={e => setEraserSize(parseInt(e.target.value))} />
      </label>
    </div>
  )
}