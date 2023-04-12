import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const Graph = (props) => {

    const { dataForChart } = props

    const chartRef = useRef(null)


    const data = {
        labels: dataForChart.labels,
        datasets: [{
            
            data: dataForChart.dataSet,
            backgroundColor: [
                "#003f5c",
                "#2f4b7c",
                "#665191",
                "#a05195",
                "#d45087",
                "#f95d6a",
                "#ff7c43",
                "#ffa600",
                "#8FB7B4",
                "#C6DEB7",
                "#F6EDD1",
                "#F5B895",
                "#F492B4",
                "#B2B2B2",
                "#52656B"
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