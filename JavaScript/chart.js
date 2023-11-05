// JavaScript code for generating the grouped bar chart
const years = Array.from({ length: 9 }, (_, i) => (2013 + i).toString());
const dataset = [1232212232, 1332838651, 3213221056, 1533328543, 32161268, 215300568, 1564216840, 1095468451, 541551368];
let ctx;
let ctx2;
let ctx3;
let ctx4;
let ctx5;
let ctx6;
let myChart;
let myChart2;
let myChart3;
let myChart4;
let myChart5;
let myChart6;

function chartDestroy() {
    // Check if each chart exists and destroy it if it does
    if (myChart) {
        myChart.destroy();
        myChart = undefined;
    }

    if (myChart2) {
        myChart2.destroy();
        myChart2 = undefined;
    }

    if (myChart3) {
        myChart3.destroy();
        myChart3 = undefined;
    }

    if (myChart4) {
        myChart4.destroy();
        myChart4 = undefined;
    }

    if (myChart5) {
        myChart5.destroy();
        myChart5 = undefined;
    }

    if (myChart6) {
        myChart6.destroy();
        myChart6 = undefined;
    }
}

document.getElementById('enter').addEventListener('click', function () {
    const selectedValue = document.getElementById('demographic').value;

    chartDestroy();
    if (selectedValue === 'race') {
        // Create the race-related chart
        ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'White',
                        data: dataset,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Black',
                        data: dataset,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Asian',
                        data: dataset,
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Hispanic',
                        data: dataset,
                        backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'American-Indian',
                        data: dataset,
                        backgroundColor: 'rgba(255, 159, 64, 0.5)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Other',
                        data: dataset,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Unknown',
                        data: dataset,
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
                            text: 'Program Payments'
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
        // Create individual charts for age categories
        ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Under 18',
                        data: dataset, // Replace with actual data for Under 18
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
                            text: 'Program Payments'
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

        ctx2 = document.getElementById('myChart2').getContext('2d');
        myChart2 = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    {
                        label: '18-24',
                        data: dataset, // Replace with actual data for 18-24
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
                            text: 'Program Payments'
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

        ctx3 = document.getElementById('myChart3').getContext('2d');
        myChart3 = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    {
                        label: '25-34',
                        data: dataset, // Replace with actual data for 25-34
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                        borderColor: 'rgba(255, 206, 86, 1)',
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
                            text: 'Program Payments'
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

        ctx4 = document.getElementById('myChart4').getContext('2d');
        myChart4 = new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    {
                        label: '35-44',
                        data: dataset, // Replace with actual data for 35-44
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
                            text: 'Program Payments'
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

        ctx5 = document.getElementById('myChart5').getContext('2d');
        myChart5 = new Chart(ctx5, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    {
                        label: '45-54',
                        data: dataset, // Replace with actual data for 45-54
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
                            text: 'Program Payments'
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

        ctx6 = document.getElementById('myChart6').getContext('2d');
        myChart6 = new Chart(ctx6, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    {
                        label: '55-64',
                        data: dataset, // Replace with actual data for 55-64
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
                            text: 'Program Payments'
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
        // Create a chart for males
        ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Males',
                        data: dataset, // Replace with actual male data
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
                            text: 'Program Payments'
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
        ctx3 = document.getElementById('myChart3').getContext('2d');
        myChart3 = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Females',
                        data: dataset, // Replace with actual female data
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
                            text: 'Program Payments'
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
