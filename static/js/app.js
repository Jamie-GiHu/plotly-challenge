// STEP ONE 
// Use D3 to read in samples.json

var pathSamples = `/static/data/samples.json`;
var dataDB;

d3.json(pathSamples)
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

    // Invoke function based on value in dropdown menu
    optionChanged(inputValue);

    bubbleChart(inputValue);

    popMetadata(inputValue);

    gaugeChart(inputValue);

});

// Function to create a horizontal bar chart displaying top 10 OTU
function optionChanged(value) {

    // Console log to test function
    console.log('called function');
    console.log(value);
    console.log(typeof value);

    // Filter samples data by id selected in dropdown menu
    var selectedSample = dataDB.samples.filter(subject => 
        (subject.id === value));

    console.log(selectedSample[0]);

    // Get sample data 

    var otuLabels = selectedSample[0].otu_labels;

    var otuIds = selectedSample[0].otu_ids;

    var sampleValues = selectedSample[0].sample_values;

    // Slice top 10 from each array

    var top10_otuLabels = otuLabels.slice(0, 10);

    var top10_otuIds = otuIds.slice(0, 10);

    var top10_sampleValues = sampleValues.slice(0, 10);

    console.log(top10_otuLabels);
    console.log(top10_otuIds);
    console.log(top10_sampleValues);

    // Loop to add  "OTU" in front of OTU IDs and convert from integer to string
    
    var top10_otuIdsLabels = [];

    for (var i = 0; i < top10_otuIds.length; i++) {
        top10_otuIdsLabels.push("OTU " + top10_otuIds[i]);
    };

    console.log(top10_otuIdsLabels);

    // Reverse the order to plot in descending order

    top10_otuLabels = top10_otuLabels.reverse();

    top10_otuIdsLabels = top10_otuIdsLabels.reverse();

    top10_sampleValues = top10_sampleValues.reverse();

    console.log(top10_otuLabels);
    console.log(top10_otuIdsLabels);
    console.log(top10_sampleValues);

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
            } 
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
        },
        // width: 600,
        // height: 600,
        // paper_bgcolor: 'rgb(248,248,255)',
        // plot_bgcolor: 'rgb(248,248,255)',
    };

    // Render plot
    Plotly.newPlot("bar", data, layout);
};

// STEP 3
// Create a bubble chart that displays each sample

// Function to create a bubble chart
function bubbleChart() {

    // Console log to test function
    console.log('called bubble function');

    // Use DOM to get value of id for bar chart when page first loads
    var inputValue = document.getElementById("selDataset").value;

    console.log(inputValue);
    console.log(typeof inputValue);

    // Filter samples data by id selected in dropdown menu
    var selectedSample = dataDB.samples.filter(subject => 
        (subject.id === inputValue));

    console.log(selectedSample[0]);

    // Get sample data 
    var otuLabels = selectedSample[0].otu_labels;

    var otuIds = selectedSample[0].otu_ids;

    var sampleValues = selectedSample[0].sample_values;

    console.log(otuLabels);
    console.log(otuIds);
    console.log(sampleValues);

    // Set up trace
    var trace2 = {
        x: otuIds, 
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        colorscale: 'YlGnBu',
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
        // width: 600,
        // height: 600,
        // paper_bgcolor: 'rgb(248,248,255)',
        // plot_bgcolor: 'rgb(248,248,255)',
    };

    // Render plot
    Plotly.newPlot("bubble", data2, layout2);
}

// STEP THREE
// Display the sample metadata

// Function to populate the panel-body
function popMetadata() {

    // Use DOM to get value of id for bar chart when page first loads
    var inputValue = document.getElementById("selDataset").value;

    console.log("popMetadata function")
    console.log(inputValue);
    console.log(typeof inputValue);

    var transformedInputValue = parseInt(inputValue);

    // Filter samples data by id selected in dropdown menu
    var selectedMetadata = dataDB.metadata.filter(subject => 
        (subject.id === transformedInputValue));

    console.log(selectedMetadata[0]);

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

// BONUS CHALLENGE
// Create a gauge chart to plot the weekly washing frequency of the selected subject

// Function to create gauge chart
function gaugeChart() {

    // Console log to test function
    console.log('called gauge function');

    // Use DOM to get value of id for bar chart when page first loads
    var inputValue = document.getElementById("selDataset").value;

    console.log(inputValue);
    console.log(typeof inputValue);

    var transformedInputValue = parseInt(inputValue);

    // Filter samples data by id selected in dropdown menu
    var selectedMetadata = dataDB.metadata.filter(subject => 
        (subject.id === transformedInputValue));

    console.log(selectedMetadata[0]);
    console.log(selectedMetadata[0].wfreq)

    // Get sample data 
    var washFreq = selectedMetadata[0].wfreq;

    trace3 = {
        domain: { 
            x: [0,1], 
            y: [0,1]
        },
        value: washFreq,
        title: { text: "Scrubs per Week"},
        mode: "gauge",
        gauge: {
            axis: { range: [0,9],
                    tickvals: [0,1,2,3,4,5,6,7,8,9],
                    ticks: "outside"    
            },
            // steps: [
            //     { range: [0,1], color: 'rgb(128,0,128)', opacity: 95% },
            //     { range: [1,2], color: 'rgb(128,0,128)', opacity: 85% },
            //     { range: [2,3], color: 'rgb(128,0,128)', opacity: 75% },
            //     { range: [3,4], color: 'rgb(128,0,128)', opacity: 65% },
            //     { range: [4,5], color: 'rgb(128,0,128)', opacity: 55% },
            //     { range: [5,6], color: 'rgb(128,0,128)', opacity: 45% },
            //     { range: [6,7], color: 'rgb(128,0,128)', opacity: 35% },
            //     { range: [7,8], color: 'rgb(128,0,128)', opacity: 25% },
            //     { range: [8,9], color: 'rgb(128,0,128)', opacity: 15% }
            // ],
            color: { gradient: True,
                     ranges: {
                        'rgb(128,0,128)': [0,3],
                        'rgb(128,0,128)': [3,6],
                        'rgb(128,0,128)': [6,9]
                    },
            },
        }
    };
}




