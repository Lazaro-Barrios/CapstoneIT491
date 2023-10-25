$(document).ready(function() {
    $("th.sortable").click(function(){
        var table = $(this).parents("table").eq(0);
        var rows = table.find("tr:gt(0)").toArray().sort(comparer($(this).index()));
        this.asc = !this.asc;
        if (!this.asc) { rows = rows.reverse(); }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]); }

        // Remove any previous arrow classes and add the current sort direction
        $("th.sortable").removeClass("sort-asc sort-desc");
        if (this.asc) {
            $(this).addClass("sort-asc");
        } else {
            $(this).addClass("sort-desc");
        }
    });

    function comparer(index) {
        return function(a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index);
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
        };
    }

    function getCellValue(row, index) { return $(row).children("td").eq(index).text(); }

    // Listen for changes on the pageSize dropdown
    $("#pageSize").change(function() {
        // Reload the page with the new itemsPerPage value
        location.search = $.param({ itemsPerPage: $(this).val() });
    });
});

function checkForEnter(event) {
    // Check if the key pressed is "Enter"
    if (event.keyCode === 13) {
        filterDataByYear();
    }
}

function filterDataByYear() {
    var yearSelected = document.getElementById('SpendingYear').value;
    var drugSearch = document.getElementById('spendingSearch').value; // Get the drug search value

    var queryParams = {}; // An object to hold query parameters

    if (yearSelected) {
        queryParams.selectedYear = yearSelected;
    }

    if (drugSearch) {
        queryParams.drugSearch = drugSearch; // Add drugSearch to the query parameters if it has a value
    }

    // Convert the queryParams object to a query string
    var queryString = Object.keys(queryParams).map(key => key + '=' + encodeURIComponent(queryParams[key])).join('&');

    window.location.href = window.location.pathname + "?" + queryString;
}
