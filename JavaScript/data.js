//Coldfusion URLs
const MedicareSexfileUrl = '/CapstoneIT491/demographicsapi/medicareenrolleessexdata.cfm';
const ProgramSexfileUrl='/CapstoneIT491/demographicsapi/programpaymentssexdata.cfm';
const MedicareAgefileUrl='/CapstoneIT491/demographicsapi/medicareenrolleesagedata.cfm';
const ProgramAgefileUrl='/CapstoneIT491/demographicsapi/programpaymentsagedata.cfm';
const MedicareRacefileUrl='/CapstoneIT491/demographicsapi/medicareenrolleesracedata.cfm';
const ProgramRacefileUrl='/CapstoneIT491/demographicsapi/programpaymentsracedata.cfm';
//For Medicare Sex
function MedicareSexfetchData(MedicareSexfileUrl) {
    return fetch(MedicareSexfileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract male and female data and flatten the arrays, converting values to integers
            const MedicaremaleData = data["Medicare Male Array"].flat().map(Number);
            const MedicarefemaleData = data["Medicare Female Array"].flat().map(Number);

            return {
                MedicaremaleData,
                MedicarefemaleData
            };
        });
}



// Fetch data
MedicareSexfetchData(MedicareSexfileUrl)
    .then(({ MedicaremaleData, MedicarefemaleData }) => {
       
        console.log('Medicare Male Data:', MedicaremaleData);
        console.log('Medicare Female Data:', MedicarefemaleData);
       
        // Export the arrays for use in other files
        window.MaleDataMedicare = MedicaremaleData;
        window.FemaleDataMedicare = MedicarefemaleData;
       
    })
    .catch(error => {
        console.error(`Error fetching data from ${MedicareSexfileUrl}:`, error.message);
    });



// For Program Sex
function ProgramSexfetchData(ProgramSexfileUrl) {
    return fetch(ProgramSexfileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract male and female data and flatten the arrays, converting values to integers
            const ProgrammaleData = data["Program Male Array"].flat().map(Number);
            const ProgramfemaleData = data["Program Female Array"].flat().map(Number);

            return {
                ProgrammaleData,
                ProgramfemaleData
            };
        });
}

// Fetch data
ProgramSexfetchData(ProgramSexfileUrl)
    .then(({ ProgrammaleData, ProgramfemaleData }) => {
        console.log('Program Male Data:', ProgrammaleData);
        console.log('Program Female Data:', ProgramfemaleData);

        // Export the arrays for use in other files
        window.MaleDataProgram = ProgrammaleData;
        window.FemaleDataProgram = ProgramfemaleData;
    })
    .catch(error => {
        console.error(`Error fetching data from ${ProgramSexfileUrl}:`, error.message);
    });

// For Medicare Age
function MedicareAgefetchData(MedicareAgefileUrl) {
    return fetch(MedicareAgefileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract age data and flatten the arrays, converting values to integers
            const MedicareUnder18Data = data["Medicare Under18 Array"].flat().map(Number);
            const MedicareFrom18to24Data = data["Medicare From_18_to_24 Array"].flat().map(Number);
            const MedicareFrom25to34Data = data["Medicare From_25_to_34 Array"].flat().map(Number);
            const MedicareFrom35to44Data = data["Medicare From_35_to_44 Array"].flat().map(Number);
            const MedicareFrom45to54Data = data["Medicare From_45_to_54 Array"].flat().map(Number);
            const MedicareFrom55to64Data = data["Medicare From_55_to_64 Array"].flat().map(Number);

            return {
                MedicareUnder18Data,
                MedicareFrom18to24Data,
                MedicareFrom25to34Data,
                MedicareFrom35to44Data,
                MedicareFrom45to54Data,
                MedicareFrom55to64Data
            };
        });
}

// Fetch data
MedicareAgefetchData(MedicareAgefileUrl)
    .then(({ MedicareUnder18Data, MedicareFrom18to24Data, MedicareFrom25to34Data, MedicareFrom35to44Data, MedicareFrom45to54Data, MedicareFrom55to64Data }) => {
        console.log('Medicare Under 18 Data:', MedicareUnder18Data);
        console.log('Medicare From 18 to 24 Data:', MedicareFrom18to24Data);
        console.log('Medicare From 25 to 34 Data:', MedicareFrom25to34Data);
        console.log('Medicare From 35 to 44 Data:', MedicareFrom35to44Data);
        console.log('Medicare From 45 to 54 Data:', MedicareFrom45to54Data);
        console.log('Medicare From 55 to 64 Data:', MedicareFrom55to64Data);

        // Export the arrays for use in other files
        window.MedicareUnder18Data = MedicareUnder18Data;
        window.MedicareFrom18to24Data = MedicareFrom18to24Data;
        window.MedicareFrom25to34Data = MedicareFrom25to34Data;
        window.MedicareFrom35to44Data = MedicareFrom35to44Data;
        window.MedicareFrom45to54Data = MedicareFrom45to54Data;
        window.MedicareFrom55to64Data = MedicareFrom55to64Data;
    })
    .catch(error => {
        console.error(`Error fetching data from ${MedicareAgefileUrl}:`, error.message);
    });


    // For Program Payments Age
function ProgramAgefetchData(ProgramAgefileUrl) {
    return fetch(ProgramAgefileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract age data and flatten the arrays, converting values to integers
            const ProgramUnder18Data = data["Program Under18 Array"].flat().map(Number);
            const ProgramFrom18to24Data = data["Program From_18_to_24 Array"].flat().map(Number);
            const ProgramFrom25to34Data = data["Program From_25_to_34 Array"].flat().map(Number);
            const ProgramFrom35to44Data = data["Program From_35_to_44 Array"].flat().map(Number);
            const ProgramFrom45to54Data = data["Program From_45_to_54 Array"].flat().map(Number);
            const ProgramFrom55to64Data = data["Program From_55_to_64 Array"].flat().map(Number);

            return {
                ProgramUnder18Data,
                ProgramFrom18to24Data,
                ProgramFrom25to34Data,
                ProgramFrom35to44Data,
                ProgramFrom45to54Data,
                ProgramFrom55to64Data
            };
        });
}

// Fetch data
ProgramAgefetchData(ProgramAgefileUrl)
    .then(({ ProgramUnder18Data, ProgramFrom18to24Data, ProgramFrom25to34Data, ProgramFrom35to44Data, ProgramFrom45to54Data, ProgramFrom55to64Data }) => {
        console.log('Program Under 18 Data:', ProgramUnder18Data);
        console.log('Program From 18 to 24 Data:', ProgramFrom18to24Data);
        console.log('Program From 25 to 34 Data:', ProgramFrom25to34Data);
        console.log('Program From 35 to 44 Data:', ProgramFrom35to44Data);
        console.log('Program From 45 to 54 Data:', ProgramFrom45to54Data);
        console.log('Program From 55 to 64 Data:', ProgramFrom55to64Data);

        // Export the arrays for use in other files
        window.ProgramUnder18Data = ProgramUnder18Data;
        window.ProgramFrom18to24Data = ProgramFrom18to24Data;
        window.ProgramFrom25to34Data = ProgramFrom25to34Data;
        window.ProgramFrom35to44Data = ProgramFrom35to44Data;
        window.ProgramFrom45to54Data = ProgramFrom45to54Data;
        window.ProgramFrom55to64Data = ProgramFrom55to64Data;
    })
    .catch(error => {
        console.error(`Error fetching data from ${ProgramAgefileUrl}:`, error.message);
    });

    // For Medicare Race
function MedicareRacefetchData(MedicareRacefileUrl) {
    return fetch(MedicareRacefileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract race data and flatten the arrays, converting values to integers
            const MedicareWhiteData = data["Medicare White Array"].flat().map(Number);
            const MedicareBlackData = data["Medicare Black Array"].flat().map(Number);
            const MedicareAsianData = data["Medicare Asian Array"].flat().map(Number);
            const MedicareHispanicData = data["Medicare Hispanic Array"].flat().map(Number);
            const MedicareAmericanIndianData = data["Medicare American_Indian Array"].flat().map(Number);
            const MedicareOtherData = data["Medicare Other Array"].flat().map(Number);
            const MedicareUnknownData = data["Medicare Unknown Array"].flat().map(Number);

            return {
                MedicareWhiteData,
                MedicareBlackData,
                MedicareAsianData,
                MedicareHispanicData,
                MedicareAmericanIndianData,
                MedicareOtherData,
                MedicareUnknownData
            };
        });
}

// Fetch data
MedicareRacefetchData(MedicareRacefileUrl)
    .then(({ MedicareWhiteData, MedicareBlackData, MedicareAsianData, MedicareHispanicData, MedicareAmericanIndianData, MedicareOtherData, MedicareUnknownData }) => {
        console.log('Medicare White Data:', MedicareWhiteData);
        console.log('Medicare Black Data:', MedicareBlackData);
        console.log('Medicare Asian Data:', MedicareAsianData);
        console.log('Medicare Hispanic Data:', MedicareHispanicData);
        console.log('Medicare American Indian Data:', MedicareAmericanIndianData);
        console.log('Medicare Other Data:', MedicareOtherData);
        console.log('Medicare Unknown Data:', MedicareUnknownData);

        // Export the arrays for use in other files
        window.MedicareWhiteData = MedicareWhiteData;
        window.MedicareBlackData = MedicareBlackData;
        window.MedicareAsianData = MedicareAsianData;
        window.MedicareHispanicData = MedicareHispanicData;
        window.MedicareAmericanIndianData = MedicareAmericanIndianData;
        window.MedicareOtherData = MedicareOtherData;
        window.MedicareUnknownData = MedicareUnknownData;
    })
    .catch(error => {
        console.error(`Error fetching data from ${MedicareRacefileUrl}:`, error.message);
    });


    // For Program Race
function ProgramRacefetchData(ProgramRacefileUrl) {
    return fetch(ProgramRacefileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract race data and flatten the arrays, converting values to integers
            const ProgramWhiteData = data["Program White Array"].flat().map(Number);
            const ProgramBlackData = data["Program Black Array"].flat().map(Number);
            const ProgramAsianData = data["Program Asian Array"].flat().map(Number);
            const ProgramHispanicData = data["Program Hispanic Array"].flat().map(Number);
            const ProgramAmericanIndianData = data["Program American_Indian Array"].flat().map(Number);
            const ProgramOtherData = data["Program Other Array"].flat().map(Number);
            const ProgramUnknownData = data["Program Unknown Array"].flat().map(Number);

            return {
                ProgramWhiteData,
                ProgramBlackData,
                ProgramAsianData,
                ProgramHispanicData,
                ProgramAmericanIndianData,
                ProgramOtherData,
                ProgramUnknownData
            };
        });
}

// Fetch data
ProgramRacefetchData(ProgramRacefileUrl)
    .then(({ ProgramWhiteData, ProgramBlackData, ProgramAsianData, ProgramHispanicData, ProgramAmericanIndianData, ProgramOtherData, ProgramUnknownData }) => {
        console.log('Program White Data:', ProgramWhiteData);
        console.log('Program Black Data:', ProgramBlackData);
        console.log('Program Asian Data:', ProgramAsianData);
        console.log('Program Hispanic Data:', ProgramHispanicData);
        console.log('Program American Indian Data:', ProgramAmericanIndianData);
        console.log('Program Other Data:', ProgramOtherData);
        console.log('Program Unknown Data:', ProgramUnknownData);

        // Export the arrays for use in other files
        window.ProgramWhiteData = ProgramWhiteData;
        window.ProgramBlackData = ProgramBlackData;
        window.ProgramAsianData = ProgramAsianData;
        window.ProgramHispanicData = ProgramHispanicData;
        window.ProgramAmericanIndianData = ProgramAmericanIndianData;
        window.ProgramOtherData = ProgramOtherData;
        window.ProgramUnknownData = ProgramUnknownData;
    })
    .catch(error => {
        console.error(`Error fetching data from ${ProgramRacefileUrl}:`, error.message);
    });










