let chartInstance = null;

$(document).ready(function() {
    let dataTable;

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
                { data: "Brnd_Name", className: "table-clickable-cell brand-name-cell" },
                { data: "Gnrc_Name", className: "table-clickable-cell generic-name-cell" },
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
                { data: "Gnrc_Name", className: "table-clickable-cell generic-name-cell" },
                { data: "Year" },
                { data: "TotalSpending" },
                { data: "AverageSpendingPerBeneficiary" }
            ]
        });
    }

    // Initialize the default table
    initializeDefaultTable();

    // Event listener for the checkbox
    $('#spendingGeneric').on('change', function() {
        if ($(this).is(':checked')) {
            initializeGroupedTable();
        } else {
            initializeDefaultTable();
        }
    });

    // Reload data on dropdown change
    $('#SpendingYear').on('change', function() {
        dataTable.ajax.reload();
    });

    // Event for Brand Name and Generic Name click
    $('#dataTable').on('click', 'td.table-clickable-cell', function() {
        $('#chartModal').modal('show');
        if ($(this).hasClass('brand-name-cell')) {
            $('#chartModalLabel').text("Average Spending Per Beneficiary");
            plotGraphBrand(generateDummyData());
        } else if ($(this).hasClass('generic-name-cell')) {
            $('#chartModalLabel').text("Total Spending of Manufacturer's");
            plotGraphGeneric([generateDummyData(), generateDummyData(), generateDummyData()]);
        }
    });

    function generateDummyData() {
        const years = [2017, 2018, 2019, 2020, 2021];
        return years.map(year => {
            return {
                year: year,
                spending: Math.random() * 1000 // random spending value
            };
        });
    }

    function plotGraphBrand(data) {
        if (chartInstance) {
            chartInstance.destroy();
        }
        const years = [2017, 2018, 2019, 2020, 2021];
        const avgSpending = years.map(year => {
            const entry = data.find(row => row.year === year);
            return entry ? entry.spending : 0;
        });

        const ctx = document.getElementById('chartCanvas').getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Average Spending Per Beneficiary (Brand)',
                    data: avgSpending,
                    borderColor: 'blue',
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Spending in USD'
                        }
                    }
                },
                responsive: true
            }
        });
    }

    function plotGraphGeneric(dataArrays) {
        if (chartInstance) {
            chartInstance.destroy();
        }
        const years = [2017, 2018, 2019, 2020, 2021];
        const colors = ['blue', 'green', 'red'];

        const datasets = dataArrays.map((data, index) => {
            return {
                label: `Manufacturer's Generic ${index + 1}`,
                data: years.map(year => {
                    const entry = data.find(row => row.year === year);
                    return entry ? entry.spending : 0;
                }),
                borderColor: colors[index],
                fill: false
            };
        });

        const ctx = document.getElementById('chartCanvas').getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: datasets
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Spending (in millions)'
                        }
                    }
                },
                responsive: true
            }
        });
    }
});


function plotGraphGeneric(data) {
    // Plotting logic for Generic Name...
}