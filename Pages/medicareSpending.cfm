<!DOCTYPE html>
<!---<cfquery name="getAllData" datasource="MedicareData" maxrows="50">--->
    <!---SELECT * FROM MedicarePartD--->
<!---</cfquery>--->

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/CapstoneIT491/CSS/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Medicare Spending</title>



</head>

<body style="background-color: dimgrey">
    <cfinclude template="/CapstoneIT491/features/navbar.cfm">
    
    <script src="/CapstoneIT491/JavaScript/script.js"></script>
    <h1>MedicareSpending</h1>

    <div id="tableSettings">
        <!-- Dropdown for "Select Year" -->
        <select id="SpendingYear" name="year">
            <option value="" disabled selected>Select Year</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
        </select>

        <br>

        <!-- Search bar for "Search for a drug by name" -->
        <input type="text" id="spendingSearch" name="drugSearch" placeholder="Search for a drug by name...">

        <br>

        <!-- Checkbox for "Group by generic name" -->
        <label for="spendingGeneric">
            <input type="checkbox" id="spendingGeneric" name="groupByGeneric"> Group by generic name
        </label>

    </div>

    <div>
        <!--- Determine the Current Page --->
        <cfparam name="URL.page" default="1">
        <cfset itemsPerPage = 50>
        <cfset startRow = (URL.page - 1) * itemsPerPage + 1>

        <!---<cfquery datasource="MedicareData" name="getData" maxrows="50">--->
                <!---SELECT * FROM MedicarePartD.FinalYearlyData;--->
        <!---</cfquery>--->
        <!--- Modify the SQL Query to Retrieve the Right Set of Rows --->
        <cfquery datasource="MedicareData" name="getData">
                SELECT *
                FROM MedicarePartD.FinalYearlyData
                ORDER BY YearlyData_ID
                OFFSET <cfqueryparam value="#startRow - 1#" cfsqltype="cf_sql_integer"> ROWS
            FETCH NEXT <cfqueryparam value="#itemsPerPage#" cfsqltype="cf_sql_integer"> ROWS ONLY;
        </cfquery>

        <!--- Get Total Records for Pagination --->
        <cfquery datasource="MedicareData" name="totalRecords">
                SELECT COUNT(*) as cnt
                FROM MedicarePartD.FinalYearlyData
        </cfquery>
        <cfset totalPages = ceiling(totalRecords.cnt/itemsPerPage)>

        <!--- Displaying the Table --->
        <table border="1">
            <!--- Table headers --->
            <thead>
                <tr>
                    <th>YearlyData_ID</th>
                    <th>Year</th>
                    <th>TotalSpending</th>
                    <th>TotalDosageUnits</th>
                    <th>TotalBeneficiaries</th>
                    <th>AverageTotalSpendingPerDosageUnitWeighted</th>
                    <th>AverageSpendingPerBeneficiary</th>
                </tr>
            </thead>

            <!--- Table data --->
            <tbody>
                <cfoutput query="getData">
                    <tr>
                        <td>#getData.YearlyData_ID#</td>
                        <td>#getData.Year#</td>
                        <td>#getData.TotalSpending#</td>
                        <td>#getData.TotalDosageUnits#</td>
                        <td>#getData.TotalBeneficiaries#</td>
                        <td>#getData.AverageTotalSpendingPerDosageUnitWeighted#</td>
                        <td>#getData.AverageSpendingPerBeneficiary#</td>
                    </tr>
                </cfoutput>
            </tbody>
        </table>

        <!--- Navigation Links & Advanced Pagination Logic --->
        <div>
            <cfset maxPageLinks = 3> <!--- Number of page links to show around the current page --->

            <!--- START Link --->
            <cfif URL.page NEQ 1>
                    <a href="?page=1">START</a>
            </cfif>

            <!--- PREV Link --->
            <cfif URL.page GT 1>
                    <a href="?page=#URL.page-1#">PREV</a>
            </cfif>

            <!--- Page Numbers, Showing a Limited Set --->
            <cfoutput>
                <!--- Start page --->
                <cfset startPage = max(1, URL.page - maxPageLinks)>
                <!--- End page --->
                <cfset endPage = min(totalPages, URL.page + maxPageLinks)>

                <cfif startPage GT 1>
                        ...
                </cfif>

                <cfloop from="#startPage#" to="#endPage#" index="i">
                    <cfif i EQ URL.page>
                            <strong>#i#</strong>
                    <cfelse>
                            <a href="?page=#i#">#i#</a>
                    </cfif>
                </cfloop>

                <cfif endPage LT totalPages>
                        ...
                </cfif>
            </cfoutput>

            <!--- NEXT Link --->
            <cfif URL.page LT totalPages>
                    <a href="?page=#URL.page+1#">NEXT</a>
            </cfif>

            <!--- END Link --->
            <cfif URL.page NEQ totalPages>
                    <a href="?page=#totalPages#">END</a>
            </cfif>
        </div>




</div>

    <br>
    <br>
    <a href="index.cfm" class="back-link">Back to Landing Page</a>
</body>
</html>
