const options = document.querySelectorAll('.option input');
const generateButt = document.querySelector('.generate-btn');
const copyIcon = document.querySelector(".input-box span");

const inputField = document.querySelector('.input-box input');
const passIndicator = document.querySelector(".pass-indicator");
const lengthSlider = document.querySelector(".pass-length input");

characters = {
    lowercase:"abcdefghijklmnopqrstuvwxyz" ,
    uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ" ,
    numbers:"0123456789" ,
    symbols:"!$%&|[](){}:;.,*+-#@<>~"
}


const generator = () => {
    let staticPass = "";
    let randomPass = "";
    let excludeDuplicate = false;
    passLength = lengthSlider.value;


    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPass += characters[option.id];
            } else if (option.id === "spaces") {
                staticPass += `  ${staticPass}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });
    console.log(staticPass);
    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPass[Math.floor(Math.random() * staticPass.length)];
        if (excludeDuplicate) {
            !randomPass.includes(randomChar) || randomChar == " " ? randomPass += randomChar : i--;
        } else {
            randomPass += randomChar;
        }
    }

    inputField.value = randomPass;
 }
const updateSlider = () => {
    document.querySelector('.pass-length span').innerText = lengthSlider.value;
    generator();
    updatePassIndicator();

}
const updatePassIndicator = () => {

    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}
updateSlider();
const copyPassword = () => {
    navigator.clipboard.writeText(inputField.value); 
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);

}

generateButt.addEventListener('click',generator);

copyIcon.addEventListener("click", copyPassword);

lengthSlider.addEventListener("input", updateSlider);
