 ///////////////publier les changements
 const changment = document.createElement("button");
 changment.type = "button";

 const modification_changment = `
 <p>publier les changements</p>  `;
 changment.insertAdjacentHTML("beforeend", modification_changment);
 changment.className = "publier";
 changment.onclick = function () {
   location.href = "/FrontEnd/index.html";
 };
 const changements = document.getElementById("modifer");
 changements.appendChild(changment);