<!--- Set content type to JSON --->
<cfcontent type="application/json">

<!--- Get the year and DataTables specific parameters from POST request --->
<cfparam name="form.year" default="">
<cfparam name="form.start" default="0">
<cfparam name="form.length" default="10">

<!--- Get the total number of records in the database --->
<cfquery name="totalCount" datasource="MedicareData">
    SELECT COUNT(*) AS totalRecords
    FROM MedicarePartD.FinalYearlyData
</cfquery>

<!--- Query the database with pagination and ordering by Brand Name --->
<cfquery name="getData" datasource="MedicareData">
    WITH PaginatedData AS (
    SELECT
    dd.Brnd_Name,
    dd.Gnrc_Name,
    ydn.Year,
    ydn.TotalSpending,
    ydn.TotalDosageUnits,
    ydn.TotalBeneficiaries,
    ydn.AverageTotalSpendingPerDosageUnitWeighted,
    ydn.AverageSpendingPerBeneficiary,
    ROW_NUMBER() OVER (ORDER BY dd.Brnd_Name) AS RowNum
    FROM MedicarePartD.FinalYearlyData ydn
    INNER JOIN MedicarePartD.DrugData dd ON ydn.YearlyData_ID = dd.Drug_ID
    WHERE 1=1
    <cfif IsDefined("form.year") AND len(trim(form.year)) GT 0>
        AND ydn.Year = <cfqueryparam value="#form.year#" cfsqltype="cf_sql_integer">
    </cfif>
    )
    SELECT *
    FROM PaginatedData
    WHERE RowNum BETWEEN <cfqueryparam value="#form.start + 1#" cfsqltype="cf_sql_integer"> AND <cfqueryparam value="#form.start + form.length#" cfsqltype="cf_sql_integer">
</cfquery>


<!--- Prepare data for DataTables --->
<cfset result = {
    "draw": form.draw ?: 1,
    "recordsTotal": totalCount.totalRecords,
    "recordsFiltered": getData.recordCount,  <!--- This should be adjusted if you implement more search/filtering --->
    "data": []
}>

<!--- Loop over the query results and add to the data array --->
<cfloop query="getData">
    <cfset arrayAppend(result.data, {
        "Brnd_Name": Brnd_Name,
        "Gnrc_Name": Gnrc_Name,
        "Year": Year,
        "TotalSpending": TotalSpending,
        "TotalDosageUnits": TotalDosageUnits,
        "TotalBeneficiaries": TotalBeneficiaries,
        "AverageTotalSpendingPerDosageUnitWeighted": AverageTotalSpendingPerDosageUnitWeighted,
        "AverageSpendingPerBeneficiary": AverageSpendingPerBeneficiary
    })>
</cfloop>

<!--- Output the result as JSON --->
<cfoutput>#serializeJSON(result)#</cfoutput>
