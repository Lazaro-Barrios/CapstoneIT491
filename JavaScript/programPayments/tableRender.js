// Function for a data table using DataTables, populates it with provided data, and sets up event listeners for row selection and hiding unselected rows.
function renderTable(data) {

    // Clear previous table if it exists
    if ($.fn.DataTable.isDataTable('#dataTable')) {
        $('#dataTable').DataTable().clear().destroy();
    }
    
    $('#dataTable').empty();

    // Create table headers
    let tableHTML = '<thead><tr>';
    data.COLUMNS.forEach(column => {
        if (column === "SITEOFSERVICETYPE") {
            tableHTML += `<th>Site of Service</th>`;
        } 
        else {
            tableHTML += `<th>${toTitleCase(column.replace(/_/g, ' '))}</th>`;
        }
    });
    tableHTML += '</tr></thead>';

    // Add table rows for each data entry
    tableHTML += '<tbody>';
    const totals = new Array(data.COLUMNS.length).fill(0);
    data.DATA.forEach(row => {
        tableHTML += '<tr>';
        row.forEach((cell, index) => {
            if (index > 0 && !isNaN(cell) && parseFloat(cell) !== 0) {
                tableHTML += `<td>$${parseFloat(cell).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>`;
                totals[index] += parseFloat(cell);
            } else {
                tableHTML += `<td>${cell}</td>`;
            }
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody>';

    // Calculate and add the totals row
    tableHTML += '<tfoot><tr>';
    totals.forEach((total, index) => {
        if (index === 0) {
            tableHTML += `<td>Total</td>`;
        } 
        else if (total !== 0) {
            tableHTML += `<td>$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>`;
        } 
        else {
            tableHTML += `<td>${total}</td>`;
        }
    });
    tableHTML += '</tr></tfoot>';

    // Update the DOM with the generated table structure
    const dataTableElement = document.getElementById('dataTable');
    dataTableElement.innerHTML = tableHTML;

    // Initialize DataTables on the generated table
    const dataTable = $(dataTableElement).DataTable({
        responsive: true,
        autoWidth: false,
        searching: false,
        paging: false,
        /*
        select: {
            style: 'multi',
            selector: 'td:first-child'
        }
        */
    });

    // Event listener for row selection
    dataTable.on('select', function (e, dt, type, indexes) {
        if (type === 'row') {
            const selectedRows = dataTable.rows({ selected: true }).data().toArray();
            console.log('Selected Rows:', selectedRows);
        }
    });

    // Event listener for row deselection
    dataTable.on('deselect', function (e, dt, type, indexes) {
        if (type === 'row') {
            const selectedRows = dataTable.rows({ selected: true }).data().toArray();
            console.log('Selected Rows:', selectedRows);
        }
    });
    /*
    // Event listener for hiding unselected rows
    document.getElementById('hideUnselectedRowsButton').addEventListener('click', function () {
        dataTable.rows({ selected: false }).nodes().to$().hide();  // Hide unselected rows
    });
    */
}