const yearsMedicare = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
document.addEventListener('DOMContentLoaded', function () {
    let ctxMedicare;
    let myChartMedicare;
    const MedicareTitleElement = document.getElementById('MedicareTitle');


   // colors for years in graphs
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

        return colors[yearIndex % colors.length];
    }

    // Function to destroy the existing  chart
    function medicareChartDestroy() {
        if (myChartMedicare) {
            myChartMedicare.destroy();
            myChartMedicare = undefined;
        }
    }

    // Event listener for button click
    document.getElementById('enter').addEventListener('click', function () {
        //Grab Demographic
        const selectedValue = document.getElementById('demographic').value;

        
        //Add Title
        if (MedicareTitleElement) {
    
            if (!MedicareTitleElement.textContent.trim()) {
                
                MedicareTitleElement.textContent = 'Medicare Enrollees Graph';
            } else {
                console.log('Element already has content:', MedicareTitleElement.textContent);
            }
        } else {
            console.error('Element with id "ProgramTitle" not found.');
        }

    //Destroy Existing Charts
        medicareChartDestroy();

        if (selectedValue === 'race') {
            // Create the race-related Medicare Enrollees chart
            ctxMedicare = document.getElementById('myChartMedicare').getContext('2d');
            myChartMedicare = new Chart(ctxMedicare, {
                type: 'bar',
                data: {
                    labels: ['White', 'Black', 'Asian', 'Hispanic', 'American Indian', 'Other', 'Unknown'],
                    datasets: yearsMedicare.map((year, yearIndex) => {
                        const whiteValue = MedicareWhiteData[yearIndex];
                        const blackValue = MedicareBlackData[yearIndex];
                        const asianValue = MedicareAsianData[yearIndex];
                        const hispanicValue = MedicareHispanicData[yearIndex];
                        const americanIndianValue = MedicareAmericanIndianData[yearIndex];
                        const otherValue = MedicareOtherData[yearIndex];
                        const unknownValue = MedicareUnknownData[yearIndex];
        
                        return {
                            label: year,
                            data: [whiteValue, blackValue, asianValue, hispanicValue, americanIndianValue, otherValue, unknownValue],
                            backgroundColor: getColorForYearMedicare(yearIndex),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        };
                    }),
                },
                options: getChartOptions('Race')
            });
        }
         else if (selectedValue === 'age') {
            // Create the age-related Medicare Enrollees chart
            ctxMedicare = document.getElementById('myChartMedicare').getContext('2d');
            myChartMedicare = new Chart(ctxMedicare, {
                type: 'bar',
                data: {
                    labels: ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64'],
                    datasets: yearsMedicare.map((year, yearIndex) => {
                        const under18Value = MedicareUnder18Data[yearIndex];
                        const from18to24Value = MedicareFrom18to24Data[yearIndex];
                        const from25to34Value = MedicareFrom25to34Data[yearIndex];
                        const from35to44Value = MedicareFrom35to44Data[yearIndex];
                        const from45to54Value = MedicareFrom45to54Data[yearIndex];
                        const from55to64Value = MedicareFrom55to64Data[yearIndex];
        
                        return {
                            label: year,
                            data: [under18Value, from18to24Value, from25to34Value, from35to44Value, from45to54Value, from55to64Value],
                            backgroundColor: getColorForYearMedicare(yearIndex),
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
            ctxMedicare = document.getElementById('myChartMedicare').getContext('2d');
            myChartMedicare = new Chart(ctxMedicare, {
                type: 'bar',
                data: {
                    labels: ['Males', 'Females'],
                    datasets: yearsMedicare.map((year, yearIndex) => {
                        const maleValue = MaleDataMedicare[yearIndex];
                        const femaleValue = FemaleDataMedicare[yearIndex];
        
                        return {
                            label: yearsMedicare[yearIndex],  
                            data: [maleValue, femaleValue],   
                            backgroundColor: getColorForYearMedicare(yearIndex),
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
                        text: 'Medicare Enrollees (Billions)',
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
