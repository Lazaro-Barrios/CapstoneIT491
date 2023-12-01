<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">

<!--- Query the database to fetch age data from the Age_ProgramPayments table --->
<cfquery name="ProgramUnder18" datasource="MedicareData">
    SELECT Under_18 FROM Age_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramFrom18to24" datasource="MedicareData">
    SELECT From_18_to_24 FROM Age_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramFrom25to34" datasource="MedicareData">
    SELECT From_25_to_34 FROM Age_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramFrom35to44" datasource="MedicareData">
    SELECT From_35_to_44 FROM Age_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramFrom45to54" datasource="MedicareData">
    SELECT From_45_to_54 FROM Age_ProgramPayments ORDER BY Year
</cfquery>
<cfquery name="ProgramFrom55to64" datasource="MedicareData">
    SELECT From_55_to_64 FROM Age_ProgramPayments ORDER BY Year
</cfquery>

<!--- Initialize arrays to store the results --->
<cfset programUnder18Array = []>
<cfset programFrom18to24Array = []>
<cfset programFrom25to34Array = []>
<cfset programFrom35to44Array = []>
<cfset programFrom45to54Array = []>
<cfset programFrom55to64Array = []>

<!--- Set the delimiter for splitting values --->
<cfset delimiter = ','>

<!--- Split the Under_18 column into multiple parts using a delimiter (e.g., comma) --->
<cfset programUnder18List = valueList(ProgramUnder18.Under_18)>
<cfloop list="#programUnder18List#" index="programUnder18Part" delimiters="#delimiter#">
    <cfset programUnder18Array.append(listToArray(programUnder18Part, delimiter))>
</cfloop>

<!--- Repeat the process for other age groups --->
<cfset programFrom18to24List = valueList(ProgramFrom18to24.From_18_to_24)>
<cfloop list="#programFrom18to24List#" index="programFrom18to24Part" delimiters="#delimiter#">
    <cfset programFrom18to24Array.append(listToArray(programFrom18to24Part, delimiter))>
</cfloop>

<cfset programFrom25to34List = valueList(ProgramFrom25to34.From_25_to_34)>
<cfloop list="#programFrom25to34List#" index="programFrom25to34Part" delimiters="#delimiter#">
    <cfset programFrom25to34Array.append(listToArray(programFrom25to34Part, delimiter))>
</cfloop>

<cfset programFrom35to44List = valueList(ProgramFrom35to44.From_35_to_44)>
<cfloop list="#programFrom35to44List#" index="programFrom35to44Part" delimiters="#delimiter#">
    <cfset programFrom35to44Array.append(listToArray(programFrom35to44Part, delimiter))>
</cfloop>

<cfset programFrom45to54List = valueList(ProgramFrom45to54.From_45_to_54)>
<cfloop list="#programFrom45to54List#" index="programFrom45to54Part" delimiters="#delimiter#">
    <cfset programFrom45to54Array.append(listToArray(programFrom45to54Part, delimiter))>
</cfloop>

<cfset programFrom55to64List = valueList(ProgramFrom55to64.From_55_to_64)>
<cfloop list="#programFrom55to64List#" index="programFrom55to64Part" delimiters="#delimiter#">
    <cfset programFrom55to64Array.append(listToArray(programFrom55to64Part, delimiter))>
</cfloop>

<!--- Convert the arrays to JSON format and output them --->
<cfoutput>
{
    "Program Under18 Array": #serializeJSON(programUnder18Array)#,
    "Program From_18_to_24 Array": #serializeJSON(programFrom18to24Array)#,
    "Program From_25_to_34 Array": #serializeJSON(programFrom25to34Array)#,
    "Program From_35_to_44 Array": #serializeJSON(programFrom35to44Array)#,
    "Program From_45_to_54 Array": #serializeJSON(programFrom45to54Array)#,
    "Program From_55_to_64 Array": #serializeJSON(programFrom55to64Array)#
}
</cfoutput>
