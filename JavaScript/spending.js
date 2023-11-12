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
        // Show the modal first
        $('#chartModal').modal('show');

        if ($(this).hasClass('brand-name-cell')) {
            // Handle the brand name click
            var drugId = $(this).find('span').data('drug-id');
            if (typeof drugId !== 'undefined' && drugId) {
                $('#chartModalLabel').text("Average Spending Per Beneficiary");
                fetchBrandSpendingData(drugId); // fetch data and then plot
            } else {
                console.error("Invalid or no drug ID found for clicked cell.");
            }
        } else if ($(this).hasClass('generic-name-cell')) {
            // Handle the generic name click
            var genericName = $(this).text().trim(); // Get the generic name from the cell text
            if (genericName) {
                $('#chartModalLabel').text("Total Spending of Manufacturers");
                plotGraphGeneric(genericName); // Fetch and plot data for the generic name
            } else {
                console.error("Invalid or no generic name found for clicked cell.");
            }
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

    function generateDummyData() {
        const years = [2017, 2018, 2019, 2020, 2021];
        return years.map(year => {
            return {
                year: year,
                spending: Math.random() * 1000 // random spending value
            };
        });
    }

    function plotGraphGeneric(genericName) {
        $.ajax({
            url: "../SpendingAPI/GenericName.cfm",
            type: 'GET',
            dataType: 'json',
            data: { genericName: genericName },
            success: function(response) {
                // Assuming response is an array of objects with 'Year', 'BrandName', and 'TotalSpending'
                const brands = [...new Set(response.map(item => item.BrandName))]; // Get unique brand names
                const datasets = brands.map(brand => {
                    return {
                        label: brand,
                        data: response.filter(item => item.BrandName === brand).map(item => ({
                            x: item.Year,
                            y: item.TotalSpending
                        })),
                        borderColor: getRandomColor(), // A function to generate a random color
                        fill: false
                    };
                });

                if (chartInstance) {
                    chartInstance.destroy();
                }

                const ctx = document.getElementById('chartCanvas').getContext('2d');
                chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        datasets: datasets
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'linear',
                                position: 'bottom',
                                title: {
                                    display: true,
                                    text: 'Year'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Total Spending'
                                }
                            }
                        },
                        responsive: true
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error("Error fetching data: ", error);
            }
        });
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

});