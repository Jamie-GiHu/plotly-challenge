// STEP ONE 
// Use D3 to read in samples.json
// var pathSamples = `/static/data/samples.json`;
var pathSamples = `https://jamie-gihu.github.io/plotly-challenge/static/data/samples.json`;
var dataDB;

// Fetch json file using D3 to test in local machine
// d3.json(pathSamples)
//    .then(data => {dataDB = data

// To get it to work on GitHub Pages
fetch(pathSamples)
    .then(res => res.json())
    .then(data => {dataDB = data

// STEP TWO
// Create a horizontal bar chart displaying top 10 OTU

    // Populate dropdown menu
    // Create the dropdown menu
    var whereToPut = document.getElementById("selDataset");

    // Add list of options for 
    for (var i = 0; i < dataDB.names.length; i++) {
        var subjectList = document.createElement("option");
        subjectList.text = parseInt(dataDB.names[i]);
        subjectList.value = dataDB.names[i];
        whereToPut.append(subjectList, whereToPut[null]);
    };

    // Use DOM to get value of id for bar chart when page first loads
    var inputValue = document.getElementById("selDataset").value;

    // Invoke function based on value in dropdown menu when page loads
    barChart(inputValue);
    bubbleChart(inputValue);
    popMetadata(inputValue);
    gaugeChart(inputValue);

});

// Function to create a horizontal bar chart displaying top 10 OTU
function barChart(value) {

    // Filter samples data by id selected in dropdown menu
    var selectedSample = dataDB.samples.filter(subject => 
        (subject.id === value));

    // Get sample data 
    var otuLabels = selectedSample[0].otu_labels;
    var otuIds = selectedSample[0].otu_ids;
    var sampleValues = selectedSample[0].sample_values;

    // Slice top 10 from each array

    var top10_otuLabels = otuLabels.slice(0, 10);
    var top10_otuIds = otuIds.slice(0, 10);
    var top10_sampleValues = sampleValues.slice(0, 10);

    // Loop to add  "OTU" in front of OTU IDs and convert from integer to string
    var top10_otuIdsLabels = [];

    for (var i = 0; i < top10_otuIds.length; i++) {
        top10_otuIdsLabels.push("OTU " + top10_otuIds[i]);
    };

    // Reverse the order to plot in descending order
    top10_otuLabels = top10_otuLabels.reverse();
    top10_otuIdsLabels = top10_otuIdsLabels.reverse();
    top10_sampleValues = top10_sampleValues.reverse();


    // Set up trace
    var trace1 = {
        x: top10_sampleValues, 
        y: top10_otuIdsLabels,
        text: top10_otuLabels,
        type: "bar",
        orientation: "h",
        marker: {
            color: 'rgb(128,0,128)',
            opacity: 0.5,
            line: {
                color: 'rgb(128,0,128)',
                width: 1,
            },
        }
    };

    // Data for plotting into an array
    var data = [trace1];

    // Set up layout
    var layout = {
        title: "Top 10 Operational Taxonomic Units (OTU)",
        xaxis: {
            zeroline: true,
            showline: false,
            showticklabels: true,
            showgrid: true
        }
    };

    // Render plot
    Plotly.newPlot("bar", data, layout);
};

// STEP THREE
// Create a bubble chart that displays each sample

// Function to create a bubble chart
function bubbleChart() {

    // Use DOM to get value of id for bubble chart when page first loads
    var inputValue = document.getElementById("selDataset").value;

    // Filter samples data by id selected in dropdown menu
    var selectedSample = dataDB.samples.filter(subject => 
        (subject.id === inputValue)); 

    // Get sample data 
    var otuLabels = selectedSample[0].otu_labels;

    var otuIds = selectedSample[0].otu_ids;

    var sampleValues = selectedSample[0].sample_values;

    // Set up trace
    var trace2 = {
        x: otuIds, 
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            color: otuIds,
            opacity: 0.6,
            size: sampleValues,
            line: {
                color: 'rgb(128,0,128)',
                width: 1,
            } 
        }
    };

    // Data for plotting into an array
    var data2 = [trace2];

    // Set up layout
    var layout2 = {
        title: `Value of Operational Taxonomic Units (OTU) Found in Test Subject ${inputValue}`,
        xaxis: {
            zeroline: true,
            showline: false,
            showticklabels: true,
            showgrid: true,
            title: "OTU ID"
        },
        showlegend: false
    };

    // Render plot
    Plotly.newPlot("bubble", data2, layout2);
}

// STEP FOUR AND FIVE
// Display the sample metadata and each key-value pair

// Function to populate the panel-body
function popMetadata(value) {

    var transformedInputValue = parseInt(value);

    // Filter samples data by id selected in dropdown menu
    var selectedMetadata = dataDB.metadata.filter(subject => 
        (subject.id === transformedInputValue));

    // Select the div that would contain the panel-body
    var panelBody = d3.select(".panel-body");

    // Clear panel-body
    panelBody.html("");

    // Use 'Object.entries' loop through each sighting report key and value
    Object.entries(selectedMetadata[0]).forEach(([key,value]) => {

        // Use d3 to append a cell to the row for each value in the sighting report object
        var subjectDemographic = panelBody.append("p");

        // Use d3 to update each cell's text with the value in the sighting report
        subjectDemographic.text(`${key}: ${value}`); 
    });
}

// STEP SIX
// Update all of the plots any time that a new sample is selected

// Create a function to tie all functions together
function optionChanged(value) {

    // Invoke function based on value in dropdown menu
    barChart(value);

    bubbleChart(value);

    popMetadata(value);

    gaugeChart(value); // From bonus.js

};
