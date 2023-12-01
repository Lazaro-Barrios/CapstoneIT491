const years = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
document.addEventListener('DOMContentLoaded', function () {
    let ctx;
    let myChartProgramPayments;
    const programTitleElement = document.getElementById('ProgramTitle');

   // colors for years in graphs
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

 

    // Function to destroy the existing chart
    function chartDestroy() {
        if (myChartProgramPayments) {
            myChartProgramPayments.destroy();
            myChartProgramPayments = undefined;
        }
    }

    // Event listener for button click
    document.getElementById('enter').addEventListener('click', function () {
        //Grab Demographic
        const selectedValue = document.getElementById('demographic').value;

    //Add Title
       if (programTitleElement) {
    
    if (!programTitleElement.textContent.trim()) {
        
        programTitleElement.textContent = 'Program Payments Graph';
    } else {
        console.log('Element already has content:', programTitleElement.textContent);
    }
} else {
    console.error('Element with id "ProgramTitle" not found.');
}

// Destroy Existing Charts
        chartDestroy();

        if (selectedValue === 'race') {
            // Create the race-related grouped bar chart for Program Payments
        
            ctx = document.getElementById('myChart').getContext('2d');
            myChartProgramPayments = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['White', 'Black', 'Asian', 'Hispanic', 'American Indian', 'Other', 'Unknown'],
                    datasets: years.map((year, yearIndex) => {
                        const whiteValue = ProgramWhiteData[yearIndex];
                        const blackValue = ProgramBlackData[yearIndex];
                        const asianValue = ProgramAsianData[yearIndex];
                        const hispanicValue = ProgramHispanicData[yearIndex];
                        const americanIndianValue = ProgramAmericanIndianData[yearIndex];
                        const otherValue = ProgramOtherData[yearIndex];
                        const unknownValue = ProgramUnknownData[yearIndex];
        
                        return {
                            label: years[yearIndex],
                            data: [whiteValue, blackValue, asianValue, hispanicValue, americanIndianValue, otherValue, unknownValue],
                            backgroundColor: getColorForYear(yearIndex),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        };
                    }),
                },
                options: getChartOptions('Race')
            });
        }
        else if (selectedValue === 'age') {
            // Create the age-related grouped bar chart for Program Payments
        
            ctx = document.getElementById('myChart').getContext('2d');
            myChartProgramPayments = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64'],
                    datasets: years.map((year, yearIndex) => {
                        const under18Value = ProgramUnder18Data[yearIndex];
                        const from18to24Value = ProgramFrom18to24Data[yearIndex];
                        const from25to34Value = ProgramFrom25to34Data[yearIndex];
                        const from35to44Value = ProgramFrom35to44Data[yearIndex];
                        const from45to54Value = ProgramFrom45to54Data[yearIndex];
                        const from55to64Value = ProgramFrom55to64Data[yearIndex];
        
                        return {
                            label: years[yearIndex],
                            data: [under18Value, from18to24Value, from25to34Value, from35to44Value, from45to54Value, from55to64Value],
                            backgroundColor: getColorForYear(yearIndex),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        };
                    }),
                },
                options: getChartOptions('Age')
            });
        }
         else if (selectedValue === 'sex') {
            // Create the sex-related grouped bar chart
            ctx = document.getElementById('myChart').getContext('2d');
            myChartProgramPayments = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Males', 'Females'],
                    datasets: years.map((year, yearIndex) => {
                        const maleValue = MaleDataProgram[yearIndex] 
                        const femaleValue = FemaleDataProgram[yearIndex] 
                        return {
                            label: years[yearIndex],
                            data: [maleValue, femaleValue],
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
                        text: xAxisTitle,
                        font: { size: 20 },
                        padding: { top: 20, bottom: 20 }
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Program Payments (Billions)',
                        font: { size: 16 },
                        padding: { top: 10, bottom: 10 }
                    },
                    ticks: {
                        callback: function (value) {
                            return value / 1000000000 + 'B';
                        },
                        stepSize: 250000000,
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                },
            }
        };
    }
    
    
}) 

