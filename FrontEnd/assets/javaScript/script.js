 

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

/////entre a la page model
if (localStorage.getItem("token")) {
  //replacer le login par logout
  document.getElementById("login").innerText = "logout";
  //remove btn tout
  document.getElementById("btn").remove(btn_tous);

  /////creé div de lodification

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
          <figure >
          
          <div class="photo_model_efface">
          <img src="${works?.imageUrl} "crossOrigin="anonymous">
         
          <i id="corbielle" class="fa-regular fa-trash-can"></i>
       
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

    //pour stoper fermer le model quand en click dessu

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
  document
    .getElementById("introduction_photo")
    .removeAttribute("modifier");
    }

  };




  const edit = document.getElementById("modifer");
  edit.appendChild(edition);



  /*
/////////////////delet ///////////////////////
 
  fetch("http://localhost:5678/api/works")
    .then((res) => {
      console.log(res);
      if (res.ok) {
        res.json().then((info) => {
          console.log(info[3].id);
          const id = 0
  for(i=0 ;i<= info.length ; i++){
    console.log(info[1].id)}
   
  console.log(info[2].id);
  const m= document.getElementById('corbielle')
  m.onclick= function () {
    const les_photo= document.getElementById("model_gallery")
    console.log(les_photo.length)
   
  }
  /*
    fetch('http://localhost:5678/api/works/' + id, {
      method: 'DELETE',
      headers: { 
        'Authorization': 'Bearer token',
            }
    })
    .then(res => res.text()) // or res.json()
    .then(res => console.log(res))
  
        })
   } })
  
 
  
  document.getElementById('corbielle')?.addEventListener('click', Delet);
   
  
  */




  /////ouvre la page ajoute photo///

  let model_ajout = null;
  //ouvre modal
  function ouvre_modal_ajoute(e) {
   
    e.preventDefault;
     model_page =document.getElementById("modal_ajout");
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

document.getElementById('modal_ajout').addEventListener('submit',function(e){
e.preventDefault();

const image= document.getElementById('img_input').files[0];
if 
(document.getElementById('img_input').files[0].size< 4 *1048576){


let token = (localStorage.getItem("token"));
console.log(token)
const titre=document.getElementById('input_model').value
const category = document.getElementById('categorie').value;

const formData = new FormData();
formData.append('image',image)
formData.append('title',titre)
formData.append('categoryId',category);

 

fetch ('http://localhost:5678/api/works',{
 method:"POST",
 headers: {
  
   'Authorization':`Bearer ${token}`,

'accept': 'application/json',
   
   'Content-Type' : 'multipart/form-data;boundary=---------------------------6089990234170057781666515331;application/json'
  //'Content-Type': 'application/json',
},
 body:formData,

})



.then(res=>res.json())
.then (data => console.log("yeeeeeeeeeeees"+data))
.catch(err => console.log("nooooooooooooooooo"))
}
else{
  console.log("la photo est trop grand ")
  
}

const input_photo_url = document.getElementById("img_input");
 input_photo_url.value=null;
 
 const titre_sansvalu=document.getElementById('input_model') ;
 titre_sansvalu.value=null;
 const category_sans_valu = document.getElementById('categorie');
 category_sans_valu.value=null;
  // suprim les doner quand en ferme
  document.getElementById("model_ajout_container").style.display = null;
  document.getElementById("image_telecharger_images").style.display = "none";

})

////Envoi de fichiers via un objet FormData
 /*
  var form = document.forms.namedItem("form_ajout");
  form.addEventListener('submit', function(ev) {
  
  
        oData = new FormData(form);

   
  
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "http://localhost:5678/api/works", true);
 
    oReq.onload = function(oEvent) {
      if (oReq.status == 200) {
        console.log("envoier")
         } else {
          console.log("pas envoier"+ oReq.status) 
      }
    };
  
    oReq.send(oData);
    ev.preventDefault();
  }, false);



  /*

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


//recuper le url des photos
const input_photo_url = document.getElementById("img_input").value
console.log(`"laphoto"${input_photo_url}`)

//categoryid 


 //////////msg errer formulair ajout photo/////////
  
if (input_photo_url === ''|| input_photo_url === null || category === ''|| category === null || input_titre_ajout === ''|| input_titre_ajout === null ){
  document.getElementById("msg_err").innerHTML="il faut remplire le formulair "
   
}
else{
  document.getElementById("msg_err").innerHTML=""
}


const tokens = ' Bearer localStorage.getItem("token") '
 /*
//const information = new FormData(form_ajout);
const ThreeStringProps = {imageUrl: input_photo_url, title: input_titre_ajout, categoryId: category}
const payload = new URLSearchParams(ThreeStringProps);

  console.log(...payload);
*/
 /*
  
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2ODQ0NTI5OSwiZXhwIjoxNjY4NTMxNjk5fQ.tEz9t6y7qcAMRPWORanagg-jkUKCIByVp1y8HF_fguc'
    },
    body: JSON.stringify({
     "image": '@479176441_wide.jpg',
     "title": input_titre_ajout,
     "categoryId": category,
    }
    ),
         
  })
  .then (res=> {
    if (res.ok){console.log("post request bien envoyer")}
    else {console.log ("PAS GRAVE ESSAYE ENCORE ")}
    return res

  })
   
    .then(res => res.json())
    .then((data) => console.log(data));
    console.log(localStorage.getItem("token"))
   

 */

/*
var formElement = document.getElementById("modal_ajout");
var request = new XMLHttpRequest();
request.open("POST", "http://localhost:5678/api/works");


request.send(new FormData(formElement));

*/

 //recupere les inputs
 /*
 const form= document.getElementById("modal_ajout");
 const information = new FormData(form);
 const payload = new URLSearchParams(information);

 console.log([...payload]);

 fetch("http://localhost:5678/api/works", {
   method: "POST",
   headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization':  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2ODQ0NTI5OSwiZXhwIjoxNjY4NTMxNjk5fQ.tEz9t6y7qcAMRPWORanagg-jkUKCIByVp1y8HF_fguc'
  },
  body: JSON.stringify({payload}),
  
 })
   .then((res) => res.json())
   .then((data) => {
     console.log(data);
   })

})    */
 
      
      
 


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
