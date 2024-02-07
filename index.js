let stat1 = false;
        let stat2 = false;

        function afficherDiv1() {
            var div = document.getElementById("contenu1");
            var divt = document.getElementById("titre1");
            if (!stat1) {
            div.style.display = "block";
                divt.classList.remove("rounded");
            stat1 = true;
            } else {
                div.style.display = "none";
                divt.classList.add("rounded");
                stat1 = false;
            }
        }

        function afficherDiv2() {
            var div2 = document.getElementById("contenu2");
            var divt2 = document.getElementById("titre2");
            if (!stat2) {
            div2.style.display = "block";
            divt2.classList.remove("rounded");
            stat2 = true;
            } else {
                div2.style.display = "none";
                divt2.classList.add("rounded");
                stat2 = false;
            }
        }

function redirigerVersNouvellePage() {
    window.location.href = "https://travail1sti2d1.github.io/TP-IT/index.html";
}

function copierLien() {
    var lien_copier = "https://bit.ly/TP-IT";
    var tempInput = document.createElement("input");
    tempInput.setAttribute("value", lien_copier);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    alert("Lien copier : https://bit.ly/TP-IT");
}

let stateView = true;

        function afficherView() {
            var docview = document.getElementById("view");
            if (!stateView) {
                docview.style.display = "block";
                stateView = true;
            } else {
                docview.style.display = "none";
                stateView = false;
            }
        }

        let stateView2 = true;

        function afficherView2() {
            var docview2 = document.getElementById("view2");
            if (!stateView2) {
                docview2.style.display = "block";
                stateView2 = true;
            } else {
                docview2.style.display = "none";
                stateView2 = false;
            }
        }