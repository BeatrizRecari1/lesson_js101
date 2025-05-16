// Ask the user for the loan amount
// Ask the user for Annua Percentage Rate, ask for the number only
// Ask the user for the loan duration in years
// Perform the operation
// Print the result on the screen with $ sign and two decimal points

const readline = require("readline-sync");
const MESSAGES = require("./loan_calculator_messages.json");

function messages(message) {
  return MESSAGES[message];
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return (
    number.trim() === "" ||
    Number.isNaN(parseFloat(number)) ||
    parseFloat(number) < 0
  );
}

prompt(messages("welcome"));

while (true) {
  // Get and validate loan amount
  prompt(messages("loanAmount"));
  let loanAmount = readline.question();

  while (invalidNumber(loanAmount)) {
    prompt(messages("invalidNumber"));
    loanAmount = readline.question();
  }
  loanAmount = parseFloat(loanAmount);

  // Get and validate APR
  prompt(messages("annualPercentageRate"));
  let annualPercentageRate = readline.question();

  while (invalidNumber(annualPercentageRate)) {
    prompt(messages("invalidNumber"));
    annualPercentageRate = readline.question();
  }
  annualPercentageRate = parseFloat(annualPercentageRate) / 100; // Convert percentage to decimal

  // Get and validate loan duration
  prompt(messages("loanDurationYears"));
  let loanDurationYears = readline.question();

  while (invalidNumber(loanDurationYears)) {
    prompt(messages("invalidNumber"));
    loanDurationYears = readline.question();
  }
  loanDurationYears = Number(loanDurationYears);
  let loanDurationMonths = loanDurationYears * 12;

  // Calculate monthly payment
  const monthlyInterestRate = annualPercentageRate / 12;

  let monthlyPayment;
  if (monthlyInterestRate === 0) {
    monthlyPayment = loanAmount / loanDurationMonths;
  } else {
    monthlyPayment =
      loanAmount *
      (monthlyInterestRate /
        (1 - Math.pow(1 + monthlyInterestRate, -loanDurationMonths)));
  }

  // Display result
  prompt(`The monthly payment is: $${monthlyPayment.toFixed(2)}`);

  // Ask if the user wants to perform another calculation
  prompt(
    messages("anotherCalculation") ||
      "Would you like to perform another calculation? (y/n)"
  );
  let answer = readline.question().toLowerCase();
  if (answer !== "y" && answer !== "yes") break;
}

prompt(messages("thankYou"));
