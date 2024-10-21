"use strict";

// fetch('https://jsonplaceholder.typicode.com/users')
//   .then(response => response.json())
//   .then(data => {
    
//       let ul=document.createElement(`ui`)
//       data.forEach(user => {
//         console.log(user.company.name);
//         let li=document.createElement(`li`)
//         li.textContent=`${user.company.name}`
//         ul.appendChild(li);
//     });
//     document.getElementById('wraper').appendChild(ul);
//   })
//   .catch(error => console.error('Error fetching data:', error));

let request = new XMLHttpRequest();
request.open('GET', 'https://reqres.in/api/unknown');

request.addEventListener('load', function() {
    let response = this.responseText;
    let responseJs = JSON.parse(response);  
    
    let ul = document.createElement('ul');
    
    responseJs.data.forEach((item) => {
        let li = document.createElement('li');
        li.textContent = `${item.name}`; 
        li.style.backgroundColor = item.color; 
        li.style.color = '#fff'; 
        li.style.padding = '2px'; 
        li.style.margin = '5px'; 
        ul.appendChild(li);
    });
    
    document.getElementById('wraper').appendChild(ul);
});

request.addEventListener('error', function() {
    console.error('Request failed');
});

request.send();