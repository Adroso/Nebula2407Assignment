/**
 * Created by Philip Bowrey on 22/05/2016.
 */
/*
Road fatalities data from Australian Department of Infrastrcuture and Regional Development
    https://bitre.gov.au/statistics/safety/fatal_road_crash_database.aspx

Population data from Australian Bureau of Statistics
    http://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/3101.0Sep%202015?OpenDocument
 */
var yearArray = [1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015];
var totalDeaths = [2017,1970,1767,1755,1764,1817,1737,1715,1621,1583,1627,1598,1603,1437,1491,1352,1277,1300,1187,1150,1205];
var stateArray = ["QLD", "NSW", "ACT", "VIC", "TAS", "SA", "WA", "NT"];
var popData = [
    {"NSW":  6105560, "VIC": 4497660, "QLD": 3237380, "SA": 1465340, "WA": 1736066, "TAS": 474515, "NT": 179602, "ACT": 305838, "AUS": 18004882},
    {"NSW":  6176461, "VIC": 4534984, "QLD": 3303192, "SA": 1469079, "WA": 1768206, "TAS": 475605, "NT": 184516, "ACT": 309629, "AUS": 18224767},
    {"NSW":  6246267, "VIC": 4569297, "QLD": 3355417, "SA": 1475658, "WA": 1798341, "TAS": 474908, "NT": 189755, "ACT": 310533, "AUS": 18423037},
    {"NSW":  6305799, "VIC": 4606970, "QLD": 3404484, "SA": 1483270, "WA": 1826440, "TAS": 473430, "NT": 192905, "ACT": 311532, "AUS": 18607584},
    {"NSW":  6375103, "VIC": 4652462, "QLD": 3453936, "SA": 1490934, "WA": 1853936, "TAS": 473030, "NT": 196012, "ACT": 314171, "AUS": 18812264},
    {"NSW":  6446558, "VIC": 4704065, "QLD": 3509458, "SA": 1497503, "WA": 1879093, "TAS": 473123, "NT": 199149, "ACT": 317235, "AUS": 19028802},
    {"NSW":  6530349, "VIC": 4763615, "QLD": 3571469, "SA": 1503461, "WA": 1906274, "TAS": 473668, "NT": 201743, "ACT": 321538, "AUS": 19274701},
    {"NSW":  6580807, "VIC": 4817774, "QLD": 3653123, "SA": 1511567, "WA": 1928512, "TAS": 474152, "NT": 202251, "ACT": 324627, "AUS": 19495210},
    {"NSW":  6620715, "VIC": 4873809, "QLD": 3743121, "SA": 1520399, "WA": 1952741, "TAS": 478534, "NT": 201725, "ACT": 327357, "AUS": 19720737},
    {"NSW":  6650735, "VIC": 4927149, "QLD": 3829970, "SA": 1528189, "WA": 1979542, "TAS": 483178, "NT": 202663, "ACT": 328940, "AUS": 19932722},
    {"NSW":  6693206, "VIC": 4989246, "QLD": 3918494, "SA": 1538804, "WA": 2011207, "TAS": 486202, "NT": 205905, "ACT": 331399, "AUS": 20176844},
    {"NSW":  6742690, "VIC": 5061266, "QLD": 4007992, "SA": 1552529, "WA": 2050581, "TAS": 489302, "NT": 209057, "ACT": 335170, "AUS": 20450966},
    {"NSW":  6834156, "VIC": 5153522, "QLD": 4111018, "SA": 1570619, "WA": 2106139, "TAS": 493262, "NT": 213748, "ACT": 342644, "AUS": 20827622},
    {"NSW":  6943461, "VIC": 5256375, "QLD": 4219505, "SA": 1588665, "WA": 2171700, "TAS": 498568, "NT": 219874, "ACT": 348368, "AUS": 21249199},
    {"NSW":  7053755, "VIC": 5371934, "QLD": 4328771, "SA": 1608902, "WA": 2240250, "TAS": 504353, "NT": 226027, "ACT": 354785, "AUS": 21691653},
    {"NSW":  7144292, "VIC": 5461101, "QLD": 4404744, "SA": 1627322, "WA": 2290845, "TAS": 508847, "NT": 229778, "ACT": 361766, "AUS": 22031750},
    {"NSW":  7218529, "VIC": 5537817, "QLD": 4476778, "SA": 1639614, "WA": 2353409, "TAS": 511483, "NT": 231292, "ACT": 367985, "AUS": 22340024},
    {"NSW":  7356850, "VIC": 5680502, "QLD": 4608886, "SA": 1662197, "WA": 2479506, "TAS": 512475, "NT": 239294, "ACT": 377927, "AUS": 22920798},
    {"NSW":  7459562, "VIC": 5784777, "QLD": 4685080, "SA": 1676671, "WA": 2536368, "TAS": 513948, "NT": 242840, "ACT": 383310, "AUS": 23285739},
    {"NSW":  7563181, "VIC": 5885050, "QLD": 4749090, "SA": 1691657, "WA": 2572919, "TAS": 515275, "NT": 243021, "ACT": 387497, "AUS": 23610906},
    {"NSW":  7644232, "VIC": 5966749, "QLD": 4792906, "SA": 1701128, "WA": 2598220, "TAS": 517183, "NT": 244484, "ACT": 391988, "AUS": 23860133}
];
var deathsByStates = [
    [456,620,15,418,57,181,209,61],
    [385,581,23,417,64,181,247,72],
    [360,576,17,377,32,148,197,60],
    [279,556,22,390,48,168,223,69],
    [314,577,19,383,53,151,218,49],
    [317,603,18,407,43,166,212,51],
    [324,524,16,444,61,153,165,50],
    [322,561,10,397,37,154,179,55],
    [310,539,11,330,41,157,180,53],
    [311,510,9,343,58,139,178,35],
    [330,508,26,346,51,148,163,55],
    [335,496,13,337,55,117,200,45],
    [360,435,14,332,45,124,235,58],
    [328,374,14,303,39,99,205,75],
    [331,454,12,290,63,119,191,31],
    [249,405,19,288,30,118,193,50],
    [269,364,6,287,24,103,179,45],
    [280,369,12,282,31,94,183,49],
    [271,333,7,243,36,98,162,37],
    [223,307,10,248,33,107,183,39],
    [243,350,15,252,34,102,160,49]
];

"use strict";
window.onload = (function() {

    var line = new RGraph.Line({
        id: 'myCanvas',
        data: totalDeaths,
        options: {
            tooltips: function (idx)
            {
                return '<canvas id="tooltipCanvas" width="500" height="250"></canvas>';
            },
            hmargin: 0,
            title: "Road Fatalities in Australia",
            titleYaxis: "Deaths",
            titleYaxisPos: 0.3,
            titleXaxis: "Years",
            titleXaxisPos: 0.3,
            tickmarks: 'filledcircle',
            ticksize: 3,
            colors: ['blue'],
            labels: yearArray,
            tooltipsEvent: "onclick",
            gutterTop: 60,
            gutterBottom: 60,
            gutterLeft: 90
        }
    }).trace2({frames: 60});

    line.ontooltip = CreateTooltipGraph;
});

function CreateTooltipGraph(obj)
{
    var outputCanvas = document.getElementById('secondCanvas');

    // Clear canvas
    RGraph.reset(outputCanvas);


    var deathByPop = [];
    
    var idx  = RGraph.Registry.get('chart.tooltip').__index__;
    var data = deathsByStates[idx];

    for(var i = 0; i < stateArray.length; i++){
        deathByPop[i] = (deathsByStates[idx][i] / popData[idx][stateArray[i]]) * 100000;
    }

    new RGraph.Bar({
        id: 'tooltipCanvas',
        data: data,
        options: {
            labels: stateArray,
            labelsAbove: true,
            title: yearArray[idx] + " Total Deaths: " + totalDeaths[idx],
            ymin: 0,
            ymax: 800,
            hmargin: 5,
            tickmarks: 'endcircle',
            backgroundGridAutofit: true,
            gutterTop: 40,
            gutterBottom: 30,
            gutterLeft: 40
        }
    }).draw();

    new RGraph.Bar({
        id: 'secondCanvas',
        data: deathByPop,
        options: {
            labels: stateArray,
            labelsAbove: true,
            title: yearArray[idx] + ": Deaths per 100,000 Population",
            ymin: 0,
            ymax: 40,
            hmargin: 5,
            tickmarks: 'endcircle',
            backgroundGridAutofit: true,
            gutterTop: 40,
            gutterBottom: 30,
            gutterLeft: 40
        }
    }).draw();
}

function showCanvas() {

    var outputCanvas = document.getElementById('secondCanvas');
        outputCanvas.removeAttribute("hidden");
}

