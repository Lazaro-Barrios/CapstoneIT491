<!--- BrandName.cfm --->
<!--- For loading the data needed for the Average Spending Per Beneficiary for "Brand Name" chart --->
<cfparam name="URL.drugId" default="0" type="numeric">

<!--- Verify that drugId is a number and not zero --->
<cfif NOT IsNumeric(URL.drugId) OR URL.drugId EQ 0>
<!--- Handle error appropriately --->
    <cfset errorMsg = "Invalid Drug ID provided. Please provide a valid Drug ID.">
    <cfoutput>#serializeJSON({ "error": errorMsg })#</cfoutput>
    <cfabort>
</cfif>

<cfquery name="getBrandSpending" datasource="MedicareData">
    SELECT
        yd.Year,
        SUM(yd.TotalSpending) AS TotalSpending,
        SUM(yd.AverageSpendingPerBeneficiary) AS AverageSpendingPerBeneficiary
    FROM
        MedicarePartD.DrugData dd
    INNER JOIN
        MedicarePartD.FinalYearlyData yd ON dd.Drug_ID = yd.YearlyData_ID
    WHERE
        dd.Drug_ID = <cfqueryparam value="#URL.drugId#" cfsqltype="cf_sql_integer">
    GROUP BY
        yd.Year
</cfquery>

<cfset spendingData = []> <!--- Initialize as an array --->
<cfloop query="getBrandSpending">
    <cfset spending = AverageSpendingPerBeneficiary > 0 ? (TotalSpending / AverageSpendingPerBeneficiary) : 0>
    <cfset arrayAppend(spendingData, {year: Year, spending: spending})> <!--- Append the structure to the array --->
</cfloop>

<cfoutput>#serializeJSON(spendingData)#</cfoutput>
