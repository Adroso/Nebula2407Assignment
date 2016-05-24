"use strict";
var outputCanvas = document.getElementById('cvs1');

//This data was found under "Licence Holders" in the "Licence Types" table
//https://www.sa.gov.au/topics/transport-travel-and-motoring/transport-facts-and-figures/registration-and-licensing
var LicenceHeldPercent = ['91.04%','2.59%','1.70%','0.36%','4.30%'] 
var LicenceHeld = [1110760,31656,20785,4438,52507] //Total = 1220146

//This data came from the excel sheet linked under "Licence Types" information
//https://www.sa.gov.au/topics/transport-travel-and-motoring/transport-facts-and-figures/registration-and-licensing
var dataMale = [577824,581353,584451,578808,595958,610663]
var dataFemale = [536139,539593,543959,543107,558190,572527]

//This sets the values that will be displayed on mouseover of either data set
var tooltipsType = LicenceHeldPercent
var tooltipsGender = ['577824','581353','584451','578808','595958','610663','536139','539593','543959','543107','558190','572527']


window.onload = Licence()


function Licence() {
        RGraph.ObjectRegistry.clear('cvs1');        
        var pie = new RGraph.Pie({
            id: 'cvs1',
            data: LicenceHeld,
            options: {
                colors: ['#00f','red','#0a3','#aaa', '#ff0'],
                strokestyle: 'white',
                linewidth: 1,
                shadowBlur: 10,
                shadowOffsetx: 0,
                shadowOffsety: 0,
                shadowColor: '#666',
                textColor: '#999',
                textAccessible: true,
                title: 'Licenced Drivers On Our Roads',
                titleY: 30,
                labels: [1110760,31656,,,52507],
                labelsSticks: [true,true,,,true],
                labelsSticksLength: 25,
                key: ['Full','Provisional 1','Provisional 2','Probationary','Learner'],
                keyColors: ['#00f','red','#0a3','#aaa', '#ff0'],
                keyInteractive: true,
                keyRounded: false,
                keyPosition: 'gutter',
                keyPositionY: 450,
                keyInteractive: true,
                radius: 125,
                tooltips: tooltipsType,
                tooltipsEvent: 'onmousemove'
            }
        })
        
        var explode = 20;

        function myExplode (obj)
        {
            window.__pie__ = pie;

            for (var i=0; i<obj.data.length; ++i) {
                setTimeout('window.__pie__.explodeSegment('+i+',10)', i * 50);
            }
        }

        if (RGraph.ISOLD) {
            pie.draw();
        
        } else if (navigator.userAgent.toLowerCase().indexOf('firefox') >= 0) {
            pie.roundRobin();
        
        } else {
            /**
            * The RoundRobin callback initiates the exploding
            */
            pie.roundRobin(null, myExplode);
        }
        outputCanvas.onmousemove = function (e){
        var obj = e.target.__object__;
        document.getElementById("y").value = "";
        }
    };


function Genders() {
        RGraph.ObjectRegistry.clear('cvs1');
        var line = new RGraph.Line({
            id: 'cvs1',
            data: [dataMale, dataFemale],
            options: {
                backgroundGridVlines: false,
                hmargin: 2,
                tickmarks: 'filledcircle',
                gutterLeft: 100,
                gutterBottom: 50,
                colors: ['#3af','#e56'],
                noxaxis: true,
                noyaxis: true,
                backgroundGridAutofitNumvlines: 5,
                ymin: 500000,
                ymax: 650000,
                textSize: 10,
                linewidth: 5,
                hmargin: 15,
                title: 'Gender Comparison Of Licence Holders',
                titleYaxis: 'Number of Licence Holders',
                titleXaxis: 'Year',
                titleYaxisPos: 0.3,
                titleXaxisPos: 0.3,
                labels: ['2009','2010','2011','2012','2013','2014'],
                shadow: false,
                spline: true,
                key: ['Male','Female'],
                keyColors: ['#3af','#e56'],
                tooltips: tooltipsGender,
                tooltipsEvent: 'onmousemove',
                crosshairs: true,
                crosshairsVline: false,
            }
        }).trace({frames: 60});
        outputCanvas.onmousemove = function (e){
        var obj = e.target.__object__;
        document.getElementById("y").value = parseInt(obj.getValue(e)) || "";
        }
    };
