var eventData;


window.addEventListener('message', (event) => {
        eventData = event.data;

            switch(eventData.type) {
                default:
                    //Do nothing
                break;

                case "open":
                    //Toggle the UI
                    doOpen(event.data.cost);
                break;

                case "UpdateMeterDisplay":
                    UpdateMeterDisplay(event.data.args)
                break;

            }
});

function doOpen(cost) {
    var meter = document.getElementById("meter-container");
    var costEachUnit = document.getElementById("costEachUnit");
    var isShown = meter.style.display;
        if(isShown === "block") {
            meter.style.display = "none";  
        } else {
         meter.style.display = "block";
         costEachUnit.innerHTML = cost;
        }
    
}


function UpdateMeterDisplay(args, name) {
    var CompleteCheck = document.getElementById("CompleteCheck");
    var totalCost = document.getElementById("totalCostForTrip");
        
        if(args.length > 0) {
            if(args[0] == "arrived") {
                        CompleteCheck.innerHTML = "<i id='arrivalIcon' style='color:green;' class='fas fa-check-circle'></i>";
            }
            if(args[0] == "false") {
                CompleteCheck.innerHTML = "<i id='arrivalIcon' style='color:red;' class='fas fa-circle-xmark'></i>";
    }
            
            if(args[1] != null) {
              console.log(args[1]);
                    totalCost.innerHTML = args[1] + ".00";
            }
         }
}
        