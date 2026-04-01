const genreLinks = document.querySelectorAll(".genre");
const username = document.getElementById("username");
const errMsg = document.getElementById("required");

//exporting some values from this js file

// Function to get CSRF token once
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


if (genreLinks) {
    genreLinks.forEach(genre => {
        genre.addEventListener("click", event => {
            event.preventDefault(); // always prevent redirect first
            const clickedId = event.currentTarget.id;
            const userName = username.value.trim();

            if (!userName) {
                errMsg.innerHTML = "<p>A name is required!!!</p>";
                console.log("Provide all information to start!!!");
                return;
            }

             // clear error message

            console.log("Username:", userName);
            console.log("You chose:", clickedId);

            sessionStorage.setItem('genre',clickedId)
            sessionStorage.setItem('userName',userName)

            fetch(`/quizValidity/`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken
                },
                
                body: JSON.stringify({
                    username: userName,
                    genre: clickedId
                })
                
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();  // Parse JSON only after confirming success
            })
            .then(data => {
                console.log("Saved successfully:", data);
                window.location.href = `/quizPage/`;
                console.log("did window.location.href assignment");
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    });
    })
}
