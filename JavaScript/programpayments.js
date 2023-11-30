// programpayments.js



const years = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];

document.addEventListener('DOMContentLoaded', function () {
    let ctxProgram;
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
            // Create the race-related grouped bar chart for Program Payments
        
            ctxProgram = document.getElementById('myChartProgram').getContext('2d');
            myChartProgramPayments = new Chart(ctxProgram, {
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
        
            ctxProgram = document.getElementById('myChartProgram').getContext('2d');
            myChartProgramPayments = new Chart(ctxProgram, {
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
            ctxProgram = document.getElementById('myChartProgram').getContext('2d');
            myChartProgramPayments = new Chart(ctxProgram, {
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

    
    
    
}) 

