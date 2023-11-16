<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../images/lightLogo-removebg-preview.ico">
    <title>Medicare Spending</title>

    <link rel="stylesheet" href="/CapstoneIT491/CSS/styles.css">
    <!---<script src="../JavaScript/script.js"></script>--->

    <!---I don't remember what this one is for?--->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <!-- Bootstrap CSS and JS -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <!---<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>--->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js"></script>

    <script src="../JavaScript/spending.js"></script>

</head>
<body style="background-color: #dadada">
<cfinclude template="../features/navbar.cfm">

<h1 style="
    text-align: center;
    font-size: 3rem;
    padding-top: 5px;
">Medicare Spending</h1>
<br>
<div id="tableSettings">
    <select id="SpendingYear" name="year">
        <option value="" disabled selected>Select Year</option>
        <option value="">All Years</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
    </select>
    <label for="spendingGeneric">
        <input type="checkbox" id="spendingGeneric" name="groupByGeneric"> Group by generic name
    </label>

</div>

<div>
<!--- The Default Table Structure --->
    <table id="dataTable" class="display">
        <thead>
        </thead>
        <tbody></tbody>
    </table>

    <!-- New Bootstrap Modal for Spending Data Table Display -->
    <div class="modal fade" id="spendingModal" tabindex="-1" role="dialog" aria-labelledby="spendingModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document"> <!-- Added modal-lg for larger modal -->
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="spendingModalLabel">Spending Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Table for displaying the spending data -->
                    <table id="modalDataTable" class="table">
                        <thead>
                        <tr>
                            <th>Brand Name</th>
                            <th>Manufacturer Name</th>
                            <th>Total Spending 2017</th>
                            <th>Total Spending 2018</th>
                            <th>Total Spending 2019</th>
                            <th>Total Spending 2020</th>
                            <th>Total Spending 2021</th>
                        </tr>
                        </thead>
                        <tbody id="modalTableBody">
                        <!-- Data rows will be appended here by the populateModalTable function -->
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap Modal for Chart Display -->
    <div class="modal fade" id="chartModal" tabindex="-1" role="dialog" aria-labelledby="chartModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="chartModalLabel">[Chart Title]</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <!---<canvas id="chartCanvas"></canvas>--->
                </div>
                    <div class="modal-body">
                        <canvas id="chartCanvas" width="400" height="400"></canvas>
                    </div>
            </div>
        </div>
    </div>
</div>

<br>
<br>
<a href="index.cfm" class="back-link">Back to Landing Page</a>
</body>

</html>
