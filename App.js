import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VideoChat from './components/VideoChat';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/video-chat" component={VideoChat} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
