import React from "react";
import { CirclePicker, ColorResult, SketchPicker } from "react-color";
import { useRecoilState, useRecoilValue } from "recoil";
import { brushColorAtom, presetColorsAtom } from "state";
import './FillPanel.scss'

export const FillPanel = () => {
  const [color, setColor] = useRecoilState(brushColorAtom)
  const presetColors = useRecoilValue(presetColorsAtom)

  const handleChange = (color: ColorResult) => {
    setColor(color.hex)
  }

  return (
    <div className="FillPanel">
      <h5>Fill Panel</h5>
      <span className="FillPanel__label">Color Picker</span>
      <SketchPicker
        color={color}
        onChange={handleChange}
        disableAlpha
        presetColors={[]}
      />
      <span className="FillPanel__label">Recently used</span>
      <div className="FillPanel__preset-colors">
        <CirclePicker width="220px" colors={presetColors} onChange={handleChange} />
      </div>
    </div>
  )
}