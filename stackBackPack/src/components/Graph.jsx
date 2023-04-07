import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const Graph = (props) => {

    const { dataForChart } = props

    const chartRef = useRef(null);

    const data = {
        labels: dataForChart.labels,
        datasets: [{
            label: 'My First Dataset',
            data: dataForChart.dataSet,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
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
                            var index = elements[0].index;
                            var label = chart.data.labels[index];
                            var value = chart.data.datasets[0].data[index];
                            //elements[0].element.options.offset = 50
                            console.log(index)
                            console.log(label)
                            console.log(value)
                            console.log(elements[0].element)
                        }
                    },
                    animation: false,
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