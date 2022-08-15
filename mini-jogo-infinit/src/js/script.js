const bloco = document.getElementById('bloco');
const tecla = document.querySelectorAll("span");
const pontos = document.getElementById('pontos');

let posiX = 0;
let posiY = 0;

let mov = 0;
let pts = 0;

let objPosX;
let objPosY;
let obj;

function criarObj(){
  objPosX = Math.floor(Math.random()*400);
  objPosY = Math.floor(Math.random()*500);
  obj = document.createElement('div');
  obj.style.position = 'absolute';
  obj.style.backgroundColor = 'red';
  obj.style.width = 50+'px';
  obj.style.height = 50+'px';
  obj.style.borderRadius = 50+'%';
  obj.style.top = `${objPosY}px`;
  obj.style.left = `${objPosX}px`;
  document.body.appendChild(obj);
}

tecla.forEach( function(span) {
    
    var t = span.addEventListener("click", function(event) {

    const el = event.target || event.srcElement;

    const id = el.id; //430
    
    if (mov === 0) {
      criarObj()
    } else if (objPosX < posiX && objPosY < posiY && objPosX + 60 > posiX && objPosY + 60 > posiY || objPosX > posiX && objPosY > posiY && objPosX - 50 < posiX && objPosY - 60 < posiY) {
      obj.remove()
      pts++;
      pontos.innerText = `PONTOS: ${pts}`;
      criarObj()
    }
    
    if (id === 'left') {
      if (posiX > 10) {
        posiX -= 20;
        bloco.style.left = `${posiX}px`;
        mov++;
      }
    } else if (id === 'top') {
      if (posiY > 10) {
        posiY -= 20;
        bloco.style.top = `${posiY}px`;
        mov++;
      }
    } else if (id == 'right') {
      if (posiX < 420) {
        posiX += 20;
        bloco.style.left = `${posiX}px`;
        mov++;
      }
    } else if (id == 'bottom') {
      if (posiY < 500) {
        posiY += 20;
        bloco.style.top = `${posiY}px`;
        mov++;
      }
    }
    });
});