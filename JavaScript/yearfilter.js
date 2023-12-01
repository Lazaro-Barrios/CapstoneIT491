function filterChartData(chart, chartData, selectedYears, allYears, originalLabels) {
    const filteredData = chartData.map(dataset => {
        return {
            label: dataset.label,
            data: dataset.data.filter((data, index) => selectedYears.includes(allYears[index])),
            backgroundColor: dataset.backgroundColor,
            borderColor: dataset.borderColor,
            borderWidth: dataset.borderWidth
        };
    });

    chart.data.datasets = filteredData;
    chart.data.labels = originalLabels;

    chart.update();
}
function getChartOptions(xAxisTitle, yAxisTitle) {
    return {
        scales: {
            x: {
                title: {
                    display: true,
                    text: xAxisTitle
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: yAxisTitle
                }
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
            }
        }
    };
}


function createChart(chartId, data, originalLabels, selectedYears, allYears, xAxisTitle, yAxisTitle) {
    
    const ctx = document.getElementById(chartId).getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: originalLabels,
            datasets: data.map((dataset, index) => {
                return {
                    label: dataset.label,
                    data: selectedYears.map(year => dataset.data[allYears.indexOf(year)]),
                    backgroundColor: dataset.backgroundColor,
                    borderColor: dataset.borderColor,
                    borderWidth: dataset.borderWidth
                };
            }),
        },
        options: getChartOptions(xAxisTitle, yAxisTitle)
    });

    return myChart;
}

document.addEventListener('DOMContentLoaded', function () {
    const dataset = [
        // Your dataset here
    ];

    const years = Array.from({ length: 9 }, (_, i) => (2013 + i).toString());
    const originalLabels = ['White', 'Black', 'Asian', 'Hispanic', 'American-Indian', 'Other', 'Unknown'];

    let ctx;
    let myChart;

    function chartDestroy(chart) {
        if (chart) {
            chart.destroy();
        }
    }

    document.getElementById('filterButton').addEventListener('click', function () {
        const selectedYears = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(checkbox => checkbox.value);
        const allYears = years;

        chartDestroy(myChart);
        myChart = createChart('myChart', dataset, originalLabels, selectedYears, allYears, 'Race');
    });

    // Add similar code for Medicare Enrollees chart

    document.getElementById('filterButtonMedicare').addEventListener('click', function () {
        const selectedYearsMedicare = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(checkbox => checkbox.value);
        const allYearsMedicare = years;

        chartDestroy(myChartMedicare);
        myChartMedicare = createChart('myChartMedicare', MedicareData, originalLabels, selectedYearsMedicare, allYearsMedicare, 'Race', 'Medicare Enrollees');
    });

    
});

