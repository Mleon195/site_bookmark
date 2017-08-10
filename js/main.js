//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

if(!siteName || !siteUrl){
  alert('Please fill in the form');
  return false;
}


  var bookmark = {
    name: siteName,
    url: siteUrl
  };
/*
  // Local Storege Test
  localStorage.setItem('test', 'Hello World');

  console.log(bookmark);
*/
if(localStorage.getItem('bookmarks') === null){
  // Init array
  var bookmarks = [];
  //add to array
  bookmarks.push(bookmark);
  //Set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

} else {
  //Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Add bookmark to array
  bookmarks.push(bookmark);
  // re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
// Re-fetch bookmarks
  fetchBookmarks();

  //Prevent form from submitting
  e.preventDefault();
}
//Delete bookmarks
function deleteBookmark(url){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop throught bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      // remove from array
      bookmarks.splice(i, 1);
    }
  }
  //re-set back to LocalStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}


//Fetch bookmarks
function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  //Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '
                                  '</h3>'+
                                  '</div>';
  }
}
