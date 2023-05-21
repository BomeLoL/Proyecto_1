const card = document.querySelectorAll('.cell')
const front = document.querySelectorAll('.front')
const container = document.querySelector('.container')
timeTag = document.querySelector(".time b")
const info_puntuacion = document.querySelector('.info-puntaje')
refreshBtn = document.querySelector(".back span");




let maxTime = 180;
let timeLeft = maxTime;
let matchedCard = 0;    
let isPlaying = false;
let usuario="";
let lista = [];
let espera = true;
let disable = false;


const puntuacion_maxima = 1000

const falla="";

suffleImage()
clicking()
if (usuario!=falla){
guardar_localstorage(); 
cargar_localstorage();}




function initTimer() {
    if(timeLeft ==0){
        guardar_localstorage(); 
        cargar_localstorage();
        tablita();
        info_puntuacion.style.display = 'block';
        let points = puntuacion_maxima*(timeLeft/maxTime)
        document.querySelector(".puntaje span").innerHTML = Math.round(points)+" puntos";

    }
    if(timeLeft <= 0) {
        return clearInterval(timer);
    }

    timeLeft--;
    timeTag.innerText = timeLeft;
}



    document.querySelector(".control-buttons span").onclick = function username() {

    let yourName = prompt("Escribe tu nombre de Usuario: ");
  
    if (yourName == null || yourName == "") {
        
      username();
  
    } else {    
        usuario = yourName.toLowerCase();
        document.querySelector(".name span").innerHTML = yourName.toLowerCase();
      
  
    }
    if(yourName!=null && yourName != ""){
        document.querySelector(".control-buttons").style.display = 'none';
        usuario = yourName.toLowerCase();}
    
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }


  }


function inicio(){    
    location.reload();
}


function suffleImage(){
    timeLeft = maxTime;
    matchedCard = 0;
    isPlaying = false;
    timeTag.innerText = timeLeft;


    card.forEach(c=>{

        const num = [...Array(card.length).keys()]
        const random = Math.floor(Math.random()*card.length)

        c.style.order = num[random]
    })
}


function clicking(){
        

    for(let i =0; i<card.length; i++){

        card[i].addEventListener('click' ,()=>{
        
         front[i].classList.add('flip')
           const filppedCard = document.querySelectorAll('.flip')

            if(filppedCard.length == 2){
                espera = true;
                container.style.pointerEvents ='none'
                match(filppedCard[0] , filppedCard[1])
                if(espera==false){
                    setTimeout(() => {
                    
                    container.style.pointerEvents ='all'
                }, 500);

            }

            }

        })

    }

}




function match(cardOne , cardTwo){
                
    if (timeLeft!=0){
    if(cardOne.dataset.index == cardTwo.dataset.index){

        matchedCard++;
        if(matchedCard == 8 && timeLeft > 0) {
            guardar_localstorage(); 
            cargar_localstorage();
            tablita();
            info_puntuacion.style.display = 'block';
            let points = puntuacion_maxima*(timeLeft/maxTime)
            document.querySelector(".puntaje span").innerHTML = Math.round(points)+" puntos";
            return clearInterval(timer);
        }
       
        cardOne.classList.remove('flip') 
        cardTwo.classList.remove('flip') 


        cardOne.classList.add('match')
        cardTwo.classList.add('match')

    }else{
        
        setTimeout(() => {
                
            cardOne.classList.remove('flip') 
            cardTwo.classList.remove('flip') 
        }, 400);
    }

                
} espera = false}

function guardar_localstorage(){
    
    let points = Math.round(puntuacion_maxima*(timeLeft/maxTime));

    let verificador = false; 
    let verificador2=false;
    let lst_temp=[];
    let cont = 0;
     
    
    cargar_localstorage()


    for (i=0; i<lista.length;i++){

        if (lista[i].username == usuario){
            verificador = true
            cont=i;
            break
        }
        }

    if (verificador==true){
        for (y=0; y<lista.length; y++){
            if (y==cont){
                if (points > lista[y].puntaje){
                lista[y].puntaje = points
                lst_temp.push(lista[y]) 
                verificador2=true;
            }


            }else{
                lst_temp.push(lista[y])}    
    }
    if (verificador2 == true){
        
        lst_temp.sort((a, b) => {
            return b.puntaje - a.puntaje
        });


        
    localStorage.setItem("lista", JSON.stringify(lst_temp));

    }}


    if (verificador ==false){
        lista.push({
        username: usuario,
        puntaje: points
    })

    lista.sort((a, b) => {
        return b.puntaje - a.puntaje;
    });


    localStorage.setItem("lista", JSON.stringify(lista));} 


}



function cargar_localstorage(){
    data=JSON.parse(localStorage.getItem("lista"));
    if(data!=null){
        lista=JSON.parse(localStorage.getItem("lista"));
    }
    
}

function tablita(){
    cargar_localstorage(); 
    let listica ="";
    for (i=0 ; i<lista.length; i++){
        listica+= '"'+lista[i].username+'"'+" ---> "+ lista[i].puntaje+" pts"+"<br>";
    }
    document.querySelector(".info-puntaje .tabla .info").innerHTML = listica;
}


function reestart(){
    inicio();
}

refreshBtn.addEventListener("click", reestart);