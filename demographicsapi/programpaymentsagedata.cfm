<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">



<!--- Query the database to fetch distinct care types from the levelOfCare table --->
<cfquery name="ProgramUnder18" datasource="MedicareData">
    SELECT Under_18 FROM Age_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramFrom_18_to_24" datasource="MedicareData">
    SELECT From_18_to_24 FROM Age_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramFrom_25_to_34" datasource="MedicareData">
    SELECT From_25_to_34 FROM Age_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramFrom_35_to_44" datasource="MedicareData">
    SELECT From_35_to_44 FROM Age_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramFrom_45_to_54" datasource="MedicareData">
    SELECT Under_18 FROM Age_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramFrom_55_to_64" datasource="MedicareData">
    SELECT From_55_to_64 FROM Age_ProgramPayments ORDER BY Year
</cfquery>

<!--- Convert the query results to JSON format and output them --->
<cfoutput>
{
 
    "Program Under18": #serializeJSON(ProgramUnder18)#
    "Program From_18_to_24": #serializeJSON(ProgramFrom_18_to_24)#
    "Program From_25_to_34": #serializeJSON(ProgramFrom_25_to_34)#
    "Program From_35_to_44": #serializeJSON(ProgramFrom_35_to_44)#
    "Program From_45_to_54": #serializeJSON(ProgramFrom_45_to_54)#
    "Program From_55_to_64": #serializeJSON(ProgramFrom_55_to_64)#
}
</cfoutput>