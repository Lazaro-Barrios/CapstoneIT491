<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="/CapstoneIT491/CSS/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <title>Program Payments</title>
</head>
<body>
    <cfinclude template="/CapstoneIT491/features/navbar.cfm">

        <h1>Program Payments</h1>
        <select class="year-filter">
            <option value="" disabled selected>Year</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
        </select>
        <select class="another-filter" multiple>
            <option value="selectAll">Select All</option>
            <option value="1">Routine Home Care</option>
            <option value="2">Continuous Home Care</option>
            <option value="3">Inpatient Home Care</option>
            <option value="4">General Inpatient Care</option>
        </select>  
    <button id="fetchDataButton">Update Results</button><br><br><br>

    <div id="dataTable"></div>
    <div class="chart-container">
        <canvas id="multiBarChart"></canvas>
    </div>
    <a href="index.cfm" class="back-link">Back to Landing Page</a>
    <script src="/CapstoneIT491/JavaScript/script.js"></script>
</body>
</html>