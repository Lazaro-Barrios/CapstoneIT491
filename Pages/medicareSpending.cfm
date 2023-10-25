<!DOCTYPE html>
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
    <script src="/CapstoneIT491/JavaScript/Spending.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <h1>MedicareSpending</h1>

    <div id="tableSettings">
        <!-- Dropdown for "Select Year" -->
        <select id="SpendingYear" name="year" onChange="filterDataByYear();">
            <option value="" disabled selected>Select Year</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
        </select>

        <br>

        <!-- Search bar for "Search for a drug by name" -->
        <input type="text" id="spendingSearch" name="drugSearch" placeholder="Search for a drug by name..." onkeyup="checkForEnter(event);">

        <br>

        <!-- Checkbox for "Group by generic name" -->
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
        <!--- Determine the Current Page --->
        <cfparam name="URL.page" default="1">
        <cfif isNumeric(URL.page) AND val(URL.page) GT 0>
                <!-- Now it's safe to perform operations on URL.page -->
        </cfif>

        <cfparam name="URL.itemsPerPage" default="100">
        <!---<cfset itemsPerPage = URL.itemsPerPage>--->

        <cfif isNumeric(URL.page) AND val(URL.page) GT 0>
            <cfset startRow = (URL.page - 1) * itemsPerPage + 1>
        <cfelse>
            <cfset startRow = 1>
        </cfif>


        <cfparam name="URL.selectedYear" default="">
        <cfparam name="URL.drugSearch" default="">


        <!-- Only apply the filter if selectedYear is not empty -->

        <cfif URL.selectedYear NEQ "" OR URL.drugSearch NEQ "">
            <cfquery datasource="MedicareData" name="getData">
                    SELECT y.*, d.Brnd_Name, d.Gnrc_Name
                    FROM MedicarePartD.FinalYearlyData y
                    INNER JOIN MedicarePartD.DrugData d ON y.YearlyData_ID = d.Drug_ID
                    WHERE 1=1
                <cfif URL.selectedYear NEQ "">
                        AND y.Year = <cfqueryparam value="#URL.selectedYear#" cfsqltype="cf_sql_integer">
                </cfif>
                <cfif URL.drugSearch NEQ "">
                        AND (d.Brnd_Name LIKE <cfqueryparam value="%#URL.drugSearch#%" cfsqltype="cf_sql_varchar">
                        OR d.Gnrc_Name LIKE <cfqueryparam value="%#URL.drugSearch#%" cfsqltype="cf_sql_varchar">)
                </cfif>
                    ORDER BY y.YearlyData_ID
                    OFFSET <cfqueryparam value="#startRow - 1#" cfsqltype="cf_sql_integer"> ROWS
                FETCH NEXT <cfqueryparam value="#itemsPerPage#" cfsqltype="cf_sql_integer"> ROWS ONLY;
            </cfquery>
        <cfelse>
            <!-- Original query for when no filter is applied -->
            <cfquery datasource="MedicareData" name="getData">
                SELECT y.*, d.Brnd_Name, d.Gnrc_Name
                FROM MedicarePartD.FinalYearlyData y
                INNER JOIN MedicarePartD.DrugData d ON y.YearlyData_ID = d.Drug_ID
                ORDER BY y.YearlyData_ID
                OFFSET <cfqueryparam value="#startRow - 1#" cfsqltype="cf_sql_integer"> ROWS
                FETCH NEXT <cfqueryparam value="#itemsPerPage#" cfsqltype="cf_sql_integer"> ROWS ONLY;
            </cfquery>
        </cfif>


        <!--- Get Total Records for Pagination (this remains unchanged) --->
        <cfquery datasource="MedicareData" name="totalRecords">
                SELECT COUNT(*) as cnt
                FROM MedicarePartD.FinalYearlyData
        </cfquery>
        <cfset totalPages = ceiling(totalRecords.cnt/itemsPerPage)>


        <!--- Displaying the Default Table --->
            <table border="1">
            <!--- Updated Table headers to include Brnd_Name --->
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

                <!--- Updated Table data to include Brnd_Name --->
                <tbody>
                    <cfoutput query="getData">
                        <tr>
                            <td class="wrap-text">#getData.Brnd_Name#</td>
                            <td class="wrap-text">#getData.Gnrc_Name#</td>
                            <td>#getData.Year#</td>
                            <td class="wrap-text">#getData.TotalSpending#</td>
                            <td class="wrap-text">#getData.TotalDosageUnits#</td>
                            <td class="wrap-text">#getData.TotalBeneficiaries#</td>
                            <td class="wrap-text">#getData.AverageTotalSpendingPerDosageUnitWeighted#</td>
                            <td class="wrap-text">#getData.AverageSpendingPerBeneficiary#</td>
                        </tr>
                    </cfoutput>
                </tbody>
            </table>
<!---</cfif>--->

        <!---Navigation Links & Advanced Pagination Logic--->
        <br>
        <div>
            <cfset maxPageLinks = 3> <!--- Number of page links to show around the current page --->

            <!--- START Link --->
            <cfif URL.page NEQ 1>
                    <a href="?page=1&itemsPerPage=<cfoutput>#URL.itemsPerPage#</cfoutput>">START</a>
            </cfif>

            <!--- PREV Link --->
            <cfif isNumeric(URL.page) AND val(URL.page) GT 1>
                    <a href="?page=<cfoutput>#val(URL.page)-1#</cfoutput>&itemsPerPage=<cfoutput>#URL.itemsPerPage#</cfoutput>">PREV</a>
            </cfif>

            <!--- Page Numbers, Showing a Limited Set --->
            <cfoutput>
            <!--- Start page --->
                <cfset startPage = max(1, URL.page - maxPageLinks)>
            <!--- End page --->
                <cfset endPage = min(totalPages, URL.page + maxPageLinks)>

                <cfloop from="#startPage#" to="#endPage#" index="i">
                    <cfif i EQ URL.page>
                            <strong>#i#</strong>
                    <cfelse>
                            <a href="?page=#i#&itemsPerPage=<cfoutput>#URL.itemsPerPage#</cfoutput>">#i#</a>
                    </cfif>
                </cfloop>
            </cfoutput>

            <!--- NEXT Link --->
            <cfif isNumeric(URL.page) AND val(URL.page) LT totalPages>
                    <a href="?page=<cfoutput>#val(URL.page)+1#</cfoutput>&itemsPerPage=<cfoutput>#URL.itemsPerPage#</cfoutput>">NEXT</a>
            </cfif>

            <!--- END Link --->
            <cfif isNumeric(URL.page) AND val(URL.page) NEQ totalPages>
                    <a href="?page=<cfoutput>#totalPages#</cfoutput>&itemsPerPage=<cfoutput>#URL.itemsPerPage#</cfoutput>">END</a>
            </cfif>


        </div>

    </div>

    <br>
    <br>
    <a href="index.cfm" class="back-link">Back to Landing Page</a>

    </body>
</html>
