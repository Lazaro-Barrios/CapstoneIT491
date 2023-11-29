document.addEventListener('DOMContentLoaded', function () {
    const years = Array.from({ length: 9 }, (_, i) => (2013 + i).toString());

    // Function to filter data based on selected years for a given chart
    function filterChartData(chart, chartData, selectedYears, allYears) {
        const filteredData = chartData.map(dataset => {
            return {
                label: dataset.label,
                data: dataset.data.filter((data, index) => selectedYears.includes(allYears[index])),
                backgroundColor: dataset.backgroundColor,
                borderColor: dataset.borderColor,
                borderWidth: dataset.borderWidth
            };
        });

        chart.data.datasets = filteredData;
        chart.data.labels = allYears.filter(year => selectedYears.includes(year));

        chart.update();
    }

    // Year filtering system for all charts
    document.getElementById('filterButton').addEventListener('click', function () {
        const selectedYears = years.filter(year => document.getElementById('year' + year).checked);
        const chartIds = document.querySelectorAll("[id^='myChart']");

        chartIds.forEach(chartElement => {
            const chart = Chart.getChart(chartElement);
            if (chart) {
                filterChartData(chart, dataset, selectedYears, years);
            }
        });
    });

    // Year filtering system for all Medicare Enrollees charts
    document.getElementById('filterButtonMedicare').addEventListener('click', function () {
        const selectedYearsMedicare = years.filter(year => document.getElementById('yearMedicare' + year).checked);
        const chartIdsMedicare = document.querySelectorAll("[id^='myChartMedicare']");

        chartIdsMedicare.forEach(chartElement => {
            const chart = Chart.getChart(chartElement);
            if (chart) {
                filterChartData(chart, MedicareData, selectedYearsMedicare, years);
            }
        });
    });
});


