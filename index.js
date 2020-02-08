const inquirer = require("inquirer");
const axios = require("axios");

function main() {
  // Create variables

  let favcolor;
  let profileImage;
  let username;

  async function getColor() {
    favcolor = await inquirer.prompt({
      message: "Favorite color?",
      name: "color"
    });
    username = await inquirer.prompt({
      message: "What is your git username?",
      name: "username"
    });

    username = await username.username;
    favcolor = await favcolor.color;
    // username = username.username;
    // favcolor = favcolor.color;
    return username, favcolor;
  }

  getColor().then(() => {
    // console.log(username)

    getData(username);
  });

  async function getData(username) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const data = await response.data;
      console.log("Number of repos: " + data.length);
      console.log(data[0].owner);
    } catch (error) {
      console.log(error);
    }
  }
}
main();
