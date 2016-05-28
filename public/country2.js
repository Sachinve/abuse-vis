
!(function (d3) {

$("bcontent").empty();


    var colorChoice = {
    racial:{
      3:['rgb(239,237,245)','rgb(188,189,220)','rgb(117,107,177)'],
      4:['rgb(239,243,255)','rgb(189,215,231)','rgb(107,174,214)','rgb(33,113,181)'],
      5:['rgb(239,243,255)','rgb(189,215,231)','rgb(107,174,214)','rgb(49,130,189)','rgb(8,81,156)']
    },
    women:{
      3:['rgb(229,245,224)','rgb(161,217,155)','rgb(49,163,84)'],
      4:['rgb(237,248,233)','rgb(186,228,179)','rgb(116,196,118)','rgb(35,139,69)'],
      5:['rgb(237,248,233)','rgb(186,228,179)','rgb(116,196,118)','rgb(49,163,84)','rgb(0,109,44)']
    },
    sexual:{
      3:['rgb(254,230,206)','rgb(253,174,107)','rgb(230,85,13)'],
      4:['rgb(254,237,222)','rgb(253,190,133)','rgb(253,141,60)','rgb(217,71,1)'],
      5:['rgb(254,237,222)','rgb(253,190,133)','rgb(253,141,60)','rgb(230,85,13)','rgb(166,54,3)']
    }
  }
  //var width = 900;
  //var height = 580;
  var list1 = ["racial","women","sexual"];
  var data = [];
  d3.json("USACounties.json",function(error,result){
        data = result.features;
        //console.log(data);
   });
  var svg = d3.select("body")
             .append("svg")
             //.attr("height",height)
             //.attr("width",width)
             .attr("id","mapChart");
  svg.append("g")
       .attr("class","legendLinear")
       .attr("transform","translate(10,10)");

  var dropDown = d3.select("body")
                   .append("select")
                   .attr("id","dropDown")
                   .on("change",renderMap);
  dropDown.selectAll("option")
      .data(list1)
      .enter()
      .append("option")
      .text(function(d,i){
        return d;
      });

function renderMap()
{
    var value = d3.select('select').property('value');
    for(var key in colorChoice)
    {
      if(key == value)
      {
        colorArray = colorChoice[key][3];
      }
    }
    d3.select("#text")
      .selectAll("h3 spa")
      .text(value);

    var ordinalScale = d3.scale.ordinal()
                  .domain(["low","medium","high"])
                  .range(colorArray);

   var legendLinear = d3.legend.color()
                              .shapeWidth(50)
                              .orient('horizontal')
                              .scale(ordinalScale);
    
    svg.select(".legendLinear")
       .call(legendLinear);                            

    var map = d3.select("svg")
                .append("g")
                .style("position","absolute");
                
    var mapProjection = d3.geo.albersUsa()
                        .scale( 750 )
                        .translate( [270,250] );
    var geoPath = d3.geo.path()
                    .projection(mapProjection);
    map.selectAll("path")
       .data(data)
       .enter()
       .append("path")
       .attr("fill",function(d)
       {
          return colorArray[((d.properties.COUNTY)%3)];
       })
       .on("click",function(d,i){
          removeBar();
          renderBar(d.properties.NAME,d.properties.STATE);
       })
       .attr("stroke", "#fff")
       .on("mouseenter",function(d,i){
            d3.select("#idusmap").style({
              visibility:"visible",
              top: d3.event.clientY+"px",
              left:d3.event.clientX+"px",
              opacity:1
            })
            .text(toolTip(d))
          })
       .on("mouseleave",function(d,i){
            d3.select("#idusmap").style({
              visibility: "hidden",
              opacity: undefined
            });
        }) 
       .attr("d",geoPath);
}
function renderBar(county,state_id)
{
  var barData = [];
  var countValue = [];
  d3.json("bar.json",function(error,result){
        barData = result.catagories;
        var len = barData.length;
        for(var i=0;i<len;i++)
        {
          countValue.push(barData[i]);
        }
        Bar(countValue);
        //removeBar();
        //console.log(countValue);
   });
}
function Bar(countValue)
{
  var axixScale = d3.scale.linear()
                          .domain([1,2,3])
                          .range[("racial","women","sexual")];
  var xAxis = d3.svg.axis();

  var color =["#e41a1c","#377eb8","#4daf4a"];
  var svg1 = d3.select("body")
             .append("svg")
             .attr("id","barChart");
  
  svg1.selectAll("rect")
     .data(countValue)
     .enter()
     .append("rect")
     .attr("x",function(d,i){
        return i*25;
     })
     .attr("y",function(d,i){
        return (300-d.count);
     })
     .attr("width",10)
     .attr("fill",function(d,i){
      if(d.catagory == "racial")
      {
        return color[0];
      }
      else if(d.catagory == "women")
      {
        return color[1];
      }
      else
      {
        return color[2];
      }
     })
     .attr("height",function(d){
        return (d.count+50);
     })
     .call(xAxis);
  //console.log("Hi data is: "+county+" and  "+ state_id);
}
function removeBar()
{
  d3.select("#barChart")
    .remove();
}
function toolTip(d)
{
   var name = d.properties.NAME;
   var type = ["Racial"];
   var count = [20,30,40];
   return  name; //+ " "+type[0]+" "+count[(d.properties.STATE)%3];
}

})(d3);


