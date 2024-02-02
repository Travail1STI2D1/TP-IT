const githubToken = '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';
const repoOwner = 'travail1sti2d1';
const repoName = 'TP-IT';
const filePath = 'counter.json';

document.addEventListener('DOMContentLoaded', () => {
    // Récupérer le fichier au chargement de la page
    fetchCounterValue();

    // Ajouter un gestionnaire d'événement au bouton d'incrémentation
    document.getElementById('increment-button').addEventListener('click', incrementCounter);
});

function fetchCounterValue() {
    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${githubToken}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        // Incrémenter la valeur du compteur
        data.content = Buffer.from(data.content, 'base64').toString('utf-8');
        const counterObj = JSON.parse(data.content);

        // Afficher la valeur du compteur dans l'interface utilisateur
        document.getElementById('counter-value').textContent = `Counter: ${counterObj.count}`;
    })
    .catch(error => console.error('Error fetching counter value:', error));
}

function incrementCounter() {
    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${githubToken}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        // Incrémenter la valeur du compteur
        data.content = Buffer.from(data.content, 'base64').toString('utf-8');
        const counterObj = JSON.parse(data.content);
        counterObj.count += 1;

        // Mettre à jour la valeur du compteur dans l'interface utilisateur
        document.getElementById('counter-value').textContent = `Counter: ${counterObj.count}`;

        // Pousser les modifications
        const updatedContent = Buffer.from(JSON.stringify(counterObj)).toString('base64');
        return fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${githubToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Increment the counter',
                content: updatedContent,
                sha: data.sha,
            }),
        });
    })
    .then(() => console.log('Counter incremented successfully.'))
    .catch(error => console.error('Error incrementing counter:', error));
}
