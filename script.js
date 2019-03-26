var data = d3.json('classData.json')

var grades = function(data,day)
{  data.then(function(d){

    var grade = d.map(function(ele){
      return ele.quizes[day-1];});

console.log(grade);
var percentage=function(d)
{
  return d.length/grade.length;
}
var xScale = d3.scaleLinear()
               .domain(d3.extent(grade))
               .range([0, 600]);
var binMaker=d3.histogram()
               .domain(xScale.domain())
               .thresholds(xScale.ticks(5));
var bins=binMaker(grade);
var yScale=d3.scaleLinear()
             .domain([0,d3.max(bins,function(d){return percentage(d);})])
             .range([400,0])
             .nice();
var svg=d3.select("svg")
          .attr("width",600)
          .attr("height",400);
svg.selectAll("rect")
   .data(bins)
   .enter()
   .append("rect")
   .attr("x",function(d){return xScale(d.x0)})
   .attr("width",function(d){return xScale(d.x1-.1)-xScale(d.x0);})
   .attr("y",function(d){return yScale(percentage(d));})
   .attr("height",function(d){return 400-yScale(percentage(d));});

}  ,function(err){console.log(err)})
}
grades(data,1)
