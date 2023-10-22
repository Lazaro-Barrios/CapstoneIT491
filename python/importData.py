import pandas as pd
import pyodbc

# Load the Excel file into a DataFrame
df = pd.read_excel('/home/billy/Desktop/ColdFusion_WWEJ_linux64/ColdFusion/cfusion/wwwroot/MedicareDataFiles/cleanData_2021.xlsx', engine='openpyxl')

# Connect to SQL Server
conn_str = 'DRIVER={ODBC Driver 17 for SQL Server};SERVER=rdecapstone.culxbjvivqqs.us-east-2.rds.amazonaws.com,1433;DATABASE=MedicareData;UID=ber9;PWD=ber91'
conn = pyodbc.connect(conn_str)

# Melt the DataFrame to long format
df_melted = df.melt(id_vars=['siteOfServiceType', 'year'],
                    value_vars=['ContinuousHomeCare', 'GeneralInpatientCare', 'InpatientRespiteCare', 'RoutineHomeCare'],
                    var_name='levelOfCareType', value_name='amount')

# Adjust the levelOfCareType to match the database values
df_melted['levelOfCareType'] = df_melted['levelOfCareType'].str.replace('ContinuousHomeCare', 'Continuous Home Care')
df_melted['levelOfCareType'] = df_melted['levelOfCareType'].str.replace('GeneralInpatientCare', 'General Inpatient Care')
df_melted['levelOfCareType'] = df_melted['levelOfCareType'].str.replace('InpatientRespiteCare', 'Inpatient Respite Care')
df_melted['levelOfCareType'] = df_melted['levelOfCareType'].str.replace('RoutineHomeCare', 'Routine Home Care')

# Insert data into the payments table
for index, row in df_melted.iterrows():
    level_of_care_id = conn.execute("SELECT ID FROM levelOfCare WHERE levelOfCareType = ?", row['levelOfCareType']).fetchone()[0]
    site_of_service_id = conn.execute("SELECT ID FROM siteOfService WHERE siteOfServiceType = ?", row['siteOfServiceType']).fetchone()[0]
    conn.execute("INSERT INTO payments (levelOfCareID, amount, year, siteOfServiceID) VALUES (?, ?, ?, ?)",
                 level_of_care_id, row['amount'], row['year'], site_of_service_id)

conn.commit()
conn.close()
