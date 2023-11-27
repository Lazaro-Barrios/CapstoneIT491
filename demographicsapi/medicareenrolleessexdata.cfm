<!--- Set output settings to only allow cfoutput tags to produce output --->
<cfsetting enablecfoutputonly="yes">

<!--- Set the content type of the response to HTML --->
<cfcontent type="text/html">

<!--- Set headers to prevent caching of the response --->
<cfheader name="Cache-Control" value="no-cache">
<cfheader name="Pragma" value="no-cache">
<cfheader name="Expires" value="-1">

<!--- Query the database to retrieve data from Sex_MedicareEnrollees table --->
<cfquery name="getData" datasource="MedicareData">
    SELECT * FROM Sex_MedicareEnrollees;
</cfquery>

<!--- Convert the query result to JSON format --->
<cfset jsonData = serializeJSON(getData)>

<!--- Output the JavaScript variable directly --->
<cfoutput>
    <script>
        // Define a JavaScript variable and assign it the serialized JSON data
        var sexMedicareData = #jsonData#;
    </script>
</cfoutput>

<!--- Include your external JavaScript file --->
<script src="path/to/your/js/medicareenrollees.js"></script>
