function toTitleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
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