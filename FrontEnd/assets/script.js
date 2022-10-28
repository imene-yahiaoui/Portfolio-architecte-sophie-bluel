const url= 'http://localhost:5678/api-docs/';
fetch (url).then(response =>{return response.json( )}).then (data =>{
console.log(data);

})