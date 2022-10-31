
 
const btn_tous = document.getElementById('btn_tous');
const btn_objets = document.getElementById('btn_objets');
const btn_appartements = document.getElementById('btn_appartements');
const btn_hôtels = document.getElementById('btn_hôtels');


  fetch ( 'http://localhost:5678/api/works')
     .then(res => {
      console.log(res);
      if (res.ok){
      res.json( ) .then (data => 
      {

        
        const numSlid= data.length;
      
       console.log(data)
       /*
const img= data[i].imageUrl;
const title=data[i].title;
const category = data[i].category;
const id= data[i].id;
const categoryId= data[i].categoryId;
const userId= data[i].userId;
*/
function tout(){
    
let i = 0

      for (let i = 0; i<=numSlid;i++){
       
        
        const card  = `
        <figure id ="${data[i].category.name}"   >
        <img   src="${data[i].imageUrl} ">
       
        <figcaption > ${data[i].title}</figcaption>
        </figure>
               `    
     
      //console.log(data[i].imageUrl)

     
    }}
    btn_tous.addEventListener("click",tout);
 
   

 function object(){
  document.querySelector('.gallery').removeAdjacentHTML("beforeend",card );
      let i = 0
      if (data[i].category.name ==data[i].category.Objets){
            for (let i = 0; i<=numSlid;i++){
             
              
              const card  = `
              <figure id ="${data[i].category.name}"   >
              <img   src="${data[i].imageUrl} ">
             
              <figcaption > ${data[i].title}</figcaption>
              </figure>
                     `    
            document.querySelector('.gallery') .insertAdjacentHTML( "beforeend",card );
            //console.log(data[i].imageUrl)
      
           
          }}}
          btn_objets.addEventListener("click",object);

})

}else {
console.log("Error");
document.getElementById('error').innerHTML="Error :("
}
 
})