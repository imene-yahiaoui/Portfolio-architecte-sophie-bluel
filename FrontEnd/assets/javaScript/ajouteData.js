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
      
        photo.value === "" ||
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
                            alert(`le projet ${data.title} été ajouté avec succès`)
                                                    });
                          
                        }
                      })
                       .then((res) => res.json())
                       
                   

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