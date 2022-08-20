import { useEffect, useState } from 'react';
import './App.css';
import ClientComponent from './components/ClientComponents';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import DashboardComponent from './components/DashboardComponent';

const socket = io("http://localhost:8000");

function App() {
  // init socket
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={< ClientComponent socket={socket} />}></Route>
          <Route path='/client' element={< ClientComponent socket={socket} />}></Route>
          <Route path='/dashboard' element={< DashboardComponent socket={socket} />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
