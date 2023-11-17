<!---
<cfquery name="dropTableQuery" datasource="MedicareData">
    DROP TABLE 
</cfquery>
--->

<!---
<cfquery name="createTables" datasource="MedicareData">
<!--- Creating the Site of Service Table --->
    CREATE TABLE siteOfService (
        ID int IDENTITY(1,1) PRIMARY KEY,
        siteOfServiceType nvarchar(255)
    );

<!--- Creating the Level of Care table --->
    CREATE TABLE levelOfCare (
        ID int IDENTITY(1,1) PRIMARY KEY,
        levelOfCareType nvarchar(255)
    );

<!--- Creating the Payments table --->
    CREATE TABLE payments (
        paymentID int IDENTITY(1,1) PRIMARY KEY,
        levelOfCareID int,
        amount int,
        year int,
        siteOfServiceID int,
        FOREIGN KEY (levelOfCareID) REFERENCES levelOfCare(ID),
        FOREIGN KEY (siteOfServiceID) REFERENCES siteOfService(ID)
    );
</cfquery>
--->