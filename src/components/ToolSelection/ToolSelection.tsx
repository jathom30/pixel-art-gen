import React from "react";
import { faDownload, faEraser, faEye, faEyeSlash, faFill, faMagnifyingGlass, faPaintbrush, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useSetRecoilState } from "recoil";
import { saveImageAtom, selectedTool, showGridAtom } from "state";
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
  {
    label: 'zoom',
    icon: faMagnifyingGlass,
  },
]

export const ToolSelection = () => {
  const [tool, setTool] = useRecoilState(selectedTool)
  const [showGrid, setShowGrid] = useRecoilState(showGridAtom)
  const setSaveImage = useSetRecoilState(saveImageAtom)

  return (
    <div className="ToolSelection">
      <div className="ToolSelection__tools">
        {tools.map(t => (
          <Button key={t.label} kind={t.label === tool ? 'primary' : 'secondary'} onClick={() => setTool(t.label)}><FontAwesomeIcon icon={t.icon} /></Button>
        ))}
      </div>
      <div className="ToolSelection__tools">
        <Button kind="text" onClick={() => setShowGrid(prevShow => !prevShow)}>
          <FontAwesomeIcon icon={!showGrid ? faEye : faEyeSlash} />
        </Button>
        <Button kind="primary" onClick={() => setSaveImage(true)}>
          <FontAwesomeIcon icon={faDownload} />
        </Button>
      </div>
    </div>
  )
}