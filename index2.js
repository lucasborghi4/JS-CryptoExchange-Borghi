const cryptos = [];
const monedas = [];
const seleccion = [];
let createCryptos = document.getElementById("createCryptos")
let desplegable = document.getElementById("desplegable")
let desplegable2 = document.getElementById("divisas")
let montoDivisa = document.getElementById("montoDivisa")
let montoCrypto = document.getElementById("montoCrypto")
let mensajeCrypto = document.getElementById("mensajeCrypto")
let confirmaCompra = document.getElementById("confirmarCompra")
let mensajeDivisa = document.getElementById("mensajeDivisa")
let mensajeMoneda = document.getElementById("mensajeMoneda")
let disclaimer = document.getElementById("disclaimer")
var moneda;
var maximoMoneda;
var monto;
var cryptoElegida;
var transaccion;
var dolarizar;
var gasto;
var costoCrypto;


class Cryptomoneda {
    constructor(nombre, precio, grafico){
        this.nombre = nombre
        this.precio = precio
        this.grafico = grafico
    }
}

class Divisas  {
    constructor (nombre, precioDolar, maximo, minimo, nombrePlural){
        this.nombre = nombre
        this.precioDolar = precioDolar
        this.maximo = maximo
        this.minimo = minimo
        this.nombrePlural = nombrePlural
    }
}

class Compras {
    constructor(nombreCrypto, precioTrans){
        this.nombreCrypto = nombreCrypto
        this.precioTrans = precioTrans
    }
}

// Declaro Cryptos y divisas disponibles y guardo nombres de divisas y cryptos

function inicioCryptosDivisas(){
    cryptos.push(new Cryptomoneda ("Bitcoin", 23500, ` <div style="width: 250px; height:220px; background-color: #FFFFFF; overflow:hidden; box-sizing: border-box; border: 1px solid #56667F; border-radius: 4px; text-align: right; line-height:14px; block-size:220px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #56667F;padding:1px;padding: 0px; margin: 0px;"><div style="height:200px; padding:0px; margin:0px; width: 100%;"><iframe src="https://widget.coinlib.io/widget?type=single_v2&theme=light&coin_id=859&pref_coin_id=1505" width="250" height="196px" scrolling="auto" marginwidth="0" marginheight="0" frameborder="0" border="0" style="border:0;margin:0;padding:0;line-height:14px;"></iframe></div><div style="color: #FFFFFF; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;"><a href="https://coinlib.io" target="_blank" style="font-weight: 500; color: #FFFFFF; text-decoration:none; font-size:11px">Cryptocurrency Prices</a>&nbsp;by Coinlib</div></div>` ));
    cryptos.push(new Cryptomoneda ("Ethereum", 1250, ` <div style="width: 250px; height:220px; background-color: #FFFFFF; overflow:hidden; box-sizing: border-box; border: 1px solid #56667F; border-radius: 4px; text-align: right; line-height:14px; block-size:220px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #56667F;padding:1px;padding: 0px; margin: 0px;"><div style="height:200px; padding:0px; margin:0px; width: 100%;"><iframe src="https://widget.coinlib.io/widget?type=single_v2&theme=light&coin_id=145&pref_coin_id=1505" width="250" height="196px" scrolling="auto" marginwidth="0" marginheight="0" frameborder="0" border="0" style="border:0;margin:0;padding:0;line-height:14px;"></iframe></div><div style="color: #FFFFFF; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;"><a href="https://coinlib.io" target="_blank" style="font-weight: 500; color: #FFFFFF; text-decoration:none; font-size:11px">Cryptocurrency Prices</a>&nbsp;by Coinlib</div></div>` ));

    monedas.push(new Divisas ("Peso", 121, 36500, 121, "pesos"));
    monedas.push(new Divisas ("Dólar", 1, 300, 1, "dolares"));

    arrayNombres = [];
    for (const producto of monedas){
        arrayNombres.push(producto.nombre) 
    }

    arrayCryptos = [];
    for (const producto of cryptos){
        arrayCryptos.push(producto.nombre)
    }   
}

function mostrarCryptos() {
    cryptos.forEach((crypto) =>{
    let card = document.createElement('div')
    card.innerHTML += ` <div class="card" style="width: 18rem;">
    <h5 class="card-title text-center">${crypto.nombre}</h5>
    <div class= "container-fluid"> ${crypto.grafico} </div>
    <div class="card-body d-flex justify-content-center">
    </div> </div>` 
    createCryptos.append(card)
})
}

function desplegableCryptos() {
    cryptos.forEach((crypto) =>{
        let desple = document.createElement('option')
        desple.innerHTML += ` ${crypto.nombre} ` 
        desplegable.append(desple)
    })
}

function desplegableCryptos() {
    cryptos.forEach((crypto) =>{
        let desple = document.createElement('option')
        desple.innerHTML += ` ${crypto.nombre} ` 
        desplegable.append(desple)
    })
    desplegable.onchange = () => console.log(desplegable.value)
}

function desplegableDivisas() {
    monedas.forEach((moneda) =>{
        let desple2 = document.createElement('option')
        desple2.innerHTML += ` ${moneda.nombre} ` 
        desplegable2.append(desple2)
    })
    desplegable2.onchange = () => {console.log(desplegable2.value)
    const buyMonto = monedas.find((el) => el.nombre === desplegable2.value)
    let mensajitoMoneda = document.createElement('div')
    if (buyMonto === undefined){
        let mensajitoMoneda = document.createElement('div')
        mensajeMoneda.innerText = " "
        mensajitoMoneda.innerHTML += `<p class="text-danger"> Selecciona una moneda primero </p> ` 
        mensajeMoneda.append(mensajitoMoneda)
    }
    else{
    mensajeMoneda.innerText = " "
    mensajeDivisa.innerText = " "
    montoDivisa.value = " ";
    let mensajitoDivisa = document.createElement('div')
    mensajeDivisa.innerText = " "
    mensajitoDivisa.innerHTML += `<p class="text-success"> Elegiste ${buyMonto.nombre} recuerda que debe ser un número dentro del límite especificado entre  ${buyMonto.minimo} y ${buyMonto.maximo} ${buyMonto.nombrePlural} </p> ` 
    mensajeDivisa.append(mensajitoDivisa)
    }
    }
}

function definirMonto() {
    montoDivisa.onchange = () => { console.log(montoDivisa.value)
    const buyMonto = monedas.find((el) => el.nombre === desplegable2.value)
    console.log(buyMonto)
    let mensajitoDivisa = document.createElement('div')
    if (buyMonto === undefined){
        mensajeDivisa.innerText = " "
        mensajitoDivisa.innerHTML += `<p class="text-danger"> Primero selecciona una moneda </p> ` 
        mensajeDivisa.append(mensajitoDivisa)
        monto = "nook"
    }

    if (buyMonto !== undefined){
    if ((montoDivisa.value === ''|| isNaN(montoDivisa.value) && (buyMonto.nombre == desplegable2.value))|| ((buyMonto.nombre == desplegable2.value) && (montoDivisa.value < buyMonto.minimo))|| ((buyMonto.nombre == desplegable2.value) && (montoDivisa.value > buyMonto.maximo))){
        mensajeDivisa.innerText = " "
        mensajitoDivisa.innerHTML += `<p class="text-danger"> No es un monto válido, recuerda que debe serun número dentro del límite especificado entre  ${buyMonto.minimo} y ${buyMonto.maximo} ${buyMonto.nombrePlural} </p> ` 
        mensajeDivisa.append(mensajitoDivisa)
        monto = "nook"
    }
    else{
        mensajeDivisa.innerText = " "
        monto = "ok"
    }
}}}

function definirCrypto() {
    montoCrypto.onchange = () => { console.log(montoCrypto.value)
    const buyMonto = monedas.find((el) => el.nombre === desplegable2.value)
    const buyCrypto = cryptos.find((el) => el.nombre === desplegable.value)
    let mensajitoCrypto = document.createElement('div')
    let dolarizar = montoDivisa.value/buyMonto.precioDolar;
    let gasto = dolarizar/buyCrypto.precio;
    dolarizar = dolarizar.toFixed(2)
    gasto = gasto.toFixed(8)
    if (buyMonto == undefined || buyCrypto == undefined || monto != "ok" ){
        mensajeCrypto.innerText = " "
        mensajitoCrypto.innerHTML += `<p class="text-danger"> Primero debes seleccionar una Crypto, una moneda y monto </p> ` 
        mensajeCrypto.append(mensajitoCrypto)
        transaccion = "nook"
    }
    if (buyMonto !== undefined && montoCrypto.value > gasto){
        mensajeCrypto.innerText = " "
        mensajitoCrypto.innerHTML += `<p class="text-danger"> Te pasaste del límite </p> ` 
        mensajeCrypto.append(mensajitoCrypto)
        transaccion = "nook"
    }
    if (buyMonto !== undefined && montoCrypto.value <= gasto){
        mensajeCrypto.innerText = " "
        mensajitoCrypto.innerHTML += `<p class="text-success"> Confirma tu compra </p> ` 
        mensajeCrypto.append(mensajitoCrypto) 
        transaccion = "ok"
        let botonCompra = document.createElement("div")
        botonCompra.innerHTML += `<button type="button" onclick="alertaConfirmacion()" class="btn btn-primary"> Confirmar Compra </button> `
        confirmaCompra.append(botonCompra) 
    }
    }
}

function seleccionadorCrypto(){
    desplegable.onchange = () => {
    const buyMonto = monedas.find((el) => el.nombre === desplegable2.value)
    const buyCrypto = cryptos.find((el) => el.nombre === desplegable.value)
    let dolarizar = montoDivisa.value/buyMonto.precioDolar;
    let gasto = dolarizar/buyCrypto.precio;
    dolarizar = dolarizar.toFixed(2)
    gasto = gasto.toFixed(8)
        if (buyMonto.nombre !== undefined && buyCrypto.nombre !== undefined){
            let alerta = document.createElement("div")
            disclaimer.innerText = " "
            alerta.innerHTML += `<p class="text-primary"> Tienes ${dolarizar} dólares para comprar hasta ${gasto} de ${buyCrypto.nombre} </p> ` 
            disclaimer.append(alerta)
        }
    }
}


function alertaConfirmacion(){
    const buyCrypto = cryptos.find((el) => el.nombre === desplegable.value)
    const buyMonto = monedas.find((el) => el.nombre === desplegable2.value)
    costoCrypto = montoCrypto.value*buyCrypto.precio
    let dolarizar = montoDivisa.value/buyMonto.precioDolar;
    dolarizar = dolarizar.toFixed(2)
    dolarizar = dolarizar-costoCrypto
    dolarizar = dolarizar.toFixed(2)
    alert("Tu compra fue satisfactoria! Compraste " + montoCrypto.value + " de " + buyCrypto.nombre + " y tu saldo restante es de " + dolarizar + " dólares.")
}



inicioCryptosDivisas();
mostrarCryptos();
desplegableCryptos();
desplegableDivisas();
definirMonto();
definirCrypto();
seleccionadorCrypto();