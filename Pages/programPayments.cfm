<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Program Payments</title>
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/0.9.13/css/bootstrap-multiselect.css">
    <link rel="stylesheet" href="../CSS/styles.css">
    
</head>

<body>
    <header class="main-header">
        <a href="https://rde.org/index.html" target="_blank">
            <img src="/CapstoneIT491/images/lightLogo-removebg-preview.png" alt="Company Logo" class="company-logo">
        </a>
        <cfinclude template="/CapstoneIT491/html/navbar.cfm">
    </header>
    <div class="center-container">
        <div class="main-content">
            <h1>Program Payments</h1>
            <form name="paymentFilters" method="post">
                <div class="dropdowns-container">
                    <div class="dropdown-item">
                        <label for="yearFilter">Select Year:</label>
                        <div class="select-container">
                            <select name="yearFilter" id="yearFilter" class="custom-select">
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                            </select>
                        </div>
                    </div>
                    <div class="dropdown-item">
                        <label for="filters">Level of Care:</label>
                        <div class="select-container">
                            <select name="filters" id="filters" multiple="multiple" class="custom-select">
                                <option value="filter1">Routine Home Care</option>
                                <option value="filter2">Continuous Home Care 2</option>
                                <option value="filter3">Inpatient Respite Care</option>
                                <option value="filter4">General Inpatient Care</option>
                                <option value="filter5">Physician</option>
                                <option value="filter6">Not Elsewhere Classified</option>
                            </select>
                        </div>
                    </div>
                    <div class="button-container">
                        <input type="submit" value="Apply Filters">
                    </div>
                </div>
            </form>
            <a href="index.cfm" class="back-link">Back to Landing Page</a>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/0.9.13/js/bootstrap-multiselect.min.js"></script>

    <script>
        $(document).ready(function() {
            const commonMultiselectSettings = {
                maxHeight: 200,
                dropUp: false, // Set dropUp to true
                buttonWidth: '125%',
                enableFiltering: false,
                includeSelectAllOption: false,
                numberDisplayed: 1
            };

            $('#filters').multiselect({
                ...commonMultiselectSettings,
                nonSelectedText: 'Select Filters',
                allSelectedText: 'Select Filters',
                multiple: true
            });

            $('#yearFilter').multiselect({
                ...commonMultiselectSettings,
                nonSelectedText: 'Select Year',
                allSelectedText: 'Select Year',
                multiple: false
            });
        });

    </script>
</body>
</html>
