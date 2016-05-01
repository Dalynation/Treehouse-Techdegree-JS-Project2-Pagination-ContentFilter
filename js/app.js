// Phase 1: construct the basis of the search functionality and insert into the HTML
// Phase 2: get the pagination links to show/hide appropriate sections of the list
// Phase 3: enable search functionality
//use strict
"use strict";
//ensure that the document is ready before executing code
$(document).ready(function() {
//*********************************************************************
//Commence Phase 1: construct the basis of the search functionality HTML
//*********************************************************************
var searchHTML = "<h2>Students</h2> <div class='student-search'> <input placeholder='Search for students...'><button>Search</button>";
$(".page-header").html(searchHTML);
//number of students per page
var studentsPerPage = 10;
//count total number of students in the html
var totalStudents = $(".student-list > li").size();
console.log(totalStudents);
//count total number of links
var numLink = Math.floor(totalStudents/studentsPerPage)+1;
console.log(numLink);
//pagination html string constructor
var pagStr = "<ul>";
for (var i=0; i < numLink; i++) {
  pagStr += "";
  pagStr += "<li> <a>" + (i+1) + "</a> </li>";
}
pagStr +="</ul>";
console.log(pagStr);
//
// assign inner html of pagination div with constructed pagination string, 1st element class set to active
$(".pagination").html(pagStr);
$(".pagination > ul > li > a").click(function(event) {
    event.preventDefault()
  }
);
$(".pagination > ul > li > a").attr("href", "#");
$(".pagination > ul > li:first-child > a").attr("class", "active");
$(".student-list > li").each(function(index) {
  $(this).attr("id", "student-list-item-"+(index));
});
console.log($(".student-list"));
//assign identifier to each student list item
for (var i = 0; i < studentsPerPage; i++) {
  $("#student-list-item-" + i).show();
  console.log($("#student-list-item-" + i) + "shown");
}
for (var i = (studentsPerPage); i < totalStudents; i++) {
  $("#student-list-item-" + i).hide();
  console.log($("#student-list-item-" + i) + "hidden");
}
//*********************************************************************
//End of Phase 1
//*****************************************************************************************
//Commence Phase 2: get the pagination links to show/hide appropriate sections of the list
//*****************************************************************************************
// PAGINATION LINK FUNCTION
$(".pagination > ul > li > a").click(function(event) {
    $(".student-list > li").hide();
    //make pagination link class active when clicked
    $(this).parent().parent().children().children().removeClass("active");
    $(this).addClass("active");
      console.log($(".pagination"));
    // get integer for student list show function
    var pageLinkActive = parseInt($(".active").html());
      console.log(pageLinkActive);
    //starting id for element to show
    var startId = pageLinkActive * studentsPerPage - studentsPerPage;
      console.log(startId);
    var endId = (startId + studentsPerPage - 1);
      console.log(endId);
    for (var i = startId; i < endId; i++) {
      $("#student-list-item-" + i).show();
    }
//click function closing braces
});
//*********************************************************************
//End of Phase 2
//*****************************************************************************************
//Commence Phase 3: Enable Search Functionality
//*****************************************************************************************


//ready function closing braces
});
