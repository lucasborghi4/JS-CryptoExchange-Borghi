const cryptos = [];
const monedas = [];
const seleccion = [];
let muestraSaldo = document.getElementById("muestraSaldo")
let createCryptos = document.getElementById("createCryptos")
let cuestionario = document.getElementById("cuestionario")
let desplegable = document.getElementById("desplegable")
let desplegable2 = document.getElementById("divisas")
let montoDivisa = document.getElementById("montoDivisa")
let montoCrypto = document.getElementById("montoCrypto")
let mensajeCrypto = document.getElementById("mensajeCrypto")
let confirmaCompra = document.getElementById("confirmarCompra")
let mensajeDivisa = document.getElementById("mensajeDivisa")
let mensajeMoneda = document.getElementById("mensajeMoneda")
let disclaimer = document.getElementById("disclaimer")
let saldodiv = document.getElementById("saldo")
let reiniciarSaldo = document.getElementById("reiniciarSaldo")
let borrarHistorial = document.getElementById("borrarHistorial")
let borrarTodo = document.getElementById("borrarTodo")
let historial = document.getElementById("historial")
let cancelarCompra = document.getElementById("cancelarCompra")
var moneda;
var maximoMoneda;
var monto;
var cryptoElegida;
var transaccion;
var dolarizar;
var gasto;
var costoCrypto;
let saldo = 0


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
    constructor(nombreCrypto, cantidadCrypto, precioTrans){
        this.nombreCrypto = nombreCrypto
        this.cantidadCrypto = cantidadCrypto
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

function mostrarSaldo(){
let darSaldo = localStorage.getItem('saldo')
if (darSaldo !== null){
saldodiv.setAttribute ("value" , darSaldo)
muestraSaldo.innerText = `Saldo: $${darSaldo} USD`}
else{
    saldodiv.setAttribute ("value" , 0)
    muestraSaldo.innerText = `Saldo: $0.00 USD`
}
try {
    let storedSeleccion = JSON.parse(localStorage.getItem('historia'))
    console.log ("!" + storedSeleccion);
    historial.innerHTML = ""
    for (const compras of storedSeleccion){
    let historia = document.createElement('div')
    historia.innerHTML = `Compraste ${compras.cantidadCrypto} de ${compras.nombreCrypto} por ${compras.precioTrans} dolares`
    historial.append(historia) }
}
catch(e) {
    let storedSeleccion = [];
    console.log ("$$" + storedSeleccion);
    let historia = document.createElement('div')
    historial.innerHTML = ""
    for (const compras of storedSeleccion){
    historia.innerHTML = `Compraste ${compras.cantidadCrypto} de ${compras.nombreCrypto} por ${compras.precioTrans} dolares`
    historial.append(historia) }
}
}

function mostrarCryptos() {
    cryptos.forEach((crypto) =>{
    let card = document.createElement('div')
    card.setAttribute ("class" , "col-sm-6 d-flex justify-content-center mt-3" )
    createCryptos.append(card)
    let carta = document.createElement ('div')
    carta.setAttribute ("class" , "card")
    carta.setAttribute ("style" , "width: 18rem;")
    carta.innerHTML = `<h5 class="card-title text-center">${crypto.nombre}</h5>
    <div class= "container-fluid"> ${crypto.grafico} </div>` 
    let botonCrypto = document.createElement("button")
    botonCrypto.setAttribute ("class" , "btn btn-primary mt-2")
    botonCrypto.setAttribute ("type" , "button")
    botonCrypto.innerText = ("Compra YA!")
    card.append(carta)
    carta.append(botonCrypto)

    botonCrypto.addEventListener("click" , function () {
        document.getElementById("cuestionario").style="display:inline-block";
        desplegable.setAttribute ("value" , crypto.nombre)
        desplegable2.value = "Elegí tu moneda"
        montoCrypto.value = ""
        montoDivisa.value = ""
        mensajeMoneda.innerText = " "
        mensajeDivisa.innerHTML = ` `
        mensajeCrypto.innerHTML = ` `
        disclaimer.innerHTML = " "
        confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn btn-primary"> Confirmar Compra </button> `
    })
})
}


function desplegableDivisas() {
    monedas.forEach((moneda) =>{
        let desple2 = document.createElement('option')
        desple2.innerHTML += ` ${moneda.nombre} ` 
        desplegable2.append(desple2)
    })
    desplegable2.onchange = () => {console.log(desplegable2.value)
    const buyMonto = monedas.find((el) => el.nombre === desplegable2.value)
    if (buyMonto === undefined){
        mensajeMoneda.innerHTML += `<p class="text-danger"> Selecciona una moneda primero </p> ` 
        montoDivisa.value = ""
    }
    else{
    mensajeMoneda.innerText = " "
    mensajeDivisa.innerHTML = ` `
    montoDivisa.value = ""
    montoCrypto.value = ""
    mensajeCrypto.innerHTML = ` `
    disclaimer.innerHTML = " "
    mensajeDivisa.innerHTML += `<p class="text-success"> Elegiste ${buyMonto.nombre} recuerda que debe ser un número dentro del límite especificado entre ${buyMonto.minimo} y ${buyMonto.maximo} ${buyMonto.nombrePlural} </p> ` 
    confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn btn-primary"> Confirmar Compra </button> `
}
    }
}

function definirMonto() {
    montoDivisa.onchange = () => { console.log(montoDivisa.value)
    const buyMonto = monedas.find((el) => el.nombre === desplegable2.value)
    const buyCrypto = cryptos.find((el) => el.nombre === desplegable.value)
    if (buyMonto === undefined){
        mensajeDivisa.innerHTML = `<p class="text-danger"> Primero selecciona una moneda </p> ` 
        monto = "nook"
    }

    if (buyMonto !== undefined){
        if ((montoDivisa.value === ''|| isNaN(montoDivisa.value) && (buyMonto.nombre == desplegable2.value))|| ((buyMonto.nombre == desplegable2.value) && (montoDivisa.value < buyMonto.minimo))|| ((buyMonto.nombre == desplegable2.value) && (montoDivisa.value > buyMonto.maximo))){
            mensajeDivisa.innerText = " "
            mensajeDivisa.innerHTML = `<p class="text-danger"> No es un monto válido, recuerda que debe ser un número dentro del límite especificado entre  ${buyMonto.minimo} y ${buyMonto.maximo} ${buyMonto.nombrePlural} </p> ` 
            disclaimer.innerHTML = ` `
            monto = "nook"
        }
    else{
        if (buyCrypto == undefined && buyMonto.nombre == desplegable2.value && montoDivisa.value > buyMonto.minimo || buyCrypto == undefined && buyMonto.nombre == desplegable2.value && montoDivisa.value < buyMonto.maximo){
            mensajeDivisa.innerHTML = ` `
            monto = "ok"
            montoCrypto.value = ""
            mensajeCrypto.innerHTML = ` `
            disclaimer.innerHTML = ` `
            confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn btn-primary"> Confirmar Compra </button> `
        }
        else{
        let dameSaldo = localStorage.getItem('saldo')
        let dolarizar = montoDivisa.value/buyMonto.precioDolar;
        dameSaldo = +dameSaldo + +dolarizar
        let gasto = dameSaldo/buyCrypto.precio;
        dameSaldo = dameSaldo.toFixed(2)
        localStorage.setItem('saldo' , dameSaldo)
        gasto = gasto.toFixed(8)
        mensajeDivisa.innerHTML = ` `
        monto = "ok"
        montoCrypto.value = ""
        mensajeCrypto.innerHTML = ` `
        disclaimer.innerHTML = `<p class="text-primary"> Tienes ${dameSaldo} dólares para comprar hasta ${gasto} de ${buyCrypto.nombre} </p> ` 
        confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn btn-primary"> Confirmar Compra </button> `
        }}
}}}

function definirCrypto() {
    montoCrypto.onchange = () => { console.log(montoCrypto.value)
    const buyMonto = monedas.find((el) => el.nombre === desplegable2.value)
    const buyCrypto = cryptos.find((el) => el.nombre === desplegable.value)
    if (buyMonto == undefined || buyCrypto == undefined || monto != "ok" ){
        mensajeCrypto.innerHTML = `<p class="text-danger"> Primero debes seleccionar una moneda y monto </p> ` 
        transaccion = "nook"
    }
    let dolarizar = montoDivisa.value/buyMonto.precioDolar;
    let dameSaldo = localStorage.getItem('saldo')
    dameSaldo = +dameSaldo + +dolarizar
    dameSaldo = dameSaldo.toFixed(2)
    let gasto = dameSaldo/buyCrypto.precio;
    dolarizar = dolarizar.toFixed(2)
    gasto = gasto.toFixed(8)
    if (buyMonto !== undefined && montoCrypto.value > gasto){
        mensajeCrypto.innerHTML = `<p class="text-danger"> Te pasaste del límite </p> ` 
        confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn btn-primary"> Confirmar Compra </button> `
        transaccion = "nook"
    }
    if (buyMonto !== undefined && montoCrypto.value <= gasto){
        mensajeCrypto.innerHTML = `<p class="text-success"> Confirma tu compra </p> ` 
        confirmaCompra.innerHTML = `<button type="button" onclick="alertaConfirmacion()" class="btn btn-primary"> Confirmar Compra </button> `
    }
    }
}


function alertaConfirmacion(){
    swal({
        title: "¿Querés hacer esta compra?",
        text: "No se puede cancelar una vez realizada",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((confirmation) => {
        if (confirmation) {
            const buyCrypto = cryptos.find((el) => el.nombre === desplegable.value)
            const buyMonto = monedas.find((el) => el.nombre === desplegable2.value)
            costoCrypto = montoCrypto.value*buyCrypto.precio
            costoCrypto = costoCrypto.toFixed(2)
            let dameSaldo = localStorage.getItem('saldo')
            dameSaldo = dameSaldo-costoCrypto
            dameSaldo = dameSaldo.toFixed(2)
            try {
                var seleccion = JSON.parse(localStorage.getItem('historia'))
                seleccion.push(new Compras (buyCrypto.nombre, montoCrypto.value, costoCrypto));
                localStorage.setItem('historia' , JSON.stringify(seleccion))
            }
            catch(e) {
                let seleccion = [];
                seleccion.push(new Compras (buyCrypto.nombre, montoCrypto.value, costoCrypto));
                localStorage.setItem('historia' , JSON.stringify(seleccion))
            }
            try {
                let storedSeleccion = JSON.parse(localStorage.getItem('historia'))
                console.log ("!" + storedSeleccion);
                historial.innerHTML = ""
                for (const compras of storedSeleccion){
                let historia = document.createElement('div')
                historia.innerHTML = `Compraste ${compras.cantidadCrypto} de ${compras.nombreCrypto} por ${compras.precioTrans} dolares`
                historial.append(historia) }
            }
            catch(e) {
                let storedSeleccion = [];
                console.log ("$$" + storedSeleccion);
                let historia = document.createElement('div')
                historial.innerHTML = ""
                for (const compras of storedSeleccion){
                historia.innerHTML = `Compraste ${compras.cantidadCrypto} de ${compras.nombreCrypto} por ${compras.precioTrans} dolares`
                historial.append(historia) }
            }
            localStorage.setItem('saldo' , dameSaldo)
            saldodiv.setAttribute ("value" , dameSaldo)
            mensajeDivisa.innerHTML = ` `
            montoCrypto.value = ""
            mensajeCrypto.innerHTML = ` `
            disclaimer.innerHTML = ` `
            desplegable2.value = "Elegí tu moneda"
            montoDivisa.value = ""
            confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn btn-primary"> Confirmar Compra </button> `
            document.getElementById("cuestionario").style="display:none";
            muestraSaldo.innerText = `Saldo: $${dameSaldo} USD`
            swal("Compra aprobada", "Realizaste una compra", "success");
        } 
        else {
            swal("La compra fue cancelada");
            desplegable2.value = "Elegí tu moneda"
            montoCrypto.value = ""
            montoDivisa.value = ""
            mensajeMoneda.innerText = " "
            mensajeDivisa.innerHTML = ` `
            mensajeCrypto.innerHTML = ` `
            disclaimer.innerHTML = " "
            confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn btn-primary"> Confirmar Compra </button> `
            document.getElementById("cuestionario").style="display:none";
        }
    });
}


function cancelamientoCompra() {
    swal("¡Cancelaste tu Compra!", "Puedes volver a iniciar otra compra", "error");
    desplegable2.value = "Elegí tu moneda"
    montoCrypto.value = ""
    montoDivisa.value = ""
    mensajeMoneda.innerText = " "
    mensajeDivisa.innerHTML = ` `
    mensajeCrypto.innerHTML = ` `
    disclaimer.innerHTML = " "
    confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn btn-primary"> Confirmar Compra </button> `
    document.getElementById("cuestionario").style="display:none";
}

function reinicioSaldo(){
    reiniciarSaldo.onclick = () => {
    localStorage.setItem('saldo' , 0)
    saldodiv.setAttribute ("value" , saldo)
    muestraSaldo.innerText = `Saldo: $0.00 USD`
    }
}

function borradoHistorial(){
    borrarHistorial.onclick = () => {
    historial.innerHTML = ""
    localStorage.setItem('historia' , "")
    }
}

function borradoTodo(){
    borrarTodo.onclick = () => {
        localStorage.setItem('saldo' , 0)
        saldodiv.setAttribute ("value" , saldo)
        historial.innerHTML = ""
        localStorage.setItem('historia' , "")
        muestraSaldo.innerText = `Saldo: $0.00 USD`
        }
}



mostrarSaldo();
inicioCryptosDivisas();
mostrarCryptos();
desplegableDivisas();
definirMonto();
definirCrypto();
reinicioSaldo();
borradoHistorial();
borradoTodo();