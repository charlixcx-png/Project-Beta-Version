const gridElement = document.getElementById('grid');
const gridSize = 19; 
const wordList = [
    { word: "DISSATISFACTION", start: [0, 0], direction: "horizontal" },
    { word: "FAIRWAGES", start: [0, 8], direction: "vertical" },
    { word: "CIRCULARECONOMY", start: [0, 10], direction: "vertical" },
    { word: "UPCYCLING", start: [4, 10], direction: "horizontal" },
    { word: "CARBONFOOTPRINT", start: [4, 12], direction: "vertical" },
    { word: "ECOTURISM", start: [8, 10], direction: "horizontal" },
    { word: "SLOWFASHION", start: [10, 8], direction: "horizontal" },
    { word: "MINIMALISM", start: [8, 18], direction: "vertical" },
    { word: "AWARENESS", start: [8, 0], direction: "horizontal" },
    { word: "MINDFUL", start: [6, 0], direction: "horizontal" },
    { word: "GREENWASHING", start: [2, 2], direction: "vertical" },
    { word: "CONSUMPTION", start: [13, 5], direction: "horizontal" },
    { word: "LOCAL", start: [12, 14], direction: "vertical" },
    { word: "ZEROWASTE", start: [10, 6], direction: "vertical" },
    { word: "PLASTIC", start: [17, 2], direction: "horizontal" },
    { word: "FAIRTRADE", start: [15, 0], direction: "horizontal" },
    { word: "LANDFILL", start: [11, 0], direction: "vertical" },

];

const cells = {}; 
function createGrid() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            const letterInfo = getLetterAtPosition(row, col);
            if (letterInfo) {
                if (!cells[`${row}-${col}`]) {
                    const input = document.createElement('input');
                    input.maxLength = 1;
                    cell.appendChild(input);
                    cells[`${row}-${col}`] = { input, letter: letterInfo.letter };
                }
            } else {
                cell.classList.add('filled');
            }

            gridElement.appendChild(cell);
        }
    }
}

function getLetterAtPosition(row, col) {
    for (const { word, start, direction } of wordList) {
        const [startRow, startCol] = start;

        if (direction === "horizontal" && row === startRow && col >= startCol && col < startCol + word.length) {
            return { letter: word[col - startCol], direction };
        }

        if (direction === "vertical" && col === startCol && row >= startRow && row < startRow + word.length) {
            return { letter: word[row - startRow], direction };
        }
    }
    return null;
}

function checkAnswers() {
    let allCorrect = true;

    Object.values(cells).forEach(({ input }) => {
        input.classList.remove('correct', 'incorrect');
    });

    for (const { word, start, direction } of wordList) {
        const [startRow, startCol] = start;
        let isWordCorrect = true;

        for (let i = 0; i < word.length; i++) {
            const row = direction === "horizontal" ? startRow : startRow + i;
            const col = direction === "horizontal" ? startCol + i : startCol;

            const cellData = cells[`${row}-${col}`];
            if (cellData) {
                const expectedLetter = word[i];
                if (cellData.input.value.toUpperCase() === expectedLetter) {
                    cellData.input.classList.add('correct');
                } else {
                    cellData.input.classList.add('incorrect');
                    isWordCorrect = false;
                }
            }
        }

        if (!isWordCorrect) {
            allCorrect = false;
        }
    }

    alert(allCorrect ? "All answers are correct, congratulations!" : "Some words or letters are incorrect, check and try again.");
}

createGrid();

document.addEventListener("scroll", function() {
    const title = document.querySelector(".animated-title");
    const titlePosition = title.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
  
    if (titlePosition < windowHeight) {
      title.classList.add("active");
    }
  });

  document.addEventListener("scroll", function() {
    const statCards = document.querySelectorAll(".stat-card");
    const windowHeight = window.innerHeight;
  
    statCards.forEach(card => {
      const cardPosition = card.getBoundingClientRect().top;
  
      if (cardPosition < windowHeight - 50) { // Ajuste para activar un poco antes
        card.classList.add("active");
      }
    });
  });
  
