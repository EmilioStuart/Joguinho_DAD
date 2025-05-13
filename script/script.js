function timer(timerPlace){
    var timer = 5, minutes, seconds;

    setInterval(function(){

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        localStorage.setItem("minutos", minutes);        
        localStorage.setItem("segs", seconds);

        timerPlace.textContent = localStorage.getItem("minutos") + ":" +localStorage.getItem("segs"); 

        if(--timer < 0){
            timer = duration;
        }

        if(Number(localStorage.getItem("minutos")) + Number(localStorage.getItem("segs") == 10)){
            timerPlace.style.color = "#FF0000";
        }

        if((Number(localStorage.getItem("minutos")) + Number(localStorage.getItem("segs") -1 ) == 0)){
            window.location.href = "../index/paginaFinal.html";
        }

    }, 1000)
}

function validarEscolha(value, elementPlace){

    var pontuacaoAntiga = localStorage.getItem("pontos");

    if(value == true){
        localStorage.setItem("pontos", Number(pontuacaoAntiga) + 1);
    } else {
        localStorage.setItem("pontos", Number(pontuacaoAntiga) - 1);
    }

    elementPlace.textContent = localStorage.getItem("pontos");
}