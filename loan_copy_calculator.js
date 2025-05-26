const readline = require("readline-sync");
const MESSAGES = require("./loan_calculator_messages.json");

// Constants
const MONTHS_IN_YEAR = 12;

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

function clearScreen() {
  console.clear();
}

function getLoanAmount() {
  prompt(messages("loanAmount"));
  let loanAmount = readline.question();

  while (invalidNumber(loanAmount)) {
    prompt(messages("invalidNumber"));
    loanAmount = readline.question();
  }

  return parseFloat(loanAmount);
}

function getAnnualPercentageRate() {
  prompt(messages("annualPercentageRate"));
  let annualPercentageRate = readline.question();

  while (invalidNumber(annualPercentageRate)) {
    prompt(messages("invalidNumber"));
    annualPercentageRate = readline.question();
  }

  return parseFloat(annualPercentageRate) / 100; // Convert percentage to decimal number
}

function getLoanDurationYears() {
  prompt(messages("loanDurationYears"));
  let loanDurationYears = readline.question();

  while (invalidNumber(loanDurationYears)) {
    prompt(messages("invalidNumber"));
    loanDurationYears = readline.question();
  }

  return Number(loanDurationYears);
}

function calculateMonthlyPayment(
  loanAmount,
  monthlyInterestRate,
  loanDurationMonths
) {
  if (monthlyInterestRate === 0) {
    return loanAmount / loanDurationMonths;
  } else {
    return (
      loanAmount *
      (monthlyInterestRate /
        (1 - Math.pow(1 + monthlyInterestRate, -loanDurationMonths)))
    );
  }
}

function displayLoanSummary(
  loanAmount,
  annualPercentageRate,
  loanDurationYears,
  monthlyPayment,
  totalPayment,
  totalInterest
) {
  prompt("\n--- Loan Summary ---");
  prompt(`Loan Amount: $${loanAmount.toFixed(2)}`);
  prompt(`Annua Percentage Rate $${(annualPercentageRate * 100).toFixed(2)}%`);
  prompt(
    `Loan Duration: ${loanDurationYears} years (${
      loanDurationYears * MONTHS_IN_YEAR
    } months)`
  );
  prompt(`Monthly Payment: $${monthlyPayment.toFixed(2)}`);
  prompt(`Total Payment: $${totalPayment.toFixed(2)}`);
  prompt(`Total Interest: $${totalInterest.toFixed(2)}`);
  prompt("-----------------------\n");
}

function runLoanCalculator() {
  prompt(messages("welcome"));

  while (true) {
    // Get Inputs
    const loanAmount = getLoanAmount();
    const annualPercentageRate = getAnnualPercentageRate();
    const loanDurationYears = getLoanDurationYears();
    const loanDurationMonths = loanDurationYears * MONTHS_IN_YEAR;

    // Calcuate Payments
    const monthlyInterestRate = annualPercentageRate / MONTHS_IN_YEAR;
    const monthlyPayment = calculateMonthlyPayment(
      loanAmount,
      monthlyInterestRate,
      loanDurationMonths
    );

    // Calculate additional information
    const totalPayment = monthlyPayment * loanDurationMonths;
    const totalInterest = totalPayment - loanAmount;

    // Display Results
    displayLoanSummary(
      loanAmount,
      annualPercentageRate,
      loanDurationYears,
      monthlyPayment,
      totalPayment,
      totalInterest
    );

    // Ask about another calculation
    prompt(
      messages("anotherCalculation") ||
        "Would you like to perform another calculation? (y/n)"
    );
    let answer = readline.question().toLowerCase();
    if (answer !== "y" && answer !== "yes") break;

    // Clear screen
    clearScreen();
  }

  prompt(messages("thanYou") || "Thank you for using the Loan Calculator!");
}

// Start the program
runLoanCalculator();
