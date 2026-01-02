import { Bar } from "react-chartjs-2";

interface Props<T> {
    dados: T[];
    getLabel: (item: T) => string;
    getValue: (item: T) => number;
    titulo: string;
}

export function GraficoBarra<T>({
    dados,
    getLabel,
    getValue,
    titulo,
}: Props<T>) {
    const data = {
        labels: dados.map(getLabel),
        datasets: [
            {
                label: titulo,
                data: dados.map(getValue),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" as const },
            title: {
                display: true,
                text: titulo,
            },
        },
    };

    return <Bar data={data} options={options} />;
}
