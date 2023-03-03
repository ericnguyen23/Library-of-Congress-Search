var searchButton = document.getElementById("search-button");
var searchField = document.getElementById("search-field");
var selectField = document.getElementById("select-field");
var resultsBox = document.getElementById("results-box");
var searchTerm = "basketball";
var searchFormat = "search";

function getData(searchTerm, searchFormat) {
  fetch(`https://www.loc.gov/${searchFormat}/?q=${searchTerm}&fo=json`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayResults(data);
    });
}

function displayResults(data) {
  var results = data.results;

  for (var i = 0; i < data.results.length; i++) {
    // creat content div
    var resultDiv = document.createElement("div");
    resultDiv.setAttribute("style", "border:1px solid #dddddd;");
    resultDiv.setAttribute("class", "card col-12 col-md-2 p-3 m-3");
    // create image
    var imgEl = document.createElement("img");
    imgEl.setAttribute("class", "img-fluid");
    if (results[i].image_url[0] === undefined) {
      imgEl.setAttribute(
        "src",
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
      );
    } else {
      imgEl.setAttribute("src", results[i].image_url[0]);
    }

    // create h4
    var headingEl = document.createElement("h4");
    headingEl.textContent = results[i].title;
    // create desc
    var descriptionEl = document.createElement("p");
    descriptionEl.textContent = results[i].description[0];
    // create desc
    var descriptionEl = document.createElement("p");
    descriptionEl.textContent = results[i].description[0];
    // create link
    var linkEl = document.createElement("a");
    linkEl.textContent = results[i].url;
    linkEl.setAttribute("target", "_blank");
    linkEl.setAttribute("href", results[i].url);

    // append
    resultDiv.append(imgEl, headingEl, descriptionEl, linkEl);
    resultsBox.append(resultDiv);
  }
}

searchButton.addEventListener("click", function () {
  searchTerm = searchField.value;
  searchFormat = selectField.value;

  getData(searchTerm, searchFormat);
});
