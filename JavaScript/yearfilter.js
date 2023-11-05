// Function to filter data based on selected years for a given chart
function filterChartData(chart, chartData, selectedYears) {
    const filteredData = chartData.filter((data, index) => selectedYears.includes(years[index]));

    chart.data.datasets.forEach(dataset => {
        dataset.data = filteredData;
    });

    chart.data.labels = selectedYears;

    chart.update();
}

// Year filtering system for all charts
document.getElementById('filterButton').addEventListener('click', function () {
    const selectedYears = years.filter(year => document.getElementById('year' + year).checked);
    const chartIds = document.querySelectorAll("[id^='myChart']");
    
    chartIds.forEach(chartElement => {
        const chart = Chart.getChart(chartElement);
        if (chart) {
            filterChartData(chart, dataset, selectedYears);
        }
    });
});

// Year filtering system for all Medicare Enrollees charts
document.getElementById('filterButtonMedicare').addEventListener('click', function () {
    const selectedYearsMedicare = yearsMedicare.filter(year => document.getElementById('yearMedicare' + year).checked);
    const chartIdsMedicare = document.querySelectorAll("[id^='myChartMedicare']");

    chartIdsMedicare.forEach(chartElement => {
        const chart = Chart.getChart(chartElement);
        if (chart) {
            filterChartData(chart, medicareData, selectedYearsMedicare);
        }
    });
});

