// reset data from html tags
function resetData() {
    demographicsTable.html("");
    barChart.html("");
};

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
var barChart = d3.select("#bar");

// read data, create table
function plotInputs(id) {

    // read in the JSON data
    d3.json("data/samples.json").then((data => {
        // filter on ID
        var individualMetadata = data.metadata.filter(participant => participant.id == id)[0];

        // loop through key, value pairs, append with style <('-'<)
        Object.entries(individualMetadata).forEach(([key, value]) => {
            var newList = demographicsTable.append("ul");
            newList.attr("class", "list-group list-group-flush");
            var listItem = newList.append("li");
            listItem.attr("class", "list-group-item p-1 demo-text bg-transparent");

            // append values to list
            listItem.text(`${key}: ${value}`);
        });

        // narrow to sample
        var individualSample = data.samples.filter(sample => sample.id == id)[0];

        // metadata arrays (capture loop values)
        var otuId = [];
        var otuLabel = [];
        var sampleValue = [];

        // retrieve key, value pairs for plot
        Object.entries(individualSample).forEach(([key, value]) => {
            switch (key) {
                case "otu_ids":
                    otuId.push(value);
                    break;
                case "sample_values":
                    sampleValue.push(value);
                    break;
                case "otu_labels":
                    otuLabel.push(value);
                    break;
                default:
                    break;
            }
        });

        // unnest arrays
        var topIds = otuIds[0].slice(0, 10).reverse();
        var topLabels = otuLabels[0].slice(0, 10).reverse();
        var topValues = sampleValues[0].slice(0, 10).reverse();

        // y-axis labels
        var topOtuIdsFormatted = topOtuIds.map(otuID => "OTU " + otuID);
    }));
};