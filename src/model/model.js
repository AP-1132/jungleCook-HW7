export function changePage(pageName, callback) {
  let pageUrl = "";
  if (pageName === "" || pageName === "home") {
    pageUrl = "pages/home.html";
  } else {
    pageUrl = "pages/" + pageName + ".html";
  }

  $.get(pageUrl, (data) => {
    $("#app").html(data);
    if (callback) {
      callback();
    }
  }).fail(function () {
    console.error(`Failed to load page: ${pageUrl}`);
  });
}
