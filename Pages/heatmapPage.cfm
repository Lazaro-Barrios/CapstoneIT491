<!DOCTYPE html>
<html lang="en">

<head>
 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/CapstoneIT491/CSS/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="/CapstoneIT491/CSS/heatmap/card.css"> 
    <link rel="stylesheet" href="/CapstoneIT491/CSS/heatmap/legend.css"> 
    <link rel="stylesheet" href="/CapstoneIT491/CSS/heatmap/map.css"> 
    <link rel="stylesheet" href="/CapstoneIT491/CSS/heatmap/options.css"> 
    <link rel="stylesheet" href="/CapstoneIT491/CSS/heatmap/table.css"> 
    <link rel="stylesheet" href="/CapstoneIT491/CSS/heatmap/flex.css"> 
    <title>Heatmap</title>
</head>

<body>
    <cfinclude template="../features/navbar.cfm">
        <div class="wrapper">
             <div class="main-title-container container-background">
                <h2>State Medicare Payment Per Enrollee</h2>

            </div>
            
             <div>Select Year</div>
            <div class="components_container">

                <div class="select_component">

                    <select name="option" id="option">
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        </optgroup>



                    </select>

                    <select name="option" id="option1">
                        <option value="">Compare</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        </optgroup>



                    </select>

                </div> <!-- End of the select_component -->




            </div> <!-- Endo of components_container -->

           

            <div class="legend-map-container container-background">
               

                <div class="map-container">
                    <div id="tooltip"></div><!-- div to hold tooltip. -->
                    <svg width="900" height="600" id="statesvg"></svg> <!-- svg to hold 
                    the map. -->
                </div>

                <div class="component-legend">
                    <div class='legend-container'>
                        <div class="legend1">
                            <div class="card align-self-center">
                                <div class="card-body">
                                    <div id="legend">
                                        <h5 class="card-title pb-2"></h5>
                                        <div class="scale">

                                            <div id="gradient-bar"></div>
                                            <div class="indicator red"><0%</div>
                                            <div class="indicator">0-11%</div>
                                            <div class="indicator">12-17%</div>
                                            <div class="indicator">18-24%</div>
                                            <div class="indicator">25%+</div>



                                        </div>




                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="legend2">
                            <div class="card align-self-center">
                                <div class="card-body">
                                    <div id="legend2">
                                        <h5 class="card-title pb-2"></h5>
                                        <div class="scale">

                                            <div id="gradient-bar2"></div>
                                            <div class="indicator2 indicatorsame hightest-number">high</div>
                                            <div class="indicator2"></div>
                                            <div class="indicator2"></div>
                                            <div class="indicator2"></div>
                                            <div class="indicator2 indicatorsame lowest-number">low</div>



                                        </div>




                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="table-container">
                <div class='spent-most-container'>


                    
                    <div class="title_container container-background">

                        <div class="one green">
                            <h3><span class='table-title1'></span>&#8593;</h3>
                        </div>

                    </div>
                   
                    
                    <div class="spent-most container-background">
                        <table class="most-table content-table">


                        </table>
                    </div>
                </div>

                <div class='spent-least-container'>

                    <div class="title_container container-background">

                        <div class="one red">
                            <h3><span class='table-title2'></span>&#8595;</h3>
                        </div>

                    </div>
                

                    <div class='spent-least container-background'>
                        <table class="least-table content-table">

                        </table>

                    </div>
                </div>

            </div>
        </div>
        <script src="/CapstoneIT491/JavaScript/script.js"></script> 
        <script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>
        <script type="text/javascript" src="/CapstoneIT491/JavaScript/heatmap/uStates.js"></script>
        <script type="module" src="/CapstoneIT491/JavaScript/heatmap/index.js"></script>




</body>

</html>
