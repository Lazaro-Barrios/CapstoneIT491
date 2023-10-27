// Function to fetch distinct years and care types from the server
function fetchYearsAndCareTypes(yearFilter, careFilter) {
    fetch('/CapstoneIT491/api/fetchFilters.cfm')
    .then(response => response.json())
    .then(data => {
        // Populate the year and care type dropdowns with the fetched data
        populateDropdown(yearFilter, data.years.DATA);
        populateDropdown(careFilter, data.careTypes.DATA, true);

        // Initialize the Select2 components
        $(yearFilter).select2({
            theme: "bootstrap-5",
            placeholder: "Select a Year",
            minimumResultsForSearch: Infinity,
            //width: "12%",
        }).val(null).trigger('change').show; // Had to add this due to FOUC 'flash of unstyled content' bug and to display placeholder

        $(careFilter).select2({
            theme: 'bootstrap-5',
            placeholder: "Select Level of Care",
            allowClear: true,
            minimumResultsForSearch: Infinity,
            //width: "50%",
            closeOnSelect: false,
        });
    });
}

// Function to fetch data based on selected year and care type
function fetchData(yearFilter, careFilter) {
    const selectedYear = yearFilter.value;
    const selectedCares = Array.from(careFilter.selectedOptions).map(option => option.value);

    // Log the selected values for debugging purposes
    console.log("Selected Year:", selectedYear);
    console.log("Selected Cares:", selectedCares);
    console.log("Dropdown Selection:", careFilter.selectedOptions); // Debug log for dropdown selection

    // Fetch data from the server based on the selected filters
    fetch('/CapstoneIT491/api/fetchData.cfm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            year: selectedYear,
            careTypes: selectedCares
        })
    })
    .then(response => response.json())
    .then(data => {

        console.log("Initial Data:", JSON.parse(JSON.stringify(data))); // Debug log for initial data

        // Filter the columns based on the selected care types
        const filteredColumns = ["SITEOFSERVICETYPE"];
        const careTypeMapping = {
            "1": "CONTINUOUS HOME CARE",
            "2": "GENERAL INPATIENT CARE",
            "3": "INPATIENT RESPITE CARE",
            "4": "ROUTINE HOME CARE"
        };
        selectedCares.forEach(care => {
            if (careTypeMapping[care]) {
                filteredColumns.push(careTypeMapping[care]);
            }
        });

        const originalColumns = data.COLUMNS; // Store the original columns
        data.COLUMNS = filteredColumns;
        data.DATA = data.DATA.map(row => {
            return filteredColumns.map(column => {
                const columnIndex = originalColumns.indexOf(column);
                return row[columnIndex];
            });
        });

        console.log("Filtered Data:", data); // Debug log for filtered data

        // Render the fetched data in a table format
        renderTable(data);

        document.querySelector('.widget-container').style.display = 'block';
        document.querySelector('.widget-container2').style.display = 'block';

        // Fetch data for all years
        fetch('/CapstoneIT491/api/fetchAllYearsData.cfm')
        .then(response => response.json())
        .then(allYearsData => {
            renderMultiBarGraph(allYearsData);
        });
    });
}