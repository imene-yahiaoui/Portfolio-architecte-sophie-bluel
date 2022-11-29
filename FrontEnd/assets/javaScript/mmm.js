////Envoi de fichiers a API
document.getElementById("modal_ajout").addEventListener("submit", function (e) {
  e.preventDefault();

  const photo = document.getElementById("img_input");
  const category = document.getElementById("categorie");
  const title = document.getElementById("input_model");

  // un msg err si le formulair pas rempli
  if (photo.value === "" || title.value === "" || category.value === "") {
    document.getElementById("msg_err").innerHTML =
      "il faut remplir le formulaire ";
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


                const card= 
                `
                <figure  >
                <img src="/FrontEnd/assets/images/${image.name}"crossOrigin="anonymous">
                  <figcaption>${titre}</figcaption>
                </figure>
                      `
                      document.querySelector(".gallery").insertAdjacentHTML("beforeend", card);


                ///cree modal 

                const photo_modal = `
                <figure ">
                
                <div id="repertoire_modal" class="photo_model_efface">
                 <img src= "/FrontEnd/assets/images/${image.name}"crossOrigin="anonymous">
               
                <i  class="fa-regular fa-trash-can "></i>
             
                </div>
                
                  <figcaption>éditer</figcaption>
                </figure>
                      `;
      
            document
              .getElementById("model_gallery")
              .insertAdjacentHTML("beforeend", photo_modal);

              let token = localStorage.getItem("token");
const objet=  {  "image":document.getElementById("img_input").files[0], 
"title" :  document.getElementById("input_model").value,
"category": categorydata[i].id ,

}
console.log(objet)


              localStorage.setItem( "formData", JSON.stringify(objet))


              if (localStorage.getItem("formData")) {
                let getId = JSON.parse( localStorage.getItem("formData"))
                const formData = new FormData();
                formData.append("image", getId.image);
                formData.append("title", getId.title);
                formData.append("category", getId.category);
                console.log(getId)
                console.log(getId.title)
                console.log(getId.category)
              fetch(formData)
            //   localStorage.removeItem("formData")
              }
                // for (let id of getId ){
                //   deleteProject(id);
                //   console.log ( "formData ",id)
                // }


                //fetch works
             
                function fetch (form){

                  // const formData = new FormData();
                  // formData.append("image", image);
                  // formData.append("title", titre);
                  // formData.append("category", categorydata[i].id);
  
                  fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: form,
                  })
                    .then((res) => {
                      if (res.ok) {
                        res.json().then((data) => {
                               console.log(form)                                  
                        });
                      }
                    })
                  
                
                    .catch((err) => console.log("il ya un problem" + err));}
              } else {
                   document.getElementById("msg_err").innerHTML =
                  "la taille de la photo est plus de 4mo  ";
                  photo.value=null 
                   // suprim les doner quand en ferme
    document.getElementById("model_ajout_container").style.display = null;
    document.getElementById("image_telecharger_images").style.display = "none";
              }
            }
          }
        });
      }
    });
  }

  

});

