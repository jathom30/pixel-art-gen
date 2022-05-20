import React from "react";
import { faEraser, faEye, faEyeSlash, faFill, faPaintbrush, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { selectedTool, showGridAtom } from "state";
import { Button } from 'components';
import { Tool } from "typings";
import './ToolSelection.scss'

const tools: {label: Tool; icon: IconDefinition}[] = [
  {
    label: 'brush',
    icon: faPaintbrush,
  },
  {
    label: 'eraser',
    icon: faEraser,
  },
  {
    label: 'fill',
    icon: faFill,
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