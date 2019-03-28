var data = d3.json('classData.json')
var height=400;
var width=600;
var padding=10;
var margin={
 right:10,
 left:20,
 top:10,
 bottom:10
}
var grades = function(data,day)
{
  data.then(function(d){

var grade = d.map(function(ele)
{
  return ele.quizes[day-1].grade;
});

var percentage=function(d)
{
  return d.length/grade.length;
}
var xScale = d3.scaleLinear()
               .domain([1,11])
               .range([margin.left+15, width]);
var binMaker=d3.histogram()
               .domain(xScale.domain())
               .thresholds(xScale.ticks(10));
var bins=binMaker(grade);
var yScale=d3.scaleLinear()
             .domain([0,d3.max(bins,function(d){return percentage(d);})])
             .range([height,margin.top])
             .nice();
var cScale=d3.scaleOrdinal(d3.schemeSet3)
var svg=d3.select("svg")
          .attr("width",width+margin.left+margin.right)
          .attr("height",height+margin.top+margin.bottom);
svg.selectAll("rect")
   .data(bins)
   .enter()
   .append("rect")
   .transition()
   .attr("x",function(d){return xScale(d.x0)})
   .attr("width",function(d){return width/10-padding;})
   .attr("y",function(d){return yScale(percentage(d));})
   .attr("height",function(d){return height-yScale(percentage(d));})
   .attr("fill",function(d){
     return cScale(d);
   })
var xAxis=d3.axisBottom(xScale);
var yAxis=d3.axisLeft(yScale);
 svg.append("g")
    .classed("xAxis",true)
    .call(xAxis)
    .attr("transform","translate("+(margin.left-20)+","+(height+margin.top-10)+")");
 svg.append("g")
    .classed("yAxis",true)
    .call(yAxis)
    .attr("transform","translate("+(margin.left+15)+","+(margin.top-10)+")");
    d3.selectAll("button")
      .on("click",function(){
        var ele=d3.select(this)
                  .attr("id");
        change(data,ele);
      })
      d3.selectAll("rect")
      .on("mouseover",function(d){
        var x=d3.select(this).attr("x");
        var y=d3.select(this).attr("y");
        d3.select("#tooltip")
          .style("left",function(){return xScale(d.x0)+250})
           .style("top",function(){return yScale(percentage(d));})
           .select("#num")
           .text(d.length);
        d3.select("#grade")
          .text(d.x0);
          d3.select("#tooltip").classed("hidden",false);
      })
      .on("mouseout",function(){
        d3.select("#tooltip").classed("hidden",true);
      });
}  ,function(err){console.log(err)})
}
///////////////////////////////////
var change = function(data,day)
{
  data.then(function(d){

var grade = d.map(function(ele)
{
  return ele.quizes[day-1].grade;
});

var percentage=function(d)
{
  return d.length/grade.length;
}
var xScale = d3.scaleLinear()
               .domain([1,11])
               .range([margin.left+15, width]);
var binMaker=d3.histogram()
               .domain(xScale.domain())
               .thresholds(xScale.ticks(10));
var bins=binMaker(grade);

var yScale=d3.scaleLinear()
             .domain([0,d3.max(bins,function(d){return percentage(d);})])
             .range([height,margin.top])
             .nice();
var cScale=d3.scaleOrdinal(d3.schemeSet3)
var svg=d3.select("svg")

svg.selectAll("rect")
   .data(bins)
   .transition()
   .attr("x",function(d){return xScale(d.x0)})
   .attr("width",function(d){return width/10-padding;})
   .attr("y",function(d){return yScale(percentage(d));})
   .attr("height",function(d){return height-yScale(percentage(d));})
   .attr("fill",function(d){
     return cScale(d);
   })
var xAxis=d3.axisBottom(xScale);
var yAxis=d3.axisLeft(yScale);
 svg.select(".xAxis")
    .call(xAxis)
    .attr("transform","translate("+(margin.left-20)+","+(height+margin.top-10)+")");
 svg.select(".yAxis")
    .call(yAxis)
    .attr("transform","translate("+(margin.left+15)+","+(margin.top-10)+")")

}  ,function(err){console.log(err)})
}
grades(data,1)
