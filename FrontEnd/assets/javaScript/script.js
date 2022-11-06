
console.log("moi je marche");


const btn_tous = document.getElementById("btn_tous");

const gallery = document.querySelector(".gallery");

//fetch works
fetch("http://localhost:5678/api/works").then((res) => {
  console.log(res);
  if (res.ok) {
    res.json().then((data) => {
      const numSlid = data.length;

      //fetch categoris
      fetch("http://localhost:5678/api/categories").then((res) => {
        console.log(res);
        if (res.ok) {
          res.json().then((category) => {
            function info(i) {
              const card = `
  <figure >
  <img src="${data[i].imageUrl}">
 
  <figcaption>${data[i].title}</figcaption>
  </figure>
         `;

              document
                .querySelector(".gallery")
                .insertAdjacentHTML("beforeend", card);
            }

            //tout
            function tout() {
             document.querySelector(".gallery").innerHTML = "";

              let i = 0;
              for (i = 0; i <= numSlid; i++) {
                info(i);
              }
            }

            btn_tous.addEventListener("click", tout);

            /////cree des btn  object////

            const object = document.createElement("button");
            object.type = "button";
            object.innerHTML = category[0].name;
            object.id = "btn_objets";
            object.onclick = function () {
              document.querySelector(".gallery").innerHTML = "";
              let i = 0;
              for (i = 0; i <= numSlid; i++) {
                if (data[i].category.name == "Objets") {
                  info(i);
                }
              }
            };

            const button = document.getElementById("btn");
            button.appendChild(object);

            /////cree des btn  appartements////

            const appartements = document.createElement("button");
            appartements.type = "button";
            appartements.innerHTML = category[1].name;
            appartements.id = "btn_appartements";
            appartements.onclick = function () {
              document.querySelector(".gallery").innerHTML = "";
              let i = 0;

              for (i = 0; i <= numSlid; i++) {
                if (data[i].category.name === category[1].name) {
                  info(i);
                }
              }
            };

            const apart = document.getElementById("btn");
            apart.appendChild(appartements);

            /////cree des btn  hôtels////

            const hôtels = document.createElement("button");
            hôtels.type = "button";
            hôtels.innerHTML = category[2].name;
            hôtels.id = "btn_hôtels";
            hôtels.onclick = function () {
              document.querySelector(".gallery").innerHTML = "";
              let i = 0;
              for (i = 0; i <= numSlid; i++) {
                if (data[i].category.name === category[2].name) {
                  info(i);
                }
              }
            };

            const resto = document.getElementById("btn");
            resto.appendChild(hôtels);

            tout();
          });
          
        } else {
          console.log("Error");
          document.getElementById("error").innerHTML = "Error :(";
        }
      });
    });
  }
});
