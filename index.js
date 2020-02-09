const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");

const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

function main() {
  // Create variables

  let favcolor;
  let profileImage;
  let username;

  async function getColor() {
    color = await inquirer.prompt({
      message: "Favorite color?",
      name: "color"
    });
    username = await inquirer.prompt({
      message: "What is your git username?",
      name: "username"
    });

    username = await username.username;
    favcolor = await color.color;
    // username = username.username;
    // favcolor = favcolor.color;
    return username, favcolor;
  }

  getColor().then(() => {
    getData(username);
  });

  async function getData(username) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const data = await response.data;
      const avatar = await axios.get(`${data[0].owner.avatar_url}`);
      console.log("Number of repos: " + data.length);
      console.log(data[0].owner);
      //   console.log(avatar);
    } catch (error) {
      console.log(error);
    }
  }
}
main();
