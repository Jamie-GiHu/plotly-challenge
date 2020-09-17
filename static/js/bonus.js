// BONUS CHALLENGE
// Create a gauge chart to plot the weekly washing frequency of the selected subject

// Function to create gauge chart
function gaugeChart(value) {

    // Use DOM to get value of id for bar chart when page first loads
    // var inputValue = document.getElementById("selDataset").value;

    var transformedInputValue = parseInt(value); // inputValue

    // Filter samples data by id selected in dropdown menu
    var selectedMetadata = dataDB.metadata.filter(subject => 
        (subject.id === transformedInputValue));

    // Get sample data 
    var washFreq = selectedMetadata[0].wfreq;
    
    // Trace data based on half pie chart 
    trace3 = {
        values: [1,1,1,1,1,1,1,1,1,9],
        type: "pie",
        showlegend: false,
        hole: 0.5,
        rotation: 90,
        text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
        direction: "clockwise",
        textinfo: "text",
        textposition: "inside",
        marker: {
            colors: [
                    'rgb(229,204,229)',
                    'rgb(216,178,216)',
                    'rgb(204,153,204)',
                    'rgb(191,127,191)',
                    'rgb(178,102,178)',
                    'rgb(166,76,166)',
                    'rgb(153,50,153)',
                    'rgb(140,25,140)',
                    'rgb(128,0,128)',
                    "white"
                ],
            },      
        labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
        hoverinfo: "label",
    };

    // Plot needle
    var freqCalc = washFreq / 9 * 180
    var degrees = 180 - freqCalc, radius = 0.5;
    var radians = degrees * Math.PI / 180;
    var aX = (0.01 * Math.cos((degrees - 90) * Math.PI / 180))+0.51;
    var aY = (0.01 * Math.sin((degrees - 90) * Math.PI / 180))+0.47;
    var bX = (-0.01 * Math.cos((degrees - 90) * Math.PI / 180))+0.51;
    var bY = (-0.01 * Math.sin((degrees - 90) * Math.PI / 180))+0.47;
    var cX = ((radius * Math.cos(radians))*0.5)+0.51;
    var cY = ((radius * Math.sin(radians))*0.5)+0.47+0.05;

    var path = 'M ' + aX + ' ' + aY +
    ' L ' + bX + ' ' + bY +
    ' L ' + cX + ' ' + cY +
    ' Z';

    // Data as an array
    var data3 = [trace3]; 

    // Layout
    var layout3 = { 
        shapes: [{
            type: "path",
            path: path,
            fillcolor: "red",
            line: {
                color: "red",
            }
        }],
        title: "Belly Button Washing Frequency <br>Scrubs per Week",
        xaxis: { visible: false, range: [-1, 1]},
        yaxis: { visible: false, range: [-1, 1]},
        width: 450, 
        height: 400, 
        xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
                    fixedrange: true,
            range: [-1, 1]
        },
          yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
                    fixedrange: true,
            range: [-1, 1]
        }
    };

    // Render plot
    Plotly.newPlot("gauge", data3, layout3);
}