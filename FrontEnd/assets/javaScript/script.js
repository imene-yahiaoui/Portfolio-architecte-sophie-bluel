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
        
        console.log(data)
        const numSlid = data.length;

        //fetch categoris
        fetch("http://localhost:5678/api/categories")
          .then((res) => {
            console.log(res);
            if (res.ok) {
              res.json().then((category) => {
                //tout
                function tout() {
                  document.querySelector(".gallery").innerHTML = "";

                  let i = 0;
                  for (i = 0; i <= numSlid-1; i++) {
                    info(data[i]);
                  }
                }
               document.getElementById("model_gallery").addEventListener("mousedown",tout);
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
                  if (localStorage.getItem("token")) {console.log("Bienvenu Sophie")}
                  else { const button = document.getElementById("btn");
                  button.appendChild(object);}
                  
                   
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

document.getElementById("modifer").style.backgroundColor="black";




//edition
const edition = document.createElement("p");
edition.type = "button";


const modification =`
<div>
<i class="fa-regular fa-pen-to-square"></i>
<p>Mode édition</p>  </div>`;
edition.insertAdjacentHTML("afterbegin",modification)
edition.className = "edition";
edition.onclick = function () {
//la fonction de modifier 
 
const modifier =`
<div id= "modifier">
<i class="fa-regular fa-pen-to-square"></i>
<p>modifier</p>  </div>`;
 
const modifier_model =`
<a href ="#modal"></a>
<div id= "modifier_model">
<i class="fa-regular fa-pen-to-square"></i>
<p>modifier</p>  </div>`;


 /*essaye de superimer le double
document.getElementById("introduction_article").insertAdjacentHTML("afterbegin",modifier).remove(modifier);
document.getElementById("introduction_photo").insertAdjacentHTML("beforeend",modifier).remove(modifier);
document.getElementById("portfolio_titre").insertAdjacentHTML("afterend",modifier).remove(modifier);
 */
 document.getElementById("portfolio_titre").insertAdjacentHTML("afterend",modifier_model);
document.getElementById("introduction_article").insertAdjacentHTML("afterbegin",modifier);
document.getElementById("introduction_photo").insertAdjacentHTML("beforeend",modifier);
 






 //ouvre modal 
 function ouvre_modal(){
  console.log("ca marche ca ")

  const target= document.getElementById("modal")
   target.style.display = null
   target.removeAttribute('aria-hidden')
 }
 document.getElementById("modifier_model").addEventListener("click",ouvre_modal)

 //ouvre modal avec clavier 
 window.addEventListener('keydown',function(e){
  if (e.key === "Enter"){
   ouvre_modal(e)
  }
})


//FERMER le modal 
function ferme_modal(){
  const page= document.getElementById("modal")
  page.style.display = "none"
  page.setAttribute('aria-hidden','true') 

}
document.getElementById("model_fermer").addEventListener("click", ferme_modal)

 //ferme modal avec clavier 

 window.addEventListener('keydown',function(e){
if (e.key === "Escape" || e.key === "Esc"){
  ferme_modal(e)
}

 })


}




const edit = document.getElementById("modifer");
edit.appendChild(edition);
   



//







//publier les changements
const changment = document.createElement("button");
changment.type = "button";


const modification_changment =`
<p>publier les changements</p>  `;
changment.insertAdjacentHTML("beforeend",modification_changment)
changment.className = "publier";
changment.onclick = function () {

//la fonction 

}
const changements = document.getElementById("modifer");
changements.appendChild(changment);


              
}





//sortier de la page model
document.getElementById("login").addEventListener("click", function () {
  localStorage.clear();


});



