// Wait for the DOM content to load before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // References to DOM elements for the dropdown menu
    const menuBtn = document.querySelector('.menu-btn');
    const dropdown = document.querySelector('.dropdown-content');
    const closeMenu = document.getElementById('closeMenu');
    
    // Toggle the dropdown menu when the menu button is clicked
    menuBtn.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    // Close the dropdown menu when the close button is clicked
    closeMenu.addEventListener('click', (event) => {
        dropdown.classList.remove('show');
        event.stopPropagation(); // Prevent event from bubbling up to menuBtn
    });
});
