<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">



<!--- Query the database to fetch distinct care types from the levelOfCare table --->
<cfquery name="ProgramWhite" datasource="MedicareData">
    SELECT White FROM Race_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramBlack" datasource="MedicareData">
    SELECT Black FROM Race_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramAsian" datasource="MedicareData">
    SELECT Asian FROM Race_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramHispanic" datasource="MedicareData">
    SELECT Hispanic FROM Race_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramAmerican_Indian" datasource="MedicareData">
    SELECT American_Indian FROM Race_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramOther" datasource="MedicareData">
    SELECT Other FROM Race_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramUnknown" datasource="MedicareData">
    SELECT Unknown FROM Race_ProgramPayments ORDER BY Year
</cfquery>

<!--- Convert the query results to JSON format and output them --->
<cfoutput>
{
 
    "Program White": #serializeJSON(ProgramWhite)#
    "Program Black": #serializeJSON(ProgramBlack)#
    "Program Asian": #serializeJSON(ProgramAsian)#
    "Program Hispanic": #serializeJSON(ProgramHispanic)#
    "Program American_Indian": #serializeJSON(ProgramAmerican_Indian)#
    "Program Other": #serializeJSON(ProgramOther)#
    "Program Unknown": #serializeJSON(ProgramUnknown)#
}
</cfoutput>