// initially populate menu with IDs, draw charts using first record by default 
function init() {
    resetData();
    // read in data using D3 library
    d3.json("data/samples.json").then((data => {
        //  populate dropdowns with IDs
        data.names.forEach((name => {
            var option = idSelect.append("option");
            option.text(name);
        }));
        // grab first ID as default
        var initId = idSelect.property("value")
        // plot initial ID
        plotCharts(initId);
    }));
}