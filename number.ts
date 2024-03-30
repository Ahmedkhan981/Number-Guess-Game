import inquirer from "inquirer";
import chalk from "chalk";

let guessNumber: any;

const compNumber: number = Math.floor(Math.random() * 100) + 1;
console.log(chalk.hex("#000080")(compNumber));

let attempt: number = 0;

while (guessNumber !== compNumber && attempt <= 10) {
    const userAnswer = await inquirer.prompt([
        {
            name: "userNumber",
            type: "number",
            message: "Enter your number for the game",
            validate:(value) => {
                if (isNaN(value) || value < 1 || value > 100) {
                return "Please enter a valid number between 1 and 100.";
                }
                return true;
            },
        },
    ]);
    guessNumber = userAnswer.userNumber;
    attempt++;

    if (guessNumber === compNumber) {
        console.log(chalk.greenBright.bold(`Congratulations! You guessed the right number.`));
    } else if (guessNumber < compNumber) {
        console.log(chalk.redBright(`Too low! Guess again.`));
    } else {
        console.log(chalk.blueBright(`Too high! Guess again.`));
    }
}

if (guessNumber === compNumber) {
    console.log(chalk.underline.bold.cyanBright(`You took ${attempt} attempts.`));
} else {
    console.log(chalk.underline.bold.magentaBright("You ran out of guesses. The number was:", compNumber));
}
