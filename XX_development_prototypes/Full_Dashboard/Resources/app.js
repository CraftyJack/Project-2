function buildMetadata(sample) {
    d3.json("Datasets/carl_json copy.json", function(data) {
      var resultArray = data.filter(sampleObj => sampleObj.state_name === sample);
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
  
      var totalpopulation = 0;
      var rental = 0;
      var vacant = 0;
      var owned = 0;
      var noplumb = 0;
      var num = 0;
      
      resultArray.forEach(function(d) {
      totalpopulation = totalpopulation + d.tot_population_cen_2010; 
      rental = rental + d.renter_occp_hu_cen_2010;
      vacant = vacant + d.tot_vacant_units_cen_2010;
      owned = owned + d.owner_occp_hu_cen_2010;
      noplumb = noplumb + d.no_plumb_acs_09_13;
      num = num + 1;
      });

    PANEL.append("h6").text('Number of superfund sites in the state: ' + `${num}`);
    PANEL.append("h6").text('Population of the superfund site counties: ' + `${totalpopulation}`);
    PANEL.append("h6").text(`Number Rented: ` + `${rental}`);
    PANEL.append("h6").text(`Number Vacant: ` + `${vacant}`);
    PANEL.append("h6").text(`Number Owned: ` + `${owned}`);
    PANEL.append("h6").text(`Number No Plumbing: ` + `${noplumb}`);
  
      
    //   PANEL.append("h6").text('Population: ' + `${totalpopulation}`);
    //   PANEL.append("h6").text(`Number Rented: ` + `${rental}`);
    //   PANEL.append("h6").text(`Number Vacant: ` + `${vacant}`);
    //   PANEL.append("h6").text(`Number Owned: ` + `${owned}`);
    //   PANEL.append("h6").text(`Number No Plumbing: ` + `${noplumb}`);
    
    });
  }
  
  
  function visualize(sample) {
   d3.json("Datasets/carl_json copy.json", function(data) {
      var resultArray = data.filter(sampleObj => sampleObj.state_name === sample);
      var score = resultArray.map(data => data.site_score);
      var health = resultArray.map(data => data.pct_no_health_ins_acs_09_13);
      var POC =  resultArray.map(data => data.pct_poc);
      var income = resultArray.map(data => data.med_hhd_inc_bg_acs_09_13);
      
  var trace1 = [{
     
    x: score,
    y: health,
    mode: "markers",
    type: "scatter"
  }];

  var layout1 = {
    title: "Site Score vs Number without Healthcare",
    xaxis: {
        title: {
            text: "Site Score"
        }
    },
    yaxis: {
        title: {
            text: "Number with no Healthcare"
        }
    }
  };
  
//   var layout1 = {
//     title: "Score vs Health"
//   };
  
  Plotly.newPlot("bar", trace1, layout1);
  
  var trace2 = [{
     
    x: score,
    y: POC,
    mode: "markers",
    type: "scatter",
  }];

  var layout2 = {
    title: "Site Score vs Percent Person of Color",
    xaxis: {
        title: {
            text: "Site Score"
        }
    },
    yaxis: {
        title: {
            text: "Percent of Population that is POC"
        }
    }
  };
  
//   var layout2 = {
//     title: "Score vs POC"
//   };
  
  Plotly.newPlot("bar2", trace2, layout2);
  
  var trace3 = [{
     
    x: score,
    y: income,
    mode: "markers",
    type: "scatter",
  }];

  var layout3 = {
    title: "Site Score vs Median Household Income",
    xaxis: {
        title: {
            text: "Site Score"
        }
    },
    yaxis: {
        title: {
            text: "Median HH Income"
        }
    }
  };
  
//   var layout3 = {
//     title: "Score vs Income"
//   };
  
  
  Plotly.newPlot("bar3", trace3, layout3);
    });
  }
  
  function init() {
    var selector = d3.select("#selDataset");
  
     d3.json("Datasets/states copy.json", function(data) {
    console.log("I am in init 1");
  
      var state = data.map(data => data.state_name);
  
      state.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      var firstSample = selector.property("value");
      visualize(firstSample);
      buildMetadata(firstSample);
  
    });
  }
  
  function optionChanged(newSample) {
    console.log("I am here number 2");
    visualize(newSample);
    buildMetadata(newSample);
  }
  
  init();
  