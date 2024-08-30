// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("Data fetched:", data)
    // get the metadata field
let metadata = data.metadata;
    console.log("Metadata:", metadata);


    // Filter the metadata for the object with the desired sample number
let result = metadata.filter(meta => meta.id == sample ) [0];

    // Use d3 to select the panel with id of `#sample-metadata`
let panel = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata

panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
Object.entries(result).forEach(([key,value])=> {
  console.log(`Appending to panel: ${key}: ${value}`);
  panel.append("h6").text(`${key}:${value}`);
});
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
let samples = data.samples;

    // Filter the samples for the object with the desired sample number
let result = samples.filter(sampleObj => sampleObj.id == sample )[0];

    // Get the otu_ids, otu_labels, and sample_values
let otu_ids = result.otu_ids;
let otu_labels = result.otu_labels;
let sample_values = result.sample_values;
  console.log("OTU IDs:", otu_ids);
  console.log("OTU Labels:", otu_labels);
  console.log("Sample Values:", sample_values);

    // Build a Bubble Chart
let bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids
      }
 };

    // Render the Bubble Chart
let bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria'}
    };

  console.log("Bubble Chart Trace:", bubbleTrace);
  console.log("Bubble Chart Layout:", bubbleLayout);
    
Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
let barTrace = {
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
};

    // Build a Bar Chart
let barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' },
      yaxis: { title: 'OTU ID' }
};
  console.log("Bar Chart Trace:", barTrace);
  console.log("Bar Chart Layout:", barLayout);

    // Render the Bar Chart
    Plotly.newPlot('bar', [barTrace], barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
let names = data.names;


    // Use d3 to select the dropdown with id of `#selDataset`
let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
names.forEach(name => {
    dropdown.append("option").text(name).property("value", name);
});

    // Get the first sample from the list
let firstSample = names[0];
  console.log("First sample:", firstSample);
    // Build charts and metadata panel with the first sample
   buildCharts(firstSample);
   buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  console.log("New sample selected:", newSample);
  // Build charts and metadata panel each time a new sample is selected
   buildCharts(newSample);
   buildMetadata(newSample);
}

// Initialize the dashboard
init();
