<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Program Payments</title>
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
                <label for="yearFilter">Select Year:</label>
                <select name="yearFilter" id="yearFilter" class="custom-select">
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                </select>
                <input type="submit" value="Apply Filters">
            </form>
            <a href="index.cfm" class="back-link">Back to Landing Page</a>
        </div>
    </div>
</body>

</html>
