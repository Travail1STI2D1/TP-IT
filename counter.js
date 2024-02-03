let clickCount;

document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('click-button');
    const clickCountElement = document.getElementById('click-count');

    // Charger le compteur depuis GitHub à chaque chargement de page
    fetchCounterValue();

    clickButton.addEventListener('click', () => {
        // Incrémenter le compteur localement
        clickCount++;

        // Mettre à jour le compteur sur GitHub
        updateCounterValue();

        // Mettre à jour l'affichage du compteur
        updateClickCount();
    });
});

function fetchCounterValue() {
    // Récupérer le compteur depuis GitHub
    fetch('https://raw.githubusercontent.com/travail1sti2d1/tp-it/main/click-counter.json')
        .then(response => response.json())
        .then(data => {
            clickCount = data.count;

            // Mettre à jour l'affichage du compteur
            updateClickCount();
        })
        .catch(error => console.error('Erreur lors de la récupération du compteur :', error));
}

function updateCounterValue() {
    let data; // Déplacer la déclaration de la variable ici

    // Récupérer le SHA du fichier actuel
    fetch('https://api.github.com/repos/travail1sti2d1/tp-it/contents/click-counter.json')
        .then(response => response.json())
        .then(responseData => {
            data = responseData; // Affecter la valeur de responseData à la variable data

            if (data.sha) {
                // Le reste du code reste inchangé
                clickCount++;

                const updatedContent = btoa(JSON.stringify({ count: clickCount }));
                fetch('https://api.github.com/repos/travail1sti2d1/tp-it/contents/click-counter.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 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', // Remplacez par votre jeton d'accès GitHub
                    },
                    body: JSON.stringify({
                        message: 'Increment the counter',
                        content: updatedContent,
                        sha: data.sha,
                    }),
                })
                    .then(() => console.log('Compteur mis à jour avec succès.'))
                    .catch(error => console.error('Erreur lors de la mise à jour du compteur :', error));
            } else {
                console.error('Impossible de récupérer le SHA du fichier.');
            }
        })
        .catch(error => console.error('Erreur lors de la récupération du SHA du fichier :', error));
}

function updateClickCount() {
    // Mettre à jour l'affichage du compteur dans l'interface utilisateur
    const clickCountElement = document.getElementById('click-count');
    clickCountElement.textContent = `Click Count: ${clickCount}`;
}
