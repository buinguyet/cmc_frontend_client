import { useEffect, useState } from 'react';
import './App.css';
import FetchComponent from './components/FetchComponents';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
import DashboardComponent from './components/DashboardComponent';

const socket = io("http://localhost:8000");

function App() {
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
    <div className='container'>
      <Router>
        {/* <div> */}
          <ul>
            <li>
              <Link to="/">Client</Link>
            </li>
            <li>
              <Link to="/client">Client</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>

          <Routes>
            <Route path='/' element={< FetchComponent socket={socket} />}></Route>
            <Route path='/client' element={< FetchComponent socket={socket} />}></Route>
            <Route path='/dashboard' element={< DashboardComponent socket={socket} />}></Route>
          </Routes>
        {/* </div> */}
      </Router>
    </div>
  )
}

export default App;
