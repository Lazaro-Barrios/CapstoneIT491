export function infoCard(){
    return(
        `
        <div class="card-info">
        <div id="card-info">
            <img id="my-icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADiklEQVR4nO2aS08UQRCAO4HpnshDERPjRbyrIIo3jRpNNPEgO9UdlYdejJGoJ2PkJ+jBg/Fx4+BJ4aQmGjmo6MUEHxfD3UjwcdLgCwyhTFfPzs7MojKwMzstVFKBdPXOzjdV29VV04wxxtApbEUun6GQUygkWqJTyOVTdKCdBRACplHATxTyAQo5ZIVy+dDcM0wTjPEE/EBHbWaWCTrQTjAcRpgfTvfJILw9KORgiHoAGzqbycZVf/SJqH4arz+6huaVbIP6OpnBcDmsGZgfb0MGhCCiscg98G2zMdusuZAHc8TvYGYggh4exkHMoCFVBkQq35Z4XtVBkG4OLpfdIJfPyab/xkH0/OD/aoNwivVYmHj7/Q9MxmyTZlwdKA9HOVBdkIbOZop589QV3SRTNWRzoDUY1+pAK40zVUPzApsHxQWiaiA2CsZArFfmx/R41TP1wjP8+H8ZWkPMUsElB4JM1WPdkbXMVhBkh1aZvRfM+Jl7DGuhIzLHKbRFckul1Sm0LR5EwG3fdgc5XEcB35DDx3CyQw4TqS6rHCYWBULhRJ6Au8GYq3pprqt6Sx6JZfuKewRaFweyorDOzy/XQh7a7c89y3IkOI/QGqNwIk9QwfWavOTAxtBFRjPN4Fy+R9bdmAykFjroNxFcCGaQy3OROfGqMX29UtzEzhsk2A2TR+A0OoVNLIeCSy4h5l1wGSRDQaZWovD2oaO2xX/kCZZfeQI5XEhNXbXjrxBct5ngS2j5fYWu15IIBFlXEwr4lXJeoKbg3E/58AYU8jtyeIcCTqGQF/3l/3Fyj+jsrl2alrLj7p9B1EmTANXBkofgJjUJmVqdL5AysK6mioNkFFrx7cfb4Ptdr6UUWqoPBVwyoQWPkocWXUDHZkbKwYt8PwcPhfwcgn2BrlqfGCQPgqy7EQXspdcHC11+bRFcBsmZ4Ly28fptlCuPoVBn8vpqDv9dWBW2I5efooWVOp9pYcXN671KlLpf0ZHdpl6Hl6bULRVYGZS6oxVqPsDVYMxVu6xrPuCc7SD9W9HtIOjJrEHHY+rCzkQgZgLc8m33kMMNf8vwIbzXSb1BJ8p0NrwnS9Ay1TDFlql8ozd3kTlpN+h43CPlNUyCJnZPndVNbFsEQyD6lM0ws1QwOMKhjwrpgynF40IWCdLJJnLEk+IJG3PMydDZ8hJ0uHTMSW3xyaDdeMa2g2cwUoT4DUjeKGY463OOAAAAAElFTkSuQmCC">
            <img id="icon-2"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5ElEQVR4nO2au2tUQRTGB9IISjRGkDTG3rhxNXYRDQoKdlm20rUSMaiViPsnaJFCfHRbWMVspULELdTEJhAfjaQXQ3xUSnxFkf3JsN+FYVji3n3cvWPywSF3zzmXO1/OuTNnzh1jjDHAfuA5sEo4WAXmgKxxSPwCfgKPgHIg8lhjtmPPGkXiB7DXBAYgKzKzRiGakWEMmHZYl4B+2Yref6Qo/Q75RXp7/1iCZCqWg72wKEtpB+EjJ1vV01elz9W5ZzpBImX7QJ9ITVm7zsuW1+/Yfl0nQm1wk3UGOC/bfB0ik85114mU6qTJcdlWPP2K9Cfq3FPqNpF+5XxeYgfZI1vG0VvJSN8jv0ifiyaIrhEJEXhEgofR36UUrNTNytJ/mVplEyhYd0SALcBOEyoRYJtqrz/yWQRGPJ9hb21ptwy3g8g92e4Dt4FvwEd3sQOW6SyWWyKidLKReODoCvItODp/tW+3ZFolMiD9LUd3RLpLJkWggdRaVDoVtOF6rSjtcXwWSBbvgd64REb0TkSwJC57Pv6usdNyIypiGybiVMM2IheAIZNCsO4WxLSDDSIJAtgKHAMO+C95nFnrLHC1gzL6DxI54Isza74CBmMRAfqA33QWM2uQ2A18B94B54Frmv6fNhORAYW0U7JpDSLnNK6Tju6umoTb00bEl762E0kotXy8dZ4/6KTWBHBdqfWkmdSaUG4mJePe88eBzw7RF8Cu2ETSAKAXOKrPB81Nv6GADSIpAw2W8fZr1BngYlo/zdHArHUQ+OTMGnb6u5LwxqrYrq3uV+CU9usvRWYowa3uQruaDzcd3eHgmg/UbwfZd8XidIINurwnh2IRkcOUbA+BOyoZPri1TgINOh9VtyaL0zKdclqmb2xx5/l0ukGX92S0lSb25qCb2KEAh4g9wlExgQLnCMecDqbUjgsFBGonm2wgnhmVyNExp0oKPm6WGxQ71uiY076ImSVjIxPawbPZiMRf+ht+T5d0RqgAAAAASUVORK5CYII=">
            <h4 id="main-title">Medicare HeatMap</h4>

            <p id="sub-title">Map displays how much each state paid in medicare per enrollee. Select another year to compare.</p>

        </div>
    </div>
        `
    )
}


export function getLegendsForMap(legendContainer, year1, year2){
    
  
}