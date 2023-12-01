import {legendArray, statesInfo, bottomFive, topFive,tablesInfo} from './variables.js'

export function getColor(value){
    if(value <= -5)return legendArray[0];
    else if(value <=-1 && value > -5 )return legendArray[1];
    else if(value == -0)return legendArray[2];
    else if(value >=1 && value < 3)return legendArray[3];
    else if(value == 3 || value == 4)return legendArray[4];
    else if(value == 5 || value == 6)return legendArray[5];
    else if(value == 7 || value == 8)return legendArray[6];
    else if(value == 9 || value == 10)return legendArray[7];
    else if(value == 11 || value == 12)return legendArray[8];
    else if(value == 13 || value == 14)return legendArray[9];
    else if(value == 15)return legendArray[10];
    else if(value == 16)return legendArray[11];
    else if(value == 17)return legendArray[12];
    else if(value == 18)return legendArray[13];
    else if(value == 19)return legendArray[14];
    else if(value == 20)return legendArray[15];
    else if(value == 21)return legendArray[16];
    else if(value == 22)return legendArray[17];
    else if(value == 23)return legendArray[18];
    else if(value == 24)return legendArray[19];
    else if(value == 25)return legendArray[20];
    else return legendArray[21]

    
 
}
export function tooltipHtml(n, d) {	/* function to create html content string in tooltip div. */
	return "<h4>" + n + "</h4><table>" +
		"<tr><td>"+(d.first)+"</td><td>" + (d.year1) + "</td></tr>" +
        "<tr><td>"+(d.second)+"</td><td>" + (d.year2) + "</td></tr>" +
        "<tr><td>Change</td><td>" + `${d.change}` + "%</td></tr>" +
		"</table>";
};
export function tooltipHtml2(n, d) {	/* function to create html content string in tooltip div. */
	return "<h4>" + n + "</h4><table>" +
		"<tr><td>Total</td><td>" + (d.paid) + "</td></tr>" +
		"</table>";
};

export async function getTheTables(data,bottomFive,topFive,tableMost, tableLeast,year1,year2){ /*will get the tables*/
        if(year2==='' || year1 == year2){
            
            const most = data.find((element)=>element.year==year1)
            // console.log(most.top_states.DATA);


            // console.log("Found")
            let counterM = 0;
            const most_table = most.top_states.DATA.map((state)=>{
                return `<tr>
                            <th>${++counterM}</th>
                            <th>${state[0]}</th>
                            <th>${getDollarFormat(state[1])}</th>
                        </tr>`
            })
            most_table.unshift(`<thead><tr><th>Rank</th><th>State</th><th>Total</th></tr></thead>`);
            tableMost.innerHTML = most_table.join(' ');
        


            const least = data.find((element)=>element.year==year1)
            // console.log(least.bottom_states.DATA)
            let counterL = 0;
            const least_table = least.bottom_states.DATA.map((state)=>{
                return `<tr>
                            <th>${++counterL}</th>
                            <th>${state[0]}</th>
                            <th>${getDollarFormat(state[1])}</th>
                        </tr>`
            })
            least_table.unshift(`<thead><tr>
                            <th>Rank</th>
                            <th>State</th>
                            <th>Total</th>
                        </tr></thead>`)
            least_table.join(' ');
            tableLeast.innerHTML = least_table.join(' ')

        }
        else{
            const biggest = (year1 >= year2)?year1:year2;
            const smallest = (year1 < year2)?year1:year2;

            // const most = data.find((element)=>element.year==biggest);
          

            const bottomfiveData = bottomFive[smallest].filter((element)=>element.year2 == biggest)
            const topfiveData = topFive[smallest].filter((element)=>element.year2 == biggest)
            
          
            let counterM = 0;
            const most_table = topfiveData.map((element)=>{
                return `<tr>
                            <th>${++counterM}</th>
                            <th>${element.state}</th>
                            <th>${getDollarFormat(element.payment1)}</th>
                             <th>${getDollarFormat(element.payment2)}</th>
                              <th><span class=${Number(element.changes) >0?'green':'red'}>${Number(element.changes).toFixed(2)}%</span></th>
                        </tr>`
            })
            most_table.unshift(`<thead><tr><th>Rank</th><th>State</th><th>${smallest}</th><th>${biggest}</th><th>Change</th></tr></thead>`);
            tableMost.innerHTML = most_table.join(' ');

            let counterL = 0;
            const least_table = bottomfiveData.map((element)=>{
                return `<tr>
                            <th>${++counterL}</th>
                            <th>${element.state}</th>
                            <th>${getDollarFormat(element.payment1)}</th>
                             <th>${getDollarFormat(element.payment2)}</th>
                              <th><span class=${Number(element.changes) >0?'green':'red'}>${Number(element.changes).toFixed(2)}%</span></th>
                        </tr>`
            })
            least_table.unshift(`<thead><tr><th>Rank</th><th>State</th><th>${smallest}</th><th>${biggest}</th><th>Change</th></tr></thead>`);
            tableLeast.innerHTML = least_table.join(' ');


           
    
            
        }
    
	
		

}
export function calculatePercentage(x, y) {
    // Check for division by zero
    if (x === 0) {
        if (y === 0) {
            return 0; // Both values are zero, no change.
        } else {
            return Infinity; // x was zero, and y is not zero (increase from 0).
        }
    }

    return ((y - x) / Math.abs(x)) * 100;
}

export function getSameYearStats(year1,year2,tablesInfo){
    if(!year2 || year1==year2){
        const yearInQuestion = tablesInfo[year1-2015];
        const amountLeastspent = yearInQuestion['bottom_states']['DATA'][0][1];
        const amountMostspent = yearInQuestion['top_states']['DATA'][0][1];
        const difference =  amountMostspent-amountLeastspent
        const partition = difference/18;

        return {
            least :amountLeastspent,
            most:amountMostspent,
            difference,
            partition
        }
    }
    return "DIFFERENT";
}

export function getSameYearColor(sameYearStats,value){
    const toColor = (value-sameYearStats.least)/sameYearStats.partition;
    return Math.round(toColor)+3;
}
export function showOrHideLegends(legend1,legend2,year1,year2){
    if(year2 && year1 != year2){
        legend2.style.visibility = 'hidden'
        legend1.style.visibility = 'visible';
    }
    else{
        legend1.style.visibility = 'hidden';
        legend2.style.visibility = 'visible';

    }
    
}


export function getDollarFormat(num){

    let amount = num;

    // Remove the dollar sign and parse the string to a number
    let numericAmount = parseInt(amount);
  
    // Format the number using toLocaleString
    let formattedAmount = '$' + numericAmount.toLocaleString();

    return formattedAmount

}


export function getSameYearLegend(year1, year2, highest, lowest, highDiv,lowDiv){
    if(year1 == year2 || !year2){
         
        highDiv.textContent = highest;
        lowDiv.textContent = lowest;

    }
   
}
