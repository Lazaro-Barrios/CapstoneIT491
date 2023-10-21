// Wait for the DOM content to load before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // References to DOM elements for the dropdown menu
    const menuBtn = document.querySelector('.menu-btn');
    const dropdown = document.querySelector('.dropdown-content');
    const closeMenu = document.getElementById('closeMenu');
    
    // References to DOM elements for the filters and button
    const yearFilter = document.querySelector('.year-filter');
    const careFilter = document.querySelector('.another-filter');
    const fetchDataButton = document.getElementById('fetchDataButton');

    // Toggle the dropdown menu when the menu button is clicked
    menuBtn.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    // Close the dropdown menu when the close button is clicked
    closeMenu.addEventListener('click', (event) => {
        dropdown.classList.remove('show');
        event.stopPropagation(); // Prevent event from bubbling up to menuBtn
    });

    // Fetch distinct years and care types when the page loads
    fetchYearsAndCareTypes(yearFilter, careFilter);

    // Fetch data based on selected filters when the button is clicked
    fetchDataButton.addEventListener('click', () => fetchData(yearFilter, careFilter));
});

// Function to fetch distinct years and care types from the server
function fetchYearsAndCareTypes(yearFilter, careFilter) {
    fetch('/CapstoneIT491/api/fetchFilters.cfm')
    .then(response => response.json())
    .then(data => {
        // Populate the year and care type dropdowns with the fetched data
        populateDropdown(yearFilter, data.years.DATA);
        populateDropdown(careFilter, data.careTypes.DATA, true);
    });
}

// Function to populate a dropdown with given data
function populateDropdown(dropdown, data, isCareType = false) {
    let optionsHTML = '';
    dropdown.innerHTML = ''; // Clear the dropdown
    data.forEach(item => {
        // Check if the data is for care types or years
        if (isCareType) {
            optionsHTML += `<option value="${item[0]}">${item[1]}</option>`;
        } else {
            optionsHTML += `<option value="${item[0]}">${item[0]}</option>`;
        }
    });
    dropdown.innerHTML += optionsHTML;
}

// Function to fetch data based on selected year and care type
function fetchData(yearFilter, careFilter) {
    const selectedYear = yearFilter.value;
    const selectedCare = careFilter.value;

    // Log the selected values for debugging purposes
    console.log("Selected Year:", selectedYear);
    console.log("Selected Care:", selectedCare);

    // Fetch data from the server based on the selected filters
    fetch('/CapstoneIT491/api/fetchData.cfm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            year: selectedYear,
            careType: selectedCare
        })
    })
    .then(response => response.json())
    .then(data => {
        // If the selected care type is "Continuous Home Care", filter the data
        if (selectedCare === "1") {
            data.COLUMNS = ["siteOfServiceType", "Continuous Home Care"];
            data.DATA = data.DATA.map(row => [row[0], row[1]]);
        }
        // If the selected care type is "General Inpatient Care", filter the data
        else if (selectedCare === "2") {
            data.COLUMNS = ["siteOfServiceType", "General Inpatient Care"];
            data.DATA = data.DATA.map(row => [row[0], row[2]]);
        }
        // If the selected care type is "Inpatient Respite Care", filter the data
        else if (selectedCare === "3") {
            data.COLUMNS = ["siteOfServiceType", "Inpatient Respite Care"];
            data.DATA = data.DATA.map(row => [row[0], row[3]]);
        }
        // If the selected care type is "Routine Home Care", filter the data
        else if (selectedCare === "4") {
            data.COLUMNS = ["siteOfServiceType", "Routine Home Care"];
            data.DATA = data.DATA.map(row => [row[0], row[4]]);
        }
        // Render the fetched data in a table format
        renderTable(data);
    });
}

// Function to render the fetched data in a table format
function renderTable(data) {
    const dataTable = document.getElementById('dataTable');
    let tableHTML = '<table border="1">';

    // Add table headers
    tableHTML += '<thead><tr>';
    data.COLUMNS.forEach(column => {
        if (column === "siteOfServiceType") {
            tableHTML += `<th>Site of Service</th>`;
        } else {
            tableHTML += `<th>${column}</th>`;
        }
    });
    tableHTML += '</tr></thead>';

    // Add table rows for each data entry
    tableHTML += '<tbody>';
    data.DATA.forEach(row => {
        tableHTML += '<tr>';
        row.forEach(cell => {
            tableHTML += `<td>${cell}</td>`;
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody>';

    tableHTML += '</table>';

    // Update the DOM with the generated table
    dataTable.innerHTML = tableHTML;
}
