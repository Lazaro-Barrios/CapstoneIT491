<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">

<!--- Parse the request body to extract the JSON data sent from the client --->
<cfset requestBody = ToString(GetHttpRequestData().content) >
<cfset formData = DeserializeJSON(requestBody) >

<!--- Query the database based on the filters received in the request body --->
<cfquery name="getData" datasource="MedicareData">
    SELECT 
        s.siteOfServiceType,
        SUM(CASE WHEN l.ID = 1 THEN p.amount ELSE 0 END) AS "Continuous Home Care",
        SUM(CASE WHEN l.ID = 2 THEN p.amount ELSE 0 END) AS "General Inpatient Care",
        SUM(CASE WHEN l.ID = 3 THEN p.amount ELSE 0 END) AS "Inpatient Respite Care",
        SUM(CASE WHEN l.ID = 4 THEN p.amount ELSE 0 END) AS "Routine Home Care"
    FROM payments p
    JOIN siteOfService s ON p.siteOfServiceID = s.ID
    JOIN levelOfCare l ON p.levelOfCareID = l.ID
    WHERE p.year = <cfqueryparam value="#formData.year#" cfsqltype="cf_sql_integer">
    AND l.ID IN (1,2,3,4)
    GROUP BY s.siteOfServiceType;
</cfquery>

<!--- Convert the query result to JSON format and output it --->
<cfoutput>#serializeJSON(getData)#</cfoutput>
