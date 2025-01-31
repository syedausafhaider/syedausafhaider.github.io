// Function to load content dynamically
function loadContent(sectionId) {
    console.log(`Loading content for section: ${sectionId}...`);

    // Example: Fetch JSON data from a server or API
    fetch('https://example.com/path-to-your-json') // Replace with your actual JSON endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data loaded:', data);

            // Find the section by ID and display its content
            const section = data.sections.find(sec => sec.id === sectionId);
            if (section) {
                displaySectionContent(section);
            } else {
                console.warn(`Section with ID "${sectionId}" not found.`);
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

// Function to display section content in the DOM
function displaySectionContent(section) {
    const contentContainer = document.getElementById('content');
    if (!contentContainer) {
        console.error('Content container not found in the DOM.');
        return;
    }

    // Clear previous content
    contentContainer.innerHTML = '';

    // Create and append new content
    const title = document.createElement('h2');
    title.textContent = section.title;

    const description = document.createElement('p');
    description.textContent = section.description;

    const keyConcepts = document.createElement('ul');
    keyConcepts.innerHTML = section.keyConcepts.map(concept => `<li>${concept}</li>`).join('');

    const codeExampleLink = document.createElement('a');
    codeExampleLink.href = section.codeExample;
    codeExampleLink.textContent = 'View Code Example';
    codeExampleLink.target = '_blank';

    const videoTutorialLink = document.createElement('a');
    videoTutorialLink.href = section.videoTutorial;
    videoTutorialLink.textContent = 'Watch Video Tutorial';
    videoTutorialLink.target = '_blank';

    const downloadLink = document.createElement('a');
    downloadLink.href = section.downloadLink;
    downloadLink.textContent = 'Download Notebook';
    downloadLink.target = '_blank';

    // Append all elements to the content container
    contentContainer.appendChild(title);
    contentContainer.appendChild(description);
    contentContainer.appendChild(keyConcepts);
    contentContainer.appendChild(codeExampleLink);
    contentContainer.appendChild(document.createElement('br'));
    contentContainer.appendChild(videoTutorialLink);
    contentContainer.appendChild(document.createElement('br'));
    contentContainer.appendChild(downloadLink);
}

// Attach event listeners to <li> elements
document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('#section-list li');
    listItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section-id'); // Get the section ID from the data attribute
            if (sectionId) {
                loadContent(sectionId); // Load content for the clicked section
            } else {
                console.warn('No section ID found for this list item.');
            }
        });
    });
});
