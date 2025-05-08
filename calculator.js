// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for an operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.

const readline = require("readline-sync");
const MESSAGES = require("./calculator_messages.json");
const LANGUAGE = "en"; // Can be changed to 'es' for Spanish

function messages(message, lang = LANGUAGE) {
  return MESSAGES[lang][message];
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === "" || Number.isNaN(Number(number));
}

prompt(messages("welcome"));

while (true) {
  prompt(messages("firstNumber"));
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(messages("invalidNumber"));
    number1 = readline.question();
  }

  prompt(messages("secondNumber"));
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(messages("invalidNumber"));
    number2 = readline.question();
  }

  prompt(messages("operation"));
  let operation = readline.question();

  while (!["1", "2", "3", "4"].includes(operation)) {
    prompt(messages("correctNumber"));
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case "1": // addition
      output = Number(number1) + Number(number2);
      break;
    case "2": // subtraction
      output = Number(number1) - Number(number2);
      break;
    case "3": // multiplication
      output = Number(number1) * Number(number2);
      break;
    case "4": // division
      output = Number(number1) / Number(number2);
      break;
  }

  prompt(`The result is: ${output}`);

  prompt(messages("newOperation"));
  let answer = readline.question();

  // Handle both English 'y' and Spanish 's'
  if (LANGUAGE === "en" && answer[0].toLowerCase() !== "y") break;
  if (LANGUAGE === "es" && answer[0].toLowerCase() !== "s") break;
}
