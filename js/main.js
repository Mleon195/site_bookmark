//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

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

  //Prevent form from submitting
  e.preventDefault();
}
