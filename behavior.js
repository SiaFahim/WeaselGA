

// GitHub card script

(function() {
  $(document).ready(function() {

    // Gets the full repo name from the data attribute and
    // fetches the data from the api.
    $('[data-gh-project]').each(function() {
      var $proj = $(this);
      var repo = $proj.data('gh-project');
      $.get('https://api.github.com/repos/' + repo).success(function(data) {
        $proj.find('.fork a').text(data.forks_count);
        $proj.find('.star a').text(data.stargazers_count);
      });
    });

  });
})();


document.addEventListener("DOMContentLoaded", function(event) {

var thumbnailElement = document.getElementById("smart_thumbnail");

thumbnailElement.addEventListener("click", function() {
	var thumbnailElement = document.getElementById("smart_thumbnail");
	thumbnailElement.className;

	if (thumbnailElement.className == "small") {
		thumbnailElement.className = "";}

		else {
			thumbnailElement.className = "small";
		}
  
  
});

});