let arrReponses = [];

function afficherProchaineQuestion(e) {
    let question = e.target.closest("fieldset");
    let arrLi = Array.from(question.children[1].children);
    let reponse = 0;

    //Vérifier si une réponse a été sélectionnée
    arrLi.forEach((li) => {
        if (li.children[0].checked) {
            reponse += 1;
        }
    });

    //Afficher la question suivante et faire défiler la page
    if (reponse == 1 && question.id != 10) {
        question.nextElementSibling.removeAttribute("hidden");
        question.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
    }
    if (reponse == 1) {
        document.getElementById("progression").setAttribute("value", `${question.id}`);
    }
    if (question.id == 10) {
        afficherBtnResultat()
    }
}

function remplirLeTableauReponses() {
    let intNumberFieldset = document.querySelectorAll("fieldset").length;
    for (let intNoQuestion = 0; intNoQuestion < intNumberFieldset; intNoQuestion++) {
        let inputChecked = document.querySelector('input[name="question' + (intNoQuestion + 1) + '"]:checked');
        arrReponses.push(inputChecked.value);             
    }
    localStorage.setItem("reponses", JSON.stringify(arrReponses));
    console.log("Réponses de l'utilisateur :", arrReponses);
    // Rediriger vers la page de résultats
    window.location.href = "resultat.html";
}

function effacerLocalStorage() {
    localStorage.removeItem("reponses");
    console.log("LocalStorage effacé");
    // Décoche tous les boutons radio
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
    });

    // Réinitialise le tableau des réponses si vous l'utilisez
    if (typeof arrReponses !== "undefined") {
        arrReponses.length = 0;
    }

    // (optionnel) cacher toutes les questions sauf la première
    const fieldsets = document.querySelectorAll("fieldset");
    fieldsets.forEach((fs, index) => {
        if (index === 0) {
            fs.removeAttribute("hidden");
        } else {
            fs.setAttribute("hidden", true);
        }
    });
}

function afficherBtnResultat(){
    document.getElementById("reveler").removeAttribute("hidden");
}



window.addEventListener("load", effacerLocalStorage);
window.addEventListener("click", afficherProchaineQuestion);
document.getElementById("reveler").addEventListener("click", remplirLeTableauReponses)
