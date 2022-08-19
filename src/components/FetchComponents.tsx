import React, { useEffect, useState } from "react"
import StatusComponent from "./StatusComponent";
import type { IData } from "./types";

const BAR_CHART_DATA: IData[] = [
  { label: "Orange", value: 0, color: 'hsl(15, 100%, 70%)' },
  { label: "Blue", value: 0, color: 'hsl(195, 74%, 62%)' },
];


function FetchComponent(props: any) {
  const [data, setData] = useState(BAR_CHART_DATA);
  const { socket } = props;

  useEffect(() => {
    socket.emit("count", BAR_CHART_DATA);
  }, []);

  const handleClickColor = ((colorData: IData) => {
    const newData = data.map((obj: IData) => {
      if (obj.label === colorData.label) {
        return { ...obj, value: obj.value + 1 };
      }
      return obj;
    });
    setData(newData);
    socket.emit("count", newData);
  });

  return (
    <React.Fragment>
      {
        data.map((dataItem: IData, index) => {
          return <StatusComponent key={index} label={dataItem.label} value={dataItem.value} color={dataItem.color}
            handleClickColor={handleClickColor} />
        })
      }
    </React.Fragment>
  )
}

export default FetchComponent;