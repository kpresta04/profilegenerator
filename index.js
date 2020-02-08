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

// const getData = async url => {
//     try {
//       const response = await axios.get(url);
//       const data = response.data;
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

main();
