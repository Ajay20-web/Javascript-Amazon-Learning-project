const xhr = new XMLHttpRequest(); // creating a new XMLHttpRequest object for making HTTP requests to a server.

xhr.addEventListener('load' ,()=>{ // Js have separate eventlistener for the sending and receiving of data from a server.
console.log(xhr.response); 
}); // when the request is complete and the response is received, this event listener will log the response to the console.

xhr.open('GET' , 'https://supersimplebackend.dev/'); // setting up the request for a GET method to the specified URL
xhr.send(); // sending the request to the server.
