document.addEventListener('DOMContentLoaded', function() {
  var carets = document.getElementsByClassName("caret");
  for (var i = 0; i < carets.length; i++) {
    carets[i].addEventListener("click", function() {
      this.classList.toggle("caret-down");
      var postList = this.nextElementSibling;
      postList.classList.toggle("active");
    });
  }
  // Expand the most recent year by default
  if (carets.length > 0) {
    carets[0].click();
  }
}); 