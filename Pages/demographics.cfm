<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/CapstoneIT491/CSS/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Demographics</title>
</head>

<body>        
    <cfinclude template="/CapstoneIT491/features/navbar.cfm">

   
 <script src="\CapstoneIT491\JavaScript\programpayments.js"></script>
<script src="/CapstoneIT491/JavaScript/medicareenrollees.js"></script>
<script src="/CapstoneIT491/JavaScript/yearfilter.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>



    <h1>Demographics</h1>
    
    <label for="demographic">Choose Your Demographic</label>
    <select name="demographic" id="demographic">
        <option value="age">Age</option>
        <option value="race">Race</option>
        <option value="sex">Sex</option>
    </select>
    <button id="enter">Enter</button>

    <div id="program-container">
        <canvas id="myChart"></canvas>
    </div>

    <div>
        <label>Years to Display (Program Payments):</label>
        <div>
            <input type="checkbox" name="year2013" id="year2013" checked="checked">
            <label for="year2013">2013</label>

            <input type="checkbox" name="year2014" id="year2014" checked="checked">
            <label for="year2014">2014</label>

          <input type="checkbox" id="year2015" checked>
            <label for="year2015">2015</label>
       
            <input type="checkbox" id="year2016" checked>
            <label for="year2016">2016</label>
       
            <input type="checkbox" id="year2017" checked>
            <label for="year2017">2017</label>
       
            <input type="checkbox" id="year2018" checked>
            <label for="year2018">2018</label>
        
            <input type="checkbox" id="year2019" checked>
            <label for="year2019">2019</label>
       
            <input type="checkbox" id="year2020" checked>
            <label for="year2020">2020</label>
        
            <input type="checkbox" id="year2021" checked>
            <label for="year2021">2021</label>
        </div>
        
          <div>
        <button id="filterButton">Filter</button>
    </div>
    </div>

    <div id="medicare-container">
        <canvas id="myChartMedicare"></canvas>
    </div>

    <div>
        <label>Years to Display (Medicare Enrollees):</label>
        <div>
            <input type="checkbox" name="yearMedicare2013" id="yearMedicare2013" checked="checked">
            <label for="yearMedicare2013">2013</label>

            <input type="checkbox" name="yearMedicare2014" id="yearMedicare2014" checked="checked">
            <label for="yearMedicare2014">2014</label>
             <input type="checkbox" id="yearMedicare2015" checked>
                <label for="yearMedicare2015">2015</label>
            
                <input type="checkbox" id="yearMedicare2016" checked>
                <label for="yearMedicare2016">2016</label>
           
                <input type="checkbox" id="yearMedicare2017" checked>
                <label for="yearMedicare2017">2017</label>
            
                <input type="checkbox" id="yearMedicare2018" checked>
                <label for="yearMedicare2018">2018</label>
            
                <input type="checkbox" id="yearMedicare2019" checked>
                <label for="yearMedicare2019">2019</label>
            
                <input type="checkbox" id="yearMedicare2020" checked>
                <label for="yearMedicare2020">2020</label>
           
                <input type="checkbox" id="yearMedicare2021" checked>
                <label for="yearMedicare2021">2021</label>

          
        </div>
          <div>
        <button id="filterButtonMedicare">Filter</button>
    </div>
    </div>



    <a href="index.cfm" class="back-link">Back to Landing Page</a>
</body>
</html>

