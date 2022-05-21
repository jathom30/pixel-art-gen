
import React from 'react';
import { Artboard, EraserPanel, ToolSelection, ColorPanel, ZoomPanel, ArtboardTabs } from 'components';
import './App.scss';
import { useRecoilValue } from 'recoil';
import { currentArtboardAtom, selectedTool } from 'state';


function App() {
  const tool = useRecoilValue(selectedTool)
  const artboardId = useRecoilValue(currentArtboardAtom)

  return (
    <div className="App">
      <div className='App__panel App__panel--left'>
        <ToolSelection />
      </div>
      <div className="App__body">
        <div className="App__tabs">
          <ArtboardTabs />
        </div>
        <div className="App__artboard">
          <Artboard id={artboardId} />
        </div>
      </div>
      <div className='App__panel App__panel--right'>
        {tool === 'fill' && <ColorPanel label='Fill Panel' />}
        {tool === 'brush' && <ColorPanel label='Brush Panel' />}
        {tool === 'eraser' && <EraserPanel />}
        {tool === 'zoom' && <ZoomPanel />}
      </div>
    </div>
  );
}

export default App;
