const btn_tous = document.getElementById("btn_tous");

const gallery = document.querySelector(".gallery");

function info(work) {
  const card = `
    <figure id ="A${work?.id}" >
    <img src="${work?.imageUrl} "crossOrigin="anonymous">
      <figcaption>${work?.title}</figcaption>
    </figure>
          `;

  document.querySelector(".gallery").insertAdjacentHTML("beforeend", card);
}
      
//fetch works
fetch("http://localhost:5678/api/works")
  .then((res) => {
  
    if (res.ok) {
      res.json().then((data) => {
        console.log ("resu",data) 
       
    ////////////delet//////////////:
          
    let token = localStorage.getItem("token");
    for (let counter = 1; counter <= data.length; counter++) {
      function delet() {
        data[counter].id;

       // console.log(`${data[counter]?.id}`);
        
      tableauId.push(data[counter].id)
      console.log(tableauId)
      localStorage.setItem( "id", JSON.stringify(tableauId))
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
      }}
console.log(localStorage.getItem("id"))


     function deleteProject(id){

       fetch("http://localhost:5678/api/works/" + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())

          .catch((err) => console.log("il ya un problem" + err));
     }

      if (localStorage.getItem("id")) {
        let getId = JSON.parse( localStorage.getItem("id"))
        for (let id of getId ){
          deleteProject(id);
          console.log ( "le ID ",id)
        }
       
        localStorage.removeItem("id")
      }
    




        const numSlid = data.length;

        
      
        //fetch categoris
        fetch("http://localhost:5678/api/categories")
          .then((res) => {
            
            if (res.ok) {
              res.json().then((category) => {
              
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