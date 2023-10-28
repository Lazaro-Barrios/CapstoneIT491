const menuBtn = document.querySelector('.menu-btn');
const dropdown = document.querySelector('.dropdown-content');
const closeMenu = document.getElementById('closeMenu');

menuBtn.addEventListener('click', (event) => {
    if (event.target !== closeMenu) {
        dropdown.classList.toggle('show');
    }
});

closeMenu.addEventListener('click', (event) => {
    dropdown.classList.remove('show');
    event.stopPropagation(); // Prevent the event from bubbling up to the .menu-btn
});
