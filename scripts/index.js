(function() {
  // D3 V3 -> V4 Notes
  // Changed d3.scale.linear() to d3.scaleLinear()
  // Removed eventhandlers for drag and drop minimap

  const global = {}; // set global object for storing different kind of vars in for wider scope
  global.autopilot = true;

  d3.select(".loading").classed("hide", false); // Set 'fake' loading screen for

  // Load dataset for VR
  d3.json("assets/data/aframe-data-bloemendaal_small.json", (error, data) => {
      global.data = data;
      global.number_of_lampposts = data.length;

      // Set some consts for later use
      const dislikes_normalized_min_max = d3.extent(data, d => {
        d.Hoogte = +d.Hoogte.replace(/,/g, "."); // regex to remove comma and zeros in string so it can be converted to a number
        return +d.Hoogte;
      });

      const longitude_min_max = d3.extent(data, d => {
        if (d !== undefined) {
          return d.longitude;
        }
      });

      const latitude_min_max = d3.extent(data, d => {
        if (d !== undefined) {
          return d.latitude;
        }
      });

      const sessions_min_max = d3.extent(data, d => {
        if (d !== undefined) {
          return +d.Hoogte;
        }
      });

      // Scales used to generate the scene
      const y_scale = d3
        .scaleLinear() // set 'height' for scene visualization, lower range is smaller view.
        .domain([0, dislikes_normalized_min_max[1]])
        .range([0, 25]);

      const x_scale = d3
        .scaleLinear() // Set X scale for map, so everything is in reach of experience. Call it width
        .domain([longitude_min_max[0], longitude_min_max[1]])
        .range([100, 0]);

      const z_scale = d3
        .scaleLinear() // Same for Z axis, but then it's the other width axis
        .domain([latitude_min_max[0], latitude_min_max[1]])
        .range([0, 100]); // should be opposite to x-scale, but opposite for correct representation

      // other scales
      var median = d3.median(data, d => +d.Hoogte);
      global.percentile_scale = d3
        .scaleLinear()
        .domain([dislikes_normalized_min_max[0], median, 20])
        .range([1, 70, 140])
        .clamp(true);

      var median = d3.median(data, d => +d.Hoogte);
      global.color_scale = d3
        .scaleLinear()
        .domain([dislikes_normalized_min_max[0], median])
        .range(["#FFAFA2", "#813BF6"])
        .clamp(true);

      data.forEach((d, i) => {
        const scene = d3.select("a-scene");
        const mounds = scene
          .selectAll("a-cylinder.mound")
          .data(data)
          .enter()
          .append("a-cylinder")
          .classed("mound", true)
          .attr("visible", "false")
          .attr("position", (d, i) => {
            const x = x_scale(d.longitude);
            const z = z_scale(d.latitude);
            const y = y_scale(d.Hoogte) / 2;
            return `${x} ${y} ${z}`;
          })
          .attr("height", (d, i) => y_scale(d.Hoogte))
          .attr("radius", (d, i) => d.Aanlegjaar / 10000)
          .attr("material", d => "color: #813BF6; roughness: 1; metalness: 0")
          .append("a-animation")
          .attr("attribute", "visible")
          .attr("begin", "1000")
          .attr("to", "true")
					.call(function(d){
						d3.select(".loading").classed("hide", true); // remove loading screen when data is loaded
					});

      });

      d3.selectAll(".mound").on("click", (d, i) => {
        updateCardText(d, i);
        updateRankGraphic(d, i);
      });
    }
  );

  function updateCardText(d, i) {
    const suffix = "th";
    ++i;

    const rank = Math.ceil(global.percentile_scale(+d.Hoogte));

    if (!document.querySelector(".rank-graphic svg")) {
      const data =
        '<div class="row title"><h2 class="woonplaats"></h2></div>' +
        '<div class="row hide-on-mobile"><div class="col-small">Straat</div><div class="col straat"></div></div>' +
        '<div class="row hide-on-mobile"><div class="col-small">Masttype</div><div class="col masttype"></div></div>' +
        '<div class="row hide-on-mobile"><div class="col-small">Aanlegjaar</div><div class="col aanlegjaar"></div></div>' +
        '<div class="row hide-on-mobile"><div class="col-small">Hoogte</div><div class="col hoogte"></div></div>' +
        '<div class="row hide-on-mobile"><div class="col-small">Rank</div><div class="col rank"></div></div>' +
        '<div class="row"><div class="col-small">Hoogtelevel</div><div class="col rank-graphic"></div></div>';

      d3.select(".card").html(data);
    }

    // update card
    d3.select(".woonplaats").html(d.Woonplaats);
    d3.select(".straat").html(d["Openbare ruimte"]); // bracket notation since the object key has a space in it's string, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
    d3.select(".masttype").html(d["Standaard masttype"]);
    d3.select(".aanlegjaar").html(d.Plaatsingsdatum);
    d3.select(".hoogte").html(`${d.Hoogte} meter`);
    d3
      .select(".rank")
      .html(`${i} van de ${global.number_of_lampposts} lataarnpalen`);
  }

  function updateRankGraphic(d, i) {
    const rank = Math.ceil(global.percentile_scale(+d.Hoogte));

    if (!document.querySelector(".rank-graphic svg")) {
      // add svg
      const svg = d3
        .select(".rank-graphic")
        .append("svg")
        .attr("width", 150)
        .attr("height", 30);

      svg
        .append("rect")
        .attr("width", 140)
        .attr("height", 6)
        .attr("x", 1)
        .attr("y", 5)
        .attr("fill", "none")
        .style("stroke-width", 1)
        .style("stroke", "black");

      svg
        .append("rect")
        .attr("class", "rank-graphic-indicator")
        .attr("fill", "#4CC3D9")
        .attr("x", 1)
        .attr("y", 5)
        .attr("width", 2)
        .attr("height", 6);
    }

    d3
      .select(".rank-graphic-indicator")
      .transition()
      .duration(1500)
      .attr("fill", global.color_scale(+d.Hoogte))
      .attr("width", rank);
  }

  // disable animation when w, a, s, d are pressed
  d3.select("body").on("keydown", () => {
    if (!global.autopilot) {
      return;
    }

    const keys = [87, 65, 68, 83];
    if (keys.indexOf(d3.event.keyCode) != -1) {
      d3.select(".autopilot").remove();
      global.autopilot = false;
    }
  });
})();
