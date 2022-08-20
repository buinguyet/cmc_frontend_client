import React from "react"
import { Socket } from 'socket.io-client';
import type { IData } from "./types";

interface ICLientComponent {
  socket: Socket,
  initialData: IData[],
}

function ClientComponent(props: ICLientComponent) {
  const { socket, initialData } = props;

  const handleClickColor = (async (colorData: IData) => {
    socket.emit("count", colorData);
  });

  return (
    <React.Fragment>
      <h1>Let count color!!!</h1>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center' }}>
        {
          initialData.map((dataItem: IData, index: number) => ((
            <button key={index} className="btn fourth"
              onClick={() => handleClickColor(dataItem)}
              style={{
                borderColor: dataItem.color,
                backgroundImage: `-webkit-linear-gradient(45deg, ${dataItem.color} 50%, transparent 50%)`
              }}>
              Click me!!</button>
          )))
        }

      </div>


    </React.Fragment>
  )
}

export default ClientComponent;