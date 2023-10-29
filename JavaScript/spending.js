$(document).ready(function() {
    let dataTable;

    function renderChart(brandName) {
        // Sample static data, you might want to fetch real data for the brandName clicked
        const data = {
            labels: ['2017', '2018', '2019', '2020', '2021'],
            datasets: [{
                label: brandName,
                data: [12, 19, 3, 5, 2], // replace with real data
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };

        // Configurations for the Chart.js chart
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        // Destroy any previously created chart to avoid overlapping
        if (window.myChart) {
            window.myChart.destroy();
        }

        const ctx = document.getElementById('chartCanvas').getContext('2d');
        window.myChart = new Chart(ctx, config);
    }

    function bindTableClickEvent() {
        $('#dataTable tbody').on('click', 'td:first-child', function() {
            const brandName = $(this).text();
            renderChart(brandName);
            $('#chartModal').modal('show');
        });
    }

    function destroyAndResetTable() {
        if ($.fn.DataTable.isDataTable('#dataTable')) {
            dataTable.destroy();
            $('#dataTable tbody').empty(); // Clear the table body
        }
    }

    function initializeDefaultTable() {
        destroyAndResetTable();
        $('#dataTable thead').empty().append(`
            <tr>
                <th>Brand Name</th>
                <th>Generic Name</th>
                <th>Year</th>
                <th>Total Spending</th>
                <th>Total Dosage Units</th>
                <th>Total Beneficiaries</th>
                <th>Average Total Spending Per Dosage Unit Weighted</th>
                <th>Average Spending Per Beneficiary</th>
            </tr>
        `);
        dataTable = $('#dataTable').DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: "http://localhost:8500/CapstoneIT491/SpendingAPI/getSpendingData-Default.cfm",
                dataType: 'json',
                method: 'POST',
                data: function(d) {
                    d.year = $('#SpendingYear').val();
                    d.searchValue = d.search.value;
                }
            },
            columns: [
                {
                    data: "Brnd_Name",
                    className: "table-clickable-cell"
                },
                { data: "Gnrc_Name" },
                { data: "Year" },
                { data: "TotalSpending" },
                { data: "TotalDosageUnits" },
                { data: "TotalBeneficiaries" },
                { data: "AverageTotalSpendingPerDosageUnitWeighted" },
                { data: "AverageSpendingPerBeneficiary" }
            ]
        });
    }

    function initializeGroupedTable() {
        destroyAndResetTable();
        $('#dataTable thead').empty().append(`
            <tr>
                <th>Generic Name</th>
                <th>Year</th>
                <th>Total Spending</th>
                <th>Average Spending Per Beneficiary</th>
            </tr>
        `);
        dataTable = $('#dataTable').DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: "http://localhost:8500/CapstoneIT491/SpendingAPI/getSpendingData-Generic.cfm",
                dataType: 'json',
                method: 'POST',
                data: function(d) {
                    d.year = $('#SpendingYear').val();
                    d.searchValue = d.search.value;
                }
            },
            columns: [
                { data: "Gnrc_Name" },
                { data: "Year" },
                { data: "TotalSpending" },
                { data: "AverageSpendingPerBeneficiary" }
            ]
        });
    }

    // Initialize the default table
    initializeDefaultTable();
    bindTableClickEvent();

    // Event listener for the checkbox
    $('#spendingGeneric').on('change', function() {
        if ($(this).is(':checked')) {
            initializeGroupedTable();
        } else {
            initializeDefaultTable();
        }
        bindTableClickEvent();
    });

    // Reload data on dropdown change
    $('#SpendingYear').on('change', function() {
        dataTable.ajax.reload();
    });
});