<!--- Set content type to JSON --->
<cfcontent type="application/json">

<!--- Get the year from POST request (or any other parameters you might have) --->
<cfparam name="form.year" default="">

<!--- Query the database --->
<cfquery name="getData" datasource="MedicareData">
    SELECT
    dd.Brnd_Name,
    dd.Gnrc_Name,
    ydn.Year,
    ydn.TotalSpending,
    ydn.TotalDosageUnits,
    ydn.TotalBeneficiaries,
    ydn.AverageTotalSpendingPerDosageUnitWeighted,
    ydn.AverageSpendingPerBeneficiary
    FROM MedicarePartD.FinalYearlyData ydn
    INNER JOIN MedicarePartD.DrugData dd ON ydn.YearlyData_ID = dd.Drug_ID
    WHERE 1=1
    <cfif len(form.year)>
        AND ydn.Year = <cfqueryparam value="#form.year#" cfsqltype="cf_sql_integer">
    </cfif>
<!--- Add any other filters or joins as needed --->
</cfquery>

<!--- Prepare data for DataTables --->
<cfset result = {
    "draw": form.draw ?: 1,
    "recordsTotal": getData.recordCount,
    "recordsFiltered": getData.recordCount,  <!--- This should be adjusted if you implement search/filtering --->
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
