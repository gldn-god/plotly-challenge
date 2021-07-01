  // create metadata using selection
function buildMetadata(selection) {

    // read json using d3
    d3.json("samples.json").then((sampleData) => {
        console.log(sampleData);

        // retrieve parsed data for sample
        var parsedData = sampleData.metadata;
        console.log("parsed data")
        console.log(parsedData);

        var sample = parsedData.filter(item => item.id == selection);
        console.log("showing sample[0]:");
        console.log(sample[0]);

        // declare metadata location, load key value pairs
        var metadata = d3.select("#sample-metadata").html("");
        Object.entries(sample[0]).forEach(([key, value]) => {
            metadata.append("p").text(`${key}: ${value}`);
        });

        console.log("next");
        console.log(metadata);
    });
}

// create bar, buddle charts
function buildCharts(selection) {

    // read json using d3
    d3.json("samples.json").then((sampleData) => {

        // grab sample's OTU data
        var parsedData = sampleData.samples;
        console.log("parsed data")
        console.log(parsedData);

        var sampleDict = parsedData.filter(item => item.id == selection)[0];
        console.log("sampleDict")
        console.log(sampleDict);

        var sampleValues = sampleDict.sample_values; 
        var barChartValues = sampleValues.slice(0, 10).reverse();
        console.log("sample_values")
        console.log(barChartValues);

        var idValues = sampleDict.otu_ids;
        var barChartLabels = idValues.slice(0, 10).reverse();
        console.log("otu_ids");
        console.log(barChartLabels);

        var reformattedLabels = [];
        barChartLabels.forEach((label) => {
            reformattedLabels.push("OTU " + label);
        });

        console.log("reformatted");
        console.log(reformattedLabels);

        var hovertext = sampleDict.otu_labels;
        var barCharthovertext = hovertext.slice(0, 10).reverse();
        console.log("otu_labels");
        console.log(barCharthovertext);

        // bar chart, load to html tag reference
        var barChartTrace = {
            type: "bar",
            y: reformattedLabels,
            x: barChartValues,
            text: barCharthovertext,
            orientation: 'h'
        };

        var barChartData = [barChartTrace];
        Plotly.newPlot("bar", barChartData);

        // bubble chart, load to html tag reference
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

        // define parameters for bubble chart layout
        var layout = {
            showlegend: false,
            height: 500,
            width: 800,
            xaxis: {
                title: "OTU ID"
            }
        };
        Plotly.newPlot("bubble", bubbleChartData, layout);
    });
}

// populate menu with IDs on page load
function init() {

    // read json using d3
    d3.json("samples.json").then((data) => {

        // retrieve sample names
        var parsed = data.names;
        console.log("parsed data")
        console.log(parsed);

        // dropwdown for samples
        var dropdownMenu = d3.select("#selDataset");
        parsed.forEach((name) => {
            dropdownMenu.append("option").property("value", name).text(name);
        })

        // declare first sample be used for initial metadata, charts 
        buildMetadata(parsed[0]);
        buildCharts(parsed[0]);

    });
}

//  rerun with new inputs
function optionChanged(newSelection) {
    buildMetadata(newSelection); 
    buildCharts(newSelection);
}

// initialize on load
init();