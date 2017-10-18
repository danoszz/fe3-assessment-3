# Assesesemesteresento 2

This packed bubble chart is constructed from .xlsx [data][cbs-data] storing the origins of defaulters (people who won't pay their bills) of the 'Health Insurance Law - _Zorgverzekeringswet_' of the total Dutch population on 31 December 2016\. It is based on this [`bl.ock`] by [**@mbostock**][block-author] (GPL-3.0 for the course [FE3](course-url).

**_Patriotic warning_** The [demo](https://danoszz.github.io/fe3-assessment-2/) visualization is in Dutch 🇳🇱

[![][cover]][usage-link]

## Data

In this section I'll explain my view on the used data and it's flaws and perfections. The chosen data is supplied by the [CBS] (Data of Statistics Netherlands) and the particular dataset can be found [here][cbs-data].

### Assessment requirements

First let's take a look to the requirements given for this [assessment][assessment-2] to start our search properly.

- [x] You may use the [recommended](https://github.com/cmda-fe3/course-17-18/blob/master/assessment-1/readme.md#other-data) data
- [x] You must provide a link on how to download the data.
- [x] You may not use data given in previous assignments or assessments.
- [x] You may not use data provided in d3 examples. You may not use random data.
- [ ] You must clean data with code and provide that code with your assessment.

### (Re)search for data

Personally I'd like to work with data that is:

1. Valuable for further learning 💁‍
2. Relatable in a way
3. Fun and makes you laugh

Since the upper requirements frame down my search-funnel I start with something that is a good **learning point**. Some economics and money-wise leasons wouldn't harm nobody. So the subject is now 'Economics'.

> My spendings the past month have been outrages due to my Erasmus in Denmark. Although studying in Denmark is relatively cheap, [alcohol](https://www.numbeo.com/cost-of-living/country_result.jsp?country=Denmark) isn't. I'll take notes in the leasons learned. 💸

In my endless scroll in datasets about Dutch economics at [CBS] I bumped on a file that is called `Wanbetalers-Zorgverzekering-2016-naar-achtergrondkenmerken-deel-1.xlsx`. It roughly translates to something like `Defaulters-Healthinsurance-2016-characteristics-part-1.xlsx`.

Jackpot! Maybe I can find the stereotype defaulter with a nice graph? Who knows. 💥

> A _defaulter_ is someone who doesn't pay their bills on time. When I moved to Spain in my first year of study I forgot to cancel my government funded travel subscription and got fined for not canceling it on time. Somehow I can relate with losing money because you are late.

So the dataset is **relatable** and **fun** as well. Now comes the hard part: removing all the clutter, converting it to a usable data file and create something that is worthy for this assessment.

### What tells the data?

The downloaded [dataset][cbs-data] gives a lot of information. I try to break it down in a list to create a better understanding for further idea generation.

> The dataset is in Dutch and therefore are the coming implications and translations second to their original [origin][cbs-data] and should always be questioned.

The [dataset][cbs-data] contains:

1. The amount of defaulters of the 'Health Insurance Law - _Zorgverzekeringswet_' of the total Dutch population on 31 December 2016
2. With the characteristics of:

  - Age and sex _- leeftijd en geslacht_
  - Origin _- herkomst_
  - Care benefit _- zorgtoeslag_
  - Municipality _- gemeente_
  - State _- Provincie_

3. And regarding their icome:

  - Personal income before taxes _- Bruto persoonlijk inkomen_
  - Total spendable house income _- Besteedbaar huisinkomen_
  - Standardised spendable house income _- Gestandaardiseerd besteedbaar huishoudensinkomen_

A more in depth explanation of the points covering income will be given if the particular data is used in the final graph.

### Flaws and perfections

**_Flaws_**

- The file is in a multiple tabbed .xlsx file.
- The data is only for 2016, so a real pattern can't be found. But hey; that's fine.

**_Perfections_**

- Decent formatted file for an .xlsx
- Recent data, maybe new findings that can crash stereotypes
- Can go wild with D3.js layouts and make relations

### From data to graph

One of the [requirements](#requirements) is that you clean the data with code. The [D3 API](https://github.com/d3/d3/blob/master/API.md#requests-d3-request) describes that an .xlsx can't be imported so the original should be converted. The method to import an file in these formats with D3.js is a [`d3.request`](https://github.com/d3/d3-request). So I need to transform the _raw_ data to a workable CSV, JSON, TXT or XML.

1. Load the [original file][cbs-data] in to [Google Sheets](https://docs.google.com/spreadsheets).
2. Download the _current sheet_ as .CSV, repeat this for each tab (5x).
3. Import the .CSV files and find some logic in all the clutter.
4. Decide that the format is going to be JSON since a lot of the data is with sub-categories
5. Pick **one** .CSV file and clean it manually. This file will be the **example file** how you want to clean it with code.

![][gif-process] _GIF: The process from one .XLXS to multiple .CSV files._

#### Example file

This file will be used in the first steps of the visualization to have a clean file to start coding. After I have the visualization working, I will clean the file with code instead of manually.

**_How it first looked_**

```
Tabel 1.2,,,,,,,,,,
,,,,,,,,,,
"Wanbetalers naar herkomst en leeftijd, 31 december 2016",,,,,,,,,,
,Wanbetalers,,,,,Ten opzichte van de bevolking,,,,
,Totaal,18 tot 35 jaar,35 tot 50 jaar,50 tot 65 jaar,65 jaar en ouder,Totaal,18 tot 35 jaar,35 tot 50 jaar,50 tot 65 jaar,65 jaar en ouder
,,,,,,,,,,
,aantal,aantal,aantal,aantal,aantal,%,%,%,%,%
,,,,,,,,,,
Wanbetalers met bestuursrechtelijke premie,"249,930","99,350","86,420","53,050","11,120",1.8,2.8,2.6,1.5,0.4
w.v. ,,,,,,,,,,
   Nederlandse achtergrond,"130,230","42,120","46,840","33,850","7,420",1.2,1.7,1.9,1.2,0.3
   Migratieachtergrond,"119,700","57,230","39,570","19,200","3,700",4.0,5.4,4.6,3.0,0.9
   w.v. ,,,,,,,,,,
     Marokkaans,"16,020","9,910","4,760","1,130",220,6.1,9.3,5.3,2.5,0.9
     Turks,"14,460","6,550","5,770","1,920",230,4.8,5.5,5.5,3.5,1.0
     Surinaams,"22,130","10,080","7,250","4,080",720,7.8,10.6,8.8,5.4,2.3
     Antilliaans,"14,250","7,670","4,040","2,170",360,12.5,15,13,9.7,4.0
     Overig niet-westerse achtergrond,"20,900","11,360","5,980","3,180",380,3.4,4,3.2,2.8,1.2
     Westerse achtergrond,"31,940","11,660","11,770","6,730","1,790",2.2,2.8,3.2,2.0,0.6
,,,,,,,,,,
Bron: CBS,,,,,,,,,,
```

**_How it looks after manual cleaning_**

- Remove double quotes
- Remove unnecessary headers
- Remove empty rows
- Remove commas in numbers
- Remove . numbers greater than two decimals
- Give numbers for age range a more specific name

```

Herkomst,Totaal_aantal,aantal_18_35,aantal_35_50,aantal_50_60,aantal_60plus,Totaal_percentage,percentage_18-35,percentage_35-50,percentage_50-60,percentage_60plus
Alle wanbetalers,249930,99350,86420,53050,11120,1.8,2.8,2.6,1.5,0.4
Nederlandse achtergrond,130230,42120,46840,3.850,7420,1.2,1.7,1.9,1.2,0.3
Migratieachtergrond,119700,57230,39570,19200,3700,4.0,5.4,4.6,3.0,0.9
Marokkaans,1.020,9910,4760,1130,220,6.1,9.3,5.3,2.5,0.9
Turks,14460,6550,5770,1920,230,4.8,5.5,5.5,3.5,1.0
Surinaams,22130,10080,7250,4080,720,7.8,10.6,8.8,5.4,2.3
Antilliaans,14250,7670,4040,2170,360,12.5,15,13,9.7,4.0
Overig niet-westerse achtergrond,20900,11360,5980,3180,380,3.4,4,3.2,2.8,1.2
Westerse achtergrond,31940,11660,11770,6730,1790,2.2,2.8,3.2,2.0,0.6
```

**_After the conversion to JSON with [convertCVS](http://www.convertcsv.com/csv-to-json.htm)_**

- Nested and keyed groups

```
{
   "Alle wanbetalers": {
      "Totaal_aantal": 249930,
      "aantal_18_35": 99350,
      "aantal_35_50": 86420,
      "aantal_50_60": 53050,
      "aantal_60plus": 11120,
      "Totaal_percentage": 1.8,
      "percentage_18-35": 2.8,
      "percentage_35-50": 2.6,
      "percentage_50-60": 1.5,
      "percentage_60plus": 0.4
   },
   "Nederlandse achtergrond": {
      "Totaal_aantal": 130230,
      "aantal_18_35": 42120,
      "aantal_35_50": 46840,
      "aantal_50_60": 3.85,
      "aantal_60plus": 7420,
      "Totaal_percentage": 1.2,
      "percentage_18-35": 1.7,
      "percentage_35-50": 1.9,
      "percentage_50-60": 1.2,
      "percentage_60plus": 0.3
   },
   "Migratieachtergrond": {
      "Totaal_aantal": 119700,
      "aantal_18_35": 57230,
      "aantal_35_50": 39570,
      "aantal_50_60": 19200,
      "aantal_60plus": 3700,
      "Totaal_percentage": 4,
      "percentage_18-35": 5.4,
      "percentage_35-50": 4.6,
      "percentage_50-60": 3,
      "percentage_60plus": 0.9
   },
   "Marokkaans": {
      "Totaal_aantal": 1.02,
      "aantal_18_35": 9910,
      "aantal_35_50": 4760,
      "aantal_50_60": 1130,
      "aantal_60plus": 220,
      "Totaal_percentage": 6.1,
      "percentage_18-35": 9.3,
      "percentage_35-50": 5.3,
      "percentage_50-60": 2.5,
      "percentage_60plus": 0.9
   },
   "Turks": {
      "Totaal_aantal": 14460,
      "aantal_18_35": 6550,
      "aantal_35_50": 5770,
      "aantal_50_60": 1920,
      "aantal_60plus": 230,
      "Totaal_percentage": 4.8,
      "percentage_18-35": 5.5,
      "percentage_35-50": 5.5,
      "percentage_50-60": 3.5,
      "percentage_60plus": 1
   },
   "Surinaams": {
      "Totaal_aantal": 22130,
      "aantal_18_35": 10080,
      "aantal_35_50": 7250,
      "aantal_50_60": 4080,
      "aantal_60plus": 720,
      "Totaal_percentage": 7.8,
      "percentage_18-35": 10.6,
      "percentage_35-50": 8.8,
      "percentage_50-60": 5.4,
      "percentage_60plus": 2.3
   },
   "Antilliaans": {
      "Totaal_aantal": 14250,
      "aantal_18_35": 7670,
      "aantal_35_50": 4040,
      "aantal_50_60": 2170,
      "aantal_60plus": 360,
      "Totaal_percentage": 12.5,
      "percentage_18-35": 15,
      "percentage_35-50": 13,
      "percentage_50-60": 9.7,
      "percentage_60plus": 4
   },
   "Overig niet-westerse achtergrond": {
      "Totaal_aantal": 20900,
      "aantal_18_35": 11360,
      "aantal_35_50": 5980,
      "aantal_50_60": 3180,
      "aantal_60plus": 380,
      "Totaal_percentage": 3.4,
      "percentage_18-35": 4,
      "percentage_35-50": 3.2,
      "percentage_50-60": 2.8,
      "percentage_60plus": 1.2
   },
   "Westerse achtergrond": {
      "Totaal_aantal": 31940,
      "aantal_18_35": 11660,
      "aantal_35_50": 11770,
      "aantal_50_60": 6730,
      "aantal_60plus": 1790,
      "Totaal_percentage": 2.2,
      "percentage_18-35": 2.8,
      "percentage_35-50": 3.2,
      "percentage_50-60": 2,
      "percentage_60plus": 0.6
   }
}
```

**_How I'd like to have it_**

- Nest groups
- Give a name and children key to each object

```
{
	"name": "Alle Wanbetalers",
	"Totaal_aantal": 249930,
	"children": [{
			"name": "Herkomst",
			"Totaal_aantal": 249930,
			"children": [{
					"name": "Nederlandse achtergrond",
					"Totaal_aantal": 130230
				},
				{
					"name": "Migratieachtergrond",
					"Totaal_aantal": 119700,
					"aantal_18_35": 57230,
					"aantal_35_50": 39570,
					"aantal_50_60": 19200,
					"aantal_60plus": 3700,
					"children": [{
							"name": "Marokkaans",
							"Totaal_aantal": 16020,
							"children": [{
								"name": "Leeftijd 18 - 35",
								"Totaal_aantal": 9910
								},
								{
									"name": "Leeftijd 35 - 50",
									"Totaal_aantal": 4760
								},
								{
									"name": "Leeftijd 50 - 60",
									"Totaal_aantal": 1130
								},
								{
									"name": "Leeftijd 50 - 60",
									"Totaal_aantal": 220
								}
							]
						},
						{
							"name": "Turks",
							"Totaal_aantal": 14460,
							"children": [{
								"name": "Leeftijd 18 - 35",
								"Totaal_aantal": 6550
								},
								{
									"name": "Leeftijd 35 - 50",
									"Totaal_aantal": 5770
								},
								{
									"name": "Leeftijd 50 - 60",
									"Totaal_aantal": 1920
								},
								{
									"name": "Leeftijd 50 - 60",
									"Totaal_aantal": 230
								}
							]
						},
						{
							"name": "Surinaams",
							"Totaal_aantal": 22130,
							"children": [{
								"name": "Leeftijd 18 - 35",
								"Totaal_aantal": 10080
								},
								{
									"name": "Leeftijd 35 - 50",
									"Totaal_aantal": 7250
								},
								{
									"name": "Leeftijd 50 - 60",
									"Totaal_aantal": 4080
								},
								{
									"name": "Leeftijd 50 - 60",
									"Totaal_aantal": 720
								}
							]
						},
						{
							"name": "Antilliaans",
							"Totaal_aantal": 14250,
							"children": [{
								"name": "Leeftijd 18 - 35",
								"Totaal_aantal": 7670
								},
								{
									"name": "Leeftijd 35 - 50",
									"Totaal_aantal": 4040
								},
								{
									"name": "Leeftijd 50 - 60",
									"Totaal_aantal": 2170
								},
								{
									"name": "Leeftijd 50 - 60",
									"Totaal_aantal": 360
								}
							]
						},
						{
							"name": "Overig niet-westerse achtergrond",
							"Totaal_aantal": 20900,
							"children": [{
								"name": "Leeftijd 18 - 35",
								"Totaal_aantal": 11360
								},
								{
									"name": "Leeftijd 35 - 50",
									"Totaal_aantal": 5980
								},
								{
									"name": "Leeftijd 50 - 60",
									"Totaal_aantal": 3180
								},
								{
									"name": "Leeftijd 50 - 60",
									"Totaal_aantal": 380
								}
							]
						},
						{
							"name": "Westerse achtergrond",
							"Totaal_aantal": 31940,
							"children": [
								{
								"name": "Leeftijd 18 - 35",
								"Totaal_aantal": 11660
								},
								{
									"name": "Leeftijd 35 - 50",
									"Totaal_aantal": 11770
								},
								{
									"name": "Leeftijd 50 - 60",
									"Totaal_aantal": 6730
								},
								{
									"name": "Leeftijd 50 - 60",
									"Totaal_aantal": 1790
								}
							]
						}
					]
				}
			]

		},
		{
			"name": "Geslacht",
			"Totaal_aantal": 249930,
			"children": [{
					"name": "Leeftijd 18 - 35",
					"Totaal_aantal": 99350,
					"children": [{
							"name": "Man",
							"Totaal_aantal": 57860
						},
						{
							"name": "Vrouw",
							"Totaal_aantal": 41490
						}
					]
				},
				{
					"name": "Leeftijd 35 - 50",
					"Totaal_aantal": 86410,
					"children": [{
							"name": "Man",
							"Totaal_aantal": 54280
						},
						{
							"name": "Vrouw",
							"Totaal_aantal": 32140
						}
					]
				},
				{
					"name": "Leeftijd 50 - 60",
					"Totaal_aantal": 42540,
					"children": [{
							"name": "Man",
							"Totaal_aantal": 27010
						},
						{
							"name": "Vrouw",
							"Totaal_aantal": 15530
						}
					]
				},
				{
					"name": "Leeftijd 60 plus",
					"Totaal_aantal": 21640,
					"children": [{
							"name": "Man",
							"Totaal_aantal": 14200
						},
						{
							"name": "Vrouw",
							"Totaal_aantal": 7440
						}
					]
				}

			]
		}
	]
}

```

#### So? The requirements said: clean data with code

My Javascript skills are not that awesome that I can write vanilla Javascript to parse a CSV file, give it 10+ rules, convert it to JSON format, save it locally again and then pull it with D3: I decided to index the time needed for a solution.

|                |  Vanilla JS  |    Plugin use    | Manual cleaning | Hire a developer
| -------------- | :----------: | :--------------: | :-------------: | :--------------:
| _Time needed_  |  > 4 hours   |    > 2 hours     |   10 minutes    |    30 minutes
| _Quality_      | Probably Low | Dynamic and high | Static and high |       High
| _Student type_ |   Good boy   |      Smart       |      Lazy       |   2rich2betrue

You see where I am going? I spend +6 hours in figuring out how to clean an already converted JSON with **vanilla Javascript** file but my code [broke](http://gph.is/1NJCgdV) every single time. I learned a lot about [arrays](https://www.w3schools.com/jsref/jsref_obj_array.asp) and even dreamed about it. I decided to switch to a **plugin** called [Papaparse](http://papaparse.com/). After abusive of use _Papa_ I figured out that I didn't need to parse an CSV to JSON, store it locally and then load it again with D3\. It all seemed a bit to excessive for a data file containing not more than 100 data points.

So again I ended up with **with zero results**. At this point I decided to have a beer with my mate [Mike][block-author] to figure out life.

![][me-and-mike] _Image: Me almost giving up on Javascript, while Mike supports me._

**So let's start writing D3 instead of whining about file structures 💔**

--------------------------------------------------------------------------------

## Workflow

Already tired from reading? Me too. I'd like to start coding and be a bit more compact in the documentation. Time is ticking as well to make it before the [deadline][assessment-2].

> Don't worry I'll still cover the whole process and will take a deep dive if needed. 🤓

1. Pick an interesting and workable dataset. ✔️
2. Understand the data. ✔️
3. Clean the data manually for prototype reasons. ✔️
4. Find an logical [example][block] to work with. ✔️
5. Make it work locally.

  - Convert D3 V3 to V4 with the help of the [API](https://github.com/d3/d3-scale/blob/master/README.md)
  - [Refact](https://en.wikipedia.org/wiki/Code_refactoring) the original code to your personal coding style, throw in some appealing styling and make usable comments. 🔨

6. At this point I am 7 hours later, just for finding a logical way to import the data with code

### Concept

The chosen dataset contains nested groups of values. So I started to search for a logical way to represent the data. I ended up with three types of charts:

1. [Cluster force layout IV](https://bl.ocks.org/mbostock/7882658) - Nice interactivity, my data doesn't contain relations.
2. [Circle packing](https://bl.ocks.org/mbostock/4063530) - Looks fine and makes sense
3. [Tree layout](https://mbostock.github.io/d3/talk/20111018/tree.html) - Reprensation makes sense but it feels like I am making a Powerpoint for a corporate business meeting.

Clearly I liked the [Circle packing](https://bl.ocks.org/mbostock/4063530) the most. My search for usable and interactive examples started. I found some [here](https://mbostock.github.io/d3/talk/20111018/pack.html), [here](https://bl.ocks.org/mbostock/4063530) and at [Nadieh Bremer](https://www.visualcinnamon.com/occupations).

### Coding problems

My data contains four steps of depth:

```
1    | Total population
2    |- Dutch part
2    |- Migration background
3    |-- Country
4    |--- Age 18-35
4    |--- Age 35-50
4    |--- Age 50-60
4    |--- Age 60 +
```

In the [example][block] I used as base the data file contains multiple leveled depths. When I loaded my data in it -off course- broke. This was because of this line:

```
.attr('class', d => (
    d.parent ? (d.children ? "node" : "node node--leaf") : "node node--root")
)
```

**Problem**: "The data that is shown has the key-name _children_ in the JSON file." **Solution**: Give a multiple value to d.children so not only _children_ matches, but everything that is nested. That makes the code dynamic. OR nest everything in the JSON with this _children_ structure. It is static, but it works flawlessly.


## The final product

I think I have written > 1000 lines of Javascript but in the final product only 10 lines are mine. Almost everything is still the [`bl.ock`][block] from [Mike][block-author]. But ***it finally works*** 🍾

### To do

- [x] Create preview image
- [x] Add comments in code
- [ ] Ask help for converting data to complicated JSON files, so clean data with code
- [ ] Responsive styling graph


## Local usage

To use this visualization in a local environment you can take the following steps in your favorite terminal like application. Feel free to adjust the code!

```
cd yourdirectory

git clone https://danoszz.github.io/fe3-assessment-2/

cd danoszz

python -m SimpleHTTPServer 8000

```

## Features

**_Basic features_**

- [d3.select](https://github.com/d3/d3-selection/blob/master/README.md#select) - select an element from the document.
- [d3.selectAll](https://github.com/d3/d3-selection/blob/master/README.md#selectAll) - select multiple elements from the document.
* [d3.range](https://github.com/d3/d3-array/blob/master/README.md#range) - generate a range of numeric values.
* [d3.scaleLinear](https://github.com/d3/d3-scale/blob/master/README.md#scaleLinear) - create a quantitative linear scale.
* [d3.interpolate](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolate) - interpolate arbitrary values.
* [*node*.sum](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_sum) - evaluate and aggregate quantitative values.
* [*node*.sort](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_sort) - sort all descendant siblings.
* [*selection*.attr](https://github.com/d3/d3-selection/blob/master/README.md#selection_attr) - get or set an attribute.
* [*selection*.classed](https://github.com/d3/d3-selection/blob/master/README.md#selection_classed) - get, add or remove CSS classes.
* [*selection*.style](https://github.com/d3/d3-selection/blob/master/README.md#selection_style) - get or set a style property.
* [*selection*.text](https://github.com/d3/d3-selection/blob/master/README.md#selection_text) - get or set the text content.
* [*selection*.html](https://github.com/d3/d3-selection/blob/master/README.md#selection_html) - get or set the inner HTML.
* [*selection*.append](https://github.com/d3/d3-selection/blob/master/README.md#selection_append) - create, append and select new elements.
* [*selection*.filter](https://github.com/d3/d3-selection/blob/master/README.md#selection_filter) - filter elements based on data.



**_Bit more special features_**

* [d3.json](https://github.com/d3/d3-request/blob/master/README.md#json) - get a JSON file.
* [d3.pack](https://github.com/d3/d3-hierarchy/blob/master/README.md#pack) - create a new circle-packing layout.
* [d3.interpolateHcl](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateHcl) - interpolate HCL colors.
* [*pack*.size](https://github.com/d3/d3-hierarchy/blob/master/README.md#pack_size) - set the layout size.
* [*pack*.padding](https://github.com/d3/d3-hierarchy/blob/master/README.md#pack_padding) - set the padding.
* [d3.hierarchy](https://github.com/d3/d3-hierarchy/blob/master/README.md#hierarchy) - constructs a root node from hierarchical data.
* [*transition*.tween](https://github.com/d3/d3-transition/blob/master/README.md#transition_tween) - run custom code during the transition.
* [*selection*.on](https://github.com/d3/d3-selection/blob/master/README.md#selection_on) - add or remove event listeners.


### For humans

> A fellow [student](https://github.com/vriesm060/fe3-assessment-1#features-humans-can-understand) implemented this section in his documentation to translate all the D3.js slang to a more understandable (developer) language. 👨‍💻

- Load plain data with the D3.js libary and visualize it in a chart
- Created a visual impression that includes:
  - nested groups of people
  - size depending on the data
  - relative sizes

- Add interactivity when the user clicks on the chart:
  - zoom in to new group
  - explore new data


## License

GPL-3.0 © Mike Bostock and extended by Daan van der Zwaag MIT ©

[assessment-2]: https://github.com/cmda-fe3/course-17-18/tree/master/assessment-2
[block]: https://bl.ocks.org/mbostock/7607535
[block-author]: https://github.com/mbostock
[cbs]: https://www.cbs.nl
[cbs-data]: https://www.cbs.nl/nl-nl/maatwerk/2017/38/kenmerken-wanbetalers-zorgverzekering-2016--1--
[course-url]: https://cmda-fe3.github.io/course-17-18
[cover]: assets/images/preview.png
[gif-process]: assets/images/data-process.gif
[me-and-mike]: assets/images/me-and-mike.jpg
[previous-assignment]: https://github.com/cmda-fe3/course-17-18/tree/master/site/class-3-transition/danoszz
[usage-link]: #usage
