<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">



<!--- Query the database to fetch distinct care types from the levelOfCare table --->
<cfquery name="ProgramMale" datasource="MedicareData">
    SELECT Male FROM Sex_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramFemale" datasource="MedicareData">
    SELECT Female FROM Sex_ProgramPayments ORDER BY Year
</cfquery>

<!--- Convert the query results to JSON format and output them --->
<cfoutput>
{
 
    "Program Male": #serializeJSON(ProgramMale)#
    "Program Female": #serializeJSON(ProgramFemale)#
}
</cfoutput>