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