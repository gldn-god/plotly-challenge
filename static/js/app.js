// create metadata for dropdown menus
function buildMetadata(selection) {
    d3.json("samples.json").then((sampleData) => {
        console.log(sampleData);

        var parsedData = sampleData.metadata;
        console.log("parsed data inside buildMetadata function")
        console.log(parsedData);

        var sample = parsedData.filter(item => item.id == selection);
        console.log("showing sample[0]:");
        console.log(sample[0]);

        var metadata = d3.select("#sample-metadata").html("");

        Object.entries(sample[0]).forEach(([key, value]) => {
            metadata.append("p").text(`${key}: ${value}`);
        });

        console.log("next again");
        console.log(metadata);
    });
}

// create charts using sample from user input (html)
function buildCharts(selection) {
    d3.json("samples.json").then((sampleData) => {

        var parsedData = sampleData.samples;
        console.log("parsed data inside buildCharts function")
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
        });
        console.log("reformatted");
        console.log(reformattedLabels);

        var hovertext = sampleDict.otu_labels;
        var barCharthovertext = hovertext.slice(0, 10).reverse();
        console.log("otu_labels");
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
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: {
                title: "OTU ID"
            }
        };
        Plotly.newPlot("bubble", bubbleChartData, layout);
    });
}

// populate menu with IDs on page load
function init() {
    d3.json("samples.json").then((data) => {
        var parsed = data.names;
        console.log("parsed init data")
        console.log(parsed);

        var dropdownMenu = d3.select("#selDataset");
        parsed.forEach((name) => {
            dropdownMenu.append("option").property("value", name).text(name);
        })

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