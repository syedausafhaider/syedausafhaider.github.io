// Fetch data from JSON file
fetch('mylearning/data.json')
    .then(response => response.json())
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
    .catch(error => console.error('Error fetching data:', error));

// Function to load content for a section
function loadContent(section) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h1>${section.title}</h1>
        <p><strong>Description:</strong> ${section.description}</p>
        <p><strong>Key Concepts:</strong> ${section.keyConcepts.join(', ')}</p>
        <h2>Code Example</h2>
        <iframe src="${section.codeExample}"></iframe>
        <h2>Video Tutorial</h2>
        <iframe src="${section.videoTutorial}"></iframe>
        <a href="${section.downloadLink}" download class="download-btn">Download Notebook</a>
        <h2>Takeaways</h2>
        <ul>
            ${section.takeaways.map(takeaway => `<li>${takeaway}</li>`).join('')}
        </ul>
    `;
}
