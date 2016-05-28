
function plot_barcharts(){
    jQuery(function($){
            $.getJSON("bar.json",function(data){
                    //var alignment = "horizontal";
                    //var height = 300;
                    //var width = 700;
                    var height = $("#bar1").height();
                    var width = $("#bar1").width();
                    d3.select("#bar1")
                            .select("svg")
                            .remove();
                    //alert("Hello" + height);
                    //alert("Hello" + width);

                    var len = data.data.length;
            
                    //console.log("Hello....");
                    //alert(JSON.stringify(data));
                    //alert(data['data'][0]['block'].length);
                        
                    //renderBar("#bar1",height,width,  data['data'][0]['block']);
                    

                    //renderBar("#bar1",height,width,  data, "Title1");
                    renderBar2("#bar1",height,width,  dataArrSexual, "Sexual");


            });

    });

    jQuery(function($){
            $.getJSON("bar1.json",function(data){
                    var height = $("#bar2").height();
                    var width = $("#bar2").width();
                    d3.select("#bar2")
                            .select("svg")
                            .remove();
                    var len = data.data.length;
                    renderBar2("#bar2",height,width,  dataArrGeneral, "General");
                    });

    });
    jQuery(function($){
            $.getJSON("bar.json",function(data){
                    var height = $("#bar3").height();
                    var width = $("#bar3").width();
                    d3.select("#bar3")
                            .select("svg")
                            .remove();
                    var len = data.data.length;
                    renderBar2("#bar3",height,width,  dataArrWomen, "Women");
                    });

    });


    jQuery(function($){
            $.getJSON("bar.json",function(data){
                    var height = $("#bar4").height();
                    var width = $("#bar4").width();
                    d3.select("#bar4")
                            .select("svg")
                            .remove();
                    var len = data.data.length;
                    renderBar2("#bar4",height,width,  dataArrRacial, "Racial");
                    });

    });
}

function toolTip(d)
{
    var str1 = 'Total Abuse Count: ' + parseInt(d['val']) + '\n';
    //var str2 = 'Time: ' + d['time'] + '\n';
    return (str1);
}

function renderBar2(div_id, height,width,data, title)
{

    var dataHorizontal = data;
    console.log(dataHorizontal);
    var chartMargin = {top:30,left:40,right:20,bottom:30};
    var innerWidth = width - (chartMargin.left + chartMargin.right);
    var innerHeight = height - (chartMargin.top + chartMargin.bottom);

    var arr_total = [];
    var time_domain2 = [];

    //alert("Hello");
    //return;
    length = data.length;
    //alert(data.length);

    for(i = 0; i < length ; i++){
        //console.log(data['data'][0]['block'][i]['time']);
        //console.log(data['data'][0]['block'][i]['total']);
        //console.log('------------------------------');
        if (typeof data[i]['val'] == 'undefined'){
            //alert("####");
            data[i]['val'] = 0;
        }
        arr_total.push(parseInt(data[i]['val']));
        time_domain2.push(data[i]['val']);
        //time_domain['time'+i].push(data['data'][0]['block'][i]['time']);
    }

    //var time_domain = d3.extent(time_domain2);
    var time_domain = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

    //alert(time_domain);

    var bar_width = innerWidth / length;

    var data_max = d3.max(arr_total);



    //alert(arr_total);
    //alert(data_max);
    var yScale = d3.scale.linear()
        .domain([0,data_max])
        .range([innerHeight ,0]);


    var yAxesScale = d3.scale.linear()
        .domain([0,data_max])
        .range([innerHeight,0]);

    var xScale = d3.scale.ordinal()
    //var xScale = d3.time.scale()
        .domain(time_domain)
        .rangeRoundBands([0, innerWidth],.1);
        //.range([0,innerWidth]); 

    var svg2 = d3.select(div_id)
        .append("svg")
        .attr("width",innerWidth+chartMargin.left+chartMargin.right)
        .attr("height",innerHeight+chartMargin.top+chartMargin.bottom);

        // display date format
        //var  date_format = d3.time.format("%d %b");
    var ctitle = svg2.append("text")
          .text(title)
          //.style({"font-size": 12, fill:"#ccc"})
          .style({"font-size": 12, fill:"black"})
          .attr("dx", chartMargin.left + ((3 * innerWidth) /8) )
          .attr("dy", chartMargin.top - 10)

    var xlabel = svg2.append("text")      // text label for the x axis
        .attr("y", chartMargin.top + chartMargin.top - 7 + innerHeight )
        .attr("x",  chartMargin.left + ((1 * innerWidth) /2))
        //.style({"font-size": 12, fill:"#ccc"})
        .style({"font-size": 12, fill:"black"})
        .style("text-anchor", "middle")
        .text("Hour");

    var yAxis = d3.svg.axis()
        .tickSize(2)
        .ticks(10)
        .scale(yAxesScale)
        .orient("left");

    var xAxis = d3.svg.axis()
        .tickSize(1)
        .ticks(24)
        //.tickFormat(date_format)
        /*.tickSize(-360)
        .tickFormat(function(d){
            var prefix = d3.formatPrefix(d);
            return prefix.scale(d) + prefix.symbol;
        })*/
        .scale(xScale)
        .orient("bottom");


/*
function make_x_axis() {        
    return d3.svg.axis()
        .scale(xScale)
         .orient("bottom")
         .ticks(10)
}

function make_y_axis() {        
    return d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(10)
}

    svg2.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(0," + ( innerHeight) + ")")
        .call(make_x_axis()
            .tickSize(-innerHeight, 0, 0)
            .tickFormat("")
        )

    svg2.append("g")         
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-(chartMargin.left + innerWidth), 0, 0)
            .tickFormat("")
        )

*/

    var yAxisGroup = svg2.append("g")
        .attr("transform","translate("+chartMargin.left+","+chartMargin.top+")");
    var xAxisGroup = svg2.append("g")
        .attr("transform","translate("+chartMargin.left+","+(innerHeight+chartMargin.top)+")");


    yAxisGroup.call(yAxis);
    xAxisGroup.call(xAxis)
            .attr("dy", ".35em")
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("transform"," translate(0,15) rotate(-65)")
            .style("font-size","10px");
            //.attr("transform", "rotate(270)")
            //.style("text-anchor", "start");


    var bar = svg2.selectAll("rect")
        .data(dataHorizontal);

    bar.enter()
        .append("rect")
        .attr("x",function(d,i){
                //return (i*chartMargin.left)+(2*chartMargin.left);
                return (i* bar_width + chartMargin.left + (bar_width*3)/8);
                })
        .attr("y",function(d,i){
            //console.log(d);
            //return (innerHeight-yScale(d.total));
                //tmp1 = (innerHeight-yScale(parseInt(d['data'][0]['block'][i]['total'])));
                //return (innerHeight-yScale(parseInt(d['total'])));
                return (chartMargin.top + yScale(parseInt(d['val'])));
                //alert('-->' + tmp1);
                //return tmp1
            })
        .attr("width",function(d,i){
            return 5;
            })
        //.attr("fill","#66c2a5")
        .attr("fill","green")
        .attr("height",function(d,i){
                return (innerHeight - yScale(parseInt(d['val'])));
                //return 0;
        })

    .on("click",function(d,i){
            renderOtherBar(height,width,d.catagory);
            })
    .on("click",function(d,i){
                    makeMultiTable(d);
                    makeMultiTable2(d);
                    //alert("rect");
                })
    .on("mouseenter",function(d,i){
                        d3.select("#toolTip").style({
                            visibility:"visible",
                            top: d3.mouse(this)[1]+"px",
                            left: d3.mouse(this)[0]+"px",
                            opacity:1
                        })
                    .text(toolTip(d))
                    d3.select(this).attr("fill", "orange");
                    //d3.select("rect")
                })
    .on("mouseleave",function(d,i){
                        d3.select("#toolTip").style({
                            visibility: "hidden",
                            opacity: undefined
                        })
                    d3.select(this).attr("fill", "green");
                })

/*

var coordinates = [0, 0];
coordinates = d3.mouse(this);
var x = coordinates[0];
var y = coordinates[1];

var transit = d3.select("svg2")
    .selectAll("rect")
    .transition()
    .duration(1500)
    .attr("height",function(d,i){
            return yScale(parseInt(d['total']))+chartMargin.top;
    }); 
*/ 

}


function renderBar(div_id, height,width,data, title)
{

    var dataHorizontal = data;
    console.log(dataHorizontal);
    var chartMargin = {top:30,left:40,right:20,bottom:30};
    var innerWidth = width - (chartMargin.left + chartMargin.right);
    var innerHeight = height - (chartMargin.top + chartMargin.bottom);

    var arr_total = [];
    var time_domain2 = [];


    length = data['data'][0]['block'].length;

    for(i = 0; i < length ; i++){
        console.log(data['data'][0]['block'][i]['time']);
        console.log(data['data'][0]['block'][i]['total']);
        console.log('------------------------------');
        arr_total.push(parseInt(data['data'][0]['block'][i]['total']));
        time_domain2.push(data['data'][0]['block'][i]['time']);
        //time_domain['time'+i].push(data['data'][0]['block'][i]['time']);
    }

    //var time_domain = d3.extent(time_domain2);
    var time_domain = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

    //alert(time_domain);

    var bar_width = innerWidth / length;

    var data_max = d3.max(arr_total);



    //alert(arr_total);
    //alert(data_max);
    var yScale = d3.scale.linear()
        .domain([0,data_max])
        .range([innerHeight ,0]);


    var yAxesScale = d3.scale.linear()
        .domain([0,data_max])
        .range([innerHeight,0]);

    var xScale = d3.scale.ordinal()
    //var xScale = d3.time.scale()
        .domain(time_domain)
        .range([0,innerWidth]); 

    var svg2 = d3.select(div_id)
        .append("svg")
        .attr("width",innerWidth+chartMargin.left+chartMargin.right)
        .attr("height",innerHeight+chartMargin.top+chartMargin.bottom);

        // display date format
        //var  date_format = d3.time.format("%d %b");
    var ctitle = svg2.append("text")
          .text(title)
          .style({"font-size": 12, fill:"#ccc"})
          .attr("dx", chartMargin.left + ((3 * innerWidth) /8) )
          .attr("dy", chartMargin.top + 0)

    var xlabel = svg2.append("text")      // text label for the x axis
        .attr("y", chartMargin.top + chartMargin.top - 10 + innerHeight )
        .attr("x",  chartMargin.left + ((1 * innerWidth) /2))
        .style({"font-size": 12, fill:"#ccc"})
        .style("text-anchor", "middle")
        .text("Time");

    var yAxis = d3.svg.axis()
        .tickSize(2)
        .ticks(10)
        .scale(yAxesScale)
        .orient("left");

    var xAxis = d3.svg.axis()
        .tickSize(5)
        .ticks(10)
        //.tickFormat(date_format)
        /*.tickSize(-360)
        .tickFormat(function(d){
            var prefix = d3.formatPrefix(d);
            return prefix.scale(d) + prefix.symbol;
        })*/
        .scale(xScale)
        .orient("bottom");


/*
function make_x_axis() {        
    return d3.svg.axis()
        .scale(xScale)
         .orient("bottom")
         .ticks(10)
}

function make_y_axis() {        
    return d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(10)
}

    svg2.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(0," + ( innerHeight) + ")")
        .call(make_x_axis()
            .tickSize(-innerHeight, 0, 0)
            .tickFormat("")
        )

    svg2.append("g")         
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-(chartMargin.left + innerWidth), 0, 0)
            .tickFormat("")
        )

*/

    var yAxisGroup = svg2.append("g")
        .attr("transform","translate("+chartMargin.left+","+chartMargin.top+")");
    var xAxisGroup = svg2.append("g")
        .attr("transform","translate("+chartMargin.left+","+(innerHeight+chartMargin.top)+")");


    yAxisGroup.call(yAxis);
    xAxisGroup.call(xAxis);


    var bar = svg2.selectAll("rect")
        .data(dataHorizontal['data'][0]['block']);

    bar.enter()
        .append("rect")
        .attr("x",function(d,i){
                //return (i*chartMargin.left)+(2*chartMargin.left);
                return (i* bar_width + chartMargin.left + (bar_width*3)/8);
                })
        .attr("y",function(d,i){
            //console.log(d);
            //return (innerHeight-yScale(d.total));
                //tmp1 = (innerHeight-yScale(parseInt(d['data'][0]['block'][i]['total'])));
                //return (innerHeight-yScale(parseInt(d['total'])));
                return (chartMargin.top + yScale(parseInt(d['total'])));
                //alert('-->' + tmp1);
                //return tmp1
            })
        .attr("width",function(d,i){
            return 5;
            })
        //.attr("fill","#66c2a5")
        .attr("fill","green")
        .attr("height",function(d,i){
                return (innerHeight - yScale(parseInt(d['total'])));
                //return 0;
        })

    .on("click",function(d,i){
            renderOtherBar(height,width,d.catagory);
            })
    .on("click",function(d,i){
                    alert("rect");
                })
    .on("mouseenter",function(d,i){
                        d3.select("#toolTip").style({
                            visibility:"visible",
                            top: d3.mouse(this)[1]+"px",
                            left: d3.mouse(this)[0]+"px",
                            opacity:1
                        })
                    .text(toolTip(d))
                    d3.select(this).attr("fill", "orange");
                    //d3.select("rect")
                })
    .on("mouseleave",function(d,i){
                        d3.select("#toolTip").style({
                            visibility: "hidden",
                            opacity: undefined
                        })
                    d3.select(this).attr("fill", "green");
                })

/*

var coordinates = [0, 0];
coordinates = d3.mouse(this);
var x = coordinates[0];
var y = coordinates[1];

var transit = d3.select("svg2")
    .selectAll("rect")
    .transition()
    .duration(1500)
    .attr("height",function(d,i){
            return yScale(parseInt(d['total']))+chartMargin.top;
    }); 
*/ 

}



function removeBar()
{
    console.log("removing Bar");
}
function renderOtherBar(height,width,data)
{
    return;
    alert("pppppppppppppppppp");
    var legendElementHeight = 20;
    var legendElementWidth = 20;
    var Margin = 5;
    var color = d3.scale.ordinal()
        .domain([0,1,2,3])
        .range(["#66c2a5","#fc8d62","#8da0cb","#e78ac3"]);
    //console.log("hi"+height);
    var svg = d3.select("body")
        .append("svg")
        .attr("height",height/2)
        .attr("width",width/3);
    var svg1 = d3.select("body")
        .append("svg")
        .attr("height",100)
        .attr("width",100)
        .style("position","absolute")
        .style("top","40%");
    var legend = svg1.append("g")
        .selectAll("g")
        .data(color.domain())
        .enter()
        .append("g")
        .attr("transform",function(d,i){
                var height = legendElementHeight+Margin;
                var x = 0;
                var y = i*height;
                return "translate("+x+","+y+")";
                });
    legend.append("rect")
        .attr("width",legendElementWidth)
        .attr("height",legendElementHeight)
        .style("fill",function(d,i){
                return color(i);
                })
    .style("stoke",function(d,i){
            return color(i);
            });
    legend.append("text")
        .data(data)
        .attr("x",legendElementWidth+Margin)
        .attr("y",legendElementWidth-Margin)
        .text(function(d,i){
                return d.time;
                });
}


