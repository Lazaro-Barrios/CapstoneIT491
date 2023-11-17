<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">

<!--- Query the database to fetch distinct years from the payments table --->
<cfquery name="getYears" datasource="MedicareData">
    SELECT DISTINCT year FROM payments ORDER BY year ASC;
</cfquery>

<!--- Query the database to fetch distinct care types from the levelOfCare table --->
<cfquery name="getCareTypes" datasource="MedicareData">
    SELECT ID, levelOfCareType FROM levelOfCare ORDER BY ID;
</cfquery>

<!--- Convert the query results to JSON format and output them --->
<cfoutput>
{
    "years": #serializeJSON(getYears)#,
    "careTypes": #serializeJSON(getCareTypes)#
}
</cfoutput>
