$(document).ready(function () {
  counter = 0;

  let requestConfig = {
    method: "GET",
    url: "http://api.tvmaze.com/shows",
  };
  $.ajax(requestConfig)
    .then(function (shows) {
      $.each(shows, function (num, data) {
        counter++;
        $("#showList").append(
          "<li class='showlink'><a data-page=" +
            counter +
            " href=" +
            data._links.self.href +
            ">" +
            data.name +
            "</a></li>"
        );
      });
    })
    .then(function () {
      $("#showList").css({ display: "block" });
    });
});

(function ($) {
  var search_term = $("#search_term");
  $("#searchForm").submit(function (event) {
    search_term = search_term.val();
    event.preventDefault();
    try {
      if (
        search_term === undefined ||
        search_term === "" ||
        search_term === null ||
        $.trim(search_term) === ""
      ) {
        throw "Enter Search Term";
      }
      $("#showList").empty();
      let requestConfigg = {
        method: "GET",
        url: "http://api.tvmaze.com/search/shows?q=" + search_term,
      };
      $.ajax(requestConfigg).then(function (results) {
        $.each(results, function (num, data) {
          $("#showList").append(
            "<li class='showlink'><a href=" +
              data.show._links.self.href +
              ">" +
              data.show.name +
              "</a></li>"
          );
        });
      });
    } catch (e) {
      alert(" enter a  search Term");
    }
  });

  $("#showList").on("click", "li.showlink a", function (event) {
    event.preventDefault();
    $("#showList").css({ display: "none" });
    $("#show").empty();

    $.ajax({
      method: "GET",
      url: event.target.href,
    }).then(function (data) {
      if (!data.name) {
        data.name = "N/A";
      }
      if (!data.language) {
        data.language = "N/A";
      }
      if (!data.genres) {
        data.language = "N/A";
      }
      if (!data.rating.average) {
        data.rating.average = "N/A";
      }
      if (!data.network.name) {
        data.network.name = "N/A";
      }
      if (!data.summary) {
        data.summary = "N/A";
      }

      let h1 = `<h1>${data.name}</h1>`;
      $("#show").append(h1);
      if (data.image) {
        let img = `<img src='${data.image.medium}'>`;
        $("#show").append(img);
      } else {
        let img = `<img src='../public/img/no_image.jpeg'>`;
        $("#show").append(img);
      }
      let language;
      if (data.language)
        language = `<dt>Language</dt><dd>${data.language}</dd>`;
      let genre = "<dt>Genres</dt><dd><ul>";
      if (data.genres.length != 0) {
        for (let g of data.genres) genre += `<li>${g}</li>`;
        genre += `</ul></dd>`;
      }
      let average;
      if (data.rating.average)
        average = `<dt>Average Rating</dt><dd>${data.rating.average}</dd>`;
      let networkName;
      if (data.network)
        networkName = `<dt>Network</dt><dd>${data.network.name}</dd>`;

      let summary;
      if (data.summary) summary = `<dt>Summary</dt><dd>${data.summary}</dd>`;
      let dl = `<dl>
        ${language} 
        ${genre}
        ${average}
        ${networkName}
        ${summary}
      </dl>`;
      $("#show").append(dl);
      $("#show").show();
      $("#homeLink").css({ display: "block" });
    });
  });
})(window.jQuery);
