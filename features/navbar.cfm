<nav class="navbar">
    <div class="logo">
        <a href="https://rde.org/index.html" target="_blank">
            <img src="/CapstoneIT491/images/lightLogo-removebg-preview.png" alt="Logo">
            <span class="logo-text">RDE Systems</span>
        </a>
    </div>
    <div class="menu">
        <div class="menu-links">
        <a href="programPayments.cfm" <cfif CGI.SCRIPT_NAME CONTAINS "programPayments.cfm">class="active"</cfif>>Program Payments</a>
        <a href="heatmapPage.cfm" <cfif CGI.SCRIPT_NAME CONTAINS "heatmapPage.cfm">class="active"</cfif>>Heatmap</a>
        <a href="demographics.cfm" <cfif CGI.SCRIPT_NAME CONTAINS "demographics.cfm">class="active"</cfif>>Demographics</a>
        <a href="medicareSpending.cfm" <cfif CGI.SCRIPT_NAME CONTAINS "medicareSpending.cfm">class="active"</cfif>>Medicare Spending</a>
    </div>

    </div>
    <div class="menu-btn">
        <i class="fas fa-bars"></i>
        <div class="dropdown-content">
            <a href="#" id="closeMenu" class="close-btn">✖</a>
            <a href="programPayments.cfm">Program Payments</a>
            <a href="heatmapPage.cfm">Heatmap</a>
            <a href="demographics.cfm">Demographics</a>
            <a href="medicareSpending.cfm">Medicare Spending</a>
        </div>
    </div>
</nav>
