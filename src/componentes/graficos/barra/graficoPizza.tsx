import { Pie } from "react-chartjs-2";

interface Props<T> {
    dados: T[];
    getLabel: (item: T) => string;
    getValue: (item: T) => number;
    titulo?: string;
}

export function GraficoPizza<T>({
    dados,
    getLabel,
    getValue,
    titulo
}: Props<T>) {

    if (!dados || dados.length === 0) {
        return <p className="text-center text-muted">Sem dados para exibir</p>;
    }

    const data = {
        labels: dados.map(getLabel),
        datasets: [
            {
                data: dados.map(getValue),
                backgroundColor: [
                    "#c6c6c6ff",
                    "#54a0f2ff",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom" as const,
            },
            title: {
                display: !!titulo,
                text: titulo,
                font: { size: 16, weight: "bold" },
            },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => {
                        const value = ctx.raw as number;
                        const total = ctx.dataset.data.reduce(
                            (acc: number, v: number) => acc + v,
                            0
                        );
                        const percent = ((value / total) * 100).toFixed(1);
                        return `${ctx.label}: ${value} (${percent}%)`;
                    }
                }
            }
        }
    };

    return (
        <div style={{ height: 300 }}>
            <Pie data={data}  />
        </div>
    );
}
