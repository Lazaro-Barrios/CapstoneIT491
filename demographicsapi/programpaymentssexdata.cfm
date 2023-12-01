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

<!--- Query the database to fetch distinct care types from the levelOfCare table --->
<cfquery name="ProgramFemale" datasource="MedicareData">
    SELECT Female FROM Sex_ProgramPayments ORDER BY Year
</cfquery>

<!--- Initialize arrays to store the results --->
<cfset maleArray = []>
<cfset femaleArray = []>

<!--- Split the Male column into multiple parts using a delimiter (e.g., comma) --->
<cfset maleList = valueList(ProgramMale.Male)>
<cfset delimiter = ",">

<!--- Loop through the list and add each part to the array --->
<cfloop list="#maleList#" index="malePart" delimiters="#delimiter#">
    <cfset maleArray.append(listToArray(malePart, ","))>
</cfloop>

<!--- Split the Female column into multiple parts using a delimiter (e.g., comma) --->
<cfset femaleList = valueList(ProgramFemale.Female)>

<!--- Loop through the list and add each part to the array --->
<cfloop list="#femaleList#" index="femalePart" delimiters="#delimiter#">
    <cfset femaleArray.append(listToArray(femalePart, ","))>
</cfloop>

<!--- Convert the arrays to JSON format and output them --->
<cfoutput>
{
    "Program Male Array": #serializeJSON(maleArray)#,
    "Program Female Array": #serializeJSON(femaleArray)#
}
</cfoutput>
