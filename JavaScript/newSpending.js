document.addEventListener("DOMContentLoaded", function() {
    // Initialize the table when the page loads
    fetchAndPopulateTable();

    // Add event listeners
    document.getElementById("SpendingYear").addEventListener("change", fetchAndPopulateTable);
    document.getElementById("spendingSearch").addEventListener("keyup", function(e) {
        if (e.key === "Enter") {
            fetchAndPopulateTable();
        }
    });
    document.getElementById("pageSize").addEventListener("change", fetchAndPopulateTable);
});

function fetchAndRenderData() {
    let params = getApiParams();

    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/CapstoneIT491/SpendingAPI/getData.cfm',
            data: params,
            success: function(response) {
                console.log('Data received:', response);
                resolve(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching data:', textStatus, errorThrown);
                reject(errorThrown);
            }
        });
    });
}

function getApiParams() {
    return {
        selectedYear: $('#SpendingYear').val() || '',
        drugSearch: $('#spendingSearch').val() || '',
        page: 1,
        itemsPerPage: $("#pageSize").val() || 100
    };
}


function fetchAndPopulateTable() {
    fetchAndRenderData().then(data => {
        const tableBody = document.querySelector('table tbody');
        tableBody.innerHTML = ''; // Clear previous rows

        data.forEach(row => {
            const tr = document.createElement('tr');

            // Create table cells for each piece of data
            const brandNameTd = document.createElement('td');
            brandNameTd.innerText = row.Brnd_Name;
            tr.appendChild(brandNameTd);

            const genericNameTd = document.createElement('td');
            genericNameTd.innerText = row.Gnrc_Name;
            tr.appendChild(genericNameTd);

            const yearTd = document.createElement('td');
            yearTd.innerText = row.Year;
            tr.appendChild(yearTd);

            const totalSpendingTd = document.createElement('td');
            totalSpendingTd.innerText = row.TotalSpending;
            tr.appendChild(totalSpendingTd);

            const totalDosageUnitsTd = document.createElement('td');
            totalDosageUnitsTd.innerText = row.TotalDosageUnits;
            tr.appendChild(totalDosageUnitsTd);

            const totalBeneficiariesTd = document.createElement('td');
            totalBeneficiariesTd.innerText = row.TotalBeneficiaries;
            tr.appendChild(totalBeneficiariesTd);

            const avgSpendingPerUnitTd = document.createElement('td');
            avgSpendingPerUnitTd.innerText = row.AverageTotalSpendingPerDosageUnitWeighted;
            tr.appendChild(avgSpendingPerUnitTd);

            const avgSpendingPerBeneficiaryTd = document.createElement('td');
            avgSpendingPerBeneficiaryTd.innerText = row.AverageSpendingPerBeneficiary;
            tr.appendChild(avgSpendingPerBeneficiaryTd);

            // Append the row to the table body
            tableBody.appendChild(tr);
        });
    }).catch(error => {
        console.error("Error populating the table:", error);
    });
}
function filterData() {
    var yearSelected = $('#SpendingYear').val();
    var drugSearch = $('#spendingSearch').val();

    var queryParams = {};

    if (yearSelected) {
        queryParams.selectedYear = yearSelected;
    }

    if (drugSearch) {
        queryParams.drugSearch = drugSearch;
    }

    // Make an AJAX request to your server with the query parameters
    $.ajax({
        url: '/CapstoneIT491/SpendingAPI/getData.cfm',
        data: queryParams,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Assuming the server returns the filtered data as a JSON array
            populateTable(response);
        },
        error: function(error) {
            console.error("Error fetching data:", error);
        }
    });
}

function populateTable(data) {
    var tbody = $("#mainTable tbody"); // replace "yourTableID" with the actual ID of your table, if it has one
    tbody.empty();  // Clear the current rows

    data.forEach(item => {
        var row = `
            <tr>
                <td>${item.brandName}</td>
                <td>${item.genericName}</td>
                <td>${item.year}</td>
                <td>${item.totalSpending}</td>
                <td>${item.totalDosageUnits}</td>
                <td>${item.totalBeneficiaries}</td>
                <td>${item.averageTotalSpendingPerDosageUnitWeighted}</td>
                <td>${item.averageSpendingPerBeneficiary}</td>
            </tr>
        `;
        tbody.append(row);
    });
}


$(document).ready(function() {
    fetchAndRenderData();
});