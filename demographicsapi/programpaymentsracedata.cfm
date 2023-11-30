<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">

<!--- Query the database to fetch race data from the Race_ProgramPayments table --->
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

<!--- Initialize arrays to store the results --->
<cfset programWhiteArray = []>
<cfset programBlackArray = []>
<cfset programAsianArray = []>
<cfset programHispanicArray = []>
<cfset programAmericanIndianArray = []>
<cfset programOtherArray = []>
<cfset programUnknownArray = []>

<!--- Set the delimiter for splitting values --->
<cfset delimiter = ','>

<!--- Split the White column into multiple parts using a delimiter (e.g., comma) --->
<cfset programWhiteList = valueList(ProgramWhite.White)>
<cfloop list="#programWhiteList#" index="programWhitePart" delimiters="#delimiter#">
    <cfset programWhiteArray.append(listToArray(programWhitePart, delimiter))>
</cfloop>

<!--- Repeat the process for other race groups --->
<cfset programBlackList = valueList(ProgramBlack.Black)>
<cfloop list="#programBlackList#" index="programBlackPart" delimiters="#delimiter#">
    <cfset programBlackArray.append(listToArray(programBlackPart, delimiter))>
</cfloop>

<cfset programAsianList = valueList(ProgramAsian.Asian)>
<cfloop list="#programAsianList#" index="programAsianPart" delimiters="#delimiter#">
    <cfset programAsianArray.append(listToArray(programAsianPart, delimiter))>
</cfloop>

<cfset programHispanicList = valueList(ProgramHispanic.Hispanic)>
<cfloop list="#programHispanicList#" index="programHispanicPart" delimiters="#delimiter#">
    <cfset programHispanicArray.append(listToArray(programHispanicPart, delimiter))>
</cfloop>

<cfset programAmericanIndianList = valueList(ProgramAmerican_Indian.American_Indian)>
<cfloop list="#programAmericanIndianList#" index="programAmericanIndianPart" delimiters="#delimiter#">
    <cfset programAmericanIndianArray.append(listToArray(programAmericanIndianPart, delimiter))>
</cfloop>

<cfset programOtherList = valueList(ProgramOther.Other)>
<cfloop list="#programOtherList#" index="programOtherPart" delimiters="#delimiter#">
    <cfset programOtherArray.append(listToArray(programOtherPart, delimiter))>
</cfloop>

<cfset programUnknownList = valueList(ProgramUnknown.Unknown)>
<cfloop list="#programUnknownList#" index="programUnknownPart" delimiters="#delimiter#">
    <cfset programUnknownArray.append(listToArray(programUnknownPart, delimiter))>
</cfloop>

<!--- Convert the arrays to JSON format and output them --->
<cfoutput>
{
    "Program White Array": #serializeJSON(programWhiteArray)#,
    "Program Black Array": #serializeJSON(programBlackArray)#,
    "Program Asian Array": #serializeJSON(programAsianArray)#,
    "Program Hispanic Array": #serializeJSON(programHispanicArray)#,
    "Program American_Indian Array": #serializeJSON(programAmericanIndianArray)#,
    "Program Other Array": #serializeJSON(programOtherArray)#,
    "Program Unknown Array": #serializeJSON(programUnknownArray)#
}
</cfoutput>
