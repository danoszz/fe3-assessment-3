# Street lights in D3.js and webVR 💡

This 3D scatterplot is constructed from a [dataset][overheid-data] storing the location of public lighting like street laterns in the area of Bloemendaal, the Netherlands. It is based on this [awesome experiment][example-repo] by [**@almossawi**][example-repo_author] (No license included) for the course [FE3](fe3).

**_Patriotic warning_** The [demo](https://danoszz.github.io/fe3-assessment-3/) visualization is in Dutch 🇳🇱

## TL;DR

Since time is precious and endless stories can be forgotten: I'll sum up the project real quick:

* Datavisualization of street laterns made in [D3.js][rs_aframe] and webVR framework [A-frame][rs_aframe]
* The whole dataset crashed my laptop, only worked with 15%.
* Main inspiration was [this][example-repo] awesome interactive creation.
* The code is customized for this dataset. Styling as well.
* Updating D3 V3 and A-Frame 0.2.0 to the newest version was a pain in the ass.
	* Only D3 is updated, A-Frame isn't yet.
* Multiple D3 visualization: the map and point graph (street laterns)

> Fun fact: during the last 32 hours the Internet company decided to kill our internet and let me work from an iPhone hotspot. Thanks Ziggo.

![][cover]


## Workflow

First I will give a quick illustration of my workflow throughout the process of coding this assignment. Afterwards I will go in depth on the points where I feel is needed.

> The in depth [storytelling](https://github.com/danoszz/fe3-assessment-2/blob/master/readme.md) is not always the case in this documentation. And saves both me and the reader some time

1. Find interesting [Dataset](https://data.overheid.nl/data/dataset/ovl-bloemendaal)
2. Sketch ideas on plain ol' paper
3. Research VR + D3.js
4. Convert CSV to JSON
5. Load data in to [example](https://github.com/almossawi/aframe-d3-visualization)
6. Adjust code to make it work and re-write if necessary
7. Create own environment
7. Convert D3 V3 to V4
8. Update Aframe 0.4 to latest release and bug testing
   * Find out whole thing breaks, need to debug
9. Apply styling an UI changes

### Interesting code stuff

The [example][example-repo] had all it's code in D3 V3 and A-Frame 0.2.0, so it needed a update. From D3 V3 -> V4 was easily done, but updating A-Frame was more time consuming. It needed to be done because the size of the dataset in combination with the FPS. At the end this [pull request](https://github.com/aframevr/aframe/pull/1323) in the A-Frame library and the following code bit caused the bugs. Still don't know how to fix it.

```
	.attr("position", (d, i) => {
		const x = x_scale(d.longitude);
		const z = z_scale(d.latitude);
		const y = y_scale(d.Hoogte) / 2;
		return `${x} ${y} ${z}`;
	})

// resulted in NaN for position attribute in de debugger in >0.2.0
```

Since it takes a while for the whole scene to render I decided to put a loading screen before the user can interact with the visualization. The loading screen is called back when the data is loaded completely

```
d3.select(".loading").classed("hide", false); // Set 'fake' loading screen for

// data loading on each object

.call(function(d){
	d3.select(".loading").classed("hide", true); // remove loading screen when data is loaded
});

```

### Resources

* [D3.js][rs_d3] - D3.js is a JavaScript library for manipulating documents based on data.

* [A-frame][rs_aframe] - A web framework for building virtual reality experiences

* [Textures.js](http://riccardoscalco.github.io/textures/) - Textures.js is a Javascript library for creating SVG patterns. Made on top of d3.js, it is designed for data visualization.

### Todo

* [ ] Add reflection and more in depth documentation in readme
* [ ] Add used D3 & A-frame features
* [ ] Make a workable mobile and VR set UI
* [ ] Create an environment including Gulp
* [ ] Update Aframe to V0.7.0 without any [bugs](https://github.com/aframevr/aframe/pull/1323).
* [ ] Change direction of first view: south -> north.
* [ ] Add preview gif instead of static picture
* [ ] Make assets local instead of from CDN

[overheid-data]: https://data.overheid.nl/data/dataset/ovl-bloemendaal

[example-repo]: https://github.com/almossawi/aframe-d3-visualization
[example-repo_author]: https://github.com/almossawi/
[course-url]: https://cmda-fe3.github.io/course-17-18
[cover]: assets/images/preview.png
[rs_aframe]: https://aframe.io/
[rs_d3]: https://d3js.org/


[banner]: https://cdn.rawgit.com/cmda-fe3/logo/a4b0614/banner-assessment-3.svg

[a2]: https://github.com/cmda-fe3/course-17-18/tree/master/assessment-3#description

[fe3]: https://github.com/cmda-fe3

[cmda]: https://github.com/cmda

[pages]: https://pages.github.com
