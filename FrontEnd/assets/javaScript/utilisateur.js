import * as pageModelajout from "./ouvreModelajout.js";
import * as ajoutData from "./ajouteData.js";
import * as telechargerphoto from "./telechargerImage.js";

/////entre a la page model
if (localStorage.getItem("token")) {
  //replacer le login par logout
  document.getElementById("login").innerText = "logout";
  //remove btn tout
  document.getElementById("btn").remove(btn_tous);

  /////creé div de modification

  document.getElementById("modifer").style.backgroundColor = "black";

  //edition
  const edition = document.createElement("p");
  edition.type = "button";

  //////la fonction de modifier/////
  const modification = `
<div>
<i class="fa-regular fa-pen-to-square"></i>
<p>Mode édition</p>  </div>`;
  edition.insertAdjacentHTML("afterbegin", modification);
  edition.className = "edition";
  edition.onclick = function () {
    const modifier = `
<div id= "modifier">
<i class="fa-regular fa-pen-to-square"></i>
<p>modifier</p>  </div>`;

    const modifier_model = `
<a href ="#modal"></a>
<div id= "modifier_model">
<i class="fa-regular fa-pen-to-square"></i>
<p>modifier</p>  </div>`;

    document
      .getElementById("portfolio_titre")
      .insertAdjacentHTML("afterend", modifier_model);
    document
      .getElementById("introduction_article")
      .insertAdjacentHTML("afterbegin", modifier);
    document
      .getElementById("introduction_photo")
      .insertAdjacentHTML("beforeend", modifier);

    ///afficher le photos
    function photos(works) {
      const photo_modal = `
          <figure id ="${works.id}">
          
          <div id="repertoire_modal" class="photo_model_efface">
          <img src="${works?.imageUrl} "crossOrigin="anonymous">
         
          <i id ="${works.id}" class="fa-regular fa-trash-can "></i>
       
          </div>
          
            <figcaption>éditer</figcaption>
          </figure>
                `;

      document
        .getElementById("model_gallery")
        .insertAdjacentHTML("beforeend", photo_modal);
    }

    let token = localStorage.getItem("token");
    fetch("http://localhost:5678/api/works")
      .then((res) => {
        console.log(res);
        if (res.ok) {
          res.json().then((data) => {
            console.log("data" ,data);
            function affiche_model() {
              let i = 0;
              for (i = 0; i <= data.length - 1; i++) {
                photos(data[i]);
              }
            }

            affiche_model();


            ////////////delet//////////////:
            for (let counter = 1; counter <= data.length; counter++) {
              function delet() {
                data[counter].id;

                console.log(`${data[counter]?.id}`);
                localStorage.setItem( "id", `${[data[counter].id]}`)
 
 
 console.log(data[counter].id )
 //suprimer les projet 
 
  var element = document.getElementById(data[counter].id);

element.remove();
  
var element2 = document.getElementById(`A${data[counter].id}`);

element2.remove();
 

 
              }

              var id = document.getElementById(`${data[counter]?.id}`);
              if (id) {
                id.addEventListener("click", delet);
              }
console.log(localStorage.getItem("id"))


             function deleteProject(){

               fetch("http://localhost:5678/api/works/" + localStorage.id, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((res) => res.json())

                  .catch((err) => console.log("il ya un problem" + err));
             }

              if (localStorage.getItem("id")) {
                deleteProject();
                localStorage.removeItem("id")
              }
            }
          });
        }
      })

      .catch((err) => console.log(err));

    let page = null;

    ///////////////////////ouvre modal////////////////////
    function ouvre_modal(e) {
      e.preventDefault;
      const target = document.getElementById("modal");
      target.style.display = null;
      target.removeAttribute("aria-hidden");
      page = target;
      page?.addEventListener("click", ferme_modal);
      page
        .querySelector(".js_modal_stop")
        .addEventListener("click", stopPropagation);
      //le modal ferme quand on click d'hors
    }

    document
      .getElementById("modifier_model")
      .addEventListener("click", ouvre_modal);
    //////la fleche de retoure
    document.getElementById("left").addEventListener("click", ouvre_modal);

    /////ouvre modal avec clavier
    window.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        ouvre_modal(e);
      }
    });

    //pour stop  la fermeteur le model quand en click dessu

    const stopPropagation = function (e) {
      e.stopPropagation();
    };

    ///////////:////FERMER le modal//////////////
    function ferme_modal(e) {
      e.preventDefault;
      const page = document.getElementById("modal");
      page.style.display = "none";
      page.setAttribute("aria-hidden", "true");
      page?.removeEventListener("click", ferme_modal);
    }
    document
      .getElementById("model_fermer")
      .addEventListener("click", ferme_modal);
    document
      .getElementById("model_ajoute")
      .addEventListener("click", ferme_modal);

    /////////////ferme modal avec clavier

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Esc") {
        ferme_modal(e);
      }
    });
    ///////desactiver le repetation de modifier ///////////
    edition.onclick = function () {
      document
        .getElementById("portfolio_titre")
        .removeAttribute("modifier_model");
      document
        .getElementById("introduction_article")
        .removeAttribute("modifier");
      document.getElementById("introduction_photo").removeAttribute("modifier");
    };
  };

  const edit = document.getElementById("modifer");
  edit.appendChild(edition);

  //ouvre et ferme  modal ajout photo
  pageModelajout;

  /////telecharger les photos/////
  telechargerphoto;

  ////Envoi de fichiers via un objet FormData
  ajoutData;

  ///////////////publier les changements
  const changment = document.createElement("button");
  changment.type = "button";

  const modification_changment = `
<p>publier les changements</p>  `;
  changment.insertAdjacentHTML("beforeend", modification_changment);
  changment.className = "publier";

  changment.onclick = function () {
    //la fonction
   // location.href = "/FrontEnd/index.html";
  };
  const changements = document.getElementById("modifer");
  changements.appendChild(changment);
}
