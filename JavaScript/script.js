document.addEventListener("DOMContentLoaded", function() {
    // Dropdown Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const dropdown = document.querySelector('.dropdown-content');
    const closeMenu = document.getElementById('closeMenu');

    menuBtn.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    closeMenu.addEventListener('click', (event) => {
        dropdown.classList.remove('show');
        event.stopPropagation(); // Prevent event from bubbling up to menuBtn
    });

    const $anotherFilter = $('.another-filter');

    $anotherFilter.select2({
        placeholder: "",  // Placeholder text
        allowClear: true,  // Enables the ability to clear the selection
        minimumResultsForSearch: Infinity,  // Disables the search box
        templateSelection: data => data.text
    }).on('select2:select select2:unselect', function (e) {
        // Handle 'Select All' functionality
        if (e.params.data.id === 'selectAll') {
            $(this).val(
                e.type === 'select2:select' 
                ? $(this).find('option').map(function() { 
                    return $(this).val() !== 'selectAll' ? $(this).val() : null; 
                  }).get()
                : []
            ).trigger('change');
        }
        updatePlaceholder($anotherFilter);
    }).on('select2:open', function() {
        // Add click event listener to document when dropdown is open
        $(document).on('click.select2', function (e) {
            if (!$(e.target).closest('.select2').length) {
                $anotherFilter.select2('close');
            }
        });
    }).on('select2:close', function() {
        // Remove click event listener when dropdown is closed
        $(document).off('click.select2');
        // Ensure the placeholder is updated when the dropdown is closed
        updatePlaceholder($anotherFilter);
    });

    function updatePlaceholder($selectElement) {
        // Manually insert a placeholder
        if (!$selectElement.val() || $selectElement.val().length === 0) {
            $(".select2-selection__rendered").attr("title","Level of Care").text("Level of Care");
        }
    }

    updatePlaceholder($anotherFilter);
});
