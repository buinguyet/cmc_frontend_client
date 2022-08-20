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

const initialDataChart = {
    labels: BAR_CHART_DATA.map(item => item.label),
    datasets: [
        {
            label: 'Color Count',
            data: BAR_CHART_DATA.map(item => item.value),
            backgroundColor: BAR_CHART_DATA.map(item => item.color),
            borderWidth: 1,
        },
    ],
};


function DashboardComponent(props: any) {
    const { socket } = props;
    const [data, setData] = useState(BAR_CHART_DATA);
    const [dataChart, setDataChart] = useState(initialDataChart);

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

    // func delay
    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    useEffect(() => {
        const updateDataChart = async () => {
            await delay(5000);

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

            setDataChart(dataChart);
        }

        updateDataChart()
    }, [data])

    return (
        <React.Fragment>
            <h1>Color Count Chart</h1>
            <div style={{ display: "flex", justifyContent: "row" }}>
                {
                    data.map((item: IData, index: number) => (
                        <div key={index} className='status__item' style={{
                            backgroundColor: item.color
                        }}>
                            <div className='status__item--image' >

                            </div>
                            <div className='status__item--info'>
                                <div className='status__item--info-title'>
                                    <h3>{item.label}</h3>
                                    <p>...</p>
                                </div>
                                <h2>{item.value} clicks</h2>
                            </div>
                        </div>
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