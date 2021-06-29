// populate dropdown menu with options for user input
function buildMetadata(selection) {
    d3.json("samples.json").then((sampleData) => {
        console.log(sampleData);

        var parsedData = sampleData.metadata;
        console.log(parsedData);

        var sample = parsedData.filter(item => item.id == selection);
        console.log(sample[0]);

        var metadata = d3.select("#sample-metadata").html("");
        
        Object.entries(sample[0]).forEach(([key, value]) => {
            metadata.append("p").text(`${key}: ${value}`);
        });
        // record metadata
        console.log(metadata);
    });
}

// create charts using sample from user input (html)
// iterate through each value set to retrieve related point
function buildCharts(selection) {
    d3.json("samples.json").then((sampleData) => {

        var parsedData = sampleData.samples;
        console.log(parsedData);

        var sampleDict = parsedData.filter(item => item.id == selection)[0];
        console.log(sampleDict);

        var sampleValues = sampleDict.sample_values; 
        var barChartValues = sampleValues.slice(0, 10).reverse();
        console.log(barChartValues);

        var idValues = sampleDict.otu_ids;
        var barChartLabels = idValues.slice(0, 10).reverse();
        console.log(barChartLabels);

        var reformattedLabels = [];
        barChartLabels.forEach((label) => {
        });
        console.log(reformattedLabels);

        var hovertext = sampleDict.otu_labels;
        var barCharthovertext = hovertext.slice(0, 10).reverse();
        console.log(barCharthovertext);

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
            showlegend: true,
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
        console.log(parsed);

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