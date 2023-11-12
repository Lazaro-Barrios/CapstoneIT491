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
                <th>Average Spending Per Beneficiary</th>
            </tr>
        `);
        dataTable = $('#dataTable').DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: "../SpendingAPI/getSpendingData-Default.cfm",
                dataType: 'json',
                method: 'POST',
                data: function(d) {
                    d.year = $('#SpendingYear').val();
                    d.searchValue = d.search.value;
                    if (!d.order || d.order.length === 0) {
                        d.order = [{
                            column: 0, // default column index
                            dir: 'asc' // default direction
                        }];
                    }
                }
            },
            columns: [
                {
                    data: "Brnd_Name",
                    className: "table-clickable-cell brand-name-cell",
                    render: function(data, type, row) {
                        // Assuming 'Drug_ID' is the unique identifier from your dataset
                        return '<span data-drug-id="' + row.Drug_ID + '">' + data + '</span>';
                    }
                },
                { data: "Gnrc_Name", className: "table-clickable-cell generic-name-cell" },
                { data: "Year" },
                { data: "TotalSpending" },
                { data: "TotalDosageUnits" },
                { data: "TotalBeneficiaries" },
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
                url: "../SpendingAPI/getSpendingData-Generic.cfm",
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
        var drugId = $(this).find('span').data('drug-id'); // Get the unique drug ID

        // Validate that drugId is a number since it can no longer be 'undefined' after your ColdFusion fix
        if (isNaN(drugId) || drugId <= 0) {
            console.error("Invalid or no drug ID found for clicked cell.");
            return; // Exit the function if drugId is not a number or less than or equal to zero
        }

        if (typeof drugId === 'undefined' || drugId === false) {
            console.error("Invalid or no drug ID found for clicked cell.");
            return; // Exit the function if drugId is not defined or false
        }

        $('#chartModal').modal('show');
        if ($(this).hasClass('brand-name-cell')) {
            $('#chartModalLabel').text("Average Spending Per Beneficiary");
            fetchBrandSpendingData(drugId); // fetch data and then plot
        } else if ($(this).hasClass('generic-name-cell')) {
            $('#chartModalLabel').text("Total Spending of Manufacturer's");
            plotGraphGeneric([generateDummyData(), generateDummyData(), generateDummyData()]);
        }
    });

    function fetchBrandSpendingData(drugId) {
        $.ajax({
            url: "../SpendingAPI/BrandName.cfm",
            type: 'GET',
            dataType: 'text', // Get the response as text first to clean it
            data: { drugId: drugId },
            success: function(textResponse) {
                // Assuming the valid JSON starts with '[' and ends with ']', extract it
                var jsonStartPos = textResponse.indexOf('[');
                var jsonEndPos = textResponse.lastIndexOf(']') + 1;
                var jsonResponse = textResponse.substring(jsonStartPos, jsonEndPos);

                // Now parse the JSON response
                var data;
                try {
                    data = JSON.parse(jsonResponse);
                } catch (e) {
                    console.error("Parsing error:", e);
                    return;
                }
                // Proceed to plot the graph with the cleaned data
                plotGraphBrand(data);
            },
            error: function(xhr, status, error) {
                console.error("Error fetching data: ", error);
            }
        });
    }

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
        if (!Array.isArray(data) || !data.length) {
            console.error("Data is not an array or is empty");
            return;
        }
        if (chartInstance) {
            chartInstance.destroy();
        }

        // The structure of your data suggests that 'YEAR' and 'SPENDING' are uppercase
        const labels = data.map(item => item.YEAR.toString());
        const spendingData = data.map(item => item.SPENDING);

        const ctx = document.getElementById('chartCanvas').getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Spending Per Beneficiary (Brand)',
                    data: spendingData, // Use the spendingData array here
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
                        },
                        beginAtZero: true // This ensures that the scale starts at 0
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