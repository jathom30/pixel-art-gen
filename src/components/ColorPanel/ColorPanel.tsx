import React from "react";
import { CirclePicker, ColorResult, SketchPicker } from 'react-color';
import { useRecoilState, useRecoilValue } from "recoil";
import { brushColorAtom, presetColorsAtom } from "state";
import './ColorPanel.scss'

export const ColorPanel = ({label}: {label: string}) => {
  const [color, setColor] = useRecoilState(brushColorAtom)
  const presetColors = useRecoilValue(presetColorsAtom)

  const handleChange = (color: ColorResult) => {
      setColor(color.hex)
  }

  return (
    <div className="ColorPanel">
      <h5>{label}</h5>
      <span className="ColorPanel__label">Color Picker</span>
      <SketchPicker
        color={color}
        onChange={handleChange}
        disableAlpha
        presetColors={[]}
      />
      <span className="ColorPanel__label">Current Color</span>
      <div className="ColorPanel__current-color" style={{background: color}} />
      <span className="ColorPanel__label">Recently used</span>
      <div className="ColorPanel__preset-colors">
        <CirclePicker width="220px" colors={presetColors} onChange={handleChange} />
      </div>
    </div>
  )
}