import $ from "jquery";

function getPagesList() {
  $.get(
    "./api",
    data => {
      const filesList = $(".files-list");

      filesList.text("");
      data.forEach(file => {
        filesList.append(`<h2>${file}</h2>`);
      });
    },
    "JSON"
  );
}

getPagesList();
$("form").on("submit", e => {
  e.preventDefault();

  $.post(
    "./api/createNewHTMLPage.php",
    {
      name: $("input").val(),
    },
    getPagesList
  ).fail(e => {
    console.log(e.status, e.statusText, "Такая страница уже существует...");
  });
});

$(".files-list").on("click", ({ target }) => {
  const file = $(target).closest("h2");

  if (file.length && confirm(`Удалить файл: ${file.text()}?`)) {
    $.post(
      "./api/removeNewHTMLPage.php",
      {
        name: file.text(),
      },
      getPagesList
    ).fail(e => {
      console.log(e.status, e.statusText, "Такого файла несуществует...");
    });
  }
});
