const inquirer = require("inquirer");
const fs = require("fs");

// questions the user will be asked
const questions = [
  
    {
      message: "Press ENTER to continue...",
      name: "enterKey",
    },
    {
      type: "input",
      message: "What is the title of your project?",
      name: "Title",
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "";
        }
      },
    },
    {
      type: "input",
      message: "Give a description of the project",
      name: "Description",
    },
    {
      type: "input",
      message: "Provide a Table of Contents",
      name: "Contents",
    },
    {
      type: "input",
      message: "Enter installation instructions",
      name: "Installation",
    },
    {
      type: "input",
      message: "What will this project be used for?",
      name: "Useage",
    },
    {
      type: "input",
      message: "Who Contributed to this project?",
      name: "Contributors",
    },
    {
      type: "input",
      message: "Does this project invlude tests?",
      name: "Tests",
    },
    {
      type: "input",
      message: "How will people contact you with questions? Email/Git-Hub",
      name: "Contact",
    },
    {
      type: "list",
      message: "Select license",
      name: "License",
      choices: ["MIT", "Apache", "Mozilla", "None"],
    },
  
];
// creating the license based on what the user chooses
function renderLicense(data) {
  if (data.License === "MIT") {
    return "[MIT](https://mit-license.org)";
  } else if (data.License === "Apache") {
    return "[Apache](http://www.apache.org/licenses/LICENSE-2.0)";
  } else if (data.License === "Mozilla") {
    return "[Mozilla](https://www.mozilla.org/en-US/MPL/2.0/)";
  } else if (data.License === "None") {
    return "No License";
  }
}

// renders the license section near the top of the README
function renderLicenseSection(data) {
  if (data.License != "None") {
    return `This application is licensed by [${data.License}](${renderLicense(
      data
    )}).`;
  } else {
    return "No License";
  }
}

// function to create the README based on the answers given, and to write the file. Called at the bottom of the page
function init() {
  inquirer.prompt(questions).then(function (data) {
    const markdown = `${data.Title}
     ${renderLicenseSection(data)}
     ## Description
     ${data.Description}


     ## Table of Contents
     ${data.Contents}


     ## Installation
     ${data.Installation}

     ## Useage
     ${data.Useage}

     ## License
     ${renderLicense(data)}

     ## Contributors
     ${data.Contributors}

     ## Test
     ${data.Tests}

     ## Contact
     ${data.Contact}`;

    fs.writeFile("GeneratedREADME.md", markdown, (err) => {
      err ? console.log("Error") : console.log("Success");
    });
  });
}

init();
