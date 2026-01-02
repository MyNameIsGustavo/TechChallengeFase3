import { Line } from "react-chartjs-2";

interface Props<T> {
    dados: T[];
    getLabel: (item: T) => string;
    getValue: (item: T) => number;
    titulo?: string;
}

export function GraficoLinha<T>({ dados, getLabel, getValue, titulo }: Props<T>) {

    const data = {
        labels: dados.map(getLabel),
        datasets: [
            {
                label: "Postagens",
                data: dados.map(getValue),
                borderColor:  "rgba(6, 155, 255, 0.6)",
                backgroundColor:  "rgba(54, 162, 235, 0.6)",
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Postagens por mês",
            },
        },
    };

    return <Line data={data} options={options} />;
}
