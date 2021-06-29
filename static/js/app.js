// create metadata for dropdown menus
function buildMetadata(selection) {
    d3.json("samples.json").then((sampleData) => {


        var parsedData = sampleData.metadata;


        var sample = parsedData.filter(item => item.id == selection);


        var metadata = d3.select("#sample-metadata").html("");

        Object.entries(sample[0]).forEach(([key, value]) => {
            metadata.append("p").text(`${key}: ${value}`);
        });
        // show function is looping in console

    });
}

// create charts using sample from user input (html)
// iterate through each value set to retrieve related point
function buildCharts(selection) {
    d3.json("samples.json").then((sampleData) => {

        var parsedData = sampleData.samples;


        var sampleDict = parsedData.filter(item => item.id == selection)[0];


        var sampleValues = sampleDict.sample_values; 
        var barChartValues = sampleValues.slice(0, 10).reverse();


        var idValues = sampleDict.otu_ids;
        var barChartLabels = idValues.slice(0, 10).reverse();


        var reformattedLabels = [];
        barChartLabels.forEach((label) => {
        });


        var hovertext = sampleDict.otu_labels;
        var barCharthovertext = hovertext.slice(0, 10).reverse();


        // create barchart
        var barChartTrace = {
            type: "bar",
            y: reformattedLabels,
            x: barChartValues,
            text: barCharthovertext,
            orientation: 'h'
        };

        var barChartData = [barChartTrace];
        Plotly.newPlot("bar", barChartData);

        // create bubble chart
        var bubbleChartTrace = {
            x: idValues,
            y: sampleValues,
            text: hovertext,
            mode: "markers",
            marker: {
                color: idValues,
                size: sampleValues
            }
        };
        var bubbleChartData = [bubbleChartTrace];
        var layout = {
            showlegend: false,
            height: 500,
            width: 800,
            xaxis: {
                title: "ID"
            }
        };
        Plotly.newPlot("bubble", bubbleChartData, layout);
    });
}

// populate menu with sample ids
function init() {
    d3.json("samples.json").then((data) => {
        var parsed = data.names;

        // create dropwon menu from each selectable value
        var dropdownMenu = d3.select("#selDataset");
        parsed.forEach((name) => {
            dropdownMenu.append("option").property("value", name).text(name);
        })
        // build charts using data in position [0] (first in list)
        buildMetadata(parsed[0]);
        buildCharts(parsed[0]);
    });
}

//  update with new inputs
function optionChanged(newSelection) {
    buildMetadata(newSelection); 
    buildCharts(newSelection);
}

// initialize scipt
init();