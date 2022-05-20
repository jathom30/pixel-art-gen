import React from "react";
import { faArrowPointer, faEraser, faEye, faEyeSlash, faFill, faPaintbrush, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedTool, showGridAtom } from "state";
import { Button } from 'components';
import { Tool } from "typings";
import './ToolSelection.scss'

const tools: {label: Tool; icon: IconDefinition}[] = [
  {
    label: 'pointer',
    icon: faArrowPointer,
  },
  {
    label: 'brush',
    icon: faPaintbrush,
  },
  {
    label: 'fill',
    icon: faFill,
  },
  {
    label: 'eraser',
    icon: faEraser,
  },
]

export const ToolSelection = () => {
  const [tool, setTool] = useRecoilState(selectedTool)
  const [showGrid, setShowGrid] = useRecoilState(showGridAtom)
  return (
    <div className="ToolSelection">
      <div className="ToolSelection__tools">
        {tools.map(t => (
          <Button key={t.label} kind={t.label === tool ? 'primary' : 'secondary'} onClick={() => setTool(t.label)}><FontAwesomeIcon icon={t.icon} /></Button>
        ))}
      </div>
      <Button onClick={() => setShowGrid(prevShow => !prevShow)}>
        <FontAwesomeIcon icon={!showGrid ? faEye : faEyeSlash} />
      </Button>
    </div>
  )
}