// JavaScript code for generating the grouped bar chart
document.addEventListener('DOMContentLoaded', function () {
    const years = Array.from({ length: 9 }, (_, i) => (2013 + i).toString());
    let ctx;
    let myChart;

    // Function to get a color for each year
    function getColorForYear(yearIndex) {
        const colors = [
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(201, 203, 207, 0.5)',
            'rgba(120, 180, 120, 0.5)',
            'rgba(220, 120, 120, 0.5)'
        ];

        return colors[yearIndex];
    }

    // Function to generate random numbers between 500 million and 6 billion
    function getRandomProgramPayments() {
        return Math.floor(Math.random() * (10000000000 - 500000000 + 1)) + 500000000;
    }

    // Generate a separate dataset for age-related chart
    const ageRanges = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64'];
    const ageDataset = ageRanges.map(() => getRandomProgramPayments());

    // Function to destroy the existing chart
    function chartDestroy() {
        if (myChart) {
            myChart.destroy();
            myChart = undefined;
        }
    }

    // Event listener for button click
    document.getElementById('enter').addEventListener('click', function () {
        const selectedValue = document.getElementById('demographic').value;

        chartDestroy();
        if (selectedValue === 'race') {
            // Create the race-related grouped bar chart
            ctx = document.getElementById('myChart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['White', 'Black', 'Asian', 'Hispanic', 'American-Indian', 'Other', 'Unknown'],
                    datasets: years.map((year, yearIndex) => {
                        return {
                            label: year,
                            data: Array.from({ length: 7 }, () => getRandomProgramPayments()),
                            backgroundColor: getColorForYear(yearIndex),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        };
                    }),
                },
                options: getChartOptions('Race')
            });
        } else if (selectedValue === 'age') {
            // Create the age-related grouped bar chart
            ctx = document.getElementById('myChart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ageRanges,
                    datasets: years.map((year, yearIndex) => {
                        return {
                            label: year,
                            data: ageDataset,
                            backgroundColor: getColorForYear(yearIndex),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        };
                    }),
                },
                options: getChartOptions('Age Range')
            });
        } else if (selectedValue === 'sex') {
            // Create the sex-related grouped bar chart
            ctx = document.getElementById('myChart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Males', 'Females'],
                    datasets: years.map((year, yearIndex) => {
                        return {
                            label: year,
                            data: Array.from({ length: 2 }, () => getRandomProgramPayments()),
                            backgroundColor: getColorForYear(yearIndex),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        };
                    }),
                },
                options: getChartOptions('Sex')
            });
        }
    });

    // Function to get common chart options
    function getChartOptions(xAxisTitle) {
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
                        text: 'Program Payments'
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
});
