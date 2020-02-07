const inquirer = require("inquirer");
const axios = require("axios");

function main() {
  // Create variables

  let favcolor;
  let profileImage;
  let username;

  async function getColor() {
    try {
      favcolor = await inquirer.prompt({
        message: "Favorite color?",
        name: "color"
      });
      username = await inquirer.prompt({
        message: "What is your git username?",
        name: "username"
      });
    } catch (err) {
      console.log(err);
    }
  }
  getColor();
}

main();
