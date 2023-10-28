<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/CapstoneIT491/CSS/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Medicare Spending</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/CapstoneIT491/JavaScript/newSpending.js"></script>
    <script src="/CapstoneIT491/JavaScript/script.js"></script>
</head>
<body style="background-color: dimgrey">
<cfinclude template="/CapstoneIT491/features/navbar.cfm">

<h1>MedicareSpending</h1>

<div id="tableSettings">
    <select id="SpendingYear" name="year" onChange="filterData();">
        <option value="" disabled selected>Select Year</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
    </select>
    <br>
    <input type="text" id="spendingSearch" name="drugSearch" placeholder="Search for a drug by name..." onkeyup="checkForEnter(event);">
    <br>
    <label for="spendingGeneric">
        <input type="checkbox" id="spendingGeneric" name="groupByGeneric"> Group by generic name
    </label>

    <label for="pageSize">Rows per page:</label>
    <select id="pageSize">
        <option value="50">50</option>
        <option value="100" selected>100</option>
        <option value="150">150</option>
        <option value="200">200</option>
    </select>
</div>

<div>
<!--- The Default Table Structure --->
    <table id="mainTable" border="1">
        <thead>
        <tr>
            <th class="wrap-text sortable">Brand Name</th>
            <th class="wrap-text sortable">Generic Name</th>
            <th class="sortable">Year</th>
            <th class="wrap-text sortable">Total Spending</th>
            <th class="wrap-text sortable">Total Dosage Units</th>
            <th class="wrap-text sortable">Total Beneficiaries</th>
            <th class="wrap-text sortable">Average Total Spending Per Dosage Unit Weighted</th>
            <th class="wrap-text sortable">Average Spending Per Beneficiary</th>
        </tr>
        </thead>
        <tbody>
        <!-- Data will be populated here by the JavaScript -->
        </tbody>
    </table>
    <!-- Pagination controls can be added here if required -->
</div>

<br>
<br>
<a href="index.cfm" class="back-link">Back to Landing Page</a>
</body>
</html>
