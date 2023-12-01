import {tooltipHtml,calculatePercentage,getColor,
        tooltipHtml2,getTheTables,getSameYearStats,
        getSameYearColor, showOrHideLegends,getDollarFormat,getSameYearLegend} from './utils/helper.js'
import { allstates,statesInfo,sumStates,tablesInfo
        ,bottomFive,topFive,legendArray } from './utils/variables.js';

import {infoCard,getLegendsForMap} from './utils/cards.js'

const year1= document.querySelector('#option');
const year2 = document.querySelector('#option1');
const mostTable = document.querySelector('.most-table');
const leastTable = document.querySelector('.least-table');

const mapContainer = document.querySelector('.map-container')
const legendMapContainer = document.querySelector('.component-legend')
const legendYearContainer = document.querySelector('.legend-container')
const legend1 = document.querySelector('.legend1');
const legend2 = document.querySelector('.legend2');

const createCardElement = document.createElement('div');
createCardElement.setAttribute('class','card-info')
createCardElement.innerHTML = infoCard();
legendMapContainer.appendChild(createCardElement);



const highestsameYearDiv = document.querySelector('.hightest-number');
const lowestSameYearDiv = document.querySelector('.lowest-number');



//testing

let gradientBar = document.getElementById("gradient-bar");
let barHeight = gradientBar.offsetHeight;
let indicators = document.getElementsByClassName("indicator");
let numberOfIndicators = indicators.length;
let counter = 0;
for (var x = 0; x < numberOfIndicators; x++) {
	indicators[x].style.top = counter + "px";
	counter += barHeight / numberOfIndicators + 3;
}

let gradientBar2 = document.getElementById("gradient-bar2");
let barHeight2 = gradientBar2.offsetHeight;
let indicators2 = document.getElementsByClassName("indicator2");
let numberOfIndicators2 = indicators2.length;
let counter2 = 0;
for (var x = 0; x < numberOfIndicators2; x++) {
	indicators2[x].style.top = counter2 + "px";
	counter2 += barHeight2 / numberOfIndicators2 + 3;
}
// showOrHideLegends(legend1,legend2,year1.value,year2.value);


// getTables(tablesInfo,mostTable,leastTable,year1.value,year2.value);
getTheTables(tablesInfo,bottomFive,topFive,mostTable,leastTable,year1.value,year2.value);
year1.addEventListener('change',(event)=>{
    // getTables(tablesInfo,mostTable,leastTable,year1.value,year2.value);
    getTheTables(tablesInfo,bottomFive,topFive,mostTable,leastTable,year1.value,year2.value);
    // event.preventDefault();
    mapContainer.removeChild(document.getElementById('statesvg'));
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("id", "statesvg");
    svgElement.setAttribute("width", "900");
    svgElement.setAttribute("height", "600");
    mapContainer.appendChild(svgElement);
    drawMap(); 
});
year2.addEventListener('change',(event)=>{
    // getTables(tablesInfo,mostTable,leastTable,year1.value,year2.value);
    getTheTables(tablesInfo,bottomFive,topFive,mostTable,leastTable,year1.value,year2.value);
    // event.preventDefault();
    mapContainer.removeChild(document.getElementById('statesvg'));
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("id", "statesvg");
    svgElement.setAttribute("width", "900");
    svgElement.setAttribute("height", "600");
    mapContainer.appendChild(svgElement);
    drawMap(); 
});
drawMap();
    

function drawMap(){

    if(year1.value == year2.value || !year2.value){
        document.querySelector('.table-title1').textContent = 'Highest Spending States'
        document.querySelector('.table-title2').textContent ='Least Spending States'
    }
    else{
        document.querySelector('.table-title1').textContent='Highest Changes In Spending'
        document.querySelector('.table-title2').textContent='Least Changes In Spending'
    }
    
    showOrHideLegends(legend1,legend2,year1.value,year2.value);
    
    const sameYearStats = getSameYearStats(year1.value,year2.value,tablesInfo);
    getSameYearLegend(year1.value,year2.value,getDollarFormat(sameYearStats.most),getDollarFormat(sameYearStats.least),highestsameYearDiv, lowestSameYearDiv)
    
    
    var sampleData = {};	/* Sample random data. */
    ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA","ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH","MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT","CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN","WI", "MO", "AR", "OK", "KS", "LS", "VA"]
    .forEach(function (d) {
        const stateName = allstates[d];
        const stateDataPoint = statesInfo.states[stateName];
        let change=0;
        if(year2.value){
            const smallest = (Number(year1.value) < Number(year2.value))?year1.value:year2.value;
            const biggest = (Number(year1.value) >= Number(year2.value))?year1.value:year2.value;
            change = calculatePercentage(stateDataPoint[smallest], stateDataPoint[biggest]);
            // console.log(stateName,change.toFixed(2));
            if(year1.value==year2.value){
            
                const toColor = legendArray[getSameYearColor(sameYearStats,stateDataPoint[year1.value])];
               sampleData[d] = {paid:getDollarFormat(stateDataPoint[year1.value]), color:toColor};
            }
            else{
               
                 sampleData[d] = {
                    change:Number(change.toFixed(2)), 
                    color:(Number(change) >= 0.00 && Number(change) < 1.00)?'#DFFFD3' :getColor(Math.round(Number(change.toFixed(2)))),
                    year1:getDollarFormat(stateDataPoint[smallest]), 
                    year2:getDollarFormat(stateDataPoint[biggest]),
                    first : smallest,
                    second:biggest,
                }
            }
           
            
            
        }
        else{
             const toColor = legendArray[getSameYearColor(sameYearStats,stateDataPoint[year1.value])];
            sampleData[d] = {paid:getDollarFormat(stateDataPoint[year1.value]), color:toColor}
            //  sampleData[d] = {avg:change, color:'green'}

        }
        
       
        
        
    });
    
 
            /* draw states on id #statesvg */
    if(year2.value && year2.value != year1.value)
        uStates.draw("#statesvg", sampleData, tooltipHtml);
    else
        uStates.draw("#statesvg", sampleData, tooltipHtml2);

    
    

    d3.select(self.frameElement).style("height", "600px"); 

}