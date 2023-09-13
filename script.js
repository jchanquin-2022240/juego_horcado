//Referencias iniciales
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Valores de opciones para botones
let options = {
  Iniciar: [
    "Arbol",
    "Computadora",
    "Television",
    "Casa",
    "Felicidades",
    "Chamalito",
    "Guitarra",
    "Playa",
    "Escuela",
    "Electricidad",
    "Lapiz",
    "Moto",
    "Teclado",
    "Sandia",
    "Enfermo",
    "cuaderno",
    "pantalon",
    "monitor",
    "silla",
    "cuadro",
    "tarea",
    "pista",
    "Pedro",
    "corazon",
    "carrera"
  ]
};

//contar
let winCount = 0;
let count = 0;

let chosenWord = "";

//Mostrar botones de opción
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Juego Horcado</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

const blocker = () => {

  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //desactivar todas las opciones
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //desactivar todas las letras
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Generador de palabras
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");

    }
    button.disabled = true;
  });

  //inicialmente ocultar letras, borrar palabra anterior
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //Elegir palabra al azar
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //reemplace cada letra con un espacio que contenga un guión
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Mostrar cada elemento como intervalo
  userInputSection.innerHTML = displayItem;
};

const initializer = () => {
  winCount = 0;
  count = 7;

  const contadorErroresElement = document.getElementById("contador-errores");
  contadorErroresElement.textContent = "Oportunidades: 7";

  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Ganaste</h2><p>La palabra era <span>${chosenWord}</span></p>`;
              blocker();
            }
          }
        });
      } else {

        //pierde contador
        count -= 1;
        //para dibujar el monito
        drawMan(count);
        const contadorErroresElement = document.getElementById("contador-errores");
        contadorErroresElement.textContent = `Oportunidades: ${count}`;
        //Count ==7 por cuerda,head,body,left arm, right arm,left leg,right leg
        if (count == 0) {
          resultText.innerHTML = `<h2 class='lose-msg'>Perdiste!</h2><p>La palabra era <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const cuerda = () => {
    drawLine(250, 30, 250, 10);
  }

  const head = () => {
    context.beginPath();
    context.arc(250, 40, 10, 15, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(250, 50, 250, 80);
  };

  const leftArm = () => {
    drawLine(250, 65, 230, 50);
  };

  const rightArm = () => {
    drawLine(250, 65, 270, 50);
  };

  const leftLeg = () => {
    drawLine(250, 80, 230, 100);
  };

  const rightLeg = () => {
    drawLine(250, 80, 270, 100);
  };

  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 10, 10, 150);
    drawLine(10, 10, 250, 10);
  };

  return { initialDrawing, cuerda, head, body, leftArm, rightArm, leftLeg, rightLeg };
}


//draw the man
const drawMan = (count) => {
  let { cuerda, head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 6:
      cuerda();
      break;
    case 5:
      head();
      break;
    case 4:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 2:
      rightArm();
      break;
    case 1:
      leftLeg();
      break;
    case 0:
      rightLeg();
      break;
    default:
      break;
  }
};


//reiniciar juego
newGameButton.addEventListener("click", initializer);
window.onload = initializer;