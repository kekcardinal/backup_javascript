window.addEventListener("load", function () {

    let nbBillets = 0;

    const champsNombre = document.querySelector("input[name='nombre-billets']");
    //Trouve le clone

    //Trouve le gabarit
    const billetGabarit = document.querySelector(".rangee-tarif.gabarit");
    const listeBillets = document.querySelector(".liste-rangee-billets");

    champsNombre.addEventListener("change", onChangementNombreBillets);
    //====================================
    // VARIABLES GLOBALES ET ÉLÉMENTS HTML
    // 
    const indexPanneau = 0;
    const panneaux = document.querySelectorAll("section");
    const formulaire = document.querySelector("form");
    const section = document.querySelector("section");
    const chkbox_allerretour = document.getElementById("date-retour");
    const lbl_allerretour = document.getElementById("lbl-retour");
    const lbl_dateretour = document.getElementById("champRetour");
    const p_aller_retour = document.getElementById("p_date_retour");

    const lbl_billet_un = document.getElementById("id_billet_un");
    const p_billet_un = document.getElementById("p_billet_un");

    const lbl_billet_deux = document.getElementById("id_billet_deux");
    const p_billet_deux = document.getElementById("p_billet_deux");

    const lbl_billet_trois = document.getElementById("id_billet_trois");
    const p_billet_trois = document.getElementById("p_billet_trois");

    const lbl_billet_quatre = document.getElementById("id_billet_quatre");
    const p_billet_quatre = document.getElementById("p_billet_quatre");

    const lbl_billet_cinq = document.getElementById("id_billet_cinq");
    const p_billet_cinq = document.getElementById("p_billet_cinq");

    let nouvelleQuantiteBillet = 0;
    let index = indexPanneau;

    let bouton1 = document.getElementById("bouton1");
    let bouton2 = document.getElementById("bouton2");
    let bouton3 = document.getElementById("bouton3");
    let bouton4 = document.getElementById("bouton4");
    let bouton5 = document.getElementById("bouton5");
    let bouton6 = document.getElementById("bouton6");
    let chkbox_aller_retour = document.getElementById("aller-retour");

    //Récupérer les champs
    //Récupérer les boutons de la navigation


    bouton1.addEventListener('click', function () {
        reculerNavigation();
    });

    bouton2.addEventListener('click', function () {

        avancerNavigation();
    });

    bouton3.addEventListener('click', function () {
        reculerNavigation();
    });

    bouton4.addEventListener('click', function () {
        avancerNavigation();
    });

    bouton5.addEventListener('click', function () {
        reculerNavigation();
    });

    bouton6.addEventListener('click', function () {

        avancerNavigation();
    });

    chkbox_aller_retour.addEventListener('click', function () {

        onChangementAllerRetour();
    });

    //====================================
    //  ÉCOUTEURS D'ÉVÉNEMENTS
    // 
    formulaire.addEventListener("submit", onSoumissionFormulaire);





    //====================================
    //  NAVIGATION
    // 
    //Tout cacher
    function cacherTousLesPanneaux() {
        for (const panneau of panneaux) {
            panneau.classList.add("invisible")
        }
    }

    //Afficher un panneau à la fois
    function afficherPanneau(indexPanneau) {
        cacherTousLesPanneaux();
        const panneauAAfficher = document.querySelector(`section[data-index='${indexPanneau}']`)
        panneauAAfficher.classList.remove("invisible")
    }

    function avancerNavigation() {

        if (index + 1 < 3) {
            if (validerNavigation()) {
                if (nouvelleQuantiteBillet != 0 || index != 1) {
                    index += 1;
                    afficherPanneau(index);
                    if (index === 2) {
                        afficherDansResume();
                    }
                }
            }
        }

    }

    function reculerNavigation() {
        if (index - 1 >= 0) {
            if (validerNavigation()) {
                index -= 1;
                afficherPanneau(index);
            }
        }
    }

    function validerNavigation() {
        let estValide = [];

        //On cherche les champs dans la section
        const listeChampsFormulaire = section.querySelectorAll("input, select");

        //Pour chaque champ on vérifie la validity
        for (const champ of listeChampsFormulaire) {
            if (window.getComputedStyle(champ).display !== "none") {
                console.log(champ.validity.valid); //Si le champ est valide ou non
                estValide.push(champ.checkValidity());
                champ.classList.toggle("invalide", champ.validity.valid === false)
            }
        }

        //Si un des champs est invalide on retourne faux
        if (estValide.includes(false)) {
            return false
        } else {
            return true;
        }
    }




    //====================================
    //  GESTION DU FORMULAIRE
    // 
    function onSoumissionFormulaire(evenement) {
        evenement.preventDefault();
    }

    function onChangementValeurChamp(evenement) {

    }

    function onChangementAllerRetour() {
        var checkboxs = document.getElementById("aller-retour");

        if (checkboxs.checked == 1) {
            chkbox_allerretour.classList.remove("invisible");
            lbl_allerretour.classList.remove("invisible");

        } else {
            chkbox_allerretour.classList.add("invisible");
            lbl_allerretour.classList.add("invisible");
        }
    }

    function onChangementNombreBillets(evenement) {
        const declencheur = evenement.target;

        if (declencheur.value < 0) {
            declencheur.value = declencheur.min;
        }
        if (declencheur.value > 5) {
            declencheur.value = declencheur.max;
        }

        nouvelleQuantiteBillet = declencheur.value;



        const ecart = Math.abs(nouvelleQuantiteBillet - nbBillets);
        console.log(ecart);


        if (nouvelleQuantiteBillet > nbBillets) {
            // Si nouvelleQuantiteBillet > nbBillets, on clone une rangée

            for (let i = nbBillets; i < nouvelleQuantiteBillet; i++) {
                //Copie le gabarit
                const clone = billetGabarit.cloneNode(true);

                console.log(clone);
                //Modifier les attributs du clone
                clone.classList.remove("invisible", "gabarit");
                //Récupérer les inputs radio enfants du clone
                //modifier l'attribut name de chacun
                /*  clone.setAttribute("name", "valeur differente pour chaque rangee" ) */
                let valeur = clone.querySelectorAll('input');
                for (const valeurs of valeur) {
                    valeurs.setAttribute('name', `group${i}`);
                    valeurs.checked = true;
                }

                //Ajoute la copie à la page web
                listeBillets.append(clone);
            }
        } else if (nouvelleQuantiteBillet < nbBillets) {
            // Si nouvelleQuantiteBillet < nbBillets, on supprime la dernière rangée 
            for (let i = 0; i < ecart; i++) {
                let dernierEnfant = listeBillets.lastElementChild;
                dernierEnfant.remove();
            }
        }

        // clone.querySelector('input').setAttribute('name', `group${i}`);
        nbBillets = nouvelleQuantiteBillet;
    }

    function ajouterBillet() {

    }

    function retirerBillet() {

    }

    function validerSection(section) {}



    //====================================
    //  AFFICHAGE RÉSUMÉ
    // 
    function afficherDansResume() {
        var nom = document.getElementById("nom").value;

        document.getElementById("champNom").textContent = nom;

        var courriel = document.getElementById("courriel").value;
        document.getElementById("champCourriel").textContent = courriel;

        var destination = document.getElementById("destination").value;
        document.getElementById("champDestination").textContent = destination;

        var dateDepart = document.getElementById("date-depart").value;
        document.getElementById("champDepart").textContent = dateDepart;

        if (window.getComputedStyle(lbl_allerretour).display !== "none") {
            lbl_dateretour.classList.remove("invisible");
            p_aller_retour.classList.remove("invisible");
            var dateRetour = document.getElementById("date-retour").value;
            document.getElementById("champRetour").textContent = dateDepart;
        } else {
            lbl_dateretour.classList.add("invisible");
            p_aller_retour.classList.add("invisible");
        }

        if (nouvelleQuantiteBillet >= 1) {
            lbl_billet_un.classList.remove("invisible");
            p_billet_un.classList.remove("invisible");
            var billet_un = document.querySelector('input[name="group0"]:checked').value;
            document.getElementById("id_billet_un").textContent = billet_un;
        } else {
            lbl_billet_un.classList.add("invisible");
            p_billet_un.classList.add("invisible");
        }

        if (nouvelleQuantiteBillet >= 2) {
            lbl_billet_deux.classList.remove("invisible");
            p_billet_deux.classList.remove("invisible");
            var billet_deux = document.querySelector('input[name="group1"]:checked').value;
            document.getElementById("id_billet_deux").textContent = billet_deux;
        } else {
            lbl_billet_deux.classList.add("invisible");
            p_billet_deux.classList.add("invisible");
        }
        if (nouvelleQuantiteBillet >= 3) {
            lbl_billet_trois.classList.remove("invisible");
            p_billet_trois.classList.remove("invisible");
            var billet_trois = document.querySelector('input[name="group2"]:checked').value;
            document.getElementById("id_billet_trois").textContent = billet_trois;
        } else {
            lbl_billet_trois.classList.add("invisible");
            p_billet_trois.classList.add("invisible");
        }

        if (nouvelleQuantiteBillet >= 4) {
            lbl_billet_quatre.classList.remove("invisible");
            p_billet_quatre.classList.remove("invisible");
            var billet_quatre = document.querySelector('input[name="group3"]:checked').value;
            document.getElementById("id_billet_quatre").textContent = billet_quatre;
        } else {
            lbl_billet_quatre.classList.add("invisible");
            p_billet_quatre.classList.add("invisible");
        }

        if (nouvelleQuantiteBillet >= 5) {
            lbl_billet_cinq.classList.remove("invisible");
            p_billet_cinq.classList.remove("invisible");
            var billet_cinq = document.querySelector('input[name="group4"]:checked').value;
            document.getElementById("id_billet_cinq").textContent = billet_cinq;
        } else {
            lbl_billet_cinq.classList.add("invisible");
            p_billet_cinq.classList.add("invisible");
        }
    }

    function afficherTypeBilletsDansResume() {

    }



    //====================================
    //  INITIALISATION DE LA PAGE AU CHARGEMENT
    // 
    afficherPanneau(indexPanneau)
    chkbox_allerretour.classList.add("invisible");
    lbl_allerretour.classList.add("invisible");
})