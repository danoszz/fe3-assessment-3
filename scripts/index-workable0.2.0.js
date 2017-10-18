(function() {


  // D3 V3 -> V4 Notes
  // Changed d3.scale.linear() to d3.scaleLinear()

  const global = {}; // set global object for storing different kind of vars in for wider scope
  global.autopilot = true;

  // Load dataset lamppost for VR
  d3.json("../assets/data/aframe-data-bloemendaal_small.json", (error, data) => {
    global.data = data;
    global.number_of_lampposts = data.length;

    // Set some consts for later use
    const dislikes_normalized_min_max = d3.extent(data, (d) => {
      d.Hoogte = +d.Hoogte.replace(/,/g, ".");  // regex to remove comma and zeros in string so it can be converted to a number
      return +d.Hoogte;
    });

    const longitude_min_max = d3.extent(data, (d) => {
      if (d !== undefined) {
        return d.longitude;
      }
    });

    const latitude_min_max = d3.extent(data, (d) => {
      if (d !== undefined) {
        return d.latitude;
      }
    });

    const sessions_min_max = d3.extent(data, (d) => {
      if (d !== undefined) {
        return +d.Hoogte;
      }
    });

    // Scales used to generate the scene
    const y_scale = d3.scaleLinear() // set 'height' for scene visualization, lower range is smaller view.
      .domain([0, dislikes_normalized_min_max[1]])
      .range([0, 25]);

    const x_scale = d3.scaleLinear() // Set X scale for map, so everything is in reach of experience. Call it width
      .domain([longitude_min_max[0], longitude_min_max[1]])
      .range([100, 0]);

    const z_scale = d3.scaleLinear() // Same for Z axis, but then it's the other width axis
      .domain([latitude_min_max[0], latitude_min_max[1]])
      .range([0, 100]); // should be opposite to x-scale, but opposite for correct representation

    // other scales
    var median = d3.median(data, d => +d.Hoogte);
    global.percentile_scale = d3.scaleLinear()
      .domain([dislikes_normalized_min_max[0], median, 20])
      .range([1, 70, 140])
      .clamp(true);

    var median = d3.median(data, d => +d.Hoogte);
    global.color_scale = d3.scaleLinear()
      .domain([dislikes_normalized_min_max[0], median])
      .range(['#FFAFA2', '#813BF6'])
      .clamp(true);

    data.forEach((d, i) => {
      let scene = d3.select("a-scene");
      let mounds = scene
        .selectAll("a-cylinder.mound")
        .data(data)
        .enter()
        .append("a-cylinder")
        .classed("mound", true)
        .attr("visible", "false")
        .attr("position", (d, i) => {
          //  d.Hoogte = +d.Hoogte.replace(/,/g, '.');

          var x = x_scale(d.longitude);
          var z = z_scale(d.latitude);
          var y = y_scale(d.Hoogte) / 2;

          return `${x  } ${  y  } ${  z}`;
        })
        .attr("height", (d, i) => y_scale(d.Hoogte))
        .attr("radius", (d, i) => d.Aanlegjaar / 10000)
        .attr("material", d => 'color: #813BF6; roughness: 1; metalness: 0')
        .append("a-animation")
        .attr("attribute", "visible")
        .attr("begin", "1000")
        .attr("to", "true");
    });

    d3.selectAll('.mound').on('click', (d, i) => {
      updateCardText(d, i);
      updateRankGraphic(d, i);
    });
  });

  //  contour plot
  d3.json("../assets/data/contour-data.json", (error, data) => {
    d3.select('.overlay').style('opacity', 1);

    const zs = [2, 22, 42, 62, 82, 102];
    const cliff = 1;
    data.push(d3.range(data[0].length).map(() => cliff));
    data.unshift(d3.range(data[0].length).map(() => cliff));
    data.forEach((d) => {
      d.push(cliff);
      d.unshift(cliff);
    });

    const xs = d3.range(0, data.length);
    const ys = d3.range(0, data[0].length);
    const c = new Conrec();

    const width = 200;
    const height = 300;
    const multiplier = 1.05;

    global.contour_width = width;
    global.contour_height = height;

    d3
      .select('.contour-plot')
      .style('top', `${window.innerHeight - height * multiplier - 20}px`)
      .style('opacity', 1);

    d3
      .selectAll('.contour-plot svg, .contour-plot svg rect')
      .attr('width', Math.round(width * multiplier))
      .attr('height', Math.round(height * multiplier));

    const svg = d3.select('.contour-plot svg');

    const t = textures
      .lines()
      .orientation('vertical', 'horizontal')
      .size(4)
      .strokeWidth(1)
      .shapeRendering('crispEdges')
      .stroke('#1a1a1a');

    svg.call(t);

    svg.select('rect.back').style('fill', t.url());

    // scales to generate the contour map
    const contour_x_scale = d3.scaleLinear()
      .domain([1, d3.max(xs) - 1])
      .range([0, height]);

    const contour_y_scale = d3.scaleLinear()
      .domain([1, d3.max(ys) - 1])
      .range([0, width]);

    // scales to map the scene to the arrow on the contour map
    global.camera_to_contour_x_scale = d3.scaleLinear()
      .domain([-40, 140]) // camera: left edge to right edge
      .range([-20, 183]) // contour map: left edge to right edge
      .clamp(true);

    global.camera_to_contour_z_scale = d3.scaleLinear()
      .domain([-245, 10]) // camera: top edge to bottom edge
      .range([-10, 300]) // contour map: top edge to bottom edge
      .clamp(true);

    global.world_position = d3
      .select(d3.select('a-camera').node().parentNode)
      .attr('position');

    global.world_rotation = d3
      .select(d3.select('a-camera').node().parentNode)
      .attr('rotation');

    const colors = d3.scaleLinear()
      .domain([zs[0], 50, zs[zs.length - 1]])
      .range(['#16214c', '#4CC3D9', '#fff']);

    c.contour(data, 0, xs.length - 1, 0, ys.length - 1, xs, ys, zs.length, zs);


		const contourList = c.contourList()
			.sort(function(a,b) {
				return d3.min(a.map(function(d) { return d.x; }))
					- d3.min(b.map(function(d) { return d.x; })
				);
			});

    const g = d3.selectAll('.contours');

    g
      .selectAll('path')
      .data(contourList)
      .enter()
      .append('path')
      .attr('class', d => "level_" + d.level)
      .style('fill', d => colors(d.level))
      .style('fill-opacity', '0.3')
      .style('stroke', d => colors(d.level))
      .style('stroke-opacity', (d) => {
        if (d.level > 2) {
          return 0.2;
        } else {
          return 0;
        }
      })
      .style('opacity', 1)
      .attr(
        'd',
        d3.line()
          .x(d => contour_x_scale(d.x))
          .y(d => contour_y_scale(d.y))
      );

    g.attr(
      'transform',
      `translate(0 ${ width }) scale(1,-1) rotate(-90 ${ width / 2 } ${ width / 2 })`,
    );

    // add arrow
    svg
      .append('path')
      .attr('d', 'M20 34 L30 36 L32 48 L34 36 L44 34 L34 32 L32 20 L30 32 Z')
      .attr('fill', 'white')
      .attr('class', 'arrow');

    //  updateContour();
  });

  function updateCardText(d, i) {
    let suffix = "th";
    ++i;

    const rank = Math.ceil(global.percentile_scale(+d.Hoogte));

    // what is the last digit?
    if (i % 10 == 1 && i !== 11) {
      suffix = "st";
    } else if (i % 10 == 2 && i !== 12) {
      suffix = "nd";
    } else if (i % 10 == 3) {
      suffix = "rd";
    }

    if (!document.querySelector(".rank-graphic svg")) {
      const data =
        '<div class="row" style="margin-bottom:10px"><div class="col-xs-12"><h1 class="woonplaats"></h1></div></div>' +
        '<div class="row hide-on-mobile"><div class="col-xs-6">Straat</div><div class="col-xs-5 straat"></div></div>' +
        '<div class="row hide-on-mobile"><div class="col-xs-6">Masttype</div><div class="col-xs-5 masttype"></div></div>' +
        '<div class="row hide-on-mobile"><div class="col-xs-6">Aanlegjaar</div><div class="col-xs-5 aanlegjaar"></div></div>' +
        '<div class="row hide-on-mobile"><div class="col-xs-6">Hoogte</div><div class="col-xs-5 hoogte"></div></div>' +
        '<div class="row hide-on-mobile"><div class="col-xs-6">Rank</div><div class="col-xs-5 rank"></div></div>' +
        '<div class="row"><div class="col-xs-6 hide-on-mobile">Dislike level</div><div class="col-xs-5 rank-graphic"></div></div>';

      d3.select(".card").html(data);
    }

    // update card
    d3.select(".woonplaats").html(d.Woonplaats);
    d3.select(".straat").html(d["Openbare ruimte"]); // bracket notation since the object key has a space in it's string, source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
    d3.select(".masttype").html(d["Standaard masttype"]);
    d3.select(".aanlegjaar").html(d.Plaatsingsdatum);
    d3.select(".hoogte").html(d.Hoogte);
    d3
      .select(".rank")
      .html(`${i + suffix} van de ${global.number_of_lampposts} lataarnpalen`);
  }

  // function addCommas(x) {
  //   return x.toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // }

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

  // handlers for draggable components
  function drag_start(event) {
    const style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData(
      "text/plain",
      `${parseInt(style.getPropertyValue('left'), 10) -
        event.clientX},${parseInt(style.getPropertyValue("top"), 10) -
        event.clientY}`
    );
  }

  function drag_over(event) {
    event.preventDefault();
    return false;
  }

  function drop(event) {
    const offset = event.dataTransfer.getData("text/plain").split(",");
    const dm = d3.select(".contour-plot").node();
    dm.style.left = `${event.clientX + parseInt(offset[0], 10)}px`;
    dm.style.top = `${event.clientY + parseInt(offset[1], 10)}px`;
    event.preventDefault();
    return false;
  }

  const dm = d3.select(".contour-plot").node();
  dm.addEventListener("dragstart", drag_start, false);
  document.body.addEventListener("dragover", drag_over, false);
  document.body.addEventListener("drop", drop, false);

  // setInterval(function() {
  //   updateContour();
  // }, 80);
  //
  // function updateContour() {
  //   var position = d3.select('a-camera')
  //       .attr('position');
  //
  //   var x = global.camera_to_contour_x_scale(global.world_position.x + position.x);
  //   var z = global.camera_to_contour_z_scale(global.world_position.z + position.z);
  //
  //
  //   var facing = d3.select('a-camera')
  //     .attr('rotation');
  //
  //   d3.selectAll('.arrow')
  //     .attr('transform', function() {
  //       return 'translate(' + x + ' ' + z + ')';
  //     });
  // }

  d3.select(".camera-button").on("click", () => {
    d3.select('.loading').classed('hide', false);

    document.querySelector('.hand-of-frog').emit('change-camera');

    const am_flying = d3.select('.camera-button').classed('fa-plane');

    if (am_flying) {
      d3
        .select('.camera-button')
        .classed('fa-plane', false)
        .classed('fa-car', true);

      // add spotlight when driving
      d3
        .select('a-camera')
        .append('a-entity')
        .transition()
        .delay(2000)
        .attr('class', 'spotlight')
        .attr('light', 'type: point; intensity: 6; distance: 150; decay: 3')
        .attr('position', '0 0 1')
        .attr('color', 'white');
    } else {
      d3
        .select('.camera-button')
        .classed('fa-plane', true)
        .classed('fa-car', false);

      // remove spotlight when flying
      d3.select('a-camera .spotlight').remove();
    }

    setTimeout(() => {
      d3.select(".loading").classed("hide", true);
    }, 2000);
  });

  // disable animation when w, a, s, d are pressed
  d3.select("body").on("keydown", () => {
    if (!global.autopilot) {
      return;
    }

    const keys = [87, 65, 68, 83];
    if (keys.indexOf(d3.event.keyCode) != -1) {
      d3.select('.autopilot').remove();
      global.autopilot = false;
    }
  });
})();
