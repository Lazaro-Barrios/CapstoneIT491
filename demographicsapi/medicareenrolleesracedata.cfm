<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">



<!--- Query the database to fetch distinct care types from the levelOfCare table --->
<cfquery name="MedicareWhite" datasource="MedicareData">
    SELECT White FROM Race_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareBlack" datasource="MedicareData">
    SELECT Black FROM Race_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareAsian" datasource="MedicareData">
    SELECT Asian FROM Race_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareHispanic" datasource="MedicareData">
    SELECT Hispanic FROM Race_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareAmerican_Indian" datasource="MedicareData">
    SELECT American_Indian FROM Race_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareOther" datasource="MedicareData">
    SELECT Other FROM Race_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareUnknown" datasource="MedicareData">
    SELECT Unknown FROM Race_medicareEnrolle ORDER BY Year
</cfquery>

<!--- Convert the query results to JSON format and output them --->
<cfoutput>
{
 
    "Medicare White": #serializeJSON(MedicareWhite)#
    "Medicare Black": #serializeJSON(MedicareBlack)#
    "Medicare Asian": #serializeJSON(MedicareAsian)#
    "Medicare Hispanic": #serializeJSON(MedicareHispanic)#
    "Medicare American_Indian": #serializeJSON(MedicareAmerican_Indian)#
    "Medicare Other": #serializeJSON(MedicareOther)#
    "Medicare Unknown": #serializeJSON(MedicareUnknown)#
}
</cfoutput>