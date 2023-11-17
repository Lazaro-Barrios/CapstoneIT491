<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../images/lightLogo-removebg-preview.ico">
    <title>Medicare Spending</title>

    <link rel="stylesheet" href="/CapstoneIT491/CSS/spendingStyle.css">
    <!---<script src="../JavaScript/script.js"></script>--->

    <!-- I don't remember what this one is for? It doesn't seem to actually do anything -->
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


<div style="text-align: center;">
    <h1 style="
        display: inline-block; /* Inline-block will allow you to position the question mark relative to the h1 */
        font-size: 3rem;
        position: relative; /* Relative positioning for h1 to place the question mark relative to it */
        padding-top: 5px;
    ">
        Medicare Part D Spending by Drug
        <div class="question-image-wrapper" style="display: inline-block; width: 25px; height: 25px; position: absolute; top: 0; right: -30px;">
            <img src="../images/question.png" class="questionImage" alt="normal" onclick="openQuestionModal()" style="width:25px; height:25px;"/>
            <img src="../images/question-inverted.png" class="questionImage-hover" alt="hover" onclick="openQuestionModal()" style="width:25px; height:25px;"/>
        </div>
    </h1>
</div>



<div class="modal fade" id="questionModal" tabindex="-1" role="dialog" aria-labelledby="newModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="questionModalLabel">Quick Guide of page features!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Firstly, what are Part D drugs? Part D drugs refer to prescription medications covered under Medicare Part D, which is a federal program in the United States that helps people with Medicare pay for their prescription drugs</p>
                <p>This page has lots of tools to help view the provided data:</p>
                <ul>
                    <li>Select a year from the "Select Year" dropdown to only show data from that year.</li>
                    <li>Toggle "Group by Generic Name" to have the table show a consolidated view of all drugs by brand name with consolidated data, such as total spending among all brands.</li>
                    <li>Click on a Brand Name to see a line chart of the Average Spending Per Beneficiary for that specific drug.</li>
                    <li>Click on a Generic Name to see a table of all the different drug brand and manufacturer names along with their total spending by year.</li>
                    <li>Other useful features include a search bar that searches by both Generic and Brand name, the ability to sort each column by ascending/descending view, and changing how many drugs are shown on each table page.</li>
                </ul>
            </div>
        </div>
    </div>
</div>


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
