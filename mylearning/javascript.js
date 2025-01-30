// Fetch data from the JSON file
fetch('data.json') // This is where the JSON file is being fetched
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON data
    })
    .then(data => {
        const menu = document.getElementById('menu');
        const content = document.getElementById('content');

        // Populate the sidebar menu
        data.sections.forEach((section, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${section.title}`;
            li.setAttribute('data-id', section.id);
            if (index === 0) li.classList.add('active'); // Set first item as active
            li.addEventListener('click', () => {
                // Remove active class from all items
                document.querySelectorAll('.sidebar li').forEach(item => item.classList.remove('active'));
                // Add active class to clicked item
                li.classList.add('active');
                // Load content for the selected section
                loadContent(section);
            });
            menu.appendChild(li);
        });

        // Load the first section by default
        loadContent(data.sections[0]);
    })
    .catch(error => {
        console.error('Error fetching data:', error);

        // Display an error message on the website
        const content = document.getElementById('content');
        content.innerHTML = `
            <div style="text-align: center; color: red; margin-top: 50px;">
                <h1>Oops! Something went wrong.</h1>
                <p>We couldn't load the learning path. Please try again later.</p>
            </div>
        `;
    });
