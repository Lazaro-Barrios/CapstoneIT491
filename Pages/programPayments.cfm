<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>

    <link rel="stylesheet" href="/CapstoneIT491/CSS/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
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
    <select class="another-filter" multiple="multiple">
        <option value="selectAll">Select All</option>
        <option value="option1">Routine Home Care</option>
        <option value="option2">Continuous Home Care</option>
        <option value="option3">Inpatient Home Care</option>
        <option value="option4">General Inpatient Care</option>
        <option value="option5">Other Hospice Services</option>
        <option value="option6">Not Elsewhere Classified</option>
    </select><br><br><br>

    <a href="index.cfm" class="back-link">Back to Landing Page</a>
    <script src="/CapstoneIT491/JavaScript/script.js"></script>
</body>
</html>
