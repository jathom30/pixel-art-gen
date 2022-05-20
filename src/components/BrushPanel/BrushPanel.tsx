import React from "react";
import { CirclePicker, ColorResult, SketchPicker } from 'react-color';
import { useRecoilState, useRecoilValue } from "recoil";
import { brushColorAtom, presetColorsAtom } from "state";
import './BrushPanel.scss'

export const BrushPanel = () => {
  const [color, setColor] = useRecoilState(brushColorAtom)
  const presetColors = useRecoilValue(presetColorsAtom)

  const handleChange = (color: ColorResult) => {
      setColor(color.hex)
  }

  return (
    <div className="BrushPanel">
      <h5>Brush Panel</h5>
      <span className="BrushPanel__label">Color Picker</span>
      <SketchPicker
        color={color}
        onChange={handleChange}
        disableAlpha
        presetColors={[]}
      />
      <span className="BrushPanel__label">Recently used</span>
      <div className="BrushPanel__preset-colors">
        <CirclePicker width="220px" colors={presetColors} onChange={handleChange} />
      </div>
    </div>
  )
}