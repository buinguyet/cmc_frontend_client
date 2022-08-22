import { useEffect, useState } from 'react';
import './App.css';
import ClientComponent from './components/ClientComponents';
import io from 'socket.io-client';
import { INITIAL_DATA } from './components/constant';

const socket = io(`${process.env.REACT_APP_SERVER_END_POINT}`);

function App() {
  // init socket
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      < ClientComponent socket={socket} initialData={INITIAL_DATA} />
    </div>
  )
}

export default App;
