import { IData } from "./types";

export const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);

export const getDataChart = (label: string, data: IData[]) => ({
    labels: data.map(item => item.label),
    datasets: [
        {
            label: label,
            data: data.map(item => item.value),
            backgroundColor: data.map(item => item.color),
            borderWidth: 1,
        },
    ],
});