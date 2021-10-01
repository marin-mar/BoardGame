function fillBoard() {
  const board = document.querySelector("#board");
  const scoreContainer = document.querySelector(".score-container");
  const score = document.querySelector("#score");

  const colors = [
    "#EDE0D4",
    "#E6CCB2",
    "#DDB892",
    "#B08968",
    "#7F5539",
    "#9C6644",
    "#CB997E",
    "#DDBEA9",
    "#FFE8D6",
    "#B7B7A4",
    "#A5A58D",
    "#6B705C",
  ];

  const boardWidth = Math.floor(board.clientWidth / 30);
  const boardHeight = Math.floor(board.clientHeight / 30);
  const boardBox = boardWidth * boardHeight;

  let count = (from = 0);
  let speed = 1000;

  for (let i = 0; i < boardBox; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.addEventListener("click", (e) => {
      if (e.target === square) {
        countScore(square);
      }
    });

//     square.addEventListener("mousemove", () => setColor(square));

    square.addEventListener("mouseleave", () => removeColor(square));

    board.append(square);
  }

  function countScore(element) {
    if (
      !element.style.backgroundColor ||
      element.style.backgroundColor === "rgb(29, 29, 29)" ||
      element.style.backgroundColor === "#1d1d1d"
    ) {
      count--;
    } else {
      count++;
    }
    score.textContent = count;

    if (score.textContent < 0) {
      scoreContainer.innerHTML = `
        <span class="danger">Вы проиграли. Попробуйте снова.</span>
        <button class="game-again-btn" type=button>Начать сначала</button>
      `;
      const gamAgainBtn = document.querySelector(".game-again-btn");
      gamAgainBtn.addEventListener(
        "click",
        setTimeout(() => location.reload(), 5000)
      );
    } else if (score.textContent < 11) {
      speed = 1000;
    } else if (score.textContent < 21) {
      speed = 600;
    } else if (score.textContent < 31) {
      speed = 400;
    } else {
      speed = 100;
    }
  }

  function setColor(element) {
    const color = getRandomColor(colors);
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  }

  function removeColor(element) {
    element.style.backgroundColor = "#1d1d1d";
    element.style.boxShadow = `0 0 2px #000`;
  }

  function getRandomColor() {
    const idx = Math.floor(Math.random() * colors.length);
    return colors[idx];
  }

  const squares = document.querySelectorAll(".square");

  function getRandomSquare() {
    let randomSquare = Math.floor(Math.random() * boardBox);
    return randomSquare;
  }

  function go() {
    let element = getRandomSquare();
    setColor(squares[element]);

    if (from == boardBox) {
      clearInterval(timer);
    }

    from++;
  }

  go();
  let timer = setInterval(go, speed);
}

fillBoard();
