import React from "react";
import { Button } from "components";
import { CirclePicker, ColorResult, SketchPicker } from 'react-color';
import { useRecoilState, useRecoilValue } from "recoil";
import { brushColorAtom, isColorPickingAtom, presetColorsAtom } from "state";
import './ColorPanel.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeDropper } from "@fortawesome/free-solid-svg-icons";

export const ColorPanel = ({label}: {label: string}) => {
  const [color, setColor] = useRecoilState(brushColorAtom)
  const presetColors = useRecoilValue(presetColorsAtom)
  const [isPicking, setIsPicking] = useRecoilState(isColorPickingAtom)

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
      <div className="ColorPanel__picker">
        <span className="ColorPanel__label">Current Color</span>
        <Button kind={isPicking ? 'secondary' : 'text'} onClick={() => setIsPicking(!isPicking)}><FontAwesomeIcon icon={faEyeDropper} /></Button>
      </div>
        <div className="ColorPanel__current-color" style={{background: color}} />
      <span className="ColorPanel__label">Recently used</span>
      <div className="ColorPanel__preset-colors">
        <CirclePicker width="220px" colors={presetColors} onChange={handleChange} />
      </div>
    </div>
  )
}