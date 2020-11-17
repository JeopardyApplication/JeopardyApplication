import React from 'react';
import BoardView from './componets/boardView';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className={'main-board-containter'}>
          <BoardView />
        </div>
      </header>
    </div>
  );
};

export default App;
