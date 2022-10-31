 
const image = document.getElementsByClassName('image');
const titre = document.getElementsByClassName('titre');
const figure = document.getElementsByClassName('figure');

let count= 0  ;

  fetch ( 'http://localhost:5678/api/works')
     .then(res => res.json( ))
     .then (data => 
      {
        const numSlid= data.length;
        console.log(data)
const img= data[count].imageUrl;
const title=data[count].title;
const category = data[count].category;
const id= data[count].id;
const categoryId= data[count].categoryId;
const userId= data[count].userId;



 

    
const card= `
<figure >
<img  src="${data[count].imageUrl}" >
<figcaption > ${data[count].title}</figcaption>
</figure>
 
      `
   
      
document.querySelector('.gallery').innerHTML=card;
 



})
 
  