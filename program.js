/**
 * Created by PhilipBowrey on 29/04/2016.
 */

// Sets reference to whether the graph has already been plotted alphabetically
var isAlphabetic;

"use strict";
window.onload = function () {

    // Binds fileInput button from HTML code to openFile function
    var fileInput = document.getElementById("fileInput");
    fileInput.onchange = openFile;
};

    // Runs when the file is changed
    function openFile() {
        // Sets the default graph to alphabetically sorted
        isAlphabetic = false;

        sortFile();
    }

    // Creates sorted bar graphs from specified file data
    function sortFile() {
        var outputCanvas = document.getElementById('myCanvas');
        var file = document.getElementById('fileInput').files[0];

        // Resets canvas in case graph already exists
        RGraph.reset(outputCanvas);

        // Checks that the file exists
        if (file) {
            var reader = new FileReader();

            // Runs when the file is read (is read below)
            reader.onload = function (e) {
                var contents = e.target.result;
                var charCountArray = [];
                var letterArray = [];

                // Creates an array of letters and an array storing count values
                for (var z = 0; z < 26; z++) {
                    // Creates an array where each element is a letter character
                    letterArray[z] = String.fromCharCode(97+z) ;

                    // Creates an array of 0's, one for each letter, this is setting up initial count.
                    charCountArray[z] = 0;
                }

                var letter;
                var letterPos;

                // Counts the instances of each letter and increments letter count accordingly
                for (var i = 0; i < contents.length; i++) {
                    letter = contents.charAt(i).toLowerCase();

                    // Converts char to ascii/unicode
                    letterPos = (letter.charCodeAt(0));

                    // Checks if in range
                    if (letterPos >= 97 && letterPos <= 122){

                        // Increments appropriate counter element
                        letterPos -= 97;
                        charCountArray[letterPos] += 1;
                    }
                }

                var graphTitle = "";

                // Checks to see if it is alphabetically sorted already
                if (isAlphabetic) {

                    // If true, it sorts the charCountArray array from largest to smallest,
                    // and sets the letterArray accordingly
                    var tempCount;
                    var tempLetter;
                    isAlphabetic = false;
                    graphTitle = "Sorted by Frequency";

                    // Sorts the frequencies from largest to smallest,
                    // and changes the letter positions to reflect new order
                    for (var m = 0; m < charCountArray.length - 1; m++) {
                        for (var n = m + 1; n < charCountArray.length; n++) {
                            if (charCountArray[m] < charCountArray[n]) {

                                tempCount = charCountArray[m];
                                tempLetter = letterArray[m];

                                charCountArray[m] = charCountArray[n];
                                letterArray[m] = letterArray[n];

                                charCountArray[n] = tempCount;
                                letterArray[n] = tempLetter;
                            }
                        }
                    }

                // If the graph is not alphabetically sorted, it changes graph title and variable
                }else{
                    isAlphabetic = true;
                    graphTitle = "Sorted Alphabetically";
                }

                var charCountString = [];

                // Creates an array of strings usable by tooltips
                for (var cc = 0; cc < charCountArray.length; cc++) {
                    charCountString[cc] = "Count: " + charCountArray[cc];
                }

                // Creates the graph object and draws it.
                var Bar = new RGraph.Bar({
                    id: "myCanvas",
                    data: charCountArray,
                    options: {
                        // Title/Axis Properties
                        title: graphTitle,
                        titleYaxis: "Count of Occurrences",
                        titleYaxisPos: 0.3,
                        titleXaxis: "Letters Counted",
                        titleXaxisPos: 0.3,
                        gutterTop: 40,
                        gutterBottom: 60,
                        gutterLeft: 70,
                        labels: letterArray,

                        // Bar Properties
                        linewidth: 1,
                        hmargin: 0,
                        colors: ['Gradient(pink:crimson:#f33)'],

                        // Event Properties
                        crosshairs: true,
                        crosshairsVline: false, // Documentation is false, recorded as crosshairsVlines
                        tooltipsEvent: "onmousemove",
                        tooltips: charCountString,
                        highlightFill: "rgba(0,63,76,1)"
                    }
                // Draws the graph with animation
                }).grow({frames: 30});

                var yValueObj;

                // Returns the y-position of the mouse and puts it into the text area beneath the graph
                outputCanvas.onmousemove = function (e){

                    yValueObj = e.target.__object__;

                    // Outputs the y-position as an integer or if outside of graph area as empty string.
                    document.getElementById("y-value").value = parseInt(yValueObj.getValue(e)) || "";
                };
            };

            // Reads the file in as string, triggering  onload
            reader.readAsText(file);

        // If the file cannot be read, it generates an error
        } else {
            alert("Failed to load file");
        }
}

// Clears the canvas
function clearCanvas() {
    var outputCanvas = document.getElementById('myCanvas');

    // Clear canvas
    RGraph.reset(outputCanvas);

    // Resets the file input
    document.getElementById('fileInput').value = "";
}