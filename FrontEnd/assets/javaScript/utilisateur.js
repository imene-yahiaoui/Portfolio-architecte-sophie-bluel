
import * as modeUtilisateur from "./mode.js";
import * as pageModelajout from "./ouvreModelajout.js";
import * as publier from "./publier.js";

/////entre a la page model
if (localStorage.getItem("token")) {

  modeUtilisateur;

  pageModelajout;
 
  /////telecharger les photos/////
  function telecharger() {
    const input = document.getElementById("img_input");

    var telecharger_image = "";

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      telecharger_image = reader.result;
      const photo = document.getElementById("image_telecharger");
      document.getElementById("image_telecharger_images").style.display = null;

      photo.style.backgroundImage = `url(${telecharger_image} )`;
      document.getElementById("model_ajout_container").style.display = "none";
    });
    reader.readAsDataURL(this.files[0]);
  }

  document.getElementById("img_input").addEventListener("change", telecharger);

  ////Envoi de fichiers a API
  document
    .getElementById("modal_ajout")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const photo = document.getElementById("img_input");
      const category = document.getElementById("categorie");
      const title = document.getElementById("input_model");

      // un msg err si le formulair pas rempli
      if (
        photo.value === null ||
        photo.value === "" ||
        category.value === null ||
        title.value === null ||
        title.value === "" ||
        category.value === ""
      ) {
        document.getElementById("msg_err").innerHTML =
          "il faut remplire le formulair ";
      } else {
        document.getElementById("msg_err").innerHTML = "";

        fetch("http://localhost:5678/api/categories").then((res) => {
          console.log(res);
          if (res.ok) {
            res.json().then((categorydata) => {
              for (let i = 0; i <= categorydata.length - 1; i++) {
                if (category.value === categorydata[i].name) {
                  categorydata[i].name = categorydata[i].id;
                  console.log(categorydata[i].id);
                  console.log(category.value);

                  const image = document.getElementById("img_input").files[0];

                  let token = localStorage.getItem("token");
                  console.log(`Bearer  ${token}`);
                  const titre = document.getElementById("input_model").value;

                  //////le size de la photo////
                  if (image.size < 4 * 1048576) {
                    const formData = new FormData();
                    formData.append("image", image);
                    formData.append("title", titre);
                    formData.append("category", categorydata[i].id);

                    //fetch works

                    fetch("http://localhost:5678/api/works", {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      body: formData,
                    })
                      .then((res) => {
                        console.log(res);
                        if (res.ok) {
                          res.json().then((data) => {
                            console.log(data);
                            // alert("le projet été ajouté avec succès")
                            const mesageAjout =
                              document.getElementById("mesageAjout");
                            mesageAjout.style.backgroundColor = "red";
                            mesageAjout.style.color = "white";
                         
                            mesageAjout.innerText =
                              "le projet été ajouté avec succès";
                             
                              for(let i = 0 ; i<260000; i++){
                                console.log(i)
                              }
                            /*
//eface le message 
function msgdelet(){
  mesageAjout.style.backgroundColor=null;
  mesageAjout.style.color=null
  mesageAjout.innerText=""
}
setTimeout(msgdelet , 30000); 
*/
                          });
                          
                        }
                      })
                       .then((res) => res.json())
                      //

                      .catch((err) => console.log("il ya un problem" + err));
                  
                  } else {
                    console.log("la photo est trop grand ");
                  }

                }
              }
            });
          }
        });
      }
    });

    publier
 
}
