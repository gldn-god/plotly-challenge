// populate menu with IDs, draw charts using first record by default 
function init() {
    resetData();
    d3.json("data/samples.json").then((data => {
        data.names.forEach((name => {
            var option = idSelect.append("option");
            option.text(name);
        }));
        var initId = idSelect.property("value")
        plotCharts(initId);
    }));
}


// select input variables
var idSelect = d3.select("#selDataset");
var demographicsTable = d3.select("#sample-metadata");