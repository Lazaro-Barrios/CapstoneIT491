export const allstates={
    "HI": "Hawaii", "AK" : "Arkansas", "FL":"Florida", "SC": "South Carolina", "GA":"Georgia", "AL":"Alabama", "NC": "North Carolina", "TN": "Tennessee", "RI": "Rhode Island", "CT":"Connecticut", "MA":"Massachusetts",
	"ME": "Maine", "NH":"New Hampshire", "VT":"Vermont", "NY":"New York", "NJ": "New Jersey", "PA": "Pennsylvania", "DE":"Delaware", "MD": "Maryland", "WV":"West Virginia", "KY": "Kentucky", "OH":"Ohio",
	"MI":"Missouri", "WY":"Wyoming", "MT":"Montana", "ID": "Idaho", "WA" : "Washington", "DC":"District of Columbia", "TX":"Texas", "CA":"California", "AZ": "Arizona", "NV":"Nevada", "UT":"Utah",
	"CO": "Colorado", "NM": "New Mexico", "OR": "Oregon", "ND": "North Dakota", "SD": "South Dakota", "NE": "Nebraska", "IA": "Iowa", "MS":"Mississippi", "IN":"Indiana", "IL": "Illinois", "MN":"Minnesota",
	"WI":"Wisconsin", "MO":"Missouri", "AR":"Arizona", "OK":"Oklahoma", "KS":"Kansas", "LS":"Louisiana", "VA":"Virginia"}
export const legendArray =['#FF3300','#ff6666','#ff9999','#c0ffc0','#a0ffa0','#80ff80','#60ff60','#40ff40','#20ff20','#18f918','#14ea14','#10dc10','#0ccf0c','#08c208','#04b504','#02a702','#009900','#008800','#007700','#006600','#005500','#004400']; //from red to green

const domainName = 'http://127.0.0.1:8500/copies/proj2/api/heatmap/comp.cfm'


export let statesInfo = '';
export let sumStates = '';
export let tablesInfo = '';
export let bottomFive = '';
export let topFive = '';

await fetch(domainName).then((res)=>res.json()).then((data)=>{
    statesInfo = data;
    sumStates = data.sum;
    tablesInfo = data.tables;
    topFive = data.topFive;
    bottomFive = data.bottomFive;
});



