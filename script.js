let filaM1=1,filaM2=1;
let colM1=1,colM2=1;

let matriz1Js=[[0]];
let matriz2Js=[[0]];
let reJs;

const matriz1=document.getElementById("matriz1");
const matriz2=document.getElementById("matriz2");
const lblm1=document.getElementById("lblInfoM1");
const lblm2=document.getElementById("lblInfoM2")
const btnArriM1=document.getElementById("btn-arriba-m1");
const btnAbaM1=document.getElementById("btn-abajo-m1");
const btnIzqM1=document.getElementById("btn-izquierda-m1");
const btnDerM1=document.getElementById("btn-derecha-m1");

const btnArriM2=document.getElementById("btn-arriba-m2");
const btnAbaM2=document.getElementById("btn-abajo-m2");
const btnIzqM2=document.getElementById("btn-izquierda-m2");
const btnDerM2=document.getElementById("btn-derecha-m2");

function actualizaDatos(){
   lblm1.textContent=`${filaM1}x${colM1}`;
   lblm2.textContent=`${filaM2}x${colM2}`;

}


function creaMatriz(fila,col){
    let ma=[];
    for(let i=0;i<fila;i++){
        ma.push([]);
        for(let j=0;j<col;j++){
            ma[i].push(0);
        }
    }

    return ma;
}
btnAbaM1.addEventListener("click",e=>{
    creceMatriz("f",matriz1,filaM1,colM1);
    filaM1++;
    cambiTamaMatriz();
    actualizaDatos()
})
btnAbaM2.addEventListener("click",e=>{
    creceMatriz("f",matriz2,filaM2,colM2);
    filaM2++;
    cambiTamaMatriz();
    actualizaDatos()
})


btnArriM1.addEventListener("click",e=>{
    filaM1=disminuyeMatriz("f",matriz1,filaM1,colM1);
    cambiTamaMatriz();
    actualizaDatos()
    
})

btnArriM2.addEventListener("click",e=>{
    filaM2=disminuyeMatriz("f",matriz2,filaM2,colM2);
    cambiTamaMatriz();
    actualizaDatos()
})
btnDerM1.addEventListener("click",e=>{
    creceMatriz("c",matriz1,filaM1,colM1);
    colM1++;
    cambiTamaMatriz();
    actualizaDatos()
})


btnDerM2.addEventListener("click",e=>{
    creceMatriz("c",matriz2,filaM2,colM2);
    colM2++;
    cambiTamaMatriz();
    actualizaDatos()
})

btnIzqM1.addEventListener("click",e=>{
    colM1=disminuyeMatriz("c",matriz1,filaM1,colM1);
    cambiTamaMatriz();
    actualizaDatos()
})

btnIzqM2.addEventListener("click",e=>{
    colM2=disminuyeMatriz("c",matriz2,filaM2,colM2);
    cambiTamaMatriz();
    actualizaDatos()
})

document.getElementById("btnSuma").addEventListener("click",e=>{
    
    leeMatrices();
    reJs=sumaMatriz(matriz1Js,matriz2Js);
    if(reJs!=null){
        muestraResu(reJs);
    }else{
        
        alert("No se puede realizar la suma")
    }
    
})
document.getElementById("btnResta").addEventListener("click",e=>{
    leeMatrices();
    reJs=restaMatriz(matriz1Js,matriz2Js);
    if(reJs!=null){
        muestraResu(reJs);
    }else{
        alert("No se puede realizar la resta")
    }
})

document.getElementById("btnMulti").addEventListener("click",(e)=>{
    leeMatrices();
    reJs=multiMatriz(matriz1Js,matriz2Js);
    if(reJs!=null){
        muestraResu(reJs);
    }else{
        alert("No se puede realizar la multipliacion")
    }
})
function leeMatrices(){
    for(let i=0;i<filaM1;i++){
        for(let j=0;j<colM1;j++){
            matriz1Js[i][j]=parseInt(matriz1.children.item(i).children.item(j).value);
        }
    }
    for(let i=0;i<filaM2;i++){
        for(let j=0;j<colM2;j++){
            matriz2Js[i][j]=parseInt(matriz2.children.item(i).children.item(j).value);
        }
    }
}

function muestraResu(matrizRe){

    let re=document.querySelector(".re");
    let res=document.createElement("p");
    res.textContent=`${matrizRe.length}x${matrizRe[0].length}`
    res.classList.add("info");
    let m=document.createElement("div");
    m.classList.add("matriz")
    while(re.childNodes.length>=1){
        re.removeChild(re.firstChild);
    }
    re.append(res)
    re.append(m);
    
    for(let i=0;i<matrizRe.length;i++){

        let texto=""
        texto+="<div class=\"row\" >"
        for(let j=0;j<matrizRe[i].length;j++){
            texto+=`<input type=\"number\" class=\"box\" value="${matrizRe[i][j]}" readonly>`
        }
        texto+="</div>"
        m.innerHTML+=texto;
    }
}
function creceMatriz(direccion,matriz,fil=0,col=0){
    if(direccion==="f"){

        let texto="";
        texto+="<div class=\"row\">";
        for(let i=0;i<col;i++){
            texto+="<input type=\"number\" class=\"box\" required>"
        }
        texto+="</div>";
        matriz.innerHTML+=texto;
        
    }else if(direccion==="c"){

        
        for(let i=0;i<fil;i++){
           
            matriz.children.item(i).innerHTML+="<input type=\"number\" class=\"box\" required>"
        }

        
    }
}

function disminuyeMatriz(direccion,matriz,fil=0,col=0) {
    if(direccion==="f"){

        if(fil>1){
          matriz.children.item(fil-1).remove();
          return fil-1;
        }else{
            return fil;
        }
        
    }else if(direccion==="c"){

        if(col>1){

            for(let i=0;i<fil;i++){
                
                matriz.children.item(i).children.item(col-1).remove();
            }
            return col-1;           
        }else{
            return col;
        }
        
    }

    
}


function cambiTamaMatriz(){

    matriz1Js=creaMatriz(filaM1,colM1);
    matriz2Js=creaMatriz(filaM2,colM2);
}

function sumaMatriz(m1,m2){

    let re=null;
    if(m1.length===m2.length&&
    m1[0].length===m2[0].length){
        re=[];
        for(let i=0;i<filaM1;i++){
            re.push([]);
            for(let j=0;j<colM1;j++){
                re[i].push(0);
            }
        }


        for(let i=0;i<filaM1;i++){
            
            for(let j=0;j<colM1;j++){
                re[i][j]=m1[i][j]+m2[i][j];
            }
        }
    }
    return re;
}
function restaMatriz(m1,m2){

    let re=null;
    if(m1.length===m2.length&&
    m1[0].length===m2[0].length){
        re=[];
        for(let i=0;i<filaM1;i++){
            re.push([]);
            for(let j=0;j<colM1;j++){
                re[i].push(0);
            }
        }


        for(let i=0;i<filaM1;i++){
            
            for(let j=0;j<colM1;j++){
                re[i][j]=m1[i][j]-m2[i][j];
            }
        }
    }
    return re;
}
function multiMatriz(m1,m2){

    let re=null;
    if(m1[0].length==m2.length){
        re=[];
        for(let i=0;i<m1.length;i++){
            re.push([]);
            for(let j=0;j<m2[0].length;j++){
                re[i].push(0);
            }
        }


        for (let i = 0; i < filaM1; i++) 
        for (let j = 0; j < colM2; j++) 
            for (let k = 0; k < colM1; k++) 
            { 
                re[i][j] += m1[i][k] * m2[k][j]; 
            } 
    }
    return re;
}

