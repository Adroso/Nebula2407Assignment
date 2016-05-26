    window.onload = function ()
    {
        var canvas = document.getElementById("cvs");

        var bar = new RGraph.Bar({
            id: 'cvs',
            data: [[54.82],[74.74],[97.15], [116], [136.99], [161.51], [179.41], [196.04], [214.82], [222.11]],
            options: {
                grouping: 'stacked',
                labels: ['1965','1970','1975','1980','1985','1990','1995','2000','2005','2010'],
                labelsAbove: false,
                tooltips: [
                    '54 Billion','74 Billion','97 Billion','116 Billion','136 Billion','161 Billion','179 Billion','196 Billion','214 Billion','222 Billion'],
                tooltipsEvent: 'onmousemove',
                labelsAbovedecimals: 2,
                linewidth: 1,
                strokestyle: 'black',
                colors: ['Gradient(#4572A7:#66f)'],
                shadowOffsetx: 3,
                shadowOffsety: 1,
                shadowBlur: 10,
                hmargin: 0,
                gutterLeft: 45,
                backgroundGridVlines: false,
                backgroundGridBorder: false,
                axisColor: '#ccc',
                noyaxis: false,
                textAccessible: true,            
            }
        }).wave({frames:60}).on('draw', function (obj)
        {
            for (var i=0; i<obj.coords.length; ++i) {
                obj.context.fillStyle = 'white';
                RGraph.Text2(obj.context, {
                    font:'Verdana',
                    'size':10,
                    'x':obj.coords[i][0] + (obj.coords[i][2] / 2),
                    'y':obj.coords[i][1] + (obj.coords[i][3] / 2),
                    'text':obj.data_arr[i].toString(),
                    'valign':'center',
                    'halign':'center'
                });
            }
        }).draw();
    };
