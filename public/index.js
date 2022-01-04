// < !DOCTYPE html >
//   <html lang="en">

//     <head>
//       <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
//               integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
//               <title>Document</title>
//             </head>

//             <body>
//               <nav class="navbar navbar-expand-lg navbar-light bg-light">
//                 <div class="container-fluid">
//                   <a class="navbar-brand" href="#">Not Facebook</a>
//                   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
//                     aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span class="navbar-toggler-icon"></span>
//                   </button>
//                   <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                       <li class="nav-item">
//                         <a class="nav-link active" aria-current="page" href="/">Home</a>
//                       </li>
//                       <li class="nav-item">
//                         <a class="nav-link" href="/profile.html">Profile</a>
//                       </li>
//                     </ul>
//                     <button id="logout" class="btn btn-outline-primary" type="submit">Logout</button>
//                   </div>
//                 </div>
//               </nav>
//               <div class="container">
//                 <div class="row bg-light p-5 rounded-lg mb-3 mt-3">
//                   <h1 class="display-4">Not Facebook</h1>
//                   <p class="lead">This is a simple blog app that is definitely NOT a facebook clone. Why would you think that?
//                     Pretty weird.</p>
//                   <hr class="my-4">
//                     <p class="lead">Welcome Back <span id="username"></span>!</p>
//                 </div>
//                 <div class="row">
//                   <!-- form for logged-in user to create a new post -->
//                   <form>
//                     <div class="mb-3">
//                       <label for="title" class="form-label">Title</label>
//                       <input type="text" class="form-control" id="title">
//                     </div>
//                     <div class="mb-3">
//                       <label for="body" class="form-label">Body</label>
//                       <textarea class="form-control" name="body" id="body" cols="30" rows="10"></textarea>
//                     </div>
//                     <button id="post" type="submit" class="btn btn-primary">Create Post</button>
//                   </form>
//                 </div>
//                 <div id="posts" class="row"></div>
//               </div>
//               <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
//               <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
//                 integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
//                 crossorigin="anonymous"></script>
//               <script>
// //function to handle user logging out and then takes user automatically to the login page (and can't access other pages)
//                 async function logoutUser() {
//                   localStorage.removeItem('username')
//       localStorage.removeItem('token')
//                 location = '/login.html'
//     }

//                 //function to set authorization in order to receive information from Post Routes (which gets the info from MySql)
//                 async function getPosts() {
//       try {
//         const {data: posts } = await axios.get('/api/posts', {
//                   headers: {
//                   'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         })
//                 return posts

//       } catch (err) {
//                   location = '/login.html'
//                 }
//     }

//                 //function to handle user's new post information (feeds info into mySql through the api/posts route)
//                 async function createPost(data) {
//       const {data: post } = await axios.post('/api/posts', data, {
//                   headers: {
//                   'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       })

//                 return post
//     }

//                 //function to render user's newly created post onto the page by creating an element and puts the new post on the top (using method called 'prepend')
//                 async function renderPost({title, body, User: {username} }) {
//       const postElem = document.createElement('div')
//                 postElem.innerHTML = `
//                 <div class="row bg-light p-5 rounded-md mb-2 mt-2">
//                   <h3>${title}</h3>
//                   <p class="lead"><i>posted by ${username}</i></p>
//                   <p class="lead">${body}</p>
//                   <hr class="my-4">
//                 </div>
//                 `
//                 document.getElementById('posts').prepend(postElem)
//     }

//                 //function to render all existing posts and re-uses above function
//                 async function renderPosts() {
//       const posts = await getPosts()

//       posts.forEach(post => renderPost(post))
//     }

//                 //function to get username from local storage (welcome back, post author, logging out, etc)
//                 async function renderUsername() {
//       const username = localStorage.getItem('username')

//                 document.getElementById('username').textContent = username
//     }

//                 //DOM manipulation to render information needed
//                 document.getElementById('post').addEventListener('click', async function (event) {
//                   event.preventDefault()

//       const post = await createPost({
//                   title: document.getElementById('title').value,
//                 body: document.getElementById('body').value
//       })

//                 renderPost({...post, User: {username: localStorage.getItem('username') } })
//     })

//                 document.getElementById('logout').addEventListener('click', logoutUser)

//                 renderPosts()
//                 renderUsername()
//               </script>
//             </body>

//           </html>