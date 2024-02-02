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
    fetch('https://raw.githubusercontent.com/VOTRE_UTILISATEUR/VOTRE_REPO/main/click-counter.json')
        .then(response => response.json())
        .then(data => {
            clickCount = data.count;

            // Mettre à jour l'affichage du compteur
            updateClickCount();
        })
        .catch(error => console.error('Erreur lors de la récupération du compteur :', error));
}

function updateCounterValue() {
    // Mettre à jour le fichier JSON sur GitHub avec le nouveau compteur
    fetch('https://raw.githubusercontent.com/VOTRE_UTILISATEUR/VOTRE_REPO/main/click-counter.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            count: clickCount,
        }),
    })
        .then(() => console.log('Compteur mis à jour avec succès.'))
        .catch(error => console.error('Erreur lors de la mise à jour du compteur :', error));
}

function updateClickCount() {
    // Mettre à jour l'affichage du compteur dans l'interface utilisateur
    const clickCountElement = document.getElementById('click-count');
    clickCountElement.textContent = `Click Count: ${clickCount}`;
}
