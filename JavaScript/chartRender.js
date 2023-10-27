let multiBarChart;

// Function for a multi-bar chart visualizing program payments across different years using Chart.js and the provided data.
function renderMultiBarGraph(allYearsData) {
    const ctx = document.getElementById('multiBarChart').getContext('2d');

    if(multiBarChart) {
        multiBarChart.destroy();
    }

    const years = allYearsData.DATA.map(row => row[0]);
    const datasets = [];
    
    const colors = [
        { bg: 'rgb(0, 123, 255)', border: 'rgb(0, 123, 255)' }, // Blue
        { bg: 'rgb(220, 53, 69)', border: 'rgb(220, 53, 69)' }, // Red
        { bg: 'rgb(40, 167, 69)', border: 'rgb(40, 167, 69)' }, // Green
        { bg: 'rgb(255, 193, 7)', border: 'rgb(255, 193, 7)' }  // Yellow
    ];
    
    allYearsData.COLUMNS.slice(1).forEach((column, columnIndex) => {
        const dataForColumn = allYearsData.DATA.map(row => row[columnIndex + 1]);
        datasets.push({
            label: column,
            data: dataForColumn,
            backgroundColor: colors[columnIndex].bg,
            borderColor: colors[columnIndex].border,
            borderWidth: 1
        });
    });

    multiBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: datasets
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        min: 0,
                        max: 25000000000, // 25 billion
                        stepSize: 200000000, // 20 million
                        callback: function(value, index, values) {
                            if (value >= 1000000000) { // if value is greater than or equal to one billion
                                return '$' + value / 1000000000 + ' Billion';
                            } 
                            else if (value >= 1000000) { // if value is greater than or equal to one million
                                return '$' + value / 1000000 + ' Million';
                            } 
                            else {
                                return '$' + value;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Total Program Payments',
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
