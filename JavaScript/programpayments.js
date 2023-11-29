// programpayments.js
let dataset = [
    6954321890, 2876543210, 1598746320, 2456789010, 1234567890,
    3789012345, 9876543210, 5432109876, 1209876543, 8765432109,
    2345678901, 5432109876, 9876543210, 6543210987, 1098765432,
    8765432109, 5432109876, 9012345678, 6789012345, 3210987654,
    5678901234, 8901234567, 4321098765, 7654321098, 2109876543,
    8765432109, 5432109876, 9012345678, 6789012345, 3210987654
];

const years = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];

document.addEventListener('DOMContentLoaded', function () {
    let ctx;
    let myChartProgramPayments;

   
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

        return colors[yearIndex % colors.length];
    }

    // Function to generate random numbers between 500 million and 6 billion
    function getRandomProgramPayments() {
        return Math.floor(Math.random() * (10000000000 - 500000000 + 1)) + 500000000;
    }

    // Generate a separate dataset for age-related chart
    const ageRanges = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64'];
    let ageDataset = ageRanges.map(() => getRandomProgramPayments());

    // Function to destroy the existing chart
    function chartDestroy() {
        if (myChartProgramPayments) {
            myChartProgramPayments.destroy();
            myChartProgramPayments = undefined;
        }
    }

    // Event listener for button click
    document.getElementById('enter').addEventListener('click', function () {
        const selectedValue = document.getElementById('demographic').value;

        chartDestroy();

        if (selectedValue === 'race') {
            // Create the race-related grouped bar chart
            dataset = Array.from({ length: 7 }, () => getRandomProgramPayments());
            ctx = document.getElementById('myChart').getContext('2d');
            myChartProgramPayments = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['White', 'Black', 'Asian', 'Hispanic', 'American-Indian', 'Other', 'Unknown'],
                    datasets: years.map((year, yearIndex) => {
                        return {
                            label: year,
                            data: dataset,
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
            myChartProgramPayments = new Chart(ctx, {
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
            myChartProgramPayments = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Male', 'Female'],
                    datasets: years.map((year, yearIndex) => {
                        return {
                            label: year,
                            data: dataset,
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

    document.getElementById('filterButton').addEventListener('click', function () {
        // Destroy the existing chart
        chartDestroy();
    
        // Create an array to store the selected years
        let newYears = [];
    
        // Determine the selected value
        const selectedValue = document.getElementById('demographic').value;
        let xAxis = [];
    
        // Loop through the years array
        years.forEach(year => {
            // Construct the corresponding checkbox ID
            let checkboxId = 'year' + year;
    
            // Check if the checkbox is checked
            let checkbox = document.getElementById(checkboxId);
            if (checkbox && checkbox.checked) {
                // If checked, add the year to the newYears array
                newYears.push(year);
            }
        });
    
        // Set xAxis based on the selected value
        if (selectedValue === 'sex') {
            xAxis = ['Male', 'Female'];
        } else if (selectedValue === 'age') {
            xAxis = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64'];
        } else if (selectedValue === 'race') {
            xAxis = ['White', 'Black', 'Asian', 'Hispanic', 'American-Indian', 'Other', 'Unknown'];
        }
    
        // Recreate the chart with selected years and consistent x-axis
        ctx = document.getElementById('myChart').getContext('2d');
        myChartProgramPayments = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: xAxis,
                datasets: newYears.map((year, yearIndex) => {
                    return {
                        label: year,
                        data: dataset,
                        backgroundColor: getColorForYear(yearIndex),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    };
                }),
            },
            options: getChartOptions('Program Payments')
        });
    });
    
    
    
    
}) 

