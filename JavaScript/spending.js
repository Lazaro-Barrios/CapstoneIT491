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
                        return '<span data-drug-id="' + row.Drug_ID + '">' + data + '</span>';
                    }
                },
                { data: "Gnrc_Name", className: "table-clickable-cell generic-name-cell" },
                { data: "Year" },
                {
                    data: "TotalSpending",
                    render: function(data) {
                        return parseInt(data).toLocaleString();
                    }
                },
                {
                    data: "TotalDosageUnits",
                    render: function(data) {
                        return parseInt(data).toLocaleString();
                    }
                },
                {
                    data: "TotalBeneficiaries",
                    render: function(data) {
                        return parseInt(data).toLocaleString();
                    }
                },
                {
                    data: "AverageSpendingPerBeneficiary",
                    render: function(data) {
                        return parseFloat(data).toLocaleString();
                    }
                }
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
                {
                    data: "TotalSpending",
                    render: function(data) {
                        return parseInt(data).toLocaleString();
                    }
                },
                {
                    data: "AverageSpendingPerBeneficiary",
                    render: function(data) {
                        return parseFloat(data).toLocaleString();
                    }
                }
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
        if ($(this).hasClass('brand-name-cell')) {
            $('#chartModal').modal('show');
            // Handle the brand name click
            var drugId = $(this).find('span').data('drug-id');
            if (typeof drugId !== 'undefined' && drugId) {
                $('#chartModalLabel').text("Average Spending Per Beneficiary");
                fetchBrandSpendingData(drugId); // fetch data and then plot
            } else {
                console.error("Invalid or no drug ID found for clicked cell.");
            }
        }
        // else if ($(this).hasClass('generic-name-cell')) {
        //     // Handle the generic name click
        //     var genericName = $(this).text().trim(); // Get the generic name from the cell text
        //     if (genericName) {
        //         $('#chartModalLabel').text("\"Generic Name Here\"");
        //         // Previous spot to load Generic function, am now loading it from its own function
        //     } else {
        //         console.error("Invalid or no generic name found for clicked cell.");
        //     }
        // }
    });


    function fetchBrandSpendingData(drugId) {
        $.ajax({
            url: "../SpendingAPI/BrandName.cfm",
            type: 'GET',
            dataType: 'text', // Get the response as text first to clean it
            data: { drugId: drugId },
            success: function(textResponse) {
                // Extract the valid JSON it
                var jsonStartPos = textResponse.indexOf('[');
                var jsonEndPos = textResponse.lastIndexOf(']') + 1;
                var jsonResponse = textResponse.substring(jsonStartPos, jsonEndPos);

                // Parse the JSON response
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

    function fetchGenericSpendingData(genericName) {
        $.ajax({
            url: "../SpendingAPI/GenericName.cfm",
            type: 'GET',
            dataType: 'json',
            data: { genericName: genericName },
            success: function(response) {
                if (response && response.DATA && response.DATA.length > 0) {
                    populateModalTable(response);
                } else {
                    console.error("No data found for the selected generic name.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error fetching data: ", error);
            }
        });
    }

    function populateModalTable(data) {
        var table = $('#modalDataTable');
        var tableBody = $('#modalTableBody');
        tableBody.empty(); // Clear any existing rows

        // Populate the table with new data
        data.DATA.forEach(function(row) {
            var tableRow = '<tr>' +
                '<td>' + row[0] + '</td>' + // Brand Name
                '<td>' + row[1] + '</td>' + // Manufacturer Name
                '<td>' + row[2].toLocaleString() + '</td>' + // Total Spending 2017
                '<td>' + row[3].toLocaleString() + '</td>' + // Total Spending 2018
                '<td>' + row[4].toLocaleString() + '</td>' + // Total Spending 2019
                '<td>' + row[5].toLocaleString() + '</td>' + // Total Spending 2020
                '<td>' + row[6].toLocaleString() + '</td>' + // Total Spending 2021
                '</tr>';
            tableBody.append(tableRow);
        });

        // Destroy existing DataTable instance if already initialized
        if ($.fn.DataTable.isDataTable(table)) {
            table.DataTable().clear().destroy();
        }

        // Initialize DataTables
        table.DataTable({
            responsive: true,
            paging: true,
        });
    }
    $('#spendingModal').on('hidden.bs.modal', function () {
        var table = $('#modalDataTable');
        if ($.fn.DataTable.isDataTable(table)) {
            table.DataTable().clear().destroy();
        }
    });

    $('#dataTable').on('click', 'td.generic-name-cell', function() {
        var genericName = $(this).text().trim();
        if (genericName) {
            $('#spendingModalLabel').text(genericName + " Spending Details by Brand");
            fetchGenericSpendingData(genericName); // Fetch data and populate the modal table
            $('#spendingModal').modal('show'); // Show the modal
        } else {
            console.error("Invalid or no generic name found for clicked cell.");
        }
    });

});