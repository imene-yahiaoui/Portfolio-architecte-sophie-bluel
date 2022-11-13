const btn_tous = document.getElementById("btn_tous");

const gallery = document.querySelector(".gallery");

function info(work) {
  const card = `
    <figure >
    <img src="${work?.imageUrl} "crossOrigin="anonymous">
      <figcaption>${work?.title}</figcaption>
    </figure>
          `;

  document.querySelector(".gallery").insertAdjacentHTML("beforeend", card);
}

//fetch works
fetch("http://localhost:5678/api/works")
  .then((res) => {
    console.log(res);
    if (res.ok) {
      res.json().then((data) => {
        console.log(data);
        const numSlid = data.length;

        //fetch categoris
        fetch("http://localhost:5678/api/categories")
          .then((res) => {
            console.log(res);
            if (res.ok) {
              res.json().then((category) => {
                console.log(category);
                //tout
                function tout() {
                  document.querySelector(".gallery").innerHTML = "";

                  let i = 0;
                  for (i = 0; i <= numSlid - 1; i++) {
                    info(data[i]);
                  }
                }

                btn_tous.addEventListener("click", tout);

                /////cree des btn  object////
                let count = 0;

                for (let count = 0; count <= category.length - 1; count++) {
                  const object = document.createElement("button");
                  object.type = "button";
                  object.innerHTML = category[count].name;
                  object.className = "btn_option";
                  object.onclick = function () {
                    document.querySelector(".gallery").innerHTML = "";

                    for (let i = 0; i <= numSlid; i++) {
                      if (data[i]?.category.name === category[count].name) {
                        info(data[i]);
                      }
                    }
                  };
                  ////cacher les btn dans le mode de login
                  if (localStorage.getItem("token")) {
                    console.log("Bienvenu Sophie");
                  } else {
                    const button = document.getElementById("btn");
                    button.appendChild(object);
                  }
                }

                tout();
              });
            } else {
              console.log("Error");
            }
          })
          .catch((e) => console.log(e));
      });
    }
  })

  .catch((err) => console.log(err));

//entre a la page model
if (localStorage.getItem("token")) {
  //replacer le login par logout
  document.getElementById("login").innerText = "logout";
  //remove btn tout
  document.getElementById("btn").remove(btn_tous);

  //creé div de lodification

  document.getElementById("modifer").style.backgroundColor = "black";

  //edition
  const edition = document.createElement("p");
  edition.type = "button";

  const modification = `
<div>
<i class="fa-regular fa-pen-to-square"></i>
<p>Mode édition</p>  </div>`;
  edition.insertAdjacentHTML("afterbegin", modification);
  edition.className = "edition";
  edition.onclick = function () {
    //la fonction de modifier

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

    /*
  document.querySelector("modifier").replaceWith("modifier");
document.getElementById("modifier").replaceWith("modifier");
document.getElementById("modifier").replaceWith("modifier");
*/

    ///afficher le photos
    function photos(works) {
      const photo_modal = `
          <figure >
          
          <div class="photo_model_efface">
          <img src="${works?.imageUrl} "crossOrigin="anonymous">
         
          <i class="fa-regular fa-trash-can"></i>
       
          </div>
          
            <figcaption>éditer</figcaption>
          </figure>
                `;

      document
        .getElementById("model_gallery")
        .insertAdjacentHTML("beforeend", photo_modal);
    }
    fetch("http://localhost:5678/api/works")
      .then((res) => {
        console.log(res);
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            function affiche_model() {
              let counter = 0;
              for (counter = 0; counter <= data.length - 1; counter++) {
                photos(data[counter]);
              }
            }

            affiche_model();
          });
        }
      })

      .catch((err) => console.log(err));

    let page = null;
    /////ouvre modal////
    function ouvre_modal(e) {
      console.log("ca marche ca ");
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
    //la fleche de retoure
    document.getElementById("left").addEventListener("click", ouvre_modal);

    //ouvre modal avec clavier
    window.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        ouvre_modal(e);
      }
    });

    //pour stoper fermer le model quand en click dessu

    const stopPropagation = function (e) {
      e.stopPropagation();
    };

    /////FERMER le modal////
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

    //

    //ferme modal avec clavier

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Esc") {
        ferme_modal(e);
      }
    });
  };

  const edit = document.getElementById("modifer");
  edit.appendChild(edition);

  /////ouvre la paje ajoute photo///

  let model_ajout = null;
  //ouvre modal
  function ouvre_modal_ajoute(e) {
    console.log("ca marche ouvre_modal_ajoute ");
    e.preventDefault;
    const model_page = document.getElementById("modal_ajout");
    model_page.style.display = null;
    model_page.removeAttribute("aria-hidden");
    model_ajout = model_page;
    model_ajout?.addEventListener("click", ferme_modal_ajoute);
    model_ajout
      .querySelector(".js_modal_stop")
      .addEventListener("click", stopPropagation);
    //le modal ferme quand on click d'hors
  }

  document
    .getElementById("model_ajoute")
    .addEventListener("click", ouvre_modal_ajoute);

  //ouvre modal avec clavier
  window.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      ouvre_modal_ajoute(e);
    }
  });

  //pour stoper fermer le model quand en click dessu

  const stopPropagation = function (e) {
    e.stopPropagation();
  };

  
  /////telecharger les photos/////
  function telecharger() {
    const input = document.getElementById("img_input");
    var telecharger_image = "";
    console.log(input.value);
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

  
  

 ///////////////////////////////ajouter///////////////////////
 const form_ajout = document.getElementById("modal_ajout");
 form_ajout.addEventListener("submit", function (e) {
  e.preventDefault();

//recuper les donner de titre
  const input_titre_ajout = document.getElementById("input_model").value
  console.log(input_titre_ajout)
//recuper les donner de categore
let category_Id= 0
const category = document.getElementById("categorie").value

fetch("http://localhost:5678/api/categories")
.then((res) => {
  console.log(res);
  if (res.ok) {
    res.json().then((list_data) => {
      for(i=0 ;i<= list_data.length ; i++){
        if (category == list_data[i]?.name){
          category_Id = list_data[i]?.id
        }
      }
 
 
console.log(category_Id)

//recuper le url des photos
const input_photo_url = document.getElementById("img_input").value
console.log(input_photo_url)
//categoryid 


 //////////msg errer formulair ajout photo/////////
  
if (input_photo_url === ''|| input_photo_url === null || category === ''|| category === null || input_titre_ajout === ''|| input_titre_ajout === null ){
  document.getElementById("msg_err").innerHTML="il faut remplire le formulair "
   
}
else{
  document.getElementById("msg_err").innerHTML=""
}



 
const information = new FormData(form_ajout);

const payload = new URLSearchParams(information);

  console.log([...payload]);
/*
const payload=[{
  "imageUrl": input_photo_url,
  "title": input_titre_ajout,
 "categoryId":category_Id,

      }]
      console.log([...payload]);
  */


})    
        }})
      
      
    
  })




////FERMER le modal de ajout photo ///
function ferme_modal_ajoute(e) {
  e.preventDefault;
  const model_ajout = document.getElementById("modal_ajout");
  model_ajout.style.display = "none";
  model_ajout.setAttribute("aria-hidden", "true");
  model_ajout?.removeEventListener("click", ferme_modal_ajoute);

  // suprim les doner quand en ferme
  document.getElementById("model_ajout_container").style.display = null;
  document.getElementById("image_telecharger_images").style.display = "none";
//suprime les doner de titre 
let vide= ""
const input_titre_ajout = document.getElementById("input_model") ;
input_titre_ajout.value= null;
   
//suprime le url des photos
const input_photo_url = document.getElementById("img_input");
input_photo_url.value= null;

  //suprime les donner de categore
const category = document.getElementById("categorie");
category.value  = category.value[0];
  


//suprimer msg err
document.getElementById("msg_err").innerHTML="";
}
document
  .getElementById("model_fermer_ajouter")
  .addEventListener("click", ferme_modal_ajoute);
//la fleche de retoure
document.getElementById("left").addEventListener("click", ferme_modal_ajoute);

//ferme modal avec clavier

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    ferme_modal_ajoute(e);
  }
});


  ///////////////publier les changements
  const changment = document.createElement("button");
  changment.type = "button";

  const modification_changment = `
<p>publier les changements</p>  `;
  changment.insertAdjacentHTML("beforeend", modification_changment);
  changment.className = "publier";
  changment.onclick = function () {
    //la fonction
  };
  const changements = document.getElementById("modifer");
  changements.appendChild(changment);
}

//sortier de la page model
document.getElementById("login").addEventListener("click", function () {
  localStorage.clear();
});
