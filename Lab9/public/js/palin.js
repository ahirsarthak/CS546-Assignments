const form = document.getElementById("form");
const Ol = document.getElementById("attempts");

form.onsubmit = function (event) {
  event.preventDefault();
  const enteredString = document.getElementById("phrase");

  try {
    let string = enteredString.value;
    if (!string) {
      alert("Enter a phrase/string.");
      return;
    }
    var re = /[^A-Za-z0-9]/g;
    string = string.toLowerCase().replace(re, "");
    var len = string.length;
    let reverse = "";
    for (let i = len - 1; i >= 0; i--) {
      reverse += string[i];
    }
    let li = document.createElement("li");
    li.innerHTML = string;
    let cls = "not-palindrome";
    if (string === reverse) {
      cls = "is-palindrome";
    }
    li.setAttribute("class", cls);

    Ol.appendChild(li);
    form.reset();
  } catch (e) {
    const message = typeof e === "string" ? e : e.message;
  }
};
