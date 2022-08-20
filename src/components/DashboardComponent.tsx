import React, { useState, useEffect } from "react"
import type { IData } from "./types";
import { BAR_CHART_DATA } from "./constant";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};


function DashboardComponent(props: any) {
    const { socket } = props;
    const [data, setData] = useState(BAR_CHART_DATA);

    // when disconnect=> refresh data
    useEffect(() => {
        socket.emit("count", BAR_CHART_DATA);
    }, []);

    // on event count to update state
    useEffect(() => {
        socket.on("count", (onData: IData | IData[]) => {
            if (Array.isArray(onData)) {     
                setData(onData);
            } else {
                const newData = data.map((obj: IData) => {
                    const newObj= {...obj};

                    if (newObj.label === onData.label) {
                        return { ...newObj, value: newObj.value + 1 };
                    }
                    
                    return newObj;
                });
                
                setData(newData);
            }
        })
    }, [data, socket]);

    // prepare data chart
    const dataChart = {
        labels: data.map(item => item.label),
        datasets: [
            {
                label: 'Color Count',
                data: data.map(item => item.value),
                backgroundColor: data.map(item => item.color),
                borderWidth: 1,
            },
        ],
    };


    return (
        <React.Fragment>
            <h1>Color Count Chart</h1>
            <div style={{ paddingTop: 20 }}>
                {/* <BarChart data={data} /> */}
                <Bar options={options} data={dataChart} />
            </div>
        </React.Fragment>
    )
}

export default DashboardComponent;