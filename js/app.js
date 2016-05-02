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
//construct and insert search header html
var searchHTML = "<h2>Students</h2> <div class='student-search'> <input class='search-input' placeholder='Search for students...'><button class='search-button'>Search</button>";
$(".page-header").html(searchHTML);
//number of students per page
var studentsPerPage = 10;
// create list clone for manipulation, so that we are always storing the full list globally
var listClone = $(".student-list > li").clone();
  console.log(listClone);
//call initial pagination construction function state upon loading
pcf(listClone);
//*****************************************************************************************
//Commence Phase 3: Enable Search Functionality - Needs to go before Pagination Function List Construction
//*****************************************************************************************
//search Function
$(".search-input").keyup(function() {
      var listCloneLocal = listClone.clone();
      var searchBoxText = $(this).val();
        console.log(searchBoxText);
      listCloneLocal.each(function(index) {
        var nameText = $(this).find("h3").text();
        var emailText = $(this).find(".email").text();
        var LookUpText = nameText + " " + emailText;
        var textLower = LookUpText.toLowerCase();
          console.log(textLower);
        if (textLower.indexOf(searchBoxText) == -1) {
              //console.log($(this))
            $(this).empty();
          }
        });
    pcf(listCloneLocal);
  });

      //$(".pagination > ul > li > a").removeClass("active");

      //var len = $(this).val().length;
      //console.log(len);
      //$('#student-list-item-').each(function() {
        //var listText = $(this).html();
        //var listTextLower = listText.toLowerCase();
      //if (listTextLower.indexOf(searchTextLower) < 0) {
        //$(this).hide();
      //}
    //});
//});



function pcf (list) {
  $(".student-list").empty();
  $(".student-list").html(list);
    //console.log($(".student-list"));
  //count total number of students in the html
  var totalStudents = list.size();
    //console.log(totalStudents);
  //count total number of links
  var numLink = Math.floor(totalStudents/studentsPerPage)+1;
    //console.log(numLink);
  //pagination html string constructor
  var pagStr = "<ul>";
  for (var i=0; i < numLink; i++) {
    pagStr += "";
    pagStr += "<li> <a>" + (i+1) + "</a> </li>";
  }
  pagStr +="</ul>";
  //console.log(pagStr);
  // assign inner html of pagination div with constructed pagination string, 1st element class set to active
  $(".pagination").html(pagStr);
  // stop pagination links from going to the top of the page when clicked. It's annoying.
  $(".pagination > ul > li > a").click(function(event) {
      event.preventDefault()
    }
  );
  // construct pagination html as it's seen in the example
  $(".pagination > ul > li > a").attr("href", "#");
  //default set active class to the first element on page load
  $(".pagination > ul > li:first-child > a").attr("class", "active");
  // assign IDs to the list items for some show/hide magic later
  list.each(function(index) {
    $(this).attr("id", "student-list-item-"+(index));
  });
  //console.log($(".student-list"));
  //showing first set of students and hiding the rest
  for (var i = 0; i < studentsPerPage; i++) {
    $("#student-list-item-" + i).show();
    //console.log($("#student-list-item-" + i) + "shown");
  }
  for (var i = (studentsPerPage); i < totalStudents; i++) {
    $("#student-list-item-" + i).hide();
    //console.log($("#student-list-item-" + i) + "hidden");
  }
  // PAGINATION LINK FUNCTION
  $(".pagination > ul > li > a").click(function() {
      // hide everything in the list first, but all child elements, not parent element itself
      list.hide();
      //make pagination link class active when clicked and remove from unlicked element
      $(this).parent().parent().children().children().removeClass("active");
      $(this).addClass("active");
        //console.log($(".pagination"));
      //get integer for student list show function
      var pageLinkActive = parseInt($(".active").html());
        //console.log(pageLinkActive);
      //starting id for element to show
      var startId = pageLinkActive * studentsPerPage - studentsPerPage;
        //console.log(startId);
      //ending id for element to show
      var endId = (startId + studentsPerPage - 1);
        //console.log(endId);
      //show elements between start and end ID
      for (var i = startId; i < endId; i++) {
        $("#student-list-item-" + i).show();
      }
//click function closing braces
  });
//pagination constructor function closing braces
};
//*****************************************************************************************
//End of Phase 2

//ready function closing braces
});
