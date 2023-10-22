<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">

<!--- Query goes here --->
<cfquery name="getAllYearsData" datasource="MedicareData">
SELECT 
    p.year AS Year,
    SUM(CASE WHEN l.ID = 1 THEN p.amount ELSE 0 END) AS "Continuous Home Care",
    SUM(CASE WHEN l.ID = 2 THEN p.amount ELSE 0 END) AS "General Inpatient Care",
    SUM(CASE WHEN l.ID = 3 THEN p.amount ELSE 0 END) AS "Inpatient Respite Care",
    SUM(CASE WHEN l.ID = 4 THEN p.amount ELSE 0 END) AS "Routine Home Care"
FROM payments p
JOIN siteOfService s ON p.siteOfServiceID = s.ID
JOIN levelOfCare l ON p.levelOfCareID = l.ID
WHERE l.ID IN (1, 2, 3, 4)
GROUP BY p.year
ORDER BY p.year;
</cfquery>

<!--- Convert the query result to JSON format and output it --->
<cfoutput>#serializeJSON(getAllYearsData)#</cfoutput>
