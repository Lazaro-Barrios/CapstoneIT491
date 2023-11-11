<cfset drugID = FORM.drugID>

<cfquery name="getData" datasource="your_datasource_name">
    SELECT ...  <!-- Your query to fetch data based on Generic Name -->
    WHERE Drug_ID = <cfqueryparam value="#drugID#" cfsqltype="cf_sql_integer">
</cfquery>

<cfoutput>
    #serializeJSON(getData)#
</cfoutput>