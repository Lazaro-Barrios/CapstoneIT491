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

   
 <script src="/CapstoneIT491/JavaScript/data.js"></script>
 <script src="/CapstoneIT491/JavaScript/programpayments.js"></script>
<script src="/CapstoneIT491/JavaScript/medicareenrollees.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.0/dist/jquery.min.js"></script>



    <h1>Demographics</h1>
    
    <label for="demographic">Choose Your Demographic</label>
    <select name="demographic" id="demographic"  >
        <option value="age">Age</option>
        <option value="race">Race</option>
        <option value="sex">Sex</option>
    </select>
    <button id="enter">Enter</button>

    <h2 id='ProgramTitle'></h2>
    <div id="program-container">
        <canvas id="myChart"></canvas>
    </div>

    
<h2 id='MedicareTitle'></h2>
    <div id="medicare-container">
        <canvas id="myChartMedicare"></canvas>
    </div>

   



    <a href="index.cfm" class="back-link">Back to Landing Page</a>
</body>
</html>

