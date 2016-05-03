// use strict
"use strict";
// ensure that the document is ready before executing code
$(document).ready(function() {
//*********************************************************************
// Search functionality HTML
//*********************************************************************
// construct and insert search header html
var searchHTML = "<h2>Students</h2> <div class='student-search'> <input class='search-input' placeholder='Search for students...'>";
$(".page-header").html(searchHTML);
// create div for pagination
$(".page").append("<div class='pagination'></div>");
//declare number of students per page
var studentsPerPage = 10;
// create a global list clone at the start for manipulation, so that we are always storing a copy of the full list globally
var listClone =  $(".student-list > li").clone();
console.log(listClone);
// construct initial page
pcf(listClone);
//*****************************************************************************************
// Text Field Search Function
//*****************************************************************************************
$(".search-input").keyup(function() {
      //erase any lingering transparency from fadeIn function
      listClone.css( "opacity", 1);
      // move back to page 1 of pagination
      $(".pagination > ul > li > a").attr("href", "#");
      $(".pagination > ul > li:first-child > a").attr("class", "active");
       //grab text from text input field
       var searchBoxText = $(this).val().toLowerCase();
       // looping through each li element in the local list clone
       listClone.each(function(index) {
         //wipe pre-applied IDs
         $(this).removeAttr("id");
         // grab inner text from the h3 child element which contains the name
         var nameText = $(this).find("h3").text();
         // grab inner text from the .email element which contains the email address
         var emailText = $(this).find(".email").text();
         // concatentate the relevant text to be searched into a single string
         var LookUpText = nameText + " " + emailText;
         // drop search text to lower case
         var textLower = LookUpText.toLowerCase();
         // if the string in the search input box does not match the search string for each li element then...
         if (textLower.indexOf(searchBoxText) == -1) {
               // add a class handler for list items that won't be displayed
             $(this).attr("id", "!display");
           }
         });
            // run pagination contructor function (pcf) on the new list
            pcf(listClone);
       });
//*****************************************************************************************
// Pagination Constructor Function (PCF)
//*****************************************************************************************
// define pagination constructor function (pcf)
function pcf (list) {
  // remove the noResults message if it was appended from a previous search
  $(".noResults").remove();
  // start by hiding everything with animation for extra credit
  list.hide();
  // populate html with new list
  $(".student-list").html(list);
  // count all elements to be possibly shown
  var studentCount = 1;
  list.each(function(index) {
    if ($(this).attr("id") !== "!display") {
    $(this).attr("id", "show-index-"+(studentCount));
      studentCount++;
  }
  });
  // count total students to be shown for calculating the number of pagination links
  var totalStudents = studentCount-1;
  // if search comes back with no results, append message to the list stating to the effect
  if (totalStudents === 0) {
    $(".student-list").append("<li class='noResults'>No Students Match Your Search.</li>");
  }
  // count total number of links required for pagination
  var numLink = Math.ceil(totalStudents/studentsPerPage);
  // pagination link html string constructor
  var pagStr = "<ul>";
  // add one page link per ten students
  for (var i=0; i < numLink; i++) {
    pagStr += "";
    pagStr += "<li> <a>" + (i+1) + "</a> </li>";
  }
  pagStr +="</ul>";
  // assign inner html of pagination div with constructed pagination string, 1st element class set to active
  $(".pagination").html(pagStr);
  // stop pagination links from going to the top of the page when clicked. It's confusing.
  $(".pagination > ul > li > a").click(function(event) {
      event.preventDefault();
    }
  );
  // construct pagination html as it's seen in the example
  $(".pagination > ul > li > a").attr("href", "#");
  // default set active class to the first element on page load
  $(".pagination > ul > li:first-child > a").attr("class", "active");
  // showing first set of students and hiding the rest with animation for extra credit
  for (var i = 1; i < studentsPerPage+1; i++) {
    $("#show-index-" + i).fadeIn();
  }
  // pagination class element construction function
$(".pagination > ul > li > a").click(function() {
      //erase any lingering transparency from fadeIn function
      listClone.css( "opacity", 1);
      // hide everything in the list first, but all child elements, not parent element itself
      list.hide();
      // make pagination link class active when clicked and remove from unlicked element
      $(this).parent().parent().children().children().removeClass("active");
      $(this).addClass("active");
      // get integer for student list show function
      var pageLinkActive = parseInt($(".active").html());
      // starting id for element to show
      var startId = pageLinkActive * studentsPerPage - studentsPerPage + 1;
      // ending id for element to show
      var endId = (startId + studentsPerPage);
      // show elements between start and end ID with animation for extra credit
      for (var i = startId; i < endId; i++) {
        $("#show-index-" + i).fadeIn();
      }
// click function closing braces
  });
// pagination constructor function closing braces
}
// ready function closing braces
});
