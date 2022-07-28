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
var precioCryptoActual;
var monto;
var cryptoElegida;
var nombreMayuscula;
var transaccion;
var dolarizar;
var gasto;
var costoCrypto;
var limiteDolares;
var minimoDolar;
let saldo = 0


class Cryptomoneda {
    constructor(nombre, grafico){
        this.nombre = nombre
        this.grafico = grafico
    }
}

class Divisas  {
    constructor (nombre, precioDolar, maximo, minimo, nombrePlural, codigo){
        this.nombre = nombre
        this.precioDolar = precioDolar
        this.maximo = maximo
        this.minimo = minimo
        this.nombrePlural = nombrePlural
        this.codigo = codigo
    }
}

class Compras {
    constructor(nombreCrypto, cantidadCrypto, precioTrans){
        this.nombreCrypto = nombreCrypto
        this.cantidadCrypto = cantidadCrypto
        this.precioTrans = precioTrans
    }
}

//Genera Divisas que voy a utilizar
function pushearDivisas(){
    monedas.push(new Divisas ("Dólar", 1, 10000, 1, "dolares","USD"));
    for (const producto of monedas){
        if (producto.nombre == "Dólar"){
            var urls = [
            "https://api.exchangerate.host/convert?from=USD&to=ARS&amount="+producto.maximo,
            "https://api.exchangerate.host/convert?from=USD&to=ARS&amount="+producto.minimo,];
            var requests = urls.map(function(url){
                return fetch(url)
                .then(function(response) {
                    return response.json();
                })  
            });

            Promise.all(requests)
            .then((results) => {
                limiteDolares = results[0].result.toFixed(2);
                minimoDolar = results[1].result.toFixed(2);
                monedas.push(new Divisas ("Peso", 121, +limiteDolares, +minimoDolar , "pesos", "ARS"))
                console.log(monedas)
                desplegableDivisas();
            }).catch(function(err) {
                limiteDolares = 1200000;
                minimoDolar = 127;
                monedas.push(new Divisas ("Peso", 121, +limiteDolares, +minimoDolar , "pesos", "ARS"))
                console.log(err);
    })  }   }
}


//Genera Cryptos que voy a utilizar
function pushearCryptos(){
    cryptos.push(new Cryptomoneda ("bitcoin", ` <div style="width: auto; height:220px; background-color: #1D2330; overflow:hidden; box-sizing: border-box; border: 1px solid #282E3B; border-radius: 4px; text-align: right; line-height:14px; block-size:220px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #262B38;padding:1px;padding: 0px; margin: 0px;"><div style="height:200px; padding:0px; margin:0px; width: 100%;"><iframe src="https://widget.coinlib.io/widget?type=single_v2&theme=dark&coin_id=859&pref_coin_id=1505" width="250" height="196px" scrolling="auto" marginwidth="0" marginheight="0" frameborder="0" border="0" style="border:0;margin:0;padding:0;line-height:14px;"></iframe></div><div style="color: #626B7F; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;"><a href="https://coinlib.io" target="_blank" style="font-weight: 500; color: #626B7F; text-decoration:none; font-size:11px">Cryptocurrency Prices</a>&nbsp;by Coinlib</div></div>` ));
    cryptos.push(new Cryptomoneda ("ethereum", ` <div style="width: auto; height:220px; background-color: #1D2330; overflow:hidden; box-sizing: border-box; border: 1px solid #282E3B; border-radius: 4px; text-align: right; line-height:14px; block-size:220px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #262B38;padding:1px;padding: 0px; margin: 0px;"><div style="height:200px; padding:0px; margin:0px; width: 100%;"><iframe src="https://widget.coinlib.io/widget?type=single_v2&theme=dark&coin_id=145&pref_coin_id=1505" width="250" height="196px" scrolling="auto" marginwidth="0" marginheight="0" frameborder="0" border="0" style="border:0;margin:0;padding:0;line-height:14px;"></iframe></div><div style="color: #626B7F; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;"><a href="https://coinlib.io" target="_blank" style="font-weight: 500; color: #626B7F; text-decoration:none; font-size:11px">Cryptocurrency Prices</a>&nbsp;by Coinlib</div></div>` ));
    arrayNombres = [];

    for (const producto of monedas){
        arrayNombres.push(producto.nombre) 
    }

    arrayCryptos = [];
    for (const producto of cryptos){
        arrayCryptos.push(producto.nombre)
    }   
    
}

//Muestra el saldo en la barra de navegacion
function mostrarSaldo(){
    let darSaldo = localStorage.getItem('saldo')
    if (darSaldo !== null){
        saldodiv.setAttribute ("value" , "$" + darSaldo + " USD")
        muestraSaldo.innerText = `Saldo: $${darSaldo} USD`}
    else{
        saldodiv.setAttribute ("value" , "$" + +darSaldo + " USD")
        muestraSaldo.innerText = `Saldo: $0.00 USD`
    }
}

//Muestra los últimos 5 movimientos siendo el de más arriba el último
function mostrarHistoria(){
    try {
        let storedSeleccion = JSON.parse(localStorage.getItem('historia'))
        storedSeleccion = storedSeleccion.slice(-5).reverse()
        console.log ("!" + storedSeleccion);
        historial.innerHTML = ""
        for (const compras of storedSeleccion){
        let nombreMayuscula = compras.nombreCrypto.charAt(0).toUpperCase() + compras.nombreCrypto.slice(1);
        let historia = document.createElement('div')
        historia.innerHTML = `Compraste ${compras.cantidadCrypto} de ${nombreMayuscula} por $${compras.precioTrans} USD`
        historial.append(historia) }
    }
    catch(e) {
        let storedSeleccion = [];
        console.log ("$$" + storedSeleccion);
        let historia = document.createElement('div')
        historial.innerHTML = ""
        for (const compras of storedSeleccion){
        let nombreMayuscula = compras.nombreCrypto.charAt(0).toUpperCase() + compras.nombreCrypto.slice(1);
        historia.innerHTML = `Compraste ${compras.cantidadCrypto} de ${nombreMayuscula} por $${compras.precioTrans} USD`
        historial.append(historia) }
    }
}

//Genera los recuadros con las cryptos que se van a utilizar y le da utilidad al botón de comprar ya
function mostrarCryptos() {
    cryptos.forEach((crypto) =>{
        let nombreMayuscula = crypto.nombre.charAt(0).toUpperCase() + crypto.nombre.slice(1);
        let card = document.createElement('div')
        card.setAttribute ("class" , "col-sm-6 d-flex flex-column align-items-center mt-3" )
        createCryptos.append(card)
        let carta = document.createElement ('div')
        carta.setAttribute ("class" , "card bg-dark text-white nombreCrypto")
        carta.setAttribute ("style" , "width: 18rem;")
        carta.innerHTML = `<h5 class="card-title text-center mt-1">${nombreMayuscula}</h5>
        <div class= "container-fluid"> ${crypto.grafico} </div>` 
        card.append(carta)
        let botonCrypto = document.createElement("a")
        botonCrypto.setAttribute ("class" , "btn boton")
        botonCrypto.setAttribute ("role" , "button")
        botonCrypto.setAttribute ("href" , "#cuestionario")
        botonCrypto.setAttribute ("id" , "show")
        botonCrypto.innerText = ("Compra YA!")
        card.append(botonCrypto)

        botonCrypto.addEventListener("click" , function () { 
            if (cuestionario.classList.contains("hide")) {
                cuestionario.classList.remove("hide");
                let nombreMayuscula = crypto.nombre.charAt(0).toUpperCase() + crypto.nombre.slice(1);
                desplegable.setAttribute ("value" , nombreMayuscula)
                desplegable.setAttribute ("class" , "letraFormulario")
                desplegable2.value = "Elegí tu moneda"
                montoCrypto.value = ""
                montoDivisa.value = ""
                mensajeMoneda.innerText = " "
                mensajeDivisa.innerHTML = ` `
                mensajeCrypto.innerHTML = ` `
                disclaimer.innerHTML = " "
                confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
            } else {
                cuestionario.classList.add("hide");
                let nombreMayuscula = crypto.nombre.charAt(0).toUpperCase() + crypto.nombre.slice(1);
                desplegable.setAttribute ("value" , nombreMayuscula)
            }
       
        })
    })
}


//Genera el desplegable con las divisas y tiene la lógica por si cambias el desplegable de moneda antes de terminar con tu compra
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
            disclaimer.innerText = ""
            montoCrypto.value = ""
            mensajeDivisa.innerHTML = ""
            confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
            mensajeCrypto.innerHTML = ""  
        }
        else{
            mensajeMoneda.innerText = " "
            mensajeDivisa.innerHTML = ` `
            montoDivisa.value = ""
            montoCrypto.value = ""
            mensajeCrypto.innerHTML = ` `
            disclaimer.innerHTML = " "
            mensajeDivisa.innerHTML += `<p class="text-success"> Elegiste ${buyMonto.nombre} recuerda que debe ser un número dentro del límite especificado entre ${buyMonto.minimo} y ${buyMonto.maximo} ${buyMonto.nombrePlural} </p> ` 
            confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
        }
    }
}

//lógica para diferentes interacciones con la cantidad de dinero a invertir, si se eligió moneda antes y si cumple con los límites de cada divisa
function definirMonto() {
    montoDivisa.onchange = () => { console.log(montoDivisa.value)
        const buyMonto = monedas.find((el) => el.nombre === desplegable2.value)
        const buyCrypto = cryptos.find((el) => el.nombre === (desplegable.value.toLowerCase()))
        if (buyMonto === undefined){
            mensajeDivisa.innerHTML = `<p class="text-danger"> Primero selecciona una moneda </p> ` 
            monto = "nook"
        }

        if (buyMonto !== undefined){
            if ((montoDivisa.value === ''|| isNaN(montoDivisa.value) && (buyMonto.nombre == desplegable2.value))|| ((buyMonto.nombre == desplegable2.value) && (montoDivisa.value < buyMonto.minimo))|| ((buyMonto.nombre == desplegable2.value) && (montoDivisa.value > buyMonto.maximo))){
                mensajeDivisa.innerText = " "
                mensajeDivisa.innerHTML = `<p class="text-danger"> No es un monto válido, recuerda que debe ser un número dentro del límite especificado entre  ${buyMonto.minimo} y ${buyMonto.maximo} ${buyMonto.nombrePlural} </p> ` 
                document.getElementById("montoCrypto").disabled = true;
                disclaimer.innerHTML = ` `
                montoCrypto.value = ""
                monto = "nook"
                confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn boton" disabled> Confirmar Compra </button> `
                mensajeCrypto.innerHTML = " "

            }
            else{
                if (buyCrypto == undefined && buyMonto.nombre == desplegable2.value && montoDivisa.value > buyMonto.minimo || buyCrypto == undefined && buyMonto.nombre == desplegable2.value && montoDivisa.value < buyMonto.maximo){
                    mensajeDivisa.innerHTML = ` `
                    monto = "ok"
                    montoCrypto.value = ""
                    mensajeCrypto.innerHTML = ` `
                    disclaimer.innerHTML = ` `
                    confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
                }
                else{
                    try{
                        fetch("https://api.exchangerate.host/convert?from="+buyMonto.codigo+"&to=USD&amount="+montoDivisa.value)
                        .then ((respuestita) => respuestita.json() )
                        .then ((data) => {
                            console.log("log de segundo fetch" + data.result)
                            let dolarizar = +data.result
                            let dameSaldo = localStorage.getItem('saldo')
                            dameSaldo = +dameSaldo + +dolarizar
                            let buscaPrecios = arrayCryptos.join(',')
                            try{
                                fetch("https://api.coingecko.com/api/v3/simple/price?ids="+buscaPrecios+"&vs_currencies=usd")
                                .then ( (resp) => resp.json() )
                                .then ((data) => { 
                                    var keyVariable = buyCrypto.nombre
                                    precioCryptoActual = +data[keyVariable].usd
                                    console.log("precioact" + precioCryptoActual)
                                    let gasto = dameSaldo/precioCryptoActual;
                                    console.log("el gasto" + gasto)
                                    console.log("cual es mi saldo" + dameSaldo)
                                    dameSaldo = dameSaldo.toFixed(2)
                                    localStorage.setItem('saldillo' , dameSaldo)
                                    gasto = gasto.toFixed(8)
                                    mensajeDivisa.innerHTML = ` `
                                    monto = "ok"
                                    montoCrypto.value = ""
                                    mensajeCrypto.innerHTML = ` `
                                    let nombreMayuscula = buyCrypto.nombre.charAt(0).toUpperCase() + buyCrypto.nombre.slice(1);
                                    disclaimer.innerHTML = `<p class="text-primary"> Tienes ${dameSaldo} dólares para comprar hasta ${gasto} de ${nombreMayuscula} </p> ` 
                                    document.getElementById("montoCrypto").disabled = false;
                                    montoCrypto.value = gasto
                                    confirmaCompra.innerHTML = `<button type="button" onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
                                    mensajeCrypto.innerHTML = `<p class="text-success"> Confirma tu compra </p> `     
                                })
                            }
                            catch(e){
                            }
                        })
                    }
                    catch(e){
                        let dolarizar = montoDivisa.value / buyMonto.precioDolar
                        let dameSaldo = localStorage.getItem('saldo')
                        dameSaldo = +dameSaldo + +dolarizar
                        let buscaPrecios = arrayCryptos.join(',')
                        try{
                            fetch("https://api.coingecko.com/api/v3/simple/price?ids="+buscaPrecios+"&vs_currencies=usd")
                            .then ( (resp) => resp.json() )
                            .then ((data) => {
                                var keyVariable = buyCrypto.nombre
                                precioCryptoActual = +data[keyVariable].usd
                                console.log("precioact" + precioCryptoActual)
                                let gasto = dameSaldo/precioCryptoActual;
                                console.log("el gasto" + gasto)
                                console.log("cual es mi saldo" + dameSaldo)
                                dameSaldo = dameSaldo.toFixed(2)
                                localStorage.setItem('saldillo' , dameSaldo)
                                gasto = gasto.toFixed(8)
                                mensajeDivisa.innerHTML = ` `
                                monto = "ok"
                                montoCrypto.value = ""
                                mensajeCrypto.innerHTML = ` `
                                let nombreMayuscula = buyCrypto.nombre.charAt(0).toUpperCase() + buyCrypto.nombre.slice(1);
                                disclaimer.innerHTML = `<p class="text-primary"> Tienes ${dameSaldo} dólares para comprar hasta ${gasto} de ${nombreMayuscula} </p> ` 
                                document.getElementById("montoCrypto").disabled = false;
                                montoCrypto.value = gasto
                                confirmaCompra.innerHTML = `<button type="button" onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
                                mensajeCrypto.innerHTML = `<p class="text-success"> Confirma tu compra </p> `     
                            })
                        }
                        catch(e){
                        }
                    }
                }
            }
        }
    }
}

//lógicas para mostrar mensaje de cuánto es posible comprar de crypto y tomar límites
function definirCrypto() {
    montoCrypto.onchange = () => {console.log(montoCrypto.value)
        const buyMonto = monedas.find((el) => el.nombre === desplegable2.value)
        const buyCrypto = cryptos.find((el) => el.nombre === desplegable.value.toLowerCase())
        if (buyMonto == undefined || buyCrypto == undefined || monto != "ok" ){
            mensajeCrypto.innerHTML = `<p class="text-danger"> Primero debes seleccionar una moneda y monto </p> ` 
            transaccion = "nook"
        }
        var myHeaders = new Headers();
        myHeaders.append("apikey", "kHYS5ZJSGH64zQxbqViwySzdRD04RUJD");
            
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };
        try{
            fetch("https://api.exchangerate.host/convert?from="+buyMonto.codigo+"&to=USD&amount="+montoDivisa.value)
            .then ((respuestita) => respuestita.json() )
            .then ((data) => {
                console.log(data.result)
                let dolarizar = +data.result
                let dameSaldo = localStorage.getItem('saldo')
                dameSaldo = +dameSaldo + +dolarizar
                dameSaldo = dameSaldo.toFixed(2)
                let gasto = dameSaldo/precioCryptoActual;
                dolarizar = dolarizar.toFixed(2)
                gasto = gasto.toFixed(8)
                if (buyMonto !== undefined && (montoCrypto.value > gasto || montoCrypto.value <= 0 )){
                    mensajeCrypto.innerHTML = `<p class="text-danger"> Te pasaste del límite </p> ` 
                    confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
                    transaccion = "nook"
                }
                if (buyMonto !== undefined && montoCrypto.value <= gasto && montoCrypto.value > 0){
                    mensajeCrypto.innerHTML = `<p class="text-success"> Confirma tu compra </p> ` 
                    confirmaCompra.innerHTML = `<button type="button" onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
                    localStorage.setItem('saldillo' , dameSaldo)
                }
            })
        }
        catch(e){
            let dolarizar = montoDivisa.value / buyMonto.precioDolar
            let dameSaldo = localStorage.getItem('saldo')
            dameSaldo = +dameSaldo + +dolarizar
            dameSaldo = dameSaldo.toFixed(2)
            let gasto = dameSaldo/precioCryptoActual;
            dolarizar = dolarizar.toFixed(2)
            gasto = gasto.toFixed(8)
            if (buyMonto !== undefined && (montoCrypto.value > gasto || montoCrypto.value <= 0 )){
                mensajeCrypto.innerHTML = `<p class="text-danger"> Te pasaste del límite </p> ` 
                confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
                transaccion = "nook"
            }
            if (buyMonto !== undefined && montoCrypto.value <= gasto && montoCrypto.value > 0){
                mensajeCrypto.innerHTML = `<p class="text-success"> Confirma tu compra </p> ` 
                confirmaCompra.innerHTML = `<button type="button" onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
                localStorage.setItem('saldillo' , dameSaldo)
            }
        }    
    }
}


//Lógica para alerta de confirmación de compra y sus ramificaciones y pushear la compra o la cancelación
function alertaConfirmacion(){
    swal.fire({
        title: "¿Querés confirmar esta compra?",
        text: "No se puede cancelar una vez realizada",
        background: "black",
        imageUrl: './eleven.png',
        imageAlt: 'Eleven',
        imageHeight: 200,
        buttons: true,
        showDenyButton: true,
        customClass: {
            title: 'letra',
        }
    })
    .then((confirmation) => {
        if (confirmation.isConfirmed) {
            const buyCrypto = cryptos.find((el) => el.nombre === desplegable.value.toLowerCase())
            const buyMonto = monedas.find((el) => el.nombre === desplegable2.value)
            costoCrypto = montoCrypto.value*precioCryptoActual
            costoCrypto = costoCrypto.toFixed(2)
            let dameSaldo = localStorage.getItem('saldillo')
            dameSaldo = dameSaldo-costoCrypto
            dameSaldo = dameSaldo.toFixed(2)
            try {
                var seleccion = JSON.parse(localStorage.getItem('historia'))
                let nombreMayuscula = buyCrypto.nombre.charAt(0).toUpperCase() + buyCrypto.nombre.slice(1);
                seleccion.push(new Compras (nombreMayuscula, montoCrypto.value, costoCrypto));
                localStorage.setItem('historia' , JSON.stringify(seleccion))
            }
            catch(e) {
                let nombreMayuscula = buyCrypto.nombre.charAt(0).toUpperCase() + buyCrypto.nombre.slice(1);
                let seleccion = [];
                seleccion.push(new Compras (nombreMayuscula, montoCrypto.value, costoCrypto));
                localStorage.setItem('historia' , JSON.stringify(seleccion))
            }
            try {
                let storedSeleccion = JSON.parse(localStorage.getItem('historia'))
                storedSeleccion = storedSeleccion.slice(-5).reverse()
                console.log ("!" + storedSeleccion);
                historial.innerHTML = ""
                for (const compras of storedSeleccion){
                let nombreMayuscula = compras.nombreCrypto.charAt(0).toUpperCase() + compras.nombreCrypto.slice(1);
                let historia = document.createElement('div')
                historia.innerHTML = `Compraste ${compras.cantidadCrypto} de ${nombreMayuscula} por $${compras.precioTrans} USD`
                historial.append(historia) }
            }
            catch(e) {
                let storedSeleccion = [];
                console.log ("$$" + storedSeleccion);
                let historia = document.createElement('div')
                historial.innerHTML = ""
                for (const compras of storedSeleccion){
                let nombreMayuscula = compras.nombreCrypto.charAt(0).toUpperCase() + compras.nombreCrypto.slice(1);
                historia.innerHTML = `Compraste ${compras.cantidadCrypto} de ${nombreMayuscula} por $${compras.precioTrans} USD`
                historial.append(historia) }
            }
            localStorage.setItem('saldo' , dameSaldo)
            localStorage.setItem('saldillo' , dameSaldo)
            saldodiv.setAttribute ("value" , "$" + dameSaldo + " USD")
            mensajeDivisa.innerHTML = ` `
            montoCrypto.value = ""
            mensajeCrypto.innerHTML = ` `
            disclaimer.innerHTML = ` `
            desplegable2.value = "Elegí tu moneda"
            montoDivisa.value = ""
            document.getElementById("montoCrypto").disabled = true;
            confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
            muestraSaldo.innerText = `Saldo: $${dameSaldo} USD`
            swal.fire({title:"Compra aprobada", background: "black", imageUrl: './fireworks.jpg',
            imageAlt: 'Sucess',
            imageHeight: 200,
            customClass: {
                title: 'letra',
            }});
            if (cuestionario.classList.contains("hide")) {
                cuestionario.classList.remove("hide");
            } else {
                cuestionario.classList.add("hide");
            }
        } 
        else {
            swal.fire({title:"¡Cancelaste tu Compra!", 
            imageUrl: './demologo.png',
            imageHeight: 200,
            background: "black",
            confirmButtonColor: 'red',
            imageAlt: 'Demogorgon',
            customClass: {
                title: 'letra',
            }});
            if (cuestionario.classList.contains("hide")) {
                cuestionario.classList.remove("hide");
                desplegable2.value = "Elegí tu moneda"
                montoCrypto.value = ""
                montoDivisa.value = ""
                document.getElementById("montoCrypto").disabled = true;
                mensajeMoneda.innerText = " "
                mensajeDivisa.innerHTML = ` `
                mensajeCrypto.innerHTML = ` `
                disclaimer.innerHTML = " "
                confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
            }
        }
    });
}

//Lógica para cancelamiento de orden
function cancelamientoCompra() {
    swal.fire({title:"¡Cancelaste tu Compra!", 
    imageUrl: './demologo.png',
    imageAlt: 'Demogorgon',
    imageHeight: 200,
    background: "black",
    confirmButtonColor: 'red',
    customClass: {
        title: 'letra',
    },});
    if (cuestionario.classList.contains("hide")) {
        cuestionario.classList.remove("hide");
        desplegable.setAttribute ("value" , nombreMayuscula)
        desplegable2.value = "Elegí tu moneda"
        montoCrypto.value = ""
        montoDivisa.value = ""
        mensajeMoneda.innerText = " "
        mensajeDivisa.innerHTML = ` `
        mensajeCrypto.innerHTML = ` `
        disclaimer.innerHTML = " "
        confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
    } else{
        cuestionario.classList.add("hide");
        let nombreMayuscula = crypto.nombre.charAt(0).toUpperCase() + crypto.nombre.slice(1);
        desplegable.setAttribute ("value" , nombreMayuscula)
    }
    document.getElementById("montoCrypto").disabled = true;
    confirmaCompra.innerHTML = `<button type="button" disabled onclick="alertaConfirmacion()" class="btn boton"> Confirmar Compra </button> `
}

//Lógica para botón de reinicio de saldo
function reinicioSaldo(){
    reiniciarSaldo.onclick = () => {
        localStorage.setItem('saldo' , 0)
        localStorage.setItem('saldillo' , 0)
        saldodiv.setAttribute ("value" , "$" + saldo + " USD")
        muestraSaldo.innerText = `Saldo: $0.00 USD`
    }
}

//Lógica para botón de borrado de Histoial
function borradoHistorial(){
    borrarHistorial.onclick = () => {
        historial.innerHTML = ""
        localStorage.setItem('historia' , "")
    }
}


//Lógica para botón de borrado de todo
function borradoTodo(){
    borrarTodo.onclick = () => {
        localStorage.setItem('saldo' , 0)
        localStorage.setItem('saldillo' , 0)
        saldodiv.setAttribute ("value" , "$" + saldo + " USD")
        historial.innerHTML = ""
        localStorage.setItem('historia' , "")
        muestraSaldo.innerText = `Saldo: $0.00 USD`
    }
}



pushearDivisas();
pushearCryptos();
mostrarSaldo();
mostrarHistoria();
mostrarCryptos();
definirMonto();
definirCrypto();
reinicioSaldo();
borradoHistorial();
borradoTodo();
