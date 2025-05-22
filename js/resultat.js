
// Fonction pour trouver la lettre la plus fréquente
function trouverValeurLaPlusFrequente(tab) {
    const compteur = {};
    let maxLettre = null;
    let maxCompteur = 0;
    let rep = JSON.parse(tab);

    rep.forEach(val => {
        compteur[val] = (compteur[val] || 0) + 1;
        if (compteur[val] > maxCompteur) {
            maxCompteur = compteur[val];
            maxLettre = val;
        }
    });

    return maxLettre;
} 

// Tableau de réponses simulé
const arrReponses = localStorage.getItem("reponses");

// Lettre dominante
const lettre = trouverValeurLaPlusFrequente(arrReponses);

// Récupérer les infos du fichier JSON
fetch('./js/resultat.json')
    .then(res => res.json())
    .then(resultats => insererInfos(resultats))

function insererInfos(resultats){
    // Insérer les infos dans le HTML existant
    let strLettre = lettre.toString()
    document.querySelector(".lettre").textContent = `${resultats[strLettre].lettre}`;
    document.querySelector(".personnalite").textContent = `${resultats[strLettre].personnalite}`;
    document.querySelector(".description").textContent = `${resultats[strLettre].description}`;

    // Insérer l'image
    document.querySelector(".illustration").src = `../images/${resultats[strLettre].image}`;

    // Créer la liste des métiers associés
    let ul = document.createElement("ul");
    ul.classList.add("listeMetiers");
    document.querySelector(".sectionMetiers").append(ul);

    for(let cp = 0; cp < resultats[strLettre].metiers.length; cp++){
        let li = document.createElement("li");
        let lien = document.createElement("a");
        li.appendChild(lien);
        lien.setAttribute("href", "");
        lien.textContent = `${resultats[strLettre].metiers[cp]}`;
        document.querySelector(".listeMetiers").append(li)
    }
}