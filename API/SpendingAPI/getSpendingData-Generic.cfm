<!-- Gets data for the generic only table -->
<!--- Set content type to JSON --->
<cfcontent type="application/json">

<!--- Parameters and Initial Setup --->
<cfparam name="form.year" default="">
<cfparam name="form.start" default="0">
<cfparam name="form.length" default="10">

<!-- Initialize form.order if not set -->
<cfif NOT StructKeyExists(form, "order") OR NOT IsArray(form.order)>
    <cfset form.order = [{}]><!--- Initialize as an array with an empty struct --->
</cfif>

<!-- Ensure the first element of form.order is a struct -->
<cfif ArrayLen(form.order) < 1 OR NOT IsStruct(form.order[1])>
    <cfset form.order[1] = {}>
</cfif>

<!-- Setting default values for form.order elements -->
<cfparam name="form.order[1].column" default="0">
<cfparam name="form.order[1].dir" default="asc">

<!--- Update columns array to only include the new columns --->
<cfset columns = ["Gnrc_Name", "Year", "TotalSpending", "AverageSpendingPerBeneficiary"]>

<cfset orderColumnIndex = Val(form.order[1].column)>
<cfset orderByDirection = form.order[1].dir>
<cfset orderByColumn = columns[orderColumnIndex + 1]><cftry>
<!--- Get the total number of records in the database --->
<!--- NOTE: This may need adjustment based on new query specifics --->
<cfquery name="totalCount" datasource="MedicareData">
    SELECT COUNT(*) AS totalRecords
    FROM (
    SELECT DISTINCT dd.Gnrc_Name, ydn.Year
    FROM MedicarePartD.FinalYearlyData ydn
    INNER JOIN MedicarePartD.DrugData dd ON ydn.YearlyData_ID = dd.Drug_ID
    ) AS DistinctCombinations
</cfquery>

<!--- Query the database for data --->
<cfquery name="getData" datasource="MedicareData">
    WITH FilteredData AS (
    SELECT
    dd.Gnrc_Name,
    ydn.Year,
    SUM(ydn.TotalSpending) AS TotalSpending,
    AVG(ydn.AverageSpendingPerBeneficiary) AS AverageSpendingPerBeneficiary,
    ROW_NUMBER() OVER (ORDER BY #orderByColumn# #orderByDirection#) AS RowNum
FROM MedicarePartD.FinalYearlyData ydn
INNER JOIN MedicarePartD.DrugData dd ON ydn.YearlyData_ID = dd.Drug_ID
WHERE 1=1
    <cfif IsDefined("form.year") AND len(trim(form.year)) GT 0>
        AND ydn.Year = <cfqueryparam value="#form.year#" cfsqltype="cf_sql_integer">
    </cfif>
    <cfif len(trim(searchValue))>
        AND dd.Gnrc_Name LIKE <cfqueryparam value="%#searchValue#%" cfsqltype="cf_sql_varchar">
    </cfif>
    GROUP BY dd.Gnrc_Name, ydn.Year
    )
    SELECT * FROM FilteredData
    ORDER BY #orderByColumn# #orderByDirection#
    OFFSET <cfqueryparam value="#form.start#" cfsqltype="cf_sql_integer"> ROWS
FETCH NEXT <cfqueryparam value="#form.length#" cfsqltype="cf_sql_integer"> ROWS ONLY
</cfquery>

<!--- Query the database for the filtered record count --->
<!--- NOTE: This query is also adjusted to align with our new main query --->
<cfquery name="filteredCount" datasource="MedicareData">
    SELECT COUNT(*) AS filteredRecords
    FROM (
    SELECT DISTINCT dd.Gnrc_Name, ydn.Year
    FROM MedicarePartD.FinalYearlyData ydn
    INNER JOIN MedicarePartD.DrugData dd ON ydn.YearlyData_ID = dd.Drug_ID
    WHERE 1=1
    <cfif IsDefined("form.year") AND len(trim(form.year)) GT 0>
        AND ydn.Year = <cfqueryparam value="#form.year#" cfsqltype="cf_sql_integer">
    </cfif>
    <cfif len(trim(searchValue))>
        AND dd.Gnrc_Name LIKE <cfqueryparam value="%#searchValue#%" cfsqltype="cf_sql_varchar">
    </cfif>
    ) AS DistinctFilteredCombinations
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
        "Gnrc_Name": Gnrc_Name,
        "Year": Year,
        "TotalSpending": TotalSpending,
        "AverageSpendingPerBeneficiary": AverageSpendingPerBeneficiary
    })>
</cfloop>

<!--- Output the result as JSON --->
<cfcontent type="application/json">
<cfoutput>#serializeJSON(result)#</cfoutput>

<cfcatch type="any">
    <cfcontent type="application/json">
    <cfoutput>{"error": "#cfcatch.message#"} </cfoutput>
</cfcatch>
</cftry>
