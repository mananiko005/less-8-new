"use strict";

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    let ul1 = document.createElement("ul");
    data.forEach((user) => {
      console.log(user.company.name);
      let li1 = document.createElement("li");
      li1.textContent = `${user.company.name}`;
      ul1.appendChild(li1);
    });
    document.getElementById("wraper1").appendChild(ul1);
  })
  .catch((error) => console.error("Error fetching data:", error));

let request = new XMLHttpRequest();
request.open("GET", "https://reqres.in/api/unknown");

request.addEventListener("load", function () {
  let response = this.responseText;
  let responseJs = JSON.parse(response);

  let ul = document.createElement("ul");

  responseJs.data.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.name}`;
    li.style.backgroundColor = item.color;
    li.style.color = "#fff";
    li.style.padding = "2px";
    li.style.margin = "5px";
    li.style.border = "2px solid black";
    li.style.width = "50vh";
    li.style.height = "10vh";
    li.style.color = "black";
    ul.appendChild(li);
  });

  document.getElementById("wraper").appendChild(ul);
});

request.addEventListener("error", function () {
  console.error("Request failed");
});

request.send();

let currentPage = 1;
let totalPage;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (responseData) {
      if (!responseData.ok) {
        throw "server error";
      }

      return responseData.json();
    })
    .then(function (mosuliData) {
      totalPage = mosuliData.total_pages;
      const fragment = new DocumentFragment();

      mosuliData.data.forEach((item) => {
        let li2 = document.createElement("li");
        let img = document.createElement("img");
        img.src = item.avatar;
        img.style.width = "50px";
        img.style.height = "50px";
        img.style.borderRadius = "50%";
        li2.textContent = `${item.first_name} ${item.last_name}`;
        li2.appendChild(img);
        fragment.appendChild(li2);
      });

      document.getElementById("ul-users").innerHTML = "";
      document.getElementById("ul-users").appendChild(fragment);

      updateButtonStates();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateButtonStates() {
  const loadPrevButton = document.getElementById("load-prev");
  const loadMoreButton = document.getElementById("load-more");

  loadPrevButton.disabled = currentPage === 1;
  loadMoreButton.disabled = currentPage === totalPage;
}

getUsers(currentPage);

document.getElementById("load-prev").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage = currentPage - 1;
    getUsers(currentPage);
  }
});

document.getElementById("load-more").addEventListener("click", function () {
  if (currentPage < totalPage) {
    currentPage = currentPage + 1;
    getUsers(currentPage);
  }
});
