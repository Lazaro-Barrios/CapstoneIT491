$(document).ready(function() {
    let dataTable = $('#dataTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            url: "http://localhost:8500/CapstoneIT491/SpendingAPI/getDataCombo.cfm",
            dataType: 'json',
            method: 'POST',
            data: function(d) {
                d.year = $('#SpendingYear').val();
            }
        },
        columns: [
            { data: "Brnd_Name" },
            { data: "Gnrc_Name" },
            { data: "Year" },
            { data: "TotalSpending" },
            { data: "TotalDosageUnits" },
            { data: "TotalBeneficiaries" },
            { data: "AverageTotalSpendingPerDosageUnitWeighted" },
            { data: "AverageSpendingPerBeneficiary" }
        ]
    });

    // Reload data on dropdown change
    $('#SpendingYear').on('change', function() {
        dataTable.ajax.reload();
    });
});
