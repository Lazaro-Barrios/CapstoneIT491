<cfsetting enablecfoutputonly="yes">
<cftry>

<!--- URL parameter validation --->
    <cfparam name="URL.genericName" default="">

<!--- Database connection setup --->
    <cfquery name="getSpendingData" datasource="MedicareData">
        SELECT dd.Brnd_Name, dd.Mftr_Name,
        SUM(CASE WHEN fyd.Year = 2017 THEN fyd.TotalSpending ELSE 0 END) AS TotalSpending2017,
        SUM(CASE WHEN fyd.Year = 2018 THEN fyd.TotalSpending ELSE 0 END) AS TotalSpending2018,
        SUM(CASE WHEN fyd.Year = 2019 THEN fyd.TotalSpending ELSE 0 END) AS TotalSpending2019,
        SUM(CASE WHEN fyd.Year = 2020 THEN fyd.TotalSpending ELSE 0 END) AS TotalSpending2020,
        SUM(CASE WHEN fyd.Year = 2021 THEN fyd.TotalSpending ELSE 0 END) AS TotalSpending2021
        FROM MedicarePartD.DrugData dd
        JOIN MedicarePartD.FinalYearlyData fyd ON dd.Drug_ID = fyd.YearlyData_ID
        WHERE dd.Gnrc_Name = <cfqueryparam value="#URL.genericName#" cfsqltype="CF_SQL_VARCHAR">
        GROUP BY dd.Brnd_Name, dd.Mftr_Name
        ORDER BY dd.Brnd_Name
    </cfquery>

    <cfcontent type="application/json">
    <cfoutput>#serializeJSON(getSpendingData)#</cfoutput>

    <cfcatch type="any">
        <cfoutput>{"error": "There was an error processing your request: #cfcatch.message# #cfcatch.detail#"}</cfoutput>
    </cfcatch>

</cftry>
<cfsetting enablecfoutputonly="no">
