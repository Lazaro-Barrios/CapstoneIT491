<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">

<!--- Query the database to fetch race data from the Race_medicareEnrolle table --->
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

<!--- Initialize arrays to store the results --->
<cfset medicareWhiteArray = []>
<cfset medicareBlackArray = []>
<cfset medicareAsianArray = []>
<cfset medicareHispanicArray = []>
<cfset medicareAmericanIndianArray = []>
<cfset medicareOtherArray = []>
<cfset medicareUnknownArray = []>

<!--- Set the delimiter for splitting values --->
<cfset delimiter = ','>

<!--- Split  columns into multiple parts using a delimiter (e.g., comma) --->
<cfset medicareWhiteList = valueList(MedicareWhite.White)>
<cfloop list="#medicareWhiteList#" index="medicareWhitePart" delimiters="#delimiter#">
    <cfset medicareWhiteArray.append(listToArray(medicareWhitePart, delimiter))>
</cfloop>


<cfset medicareBlackList = valueList(MedicareBlack.Black)>
<cfloop list="#medicareBlackList#" index="medicareBlackPart" delimiters="#delimiter#">
    <cfset medicareBlackArray.append(listToArray(medicareBlackPart, delimiter))>
</cfloop>

<cfset medicareAsianList = valueList(MedicareAsian.Asian)>
<cfloop list="#medicareAsianList#" index="medicareAsianPart" delimiters="#delimiter#">
    <cfset medicareAsianArray.append(listToArray(medicareAsianPart, delimiter))>
</cfloop>

<cfset medicareHispanicList = valueList(MedicareHispanic.Hispanic)>
<cfloop list="#medicareHispanicList#" index="medicareHispanicPart" delimiters="#delimiter#">
    <cfset medicareHispanicArray.append(listToArray(medicareHispanicPart, delimiter))>
</cfloop>

<cfset medicareAmericanIndianList = valueList(MedicareAmerican_Indian.American_Indian)>
<cfloop list="#medicareAmericanIndianList#" index="medicareAmericanIndianPart" delimiters="#delimiter#">
    <cfset medicareAmericanIndianArray.append(listToArray(medicareAmericanIndianPart, delimiter))>
</cfloop>

<cfset medicareOtherList = valueList(MedicareOther.Other)>
<cfloop list="#medicareOtherList#" index="medicareOtherPart" delimiters="#delimiter#">
    <cfset medicareOtherArray.append(listToArray(medicareOtherPart, delimiter))>
</cfloop>

<cfset medicareUnknownList = valueList(MedicareUnknown.Unknown)>
<cfloop list="#medicareUnknownList#" index="medicareUnknownPart" delimiters="#delimiter#">
    <cfset medicareUnknownArray.append(listToArray(medicareUnknownPart, delimiter))>
</cfloop>

<!--- Convert the arrays to JSON format and output them --->
<cfoutput>
{
    "Medicare White Array": #serializeJSON(medicareWhiteArray)#,
    "Medicare Black Array": #serializeJSON(medicareBlackArray)#,
    "Medicare Asian Array": #serializeJSON(medicareAsianArray)#,
    "Medicare Hispanic Array": #serializeJSON(medicareHispanicArray)#,
    "Medicare American_Indian Array": #serializeJSON(medicareAmericanIndianArray)#,
    "Medicare Other Array": #serializeJSON(medicareOtherArray)#,
    "Medicare Unknown Array": #serializeJSON(medicareUnknownArray)#
}
</cfoutput>
