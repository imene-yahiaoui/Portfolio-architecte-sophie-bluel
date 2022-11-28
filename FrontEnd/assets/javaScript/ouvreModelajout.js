
 
 //////////////////////////////////////////ouvre////////////////////
 /////ouvre la page ajoute photo///

 let model_ajout = null;
 //ouvre modal
 function ouvre_modal_ajoute(e) {
   e.preventDefault;
   const model_page = document.getElementById("modal_ajout");
   model_page.style.display = null;
   model_page.removeAttribute("aria-hidden");
   model_ajout = model_page;
   model_ajout?.addEventListener("click", ferme_modal_ajoute);
   model_ajout
     .querySelector(".js_modal_stop")
     .addEventListener("click", stopPropagation);


     //l'affichage de category null 
     const category = document.getElementById("categorie");
     category.value=null
   //ferme le modal  quand on click d'hors
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

 
//////////////////////ferme//////////////////////////////////

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

   const input_titre_ajout = document.getElementById("input_model");
   input_titre_ajout.value = null;

   //suprime le url des photos
   const input_photo_url = document.getElementById("img_input");
   input_photo_url.value = null;

   //suprime les donner de categore
   const category = document.getElementById("categorie");
   category.value = null;

   //suprimer msg err
   document.getElementById("msg_err").innerHTML = "";
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