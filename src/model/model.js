export function changePage(pageName) {
  console.log(`Changing to page: ${pageName}`);
  if (pageName === "") {
    $.get("src/pages/home.html", (data) => {
      $("#app").html(data);
    });
  } else {
    $.get("src/pages/" + pageName + ".html", (data) => {
      $("#app").html(data);
    });
  }
}
