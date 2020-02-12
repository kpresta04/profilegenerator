const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const pdf = require("html-pdf");

const colors = {
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "rgb(22, 22, 117)",
    headerColor: "white",
    photoBorderColor: "rgb(1, 3, 43)"
  },
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  purple: {
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
      type: "checkbox",
      message: "Favorite color?",
      name: "color",
      choices: ["blue", "purple", "red", "pink", "green"]
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
        `https://api.github.com/users/${username}`
      );
      const data = await response.data;
      // const avatar = await axios.get(`${data[0].owner.avatar_url}`);
      const avatar = data.avatar_url;
      // console.log("Number of repos: " + data.length);
      // console.log(data);
      let employerString;
      let bioString;
      let blogLink = "https://" + data.blog;

      data.bio === null ? (bioString = " &nbsp;") : (bioString = `${data.bio}`);

      data.company === null
        ? (employerString = "Currently seeking work")
        : (employerString = `Currently @ ${data.company}`);

      const profileHTML = generateHTML(favcolor);
      const options = { format: "Letter", height: "1188px", width: "886px" };
      fs.writeFile("test.html", profileHTML, "utf8", err => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
      pdf
        .create(profileHTML, options)
        .toFile("./businesscard.pdf", function(err, res) {
          if (err) return console.log(err);
          console.log(res); // { filename: '/app/businesscard.pdf' }
        });
      function generateHTML(favcolor) {
        return `<!DOCTYPE html>
      <html lang="en">
         <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>

            <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
            <title>Document</title>
            <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body {
         height: 100%;
         }
         .wrapper {
         background-color: ${colors[favcolor].wrapperBackground};
         padding-top: 100px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${colors[favcolor].headerBackground};
         color: ${colors[favcolor].headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 200px;
         height: 200px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${colors[favcolor].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2, .photo-header h4 {
         width: 100%;
         text-align: center;
         }
         
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
        
         }

         .row {
          
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           background-color: ${colors[favcolor].headerBackground};
           color: ${colors[favcolor].headerColor};
           margin: 20px auto;
           width: 70%;
         }
         
         .col {
           padding-top: 3em;
        
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         
          .grid{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            grid-template-areas:
             "topleft topright"
             "botleft botright";
          }
         }
         @media only screen and (max-width: 600px) {
          .card {
            width: 100%;
          }
          .grid{
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr 1fr 1fr;
          grid-template-areas:
           "topleft"
           "topright"
           "botleft"
           "botright";
        }
        }
        @media only screen and (min-width: 601px) {
          .grid{
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          grid-template-areas:
           "topleft topright"
           "botleft botright";
        }
          
          }
        #userPic{
          display: block;
          margin: 0px auto;
          
        }
        #card1{
          display: grid;
          grid-area: topleft
        }
        #card2{

          display: grid;

          grid-area: topright;
        }
        #card3{
          display: grid;

          grid-area: botleft;
        }
        #card4{
          display: grid;

          grid-area: botright;
        }
      </style>
            
            </head>
            <body>
            <div class="wrapper">

            <div class="photo-header"><img id="userPic"src="${avatar}" />
            <h1>Hi!</h1>
            <h1>My name is ${data.name}</h1>
            <h4>${employerString}</h4>
            <div class="links-nav">${data.location}
            
    <a class="nav-link" href=${data.html_url}>Github</a>
    <a class="nav-link" href=${blogLink}>Blog</a>

    </div>

            
            </div>
            </div>

            <div class="main">
            <div class="container">
            <div class="col">

              <h2>${bioString}</h2>
              <div class="grid">

             
                <div id="card1" class="card"> <h2>
                  Public Repos
                </h2>
                <h3>${data.public_repos}</h3>
                
                </div>
                <div  id="card2" class="card">
                  <h2>
                    Followers
                  </h2>
                  <h3>${data.followers}</h3>

                </div>
              
            

                <div  id="card3" class="card"> <h2>
                  Public Gists
                </h2>
                
                <h3>${data.public_gists}</h3>
                </div>
                <div  id="card4" class="card">
                  <h2>
                    Following
                  </h2>
                  <h3>${data.following}</h3>

                </div>
                
           
          </div>
          </div>

          </div>
          </div>
                <div class="wrapper"></div>

            </body>
            </html>`;
      }
      //   console.log(avatar);
    } catch (error) {
      console.log(error);
    }
  }
}
main();
