import React from "react";
import { Button } from "components";
import './ArtboardTabs.scss'
import { useRecoilState } from "recoil";
import { artboardIdsAtom, currentArtboardAtom } from "state";
import { v4 as uuid } from 'uuid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const ArtboardTabs = () => {
  const [selectedArtboardId, setSelectedArtboardId] = useRecoilState(currentArtboardAtom)
  const [artboardIds, setArtboardIds] = useRecoilState(artboardIdsAtom)

  const createNewArtboard = () => {
    const newId = uuid()
    setArtboardIds(prevIds => [...prevIds, newId])
    setSelectedArtboardId(newId)
  }

  return (
    <div className="ArtboardTabs">
      {artboardIds.map(id => (
        <Button
          key={id}
          kind={id === selectedArtboardId ? 'secondary' : 'text'}
          onClick={() => setSelectedArtboardId(id)}
        >{id}</Button>
      ))}
      <Button kind="text" onClick={createNewArtboard}>
        <div className="ArtboardTabs__new-artboard">
          <FontAwesomeIcon icon={faPlusCircle} />
          New artboard
        </div>
      </Button>
    </div>
  )
}