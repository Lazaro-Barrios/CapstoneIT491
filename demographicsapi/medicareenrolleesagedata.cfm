<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">

<!--- Query the database to fetch age data from the Age_medicareEnrolle table --->
<cfquery name="MedicareUnder18" datasource="MedicareData">
    SELECT Under_18 FROM Age_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareFrom18to24" datasource="MedicareData">
    SELECT From_18_to_24 FROM Age_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareFrom25to34" datasource="MedicareData">
    SELECT From_25_to_34 FROM Age_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareFrom35to44" datasource="MedicareData">
    SELECT From_35_to_44 FROM Age_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareFrom45to54" datasource="MedicareData">
    SELECT From_45_to_54 FROM Age_medicareEnrolle ORDER BY Year
</cfquery>
<cfquery name="MedicareFrom55to64" datasource="MedicareData">
    SELECT From_55_to_64 FROM Age_medicareEnrolle ORDER BY Year
</cfquery>

<!--- Initialize arrays to store the results --->
<cfset under18Array = []>
<cfset from18to24Array = []>
<cfset from25to34Array = []>
<cfset from35to44Array = []>
<cfset from45to54Array = []>
<cfset from55to64Array = []>

<!--- Set the delimiter for splitting values --->
<cfset delimiter = ','>

<!--- Split the Under_18 column into multiple parts using a delimiter (e.g., comma) --->
<cfset under18List = valueList(MedicareUnder18.Under_18)>
<cfloop list="#under18List#" index="under18Part" delimiters="#delimiter#">
    <cfset under18Array.append(listToArray(under18Part, delimiter))>
</cfloop>

<!--- Repeat the process for other age groups --->
<cfset from18to24List = valueList(MedicareFrom18to24.From_18_to_24)>
<cfloop list="#from18to24List#" index="from18to24Part" delimiters="#delimiter#">
    <cfset from18to24Array.append(listToArray(from18to24Part, delimiter))>
</cfloop>

<cfset from25to34List = valueList(MedicareFrom25to34.From_25_to_34)>
<cfloop list="#from25to34List#" index="from25to34Part" delimiters="#delimiter#">
    <cfset from25to34Array.append(listToArray(from25to34Part, delimiter))>
</cfloop>

<cfset from35to44List = valueList(MedicareFrom35to44.From_35_to_44)>
<cfloop list="#from35to44List#" index="from35to44Part" delimiters="#delimiter#">
    <cfset from35to44Array.append(listToArray(from35to44Part, delimiter))>
</cfloop>

<cfset from45to54List = valueList(MedicareFrom45to54.From_45_to_54)>
<cfloop list="#from45to54List#" index="from45to54Part" delimiters="#delimiter#">
    <cfset from45to54Array.append(listToArray(from45to54Part, delimiter))>
</cfloop>

<cfset from55to64List = valueList(MedicareFrom55to64.From_55_to_64)>
<cfloop list="#from55to64List#" index="from55to64Part" delimiters="#delimiter#">
    <cfset from55to64Array.append(listToArray(from55to64Part, delimiter))>
</cfloop>

<!--- Convert the arrays to JSON format and output them --->
<cfoutput>
{
    "Medicare Under18 Array": #serializeJSON(under18Array)#,
    "Medicare From_18_to_24 Array": #serializeJSON(from18to24Array)#,
    "Medicare From_25_to_34 Array": #serializeJSON(from25to34Array)#,
    "Medicare From_35_to_44 Array": #serializeJSON(from35to44Array)#,
    "Medicare From_45_to_54 Array": #serializeJSON(from45to54Array)#,
    "Medicare From_55_to_64 Array": #serializeJSON(from55to64Array)#
}
</cfoutput>



