import React from "react"
import { BAR_CHART_DATA } from "./constant";
import type { IData } from "./types";


function ClientComponent(props: any) {
  const { socket } = props;

  // delay func
  const delay = (ms:number) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handleClickColor = (async (colorData: IData) => {
    // delay 5s, then emit data
    await delay(5000);
    socket.emit("count", colorData);
  });

  return (
    <React.Fragment>
      <h1>Let count color!!!</h1>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center' }}>
        {
          BAR_CHART_DATA.map((dataItem: IData, index: number) => {
            return <button key={index} className="btn fourth" onClick={() => handleClickColor(dataItem)}
              style={{ borderColor: dataItem.color, backgroundImage: `-webkit-linear-gradient(45deg, ${dataItem.color} 50%, transparent 50%)` }}>
              Click me!!</button>
          })
        }

      </div>


    </React.Fragment>
  )
}

export default ClientComponent;