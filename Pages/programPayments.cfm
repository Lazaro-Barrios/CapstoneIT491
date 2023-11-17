<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Program Payments</title>
    <link rel="stylesheet" href="/CapstoneIT491/CSS/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/select/1.3.3/css/select.dataTables.min.css">
</head>
<body>
    <cfinclude template="/CapstoneIT491/features/navbar.cfm">
        <div class="filters-container">
            <div class="filter-widget">
                <div class="filter-group">
                <label for="year-filter">Select Year:</label>
                    <select class="year-filter" style="display: none;">
                        <option disabled selected value="">Select a Year</option>            
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="care-filter">Select Level of Care:</label>
                    <select class="care-filter hide-dropdown" multiple>
                        <option value="1">Routine Home Care</option>
                        <option value="2">Continuous Home Care</option>
                        <option value="3">Inpatient Home Care</option>
                        <option value="4">General Inpatient Care</option>
                    </select>
                </div>
            </div>
            <!--
            <button id="fetchDataButton">Update Results</button>
            <button id="hideUnselectedRowsButton" class="btn btn-secondary">Hide Unselected Rows</button>
            -->
        </div>
    <div class="widget-container">
        <div class="widget-header">
            <h2>Program Payments Table</h2>
        </div>   
        <table id="dataTable" class="display" style="width:100%">
            <thead>
            </thead>
            <tbody>
            </tbody>
            <tfoot>
                <tr>
                </tr>
            </tfoot>
        </table>
    </div>
    <div class="widget-container2">
        <div class="widget-header">
            <h2>Program Payments Multi-Bar Graph</h2>
        </div>
        <div class="chart-container">
            <canvas id="multiBarChart"></canvas>
        </div>
    </div>
    <br><br><br>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.0/dist/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.js" type="text/javascript" charset="utf8"></script>
    <script src="https://cdn.datatables.net/select/1.3.3/js/dataTables.select.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="/CapstoneIT491/JavaScript/script.js"></script>
    <script src="/CapstoneIT491/JavaScript/programPayments/utils.js"></script>
    <script src="/CapstoneIT491/JavaScript/programPayments/dataFetch.js"></script>
    <script src="/CapstoneIT491/JavaScript/programPayments/tableRender.js"></script>
    <script src="/CapstoneIT491/JavaScript/programPayments/chartRender.js"></script>
</body>
</html>