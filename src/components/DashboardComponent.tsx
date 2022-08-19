import React, { useState, useEffect } from "react"
import type { IData } from "./types";
import { BarChart } from "./BarChart";

const BAR_CHART_DATA: IData[] = [
    { label: "Orange", value: 0, color: 'hsl(15, 100%, 70%)' },
    { label: "Blue", value: 0, color: 'hsl(195, 74%, 62%)' },
];


function DashboardComponent(props: any) {
    const [data, setData] = useState(BAR_CHART_DATA);
    const { socket } = props;

    useEffect(() => {
        const newData= BAR_CHART_DATA.map(item=> ({...item, isDashboard: true}))
        socket.emit("count", newData);
      }, []);

    useEffect(() => {
        socket.on("count", (data: IData[]) => {
            console.log("data: ", data);
            setData(data);
        })
    }, [socket])

    return (
        <React.Fragment>
            <div style={{ display: "flex", marginLeft: '15%', flex: 5 }}>
                <h2>Bar chart</h2>
                <BarChart data={data} />
            </div>
        </React.Fragment>
    )
}

export default DashboardComponent;