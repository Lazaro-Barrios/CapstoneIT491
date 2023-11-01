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
        // Assuming you'll fetch and display data in a similar manner
        let cellData = dataTable.cell(this).data();
        // Add your logic to fetch more details based on the clicked cell's data and display in the modal
        $('#chartModal').modal('show');
    });
});

$('#dataTable').on('click', 'td.table-clickable-cell', function() {
    let cellData = dataTable.cell(this).data();
    let drugID = dataTable.row($(this).closest('tr')).data().Drug_ID;

    let url = '';
    if($(this).hasClass('brand-name-cell')) {
        url = 'http://localhost:8500/CapstoneIT491/SpendingAPI/BrandName.cfm';
    } else if ($(this).hasClass('generic-name-cell')) {
        url = 'http://localhost:8500/CapstoneIT491/SpendingAPI/GenericName.cfm';
    }

    $.ajax({
        url: 'http://localhost:8500/CapstoneIT491/SpendingAPI/BrandName.cfm?drugID=1',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            var years = [];
            var spending = [];

            for(var i = 0; i < response.data.length; i++) {
                years.push(response.data[i].year);
                spending.push(response.data[i].spending);
            }

            // Use `years` and `spending` arrays to populate your Chart.js chart
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });

});

function plotGraphBrand(data) {
    // Sorting data by year to make sure it's in order
    data.sort((a, b) => a.Year - b.Year);

    // Create an array of spending values for the years 2017-2021
    const avgSpending = [2017, 2018, 2019, 2020, 2021].map(year => {
        const entry = data.find(row => row.Year === year);
        return entry ? entry.AverageSpendingPerBeneficiary : 0; // return 0 if data for that year isn't present
    });

    const ctx = document.getElementById('chartCanvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [2017, 2018, 2019, 2020, 2021],
            datasets: [{
                label: 'Average Spending Per Beneficiary',
                data: avgSpending,
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            responsive: true
        }
    });
}


function plotGraphGeneric(data) {
    // Plotting logic for Generic Name...
}