<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">



<!--- Query the database to fetch distinct care types from the levelOfCare table --->
<cfquery name="MedicareUnder18" datasource="MedicareData">
    SELECT Under_18 FROM Age_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareFrom_18_to_24" datasource="MedicareData">
    SELECT From_18_to_24 FROM Age_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareFrom_25_to_34" datasource="MedicareData">
    SELECT From_25_to_34 FROM Age_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareFrom_35_to_44" datasource="MedicareData">
    SELECT From_35_to_44 FROM Age_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareFrom_45_to_54" datasource="MedicareData">
    SELECT Under_18 FROM Age_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareFrom_55_to_64" datasource="MedicareData">
    SELECT From_55_to_64 FROM Age_medicareEnrolle ORDER BY Year
</cfquery>

<!--- Convert the query results to JSON format and output them --->
<cfoutput>
{
 
    "Medicare Under18": #serializeJSON(MedicareUnder18)#
    "Medicare From_18_to_24": #serializeJSON(MedicareFrom_18_to_24)#
    "Medicare From_25_to_34": #serializeJSON(MedicareFrom_25_to_34)#
    "Medicare From_35_to_44": #serializeJSON(MedicareFrom_35_to_44)#
    "Medicare From_45_to_54": #serializeJSON(MedicareFrom_45_to_54)#
    "Medicare From_55_to_64": #serializeJSON(MedicareFrom_55_to_64)#
}
</cfoutput>