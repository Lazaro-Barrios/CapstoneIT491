<!--- GenericName.cfm --->
<!--- For loading the data needed for the Total Spending for each of the drug's brands over the available Years --->
<cfparam name="URL.genericName" default="" type="string">

<!--- Verify that genericName is not empty --->
<cfif NOT Len(Trim(URL.genericName))>
<!--- Handle error appropriately --->
    <cfset errorMsg = "Invalid Generic Name provided. Please provide a valid Generic Name.">
    <cfoutput>#serializeJSON({ "error": errorMsg })#</cfoutput>
    <cfabort>
</cfif>

<cfquery name="getGenericSpending" datasource="MedicareData">
    SELECT
    dd.Brnd_Name,
    yd.Year,
    SUM(yd.TotalSpending) AS TotalSpending  <!--- Corrected column name --->
    FROM
    MedicarePartD.DrugData dd
    INNER JOIN
    MedicarePartD.FinalYearlyData yd ON dd.Drug_ID = yd.YearlyData_ID
    WHERE
    dd.Gnrc_Name = <cfqueryparam value="#Trim(URL.genericName)#" cfsqltype="cf_sql_varchar">
    GROUP BY
    dd.Brnd_Name, yd.Year
    ORDER BY
    yd.Year ASC, dd.Brnd_Name ASC
</cfquery>

<!--- Corrected code for appending data to an array --->
<cfset spendingData = []>
<cfloop query="getGenericSpending">
    <cfset arrayAppend(spendingData, {
        'Year': Year,
        'BrandName': Brnd_Name,
        'TotalSpending': TotalSpending
    })>
</cfloop>

<cfoutput>#serializeJSON(spendingData)#</cfoutput>
