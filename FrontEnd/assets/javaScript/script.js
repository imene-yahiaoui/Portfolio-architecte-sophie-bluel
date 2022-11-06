const btn_tous = document.getElementById("btn_tous");

const gallery = document.querySelector(".gallery");

function info(work) {
  const card = `
    <figure >
    <img src="${work.imageUrl}">
      <figcaption>${work.title}</figcaption>
    </figure>
          `;

  document.querySelector(".gallery").insertAdjacentHTML("beforeend", card);
}

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
            //tout
            function tout() {
              document.querySelector(".gallery").innerHTML = "";

              let i = 0;
              for (i = 0; i <= numSlid; i++) {
                info(data[i]);
              }
            }

            btn_tous.addEventListener("click", tout);

            /////cree des btn  object////
            let count = 0;

            console.log();

            for (let count = 0; count <= category.length - 1; count++) {
              const object = document.createElement("button");
              object.type = "button";
              object.innerHTML = category[count].name;
              object.className = "btn_option";
              object.onclick = function () {
                document.querySelector(".gallery").innerHTML = "";

                for (let i = 0; i <= numSlid; i++) {
                  if (data[i].category.name === category[count].name) {
                    console.log(count);
                    info(data[i]);
                  }
                }
              };
              const button = document.getElementById("btn");
              button.appendChild(object);
            }

            tout();
          });
        } else {
          console.log("Error");
        }
      });
    });
  }
});

if (localStorage.getItem("token")) {
  document.getElementById("login").innerText = "logout";
}
