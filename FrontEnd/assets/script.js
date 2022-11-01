const btn_tous = document.getElementById("btn_tous");
const btn_objets = document.getElementById("btn_objets");
const btn_appartements = document.getElementById("btn_appartements");
const btn_hôtels = document.getElementById("btn_hôtels");
const gallery =  document.querySelector(".gallery");





fetch("http://localhost:5678/api/works").then((res) => {
  console.log(res);
  if (res.ok) {
    res.json().then((data) => {
      const numSlid = data.length;

    
      console.log(data[2].category.name)
     
      //tout
      function tout() {
       // document.querySelector(".gallery").removeAttributeNode
        document.querySelector(".gallery").innerHTML=""
       
let i = 0;
        for ( i = 0; i <= numSlid; i++) {
          const card = `
        <figure >
        <img src="${data[i].imageUrl}">
       
        <figcaption>${data[i].title}</figcaption>
        </figure>
               `;
               
          //console.log(data[i].imageUrl)
          document
            .querySelector(".gallery")
            .insertAdjacentHTML("beforeend", card);
       
        }
      }
      
      btn_tous.addEventListener("click", tout);

   
       
      //object

      function object() {
       
        document.querySelector(".gallery").innerHTML=""
        let i = 0;

       
        
        for ( i = 0; i <= numSlid; i++) {
          
          if (data[i].category.name=="Objets") {
            const card = `
              <figure >
              <img src="${data[i].imageUrl} ">
             <figcaption > ${data[i].title}</figcaption>
              </figure>
                     `;
            document
              .querySelector(".gallery")
              .insertAdjacentHTML("beforeend", card);
           
          }
        }
      } 
      btn_objets.addEventListener("click", object);

      //appartements

      function appartements() {
        
        let i = 0;   
        document.querySelector(".gallery").innerHTML=""
        for (  i = 0; i <= numSlid; i++) {
          if (data[i].category.name=== "Appartements") {
            const card = `
                    <figure id = ${data[i].category.name}>
                    <img   src="${data[i].imageUrl} ">
                   
                    <figcaption > ${data[i].title}</figcaption>
                    </figure>
                           `;
            document
              .querySelector(".gallery")
              .insertAdjacentHTML("beforeend", card);
            //console.log(data[i].imageUrl)
          }
        }
      }
      btn_appartements.addEventListener("click", appartements);

      //hôtels
      function hôtels() {
        
        document.querySelector(".gallery").innerHTML=""
        let i = 0;
        for ( i = 0; i <= numSlid; i++) {
          if (data[i].category.name=== "Hotels & restaurants") {
            const card = `
          <figure >
          <img   src="${data[i].imageUrl} ">
         
          <figcaption > ${data[i].title}</figcaption>
          </figure>
                 `;
            document
              .querySelector(".gallery")
              .insertAdjacentHTML("beforeend", card);
            //console.log(data[i].imageUrl)
          }
        }
      }
      btn_hôtels.addEventListener("click", hôtels); 


      fetch("http://localhost:5678/api/categories")
      .then((res) => {
        console.log(res);
        if (res.ok) {
          res.json().then((category) => {
      
            console.log(category)
       
      
    });
  } else {
    console.log("Error");
    document.getElementById("error").innerHTML = "Error :(";
  }
})

})}});