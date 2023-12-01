<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">

<!--- Queries --->
<cfquery name="MedicareMale" datasource="MedicareData">
    SELECT Male FROM Sex_medicareEnrolle ORDER BY Year
</cfquery>

<cfquery name="MedicareFemale" datasource="MedicareData">
    SELECT Female FROM Sex_medicareEnrolle ORDER BY Year
</cfquery>

<!--- Initialize arrays to store the results --->
<cfset maleArray = []>
<cfset femaleArray = []>

<!--- Split the Male column into multiple parts using a delimiter (e.g., comma) --->
<cfset maleList = valueList(MedicareMale.Male)>
<cfset delimiter = ",">

<!--- Loop through the list and add each part to the array --->
<cfloop list="#maleList#" index="malePart" delimiters="#delimiter#">
    <cfset maleArray.append(listToArray(malePart, ","))>
</cfloop>

<!--- Split the Female column into multiple parts using a delimiter (e.g., comma) --->
<cfset femaleList = valueList(MedicareFemale.Female)>

<!--- Loop through the list and add each part to the array --->
<cfloop list="#femaleList#" index="femalePart" delimiters="#delimiter#">
    <cfset femaleArray.append(listToArray(femalePart, ","))>
</cfloop>

<!--- Convert the arrays to JSON format and output them --->
<cfoutput>
{
    "Medicare Male Array": #serializeJSON(maleArray)#,
    "Medicare Female Array": #serializeJSON(femaleArray)#
}
</cfoutput>
