import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const Graph = (props) => {

    const { dataForChart } = props

    const chartRef = useRef(null)


    const data = {
        labels: dataForChart.labels,
        datasets: [{

            data: dataForChart.dataSet,
            backgroundColor: ["#1f77b4",
                "#ff7f0e",
                "#2ca02c",
                "#d62728",
                "#9467bd",
                "#8c564b",
                "#e377c2",
                "#7f7f7f",
                "#bcbd22",
                "#17becf",
                "#1f77b4",
                "#ff7f0e",
                "#2ca02c",
                "#d62728",
                "#9467bd"],
            hoverOffset: 10
        }]
    }

    useEffect(() => {
        if (chartRef.current) {
            const chart = new Chart(chartRef.current, {
                type: "doughnut",
                options: {
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index
                            const label = chart.data.labels[index]
                            const value = chart.data.datasets[0].data[index]
                            //elements[0].element.options.offset = 50
                            //console.log(index)
                            //console.log(label)
                            //console.log(value)
                            //console.log(elements[0].element)
                        }
                    },
                    animation: true,
                    plugins: {
                        legend: {
                            display: true
                        }
                    },
                    cutout: 65,
                    responsive: true,
                    maintainAspectRatio: false,
                    width: '50%',
                    height: '50%'


                },
                data: data
            });

            return () => {

                chart.destroy();
            };
        }
    }, [dataForChart]);


    return <canvas ref={chartRef} />;
};

export default Graph;