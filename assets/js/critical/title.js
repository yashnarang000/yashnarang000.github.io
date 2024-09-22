document.addEventListener("DOMContentLoaded", function() {
    const titlesContainer = document.getElementById('title-container');

    // Fetch a random title set
    fetch('/titles/titles.json')
        .then(response => response.json())
        .then(data => {
            const randomSet = data[Math.floor(Math.random() * data.length)];
            const titles = randomSet.titles;
            const isDefinite = randomSet.definite;

            let currentIndex = 0;

            // Initialize titles
            titles.forEach((title) => {
                // Replace asterisks with <i> tags for italics
                const formattedTitle = title.replace(/\*(.*?)\*/g, '<i>$1</i>');
                const p = document.createElement('p');
                p.className = 'display-4 flicker-title';
                p.innerHTML = formattedTitle; // Use innerHTML to allow HTML tags
                titlesContainer.appendChild(p);
            });

            // Show the first title immediately
            titlesContainer.children[0].classList.add('active');

            // Function to show the next title
            function showNextTitle() {
                // Check if the current index is valid
                if (currentIndex < titles.length) {
                    // Remove the active class from the current title
                    titlesContainer.children[currentIndex].classList.remove('active');
                }

                currentIndex++;

                // Check if the current index exceeds the titles length
                if (currentIndex >= titles.length) {
                    if (isDefinite) {
                        // If definite, keep the last title visible
                        currentIndex = titles.length - 1; // Set to last title
                        titlesContainer.children[currentIndex].classList.add('active');
                        return; // Stop the interval
                    } else {
                        // If not definite, reset to the first title
                        currentIndex = 0;
                    }
                }

                // Add the active class to the next title
                titlesContainer.children[currentIndex].classList.add('active');
            }

            // Change title every 1.9 seconds
            const intervalId = setInterval(showNextTitle, 1500);
        })
        .catch(error => {
            console.error('Error fetching titles:', error);
        });
});