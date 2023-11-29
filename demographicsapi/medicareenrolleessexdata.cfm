<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to JSON --->
<cfcontent type="application/json">

<!--- Retrieve database credentials from query string --->
<cfparam name="url.username" default="jj499">
<cfparam name="url.password" default="jj4991">
<cfparam name="url.servername" default="rdecapstone.culxbjvivqqs.us-east-2.rds.amazonaws.com,1433">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">


<!--- Construct the database connection string --->
<cfset connectionString = "username=#url.username#;password=#url.password#;server=#url.servername#;database=MedicareData">

<!--- Query the database to retrieve data from Sex_MedicareEnrollees table --->
<cfquery name="getData" datasource="#connectionString#">
    SELECT male, female FROM Sex_MedicareEnrollees;
</cfquery>

<!--- Serialize the query result to JSON and output it --->
<cfset jsonData = serializeJSON(getData)>
<cfoutput>#jsonData#</cfoutput>
