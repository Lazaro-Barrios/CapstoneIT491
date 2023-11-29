// Initialize an empty array to store the data
const MedicareSexData = [];

// Function to fetch data from the ColdFusion page
async function fetchData() {
    try {
        const response = await fetch('medicareenrolleessexdata.cfm');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Fetch data and push it into the MedicareSexData array
fetchData().then((data) => {
    // Check if data is not null before pushing it into the array
    if (data !== null) {
        // Push the fetched data into the array
        MedicareSexData.push(data);

        // Log the array to the console
        console.log('MedicareSexData:', MedicareSexData);

        // You can perform further actions with the data here
    } else {
        console.error('Data is null or undefined.');
    }
});
