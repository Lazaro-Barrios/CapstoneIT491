// JavaScript code for generating the "Medicare Enrollees" chart
const yearsMedicare = Array.from({ length: 9 }, (_, i) => (2013 + i).toString());
const medicareData = [32412433, 34534535, 35674534, 37845634, 34545633, 32334434, 31243435, 33345634, 34634535];
let myChartMedicare;
let myChartMedicare2;
let myChartMedicare3;
let myChartMedicare4;
let myChartMedicare5;
let myChartMedicare6;
let ctxMedicare;
let ctxMedicare2;
let ctxMedicare3;
let ctxMedicare4;
let ctxMedicare5;
let ctxMedicare6;

// Destroy function to destroy all Medicare Enrollees charts
function destroyMedicareCharts() {
  if (myChartMedicare) {
    myChartMedicare.destroy();
  }
  if (myChartMedicare2) {
    myChartMedicare2.destroy();
  }
  if (myChartMedicare3) {
    myChartMedicare3.destroy();
  }
  if (myChartMedicare4) {
    myChartMedicare4.destroy();
  }
  if (myChartMedicare5) {
    myChartMedicare5.destroy();
  }
  if (myChartMedicare6) {
    myChartMedicare6.destroy();
  }
}

document.getElementById('enter').addEventListener('click', function () {
    const selectedValue = document.getElementById('demographic').value;
    let chartData = [];

    // Check the selected value and generate the corresponding chart
    if (selectedValue === 'race') {
        // Destroy any existing Medicare Enrollees charts before creating new ones
        destroyMedicareCharts();

        // Create a chart using Chart.js for Medicare Enrollees
        ctxMedicare = document.getElementById('myChartMedicare').getContext('2d');
        myChartMedicare = new Chart(ctxMedicare, {
            type: 'bar',
            data: {
                labels: yearsMedicare,
                datasets: [
                    {
                        label: 'White',
                        data: medicareData,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Black',
                        data: medicareData,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Asian',
                        data: medicareData,
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Hispanic',
                        data: medicareData,
                        backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'American-Indian',
                        data: medicareData,
                        backgroundColor: 'rgba(255, 159, 64, 0.5)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Other',
                        data: medicareData,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Unknown',
                        data: medicareData,
                        backgroundColor: 'rgba(201, 203, 207, 0.5)',
                        borderColor: 'rgba(201, 203, 207, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        stacked: false,
                        title: {
                            display: true,
                            text: 'Years'
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
      // Destroy any existing Medicare Enrollees charts before creating new ones
destroyMedicareCharts();

// Create the main chart
ctxMedicare = document.getElementById('myChartMedicare').getContext('2d');
myChartMedicare = new Chart(ctxMedicare, {
    type: 'bar',
    data: {
        labels: yearsMedicare,
        datasets: [
            {
                label: 'Under18',
                data: medicareData, // Replace with actual data for 'Under18'
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Years'
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

// Create individual charts for the remaining age categories
ctxMedicare2 = document.getElementById('myChartMedicare2').getContext('2d');
myChartMedicare2 = new Chart(ctxMedicare2, {
    type: 'bar',
    data: {
        labels: yearsMedicare,
        datasets: [
            {
                label: '18-24',
                data: medicareData, // Replace with actual data for '18-24'
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Years'
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


// Create individual charts for the remaining age categories
ctxMedicare3 = document.getElementById('myChartMedicare3').getContext('2d');
myChartMedicare3 = new Chart(ctxMedicare3, {
    type: 'bar',
    data: {
        labels: yearsMedicare,
        datasets: [
            {
                label: '25-34',
                data: medicareData, 
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Years'
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

// Create a chart for the '35-44' age category
ctxMedicare4 = document.getElementById('myChartMedicare4').getContext('2d');
myChartMedicare4 = new Chart(ctxMedicare4, {
    type: 'bar',
    data: {
        labels: yearsMedicare,
        datasets: [
            {
                label: '35-44',
                data: medicareData, 
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Years'
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

// Create a chart for the '45-54' age category
ctxMedicare5 = document.getElementById('myChartMedicare5').getContext('2d');
myChartMedicare5 = new Chart(ctxMedicare5, {
    type: 'bar',
    data: {
        labels: yearsMedicare,
        datasets: [
            {
                label: '45-54',
                data: medicareData, 
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Years'
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

// Create a chart for the '55-64' age category
ctxMedicare6 = document.getElementById('myChartMedicare6').getContext('2d');
myChartMedicare6 = new Chart(ctxMedicare6, {
    type: 'bar',
    data: {
        labels: yearsMedicare,
        datasets: [
            {
                label: '55-64',
                data: medicareData, 
                backgroundColor: 'rgba(201, 203, 207, 0.5)',
                borderColor: 'rgba(201, 203, 207, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Years'
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
        // Destroy any existing Medicare Enrollees charts before creating new ones
        destroyMedicareCharts();

        // Create a chart for males
        ctxMedicare2 = document.getElementById('myChartMedicare2').getContext('2d');
        myChartMedicare2 = new Chart(ctxMedicare2, {
            type: 'bar',
            data: {
                labels: yearsMedicare,
                datasets: [
                    {
                        label: 'Males',
                        data: medicareData, // Replace with actual male data
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Years'
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

        // Create a chart for females
        ctxMedicare3 = document.getElementById('myChartMedicare3').getContext('2d');
        myChartMedicare3 = new Chart(ctxMedicare3, {
            type: 'bar',
            data: {
                labels: yearsMedicare,
                datasets: [
                    {
                        label: 'Females',
                        data: medicareData, // Replace with actual female data
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Years'
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

// Destroy function to destroy all Medicare Enrollees charts
function destroyMedicareCharts() {
  if (myChartMedicare) {
    myChartMedicare.destroy();
  }
  if (myChartMedicare2) {
    myChartMedicare2.destroy();
  }
  if (myChartMedicare3) {
    myChartMedicare3.destroy();
  }
  if (myChartMedicare4) {
    myChartMedicare4.destroy();
  }
  if (myChartMedicare5) {
    myChartMedicare5.destroy();
  }
  if (myChartMedicare6) {
    myChartMedicare6.destroy();
  }
}


