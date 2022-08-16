getData().then((data) => {
  shuffle(data);
  console.log(data);
  generateTicketPage(data[0]);
  registerEventHandlers(data);
});

function finish() {
  const container = document.querySelector("#container");
  container.innerHTML = "";
  const h1 = document.createElement("h1");
  h1.setAttribute("class", "finish");
  h1.innerText = "დასრულდა";
  container.appendChild(h1);
  const nextButton = document.querySelector("#next");
  nextButton.setAttribute("hidden", "true");
}

function registerEventHandlers(data) {
  const nextButton = document.querySelector("#next");
  nextButton.addEventListener("click", () => nextButtonClick(data));
}

function nextButtonClick(data) {
  const last = data.pop();
  console.log(data);
  if (data.length === 0) {
    finish();
  } else {
    generateTicketPage(last);
  }
}

function generateTicketPage(src) {
  const container = document.querySelector("#container");
  container.innerHTML = "";
  const iframe = document.createElement("iframe");
  iframe.setAttribute("src", src);
  container.append(iframe);
}

function getData() {
  return fetch("./data.json", {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
