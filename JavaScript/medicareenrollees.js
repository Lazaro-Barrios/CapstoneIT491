// JavaScript code for generating the Medicare Enrollees chart
const yearsMedicare = Array.from({ length: 9 }, (_, i) => (2013 + i).toString());
let ctxMedicare;
let myChartMedicare;

// Function to generate random numbers for Medicare Enrollees chart
function getRandomMedicareEnrollees() {
    return Math.floor(Math.random() * (10000000000 - 500000000 + 1)) + 500000000;
}

// Function to get color for each year in Medicare Enrollees chart
function getColorForYearMedicare(yearIndex) {
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

// Generate a separate dataset for age-related chart
const ageMedicareData = Array.from({ length: 6 }, () => getRandomMedicareEnrollees());

// Function to destroy the existing Medicare Enrollees chart
function medicareChartDestroy() {
    if (myChartMedicare) {
        myChartMedicare.destroy();
        myChartMedicare = undefined;
    }
}

// Event listener for button click
document.getElementById('enter').addEventListener('click', function () {
    const selectedValue = document.getElementById('demographic').value;

    medicareChartDestroy();

    if (selectedValue === 'race') {
        // Create the race-related Medicare Enrollees chart
        ctxMedicare = document.getElementById('myChartMedicare').getContext('2d');
        myChartMedicare = new Chart(ctxMedicare, {
            type: 'bar',
            data: {
                labels: ['White', 'Black', 'Asian', 'Hispanic', 'American-Indian', 'Other', 'Unknown'],
                datasets: yearsMedicare.map((year, yearIndex) => {
                    return {
                        label: year,
                        data: Array.from({ length: 7 }, () => getRandomMedicareEnrollees()),
                        backgroundColor: getColorForYearMedicare(yearIndex),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    };
                }),
            },
            options: {
                scales: {
                    x: {
                        stacked: false,
                        title: {
                            display: true,
                            text: 'Race'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Medicare Enrollees'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    } else if (selectedValue === 'age') {
        // Create the age-related Medicare Enrollees chart
        ctxMedicare = document.getElementById('myChartMedicare').getContext('2d');
        myChartMedicare = new Chart(ctxMedicare, {
            type: 'bar',
            data: {
                labels: ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64'],
                datasets: yearsMedicare.map((year, yearIndex) => {
                    return {
                        label: year,
                        data: ageMedicareData,
                        backgroundColor: getColorForYearMedicare(yearIndex),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    };
                }),
            },
            options: {
                scales: {
                    x: {
                        stacked: false,
                        title: {
                            display: true,
                            text: 'Age Range'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Medicare Enrollees'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    } else if (selectedValue === 'sex') {
        // Create the sex-related Medicare Enrollees chart
        ctxMedicare = document.getElementById('myChartMedicare').getContext('2d');
        myChartMedicare = new Chart(ctxMedicare, {
            type: 'bar',
            data: {
                labels: ['Males', 'Females'],
                datasets: yearsMedicare.map((year, yearIndex) => {
                    return {
                        label: year,
                        data: Array.from({ length: 2 }, () => getRandomMedicareEnrollees()),
                        backgroundColor: getColorForYearMedicare(yearIndex),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    };
                }),
            },
            options: {
                scales: {
                    x: {
                        stacked: false,
                        title: {
                            display: true,
                            text: 'Sex'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Medicare Enrollees'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }
});



