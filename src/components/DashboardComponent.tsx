import React, { useState, useEffect } from "react"
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
import { Socket } from 'socket.io-client';
import { delay, getDataChart } from "./shared";
import StatusComponent from "./StatusComponent";
import type { IData } from "./types";

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

interface IDashboardComponent {
    socket: Socket,
    initialData: IData[],
}

function DashboardComponent(props: IDashboardComponent) {
    const { socket, initialData } = props;
    const initialDataChart = getDataChart('Color Count', initialData);

    const [data, setData] = useState(initialData);
    const [dataChart, setDataChart] = useState(initialDataChart);

    // when disconnect=> refresh data
    useEffect(() => {
        socket.emit("count", initialData);
    }, []);

    // on event count to update state
    useEffect(() => {
        socket.on("count", (onData: IData | IData[]) => {
            if (Array.isArray(onData)) {
                setData(onData);
            } else {
                const newData = data.map((obj: IData) => {
                    const newObj = { ...obj };

                    if (newObj.label === onData.label) {
                        return { ...newObj, value: newObj.value + 1 };
                    }

                    return newObj;
                });

                setData(newData);
            }
        })
    }, [data, socket]);

    // update chart after 5s
    useEffect(() => {
        const updateDataChart = async () => {
            await delay(5000);

            const dataChart = getDataChart('Color Count', data);

            setDataChart(dataChart);
        }

        updateDataChart();
    }, [data])

    return (
        <React.Fragment>
            <h1>Color Count Chart</h1>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
                {
                    data.map((item: IData, index: number) => (
                        <StatusComponent index={index} item={item} />
                    ))
                }
            </div>

            <div style={{ paddingTop: 20 }}>
                <Bar options={options} data={dataChart} />
            </div>
        </React.Fragment>
    )
}

export default DashboardComponent;