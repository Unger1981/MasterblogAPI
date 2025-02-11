window.onload = function() {
    var savedBaseUrl = localStorage.getItem('apiBaseUrl');
    console.log("Saved Base URL:", savedBaseUrl);  // Überprüfe den Wert der gespeicherten Basis-URL
    if (savedBaseUrl) {
        document.getElementById('api-base-url').value = savedBaseUrl;
        loadPosts();
    }
}

function loadPosts() {
    var baseUrl = document.getElementById('api-base-url').value;
    console.log("Base URL in loadPosts():", baseUrl);  // Überprüfe die URL, die für den Request verwendet wird

    localStorage.setItem('apiBaseUrl', baseUrl);

    fetch(`${baseUrl}/api/posts`)
        .then(response => {
            console.log("Response status:", response.status);  // Status der Antwort ausgeben
            return response.json();
        })
        .then(data => {
            console.log("Received posts data:", data);  // Zeige die erhaltenen Post-Daten an
            const postContainer = document.getElementById('post-container');
            postContainer.innerHTML = '';

            data.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
                postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>
                <button onclick="deletePost(${post.id})">Delete</button>`;
                postContainer.appendChild(postDiv);
            });
        })
        .catch(error => console.error('Error:', error));  // Fehler bei der Anfrage ausgeben
}

function addPost() {
    var baseUrl = document.getElementById('api-base-url').value;
    var postTitle = document.getElementById('post-title').value;
    var postContent = document.getElementById('post-content').value;

    console.log('Sending post:', { title: postTitle, content: postContent });  // Zeige die zu sendenden Daten an

    fetch(`${baseUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: postTitle, content: postContent })
    })
    .then(response => response.json())
    .then(post => {
        console.log('Post added:', post);  // Zeige das hinzugefügte Post-Objekt an
        loadPosts();
    })
    .catch(error => console.error('Error:', error));  // Fehler bei der Anfrage ausgeben
}

function deletePost(postId) {
    var baseUrl = document.getElementById('api-base-url').value;
    
    console.log('Deleting post with ID:', postId);  // Zeige die ID des zu löschenden Posts an

    fetch(`${baseUrl}/api/posts/${postId}`, {
        method: 'DELETE'
    })
    .then(response => {
        console.log('Post deleted:', postId);  // Bestätige das Löschen des Posts
        loadPosts();
    })
    .catch(error => console.error('Error:', error));  // Fehler beim Löschen ausgeben
}

console.log("Base URL:", document.getElementById('api-base-url').value);  // Überprüfe die Basis-URL zu Beginn
