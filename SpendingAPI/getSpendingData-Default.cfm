<<!--- Set content type to JSON --->
<cfcontent type="application/json">

<!--- Parameters and Initial Setup --->
<cfparam name="form.year" default="">
<cfparam name="form.start" default="0">
<cfparam name="form.length" default="10">
<cfparam name="form.order[0][column]" default="0">
<cfparam name="form.order[0][dir]" default="asc">

<cfset columns = ["Brnd_Name", "Gnrc_Name", "Year", "TotalSpending", "TotalDosageUnits", "TotalBeneficiaries", "AverageSpendingPerBeneficiary"]>

<cfif structKeyExists(form, "order[0][column]")>
    <cfset orderColumnIndex = form["order[0][column]"]>
    <cfset orderByDirection = form["order[0][dir]"]>
<cfelse>
    <cfset orderColumnIndex = 0>
    <cfset orderByDirection = "asc">
</cfif>


<cfset orderByColumn = columns[val(form["order[0][column]"]) + 1]>


<!--- Check for the existence of searchValue --->
<cfif structKeyExists(form, "searchValue")>
    <cfset searchValue = form.searchValue>
<cfelse>
    <cfset searchValue = "">
</cfif>

<!--- Get the total number of records in the database --->
<cfquery name="totalCount" datasource="MedicareData">
    SELECT COUNT(*) AS totalRecords
    FROM MedicarePartD.FinalYearlyData
</cfquery>

<!--- Query the database for data --->
<cfquery name="getData" datasource="MedicareData">
    WITH FilteredData AS (
    SELECT
        dd.Drug_ID,
        dd.Brnd_Name,
        dd.Gnrc_Name,
        ydn.Year,
        ydn.TotalSpending,
        ydn.TotalDosageUnits,
        ydn.TotalBeneficiaries,
        ydn.AverageSpendingPerBeneficiary,
        ROW_NUMBER() OVER (ORDER BY #orderByColumn# #orderByDirection#) AS RowNum
    FROM MedicarePartD.FinalYearlyData ydn
    INNER JOIN MedicarePartD.DrugData dd ON ydn.YearlyData_ID = dd.Drug_ID
    WHERE 1=1
    <cfif IsDefined("form.year") AND len(trim(form.year)) GT 0>
        AND ydn.Year = <cfqueryparam value="#form.year#" cfsqltype="cf_sql_integer">
    </cfif>
    <cfif len(trim(searchValue))>
        AND (dd.Brnd_Name LIKE <cfqueryparam value="%#searchValue#%" cfsqltype="cf_sql_varchar">
        OR dd.Gnrc_Name LIKE <cfqueryparam value="%#searchValue#%" cfsqltype="cf_sql_varchar">)
    </cfif>
    )
    SELECT * FROM FilteredData
    ORDER BY #orderByColumn# #orderByDirection#
    OFFSET <cfqueryparam value="#form.start#" cfsqltype="cf_sql_integer"> ROWS
FETCH NEXT <cfqueryparam value="#form.length#" cfsqltype="cf_sql_integer"> ROWS ONLY
</cfquery>

<!--- Query the database for the filtered record count --->
<cfquery name="filteredCount" datasource="MedicareData">
    SELECT COUNT(*) AS filteredRecords
    FROM MedicarePartD.FinalYearlyData ydn
    INNER JOIN MedicarePartD.DrugData dd ON ydn.YearlyData_ID = dd.Drug_ID
    WHERE 1=1
    <cfif IsDefined("form.year") AND len(trim(form.year)) GT 0>
        AND ydn.Year = <cfqueryparam value="#form.year#" cfsqltype="cf_sql_integer">
    </cfif>
    <cfif len(trim(searchValue))>
        AND (dd.Brnd_Name LIKE <cfqueryparam value="%#searchValue#%" cfsqltype="cf_sql_varchar">
        OR dd.Gnrc_Name LIKE <cfqueryparam value="%#searchValue#%" cfsqltype="cf_sql_varchar">)
    </cfif>
</cfquery>

<!--- Prepare data for DataTables --->
<cfset result = {
    "draw": form.draw ?: 1,
    "recordsTotal": totalCount.totalRecords,
    "recordsFiltered": filteredCount.filteredRecords,
    "data": []
}>

<!--- Loop over the query results and add to the data array --->
<cfloop query="getData">
    <cfset arrayAppend(result.data, {
        "Drug_ID": Drug_ID,
        "Brnd_Name": Brnd_Name,
        "Gnrc_Name": Gnrc_Name,
        "Year": Year,
        "TotalSpending": TotalSpending,
        "TotalDosageUnits": TotalDosageUnits,
        "TotalBeneficiaries": TotalBeneficiaries,
        "AverageSpendingPerBeneficiary": AverageSpendingPerBeneficiary
    })>
</cfloop>

<!--- Output the result as JSON --->
<cfoutput>#serializeJSON(result)#</cfoutput>