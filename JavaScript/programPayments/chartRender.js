let multiBarChart;

// Function for a multi-bar chart visualizing program payments across different years using Chart.js
function renderMultiBarGraph(allYearsData) {
    const ctx = document.getElementById('multiBarChart').getContext('2d');

    if(multiBarChart) {
        multiBarChart.destroy();
    }

    const years = allYearsData.DATA.map(row => row[0]);
    const colors = [
        { bg: 'rgb(0, 123, 255)', border: 'rgb(0, 123, 255)' }, // Blue
        { bg: 'rgb(220, 53, 69)', border: 'rgb(220, 53, 69)' }, // Red
        { bg: 'rgb(40, 167, 69)', border: 'rgb(40, 167, 69)' }, // Green
        { bg: 'rgb(255, 193, 7)', border: 'rgb(255, 193, 7)' }  // Yellow
    ];
    
    const datasets = allYearsData.COLUMNS.slice(1).map((column, columnIndex) => ({
        label: column,
        data: allYearsData.DATA.map(row => row[columnIndex + 1]),
        backgroundColor: colors[columnIndex].bg,
        borderColor: colors[columnIndex].border,
        borderWidth: 1
    }));

    multiBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: datasets
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += '$' + context.parsed.y.toLocaleString();
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            const valueInBillions = value / 1000000000;
                            return value >= 1000000000 
                                ? '$' + valueInBillions + ' Billion' 
                                : '$' + valueInBillions.toFixed(2) + ' Billion';
                        },
                        autoSkip: false,
                        min: 0,
                        max: 25,
                        values: [0, 5, 10, 15, 20, 25]
                    },
                    title: {
                        display: true,
                        text: 'Total Program Payments (Billions)',
                        color: '#000',
                        font: {
                            size: 20
                        },
                        padding: {
                            top: 20,
                            bottom: 20
                        }
                    }
                },
                x: {
                    barPercentage: 1.2,
                    title: {
                        display: true,
                        text: 'Year',
                        color: '#000',
                        font: {
                            size: 20
                        },
                        padding: {
                            top: 20,
                            bottom: 20
                        }
                    }
                }
            }
        }
    });
}
