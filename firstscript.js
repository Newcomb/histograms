var data = d3.json('classData.json')

var grades = function(data,day)
{
  var grade=[];
  data.then(function(d){

    d.forEach(function(element){
      element.quizes.forEach(function(dy){
      {if(dy.day == day)
         {console.log(dy.day);
        grade.push(dy.grade);}
    }})

})
var xScale = d3.scaleLinear()
               .domain(d3.extent(grade)
               .range([0, 600]);
var binMaker=d3.histogram()
               .(xScale.domain())
               .thresholds(xScale.ticks())
)
var svg=d3.select("svg")
          .attr("width",600)
          .attr("height",400);

}  ,function(err){console.log(err)})
}
grades(data,1)
