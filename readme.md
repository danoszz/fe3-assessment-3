# Street lights in D3.js and webVR 💡

This packed bubble chart is constructed from a [dataset][overheid-data] storing the location of public lighting like street laterns in the area of Bloemendaal, the Netherlands. It is based on this [awesome experiment][example-repo] by [**@almossawi**][example-repo_author] (No license included) for the course [FE3](fe3).

**_Patriotic warning_** The [demo](https://danoszz.github.io/fe3-assessment-2/) visualization is in Dutch 🇳🇱

## TL;DR

Since time is precious and endless stories can be forgotten: I'll sum up the project real quick:

* Datavisualization of street laterns made in [D3.js][rs_aframe] and webVR framework [A-frame][rs_aframe]
* The whole dataset crashed my laptop, only worked with 15%.
* Main inspiration was [this][example-repo] awesome interactive creation.
* The code is customized for this dataset. Styling as well.
* Updating D3 V3 and A-Frame 0.2.0 to the newest version was a pain in the ass.
	* Only D3 is updated, A-Frame isn't.
* Multiple D3 visualization: the map and point graph (street laterns)

> Fun fact: during the last 32 hours the Internet company decided to kill our internet and let me work from a iPhone hotspot. Including some nice Atom updates, dataset downloads.

![][cover]

## Workflow

First I will give a quick illustration of my workflow throughout the process of coding this assignment. Afterwards I will go in depth on the points where I feel is needed.

> The in depth [storytelling](https://github.com/danoszz/fe3-assessment-2/blob/master/readme.md) is not always the case in this documentation. And saves both me and the reader some time

1. Find [Dataset](https://data.overheid.nl/data/dataset/ovl-bloemendaal)
2. Refind Dataset
3. Research VR + D3.js
4. Convert CSV to JSON
5. Load data in to [example](https://github.com/almossawi/aframe-d3-visualization)
6. Adjust code to make it work and re-write if necessary
7. Create own environment
7. Convert D3 V3 to V4
8. Update Aframe 0.4 to latest release and bug testing
   * Find out whole thing breaks, need to debug
9. Apply styling


Cost me 4 hours to update Aframe 0.2.0 to 0.7.0. Needed to do it because of the FPS upgrade. This https://github.com/aframevr/aframe/pull/1323 costed me 4 hours, strings are not allowed anymore
## Index

1. TL;DR
2. Dataset
3. Concept
4. Visualization
	1. Concept
	2. Resources
	3. Own code
5. Reflection
	1. Todo
6. Cookie

## 1. TL;DR

## 2. Dataset

## 3. Visualization

### Concept
### Resources

* [D3.js](#)
* [Aframe](#)
* [Textures.js](http://riccardoscalco.github.io/textures/) - Textures.js is a Javascript library for creating SVG patterns. Made on top of d3.js, it is designed for data visualization.
* [Concrec.js](https://github.com/jasondavies/conrec.js) - JavaScript implementation of the CONREC contouring algorithm, which operates on a grid of z-values.


### Own code

## 5. Reflection

### Todo

* [ ] Create an environment including Gulp
* [ ] Update Aframe to V0.7.0 without any [bugs](https://github.com/aframevr/aframe/pull/1323).
* [ ] Change direction of first view: south -> north.

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
