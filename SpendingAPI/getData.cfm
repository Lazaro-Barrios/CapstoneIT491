<cfsetting enablecfoutputonly="yes">

<!--- Setup parameters --->
<cfparam name="URL.selectedYear" default="">
<cfparam name="URL.drugSearch" default="">
<cfparam name="URL.page" default="1">
<cfparam name="URL.itemsPerPage" default="100">

<!--- Query to fetch the data --->
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
        OFFSET <cfqueryparam value="#(URL.page - 1) * URL.itemsPerPage#" cfsqltype="cf_sql_integer"> ROWS
    FETCH NEXT <cfqueryparam value="#URL.itemsPerPage#" cfsqltype="cf_sql_integer"> ROWS ONLY;
    </cfquery>
<cfelse>
    <cfquery datasource="MedicareData" name="getData">
        SELECT y.*, d.Brnd_Name, d.Gnrc_Name
        FROM MedicarePartD.FinalYearlyData y
        INNER JOIN MedicarePartD.DrugData d ON y.YearlyData_ID = d.Drug_ID
        ORDER BY y.YearlyData_ID
        OFFSET <cfqueryparam value="#(URL.page - 1) * URL.itemsPerPage#" cfsqltype="cf_sql_integer"> ROWS
    FETCH NEXT <cfqueryparam value="#URL.itemsPerPage#" cfsqltype="cf_sql_integer"> ROWS ONLY;
    </cfquery>
</cfif>

<!--- Convert query result to an array of structs (each struct represents a row) --->
<cfset resultArray = []>
<cfloop query="getData">
    <cfset rowStruct = {
        "Brnd_Name" = getData.Brnd_Name,
        "Gnrc_Name" = getData.Gnrc_Name,
        "Year" = getData.Year,
        "TotalSpending" = getData.TotalSpending,
        "TotalDosageUnits" = getData.TotalDosageUnits,
        "TotalBeneficiaries" = getData.TotalBeneficiaries,
        "AverageTotalSpendingPerDosageUnitWeighted" = getData.AverageTotalSpendingPerDosageUnitWeighted,
        "AverageSpendingPerBeneficiary" = getData.AverageSpendingPerBeneficiary
    }>
    <cfset arrayAppend(resultArray, rowStruct)>
</cfloop>

<!--- Return the result as JSON --->
<cfheader name="Content-Type" value="application/json">
<cfoutput>#serializeJSON(resultArray)#</cfoutput>
