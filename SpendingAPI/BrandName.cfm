<!--- BrandName.cfm --->
<cfsetting enablecfoutputonly="yes" showdebugoutput="no">
<cfcontent type="application/json; charset=utf-8">
<cftry>
<!--- Get drugID from the request --->
    <cfparam name="form.drugID" default="0">
    <cfparam name="url.drugID" default="0">


<!--- Set up the query to fetch data --->
    <cfquery name="getDrugData" datasource="MedicareData">
        SELECT dd.Drug_ID,
        fy.Year,
        fy.AverageSpendingPerBeneficiary
        FROM MedicarePartD.DrugData dd
        LEFT JOIN MedicarePartD.FinalYearlyData fy ON dd.Drug_ID = fy.YearlyData_ID
        WHERE dd.Drug_ID = <cfqueryparam cfsqltype="cf_sql_integer" value="#form.drugID#">
        AND fy.Year BETWEEN 2017 AND 2021
        ORDER BY fy.Year ASC
    </cfquery>

<!--- Convert query to JSON and return --->
    <cfset result = {}>
    <cfset result["data"] = []>

    <cfloop query="getDrugData">
        <cfset row = {
            "Year" = getDrugData.Year,
            "AverageSpendingPerBeneficiary" = getDrugData.AverageSpendingPerBeneficiary
        }>
        <cfset arrayAppend(result["data"], row)>
    </cfloop>
    <!---<cfset result = []>--->
    <!---<cfloop query="getDrugData">--->
        <!---<cfset row = {}>--->
        <!---<cfset row["year"] = getDrugData.Year>--->
        <!---<cfset row["spending"] = getDrugData.AverageSpendingPerBeneficiary>--->
        <!---<cfset arrayAppend(result, row)>--->
    <!---</cfloop>--->


    <cfoutput>#serializeJson(result)#</cfoutput>

    <cfcatch type="any">
        <cfset error = {
            "status" = "error",
            "message" = "Error fetching data: " & cfcatch.message
        }>
        <cfoutput>#serializeJson(error)#</cfoutput>
    </cfcatch>
</cftry>
</cfsetting>
