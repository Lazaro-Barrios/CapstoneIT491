<cfsetting enablecfoutputonly="true">
<cfset allResults = {}>
<cfquery name="stateData" datasource="MedicareData">
    SELECT year1, state, year2, payment1, payment2, changes
    FROM states_bottomfive
</cfquery>

<!-- Create a structure to organize the data by year1 and year2 -->
<cfset organizedData = {}>

<!-- Loop through the query results and organize the data -->
<cfloop query="stateData">
    <!-- Check if the year1 key exists in the structure -->
    <cfif NOT StructKeyExists(organizedData, year1)>
        <!-- If not, create it with an empty array as the value -->
        <cfset organizedData[year1] = []>
    </cfif>
    
    <!-- Add the current record to the year1 array -->
    <cfset ArrayAppend(organizedData[year1], {
        "state": state,
        "year2": year2,
        "payment1": payment1,
        "payment2": payment2,
        "changes": changes
    })>
</cfloop>
<cfset allResults['bottomFive'] = organizedData>
<!--- finished with bottomfive --->


<!-- Connect to your MSSQL database -->
<cfset dataSource = "MedicareData">
<cfquery name="paymentData" datasource="#dataSource#">
    SELECT state_name, year, SUM(payment_amount) AS total_payment
    FROM state_payments
    GROUP BY state_name, year
</cfquery>

<!-- Create a structure to store state payments -->
<cfset statePayments = {}>

<!-- Loop through the query results -->
<cfloop query="paymentData">
    <cfset state = paymentData.state_name>
    <cfset year = paymentData.year>
    <cfset totalPayment = paymentData.total_payment>

    <!-- Create a state object if it doesn't exist -->
    <cfif NOT structKeyExists(statePayments, state)>
        <cfset statePayments[state] = {}>
    </cfif>

    <!-- Add the payment amount for the year to the state object -->
    <cfset statePayments[state][year] = totalPayment>
</cfloop>

<cfset allResults["states"] = statePayments>

<!--- finished with states --->


<cfset dataSource = "MedicareData">
<cfquery name="paymentSum" datasource="#dataSource#">
    SELECT year, SUM(payment_amount) AS total_payment
    FROM state_payments
    GROUP BY year
</cfquery>

<!-- Create a structure for the sum of payments by year -->
<cfset sumByYear = {}>
<cfloop query="paymentSum">
    <cfset year = paymentSum.year>
    <cfset totalPayment = paymentSum.total_payment>
    <cfset sumByYear[year] = totalPayment>
</cfloop>

<cfset allResults["sum"] = sumByYear>
<!--- sum finished --->


<!--- Start of tables --->

<cfset jsonResult = []>
<cfquery name="years" datasource="MedicareData">
    SELECT DISTINCT year
    FROM state_payments
</cfquery>

<cfloop query="years">
    <cfset currentYear = years.year>
    
    <cfquery name="topStatesQuery" datasource="MedicareData">
        SELECT TOP 5 state_name, SUM(payment_amount) AS total_payments
        FROM state_payments
        WHERE year = <cfqueryparam value="#currentYear#" cfsqltype="CF_SQL_INTEGER">
        GROUP BY state_name
        ORDER BY total_payments DESC
    </cfquery>

    <cfquery name="bottomStatesQuery" datasource="MedicareData">
        SELECT TOP 5 state_name, SUM(payment_amount) AS total_payments
        FROM state_payments
        WHERE year = <cfqueryparam value="#currentYear#" cfsqltype="CF_SQL_INTEGER">
        GROUP BY state_name
        ORDER BY total_payments ASC
    </cfquery>

    <cfset yearData = {
        "year": currentYear,
        "top_states": topStatesQuery,
        "bottom_states": bottomStatesQuery
    }>

    <cfset arrayAppend(jsonResult, yearData)>
</cfloop>
<cfset allResults["tables"] = jsonResult>
<!--- End of tables --->


<!--- Start of topfive --->

<cfquery name="stateData" datasource="MedicareData">
    SELECT year1, state, year2, payment1, payment2, changes
    FROM states_topfive
</cfquery>

<!-- Create a structure to organize the data by year1 and year2 -->
<cfset organizedData = {}>

<!-- Loop through the query results and organize the data -->
<cfloop query="stateData">
    <!-- Check if the year1 key exists in the structure -->
    <cfif NOT StructKeyExists(organizedData, year1)>
        <!-- If not, create it with an empty array as the value -->
        <cfset organizedData[year1] = []>
    </cfif>
    
    <!-- Add the current record to the year1 array -->
    <cfset ArrayAppend(organizedData[year1], {
        "state": state,
        "year2": year2,
        "payment1": payment1,
        "payment2": payment2,
        "changes": changes
    })>
</cfloop>

<cfset allResults["topFive"] = organizedData>

<!--- End of topFive --->

<cfcontent type="application/json">
<cfoutput>#SerializeJSON(allResults)#</cfoutput>

<cfsetting enablecfoutputonly="false">