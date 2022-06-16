class Cryptomoneda {
    constructor(nombre, precio){
        this.nombre = nombre
        this.precio = precio
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

const cryptos = [];
const monedas = [];
const seleccion = [];

cryptos.push(new Cryptomoneda ("Bitcoin", 23500));
cryptos.push(new Cryptomoneda ("Ethereum", 1250));

monedas.push(new Divisas ("peso", 121, 36500, 121, "pesos"));
monedas.push(new Divisas ("dolar", 1, 300, 1, "dolares"));


arrayNombres = [];
for (const producto of monedas){
    arrayNombres.push(producto.nombre) 
}

arrayCryptos = [];
for (const producto of cryptos){
    arrayCryptos.push(producto.nombre)
}

//Verifica si se puso dolar o peso
function verificarMoneda() {
    moneda = moneda.toLowerCase();
    while (monedas.some(monedas => monedas.nombre === moneda) == false){
        alert("El usuario escribió una moneda diferente a " + arrayNombres.join(" o "));
        moneda = prompt ("Intentá nuevamente escribiendo el nombre de tu moneda\nPuede ser " + arrayNombres.join(" o "));
        moneda = moneda.toLowerCase();
    }
}

//Verifica que el monto que pone la persona sea peso o dolar sea dentro de los límites
function verificarMonto() {
    const buyMonto = monedas.find((el) => el.nombre === moneda)
    while( (monto === ''|| isNaN(monto) && (buyMonto.nombre == moneda)) || ((buyMonto.nombre == moneda) && (monto < buyMonto.minimo)) || ((buyMonto.nombre == moneda) && (monto > buyMonto.maximo))){
        alert ("Ingresá un número dentro del límite especificado entre " + buyMonto.minimo + " y " + buyMonto.maximo + " " + buyMonto.nombrePlural);
        monto = prompt ("Ingresá el monto que quieras invertir\nEl máximo es de " + buyMonto.maximo + " " + buyMonto.nombre); 
    }
}

//Dolariza el monto en pesos si está en pesos y te dice cuantos dolares tenes para transaccionar
function dolarizarYDisponible() {
    const dolarizar = monedas.find((el) => el.nombre === moneda)
    monto = monto / dolarizar.precioDolar
    monto = monto.toFixed(2)
    alert ("Usted tiene " + monto + " dolares para transaccionar");
}

//Verifica si elejiste una de las cryptos enlistadas
function verificarCrypto() {
    crypto = crypto.toLowerCase();
    crypto = crypto.charAt(0).toUpperCase() + crypto.slice(1);
    
    while (cryptos.some(cryptos => cryptos.nombre === crypto) == false){

        alert("El usuario escribió una crypto diferente a las ofrecidas");
        crypto = prompt ("Intentá nuevamente escribiendo el nombre de su crypto\nPuede ser " + arrayCryptos.join(" o "));
        crypto = crypto.toLowerCase();
        crypto = crypto.charAt(0).toUpperCase() + crypto.slice(1);
    }  
}

//Te dice segun tu plata y la crypto seleccionada cuanto vas a obtener
function compraCrypto() {
    const buyCrypto = cryptos.find((el) => el.nombre === crypto)
    cantidad = monto / buyCrypto.precio
    cantidad = cantidad.toFixed(5)
    alert("La cotización actual del " + buyCrypto.nombre + " es de 1 " + buyCrypto.nombre + " por " + buyCrypto.precio + " dolares. \nUsted puede comprar hasta " + cantidad + " " + buyCrypto.nombre);
}

//verifica cantidad que queres comprar con dinero que se tiene
function verificarTransaccion() {
    while( (transaccion === ''|| isNaN(transaccion) || (transaccion <= 0) || (transaccion > monto))){
        alert ("Ingresá un número mayor o igual a 1 y dentro de tu monto máximo de " + monto);
        transaccion = prompt ("Ingresá el monto que quieras invertir\nEl máximo es de " + monto); 
    }
}

//verifica respuesta del seguir transaccionando
function verificarSeguirTransaccionando () {
    seguir = seguir.toLowerCase();
    while( seguir != "si" && seguir != "no"){
        alert ("Indica si quieres seguir transaccionando escribiendo si o no")
        seguir = prompt("¿Desea seguir transaccionando? Si o No" )
        seguir = seguir.toLowerCase();
    }
}

function seguirTransaccionando () {
    while (seguir == "si" && monto >= 1){
        crypto = prompt ("¿Que crypto desea comprar? Elija entre " + arrayCryptos.join(" o "));

        verificarCrypto();

        compraCrypto();

        transaccion = prompt("¿Qué cantidad de dólares desea comprar de " + crypto + "?\nRecordá que tu monto es de " + monto)

        verificarTransaccion();

        monto = monto - transaccion;
        monto = monto.toFixed(2);

        seleccion.push(new Compras (crypto, transaccion));

        alert("Usted realizó las siguientes compras")

        for (const listaCompra of seleccion){
        alert("Usted realizo la compra de " + listaCompra.nombreCrypto + " por " + listaCompra.precioTrans + " dolares.")}

        alert("Su saldo restante es " + monto);

        if (monto >= 1){
        seguir = prompt("¿Desea seguir transaccionando? Si o No" );

        verificarSeguirTransaccionando ();
        }
    }
}



//Experiencia del cliente

alert("Hola! Bienvenido a LucExchange\nEl mejor lugar para obtener las cryptos más famosas");
alert("Actualmente tenemos las siguientes criptomonedas");

for (const lista of cryptos) {
    alert(lista.nombre + " con precio unitario de " + lista.precio + " dolares.");
}

let moneda = prompt ("Ingresá el nombre de moneda con la que realizarás la operación\nPuede ser " + arrayNombres.join(" o "));

verificarMoneda();

//Planteo Monto como variable Global

const maximoMoneda = monedas.find((el) => el.nombre === moneda)
let monto = prompt ("Ingresá el monto que quieras invertir\nEl máximo es de "+ maximoMoneda.maximo + " " + maximoMoneda.nombrePlural);


verificarMonto();

dolarizarYDisponible();

//Planteo Crypto como variable global
let crypto = prompt ("¿Que crypto desea comprar? Elija entre " + arrayCryptos.join(" o "));

verificarCrypto();

compraCrypto();

let transaccion = prompt("¿Qué cantidad de dólares desea comprar de " + crypto + "?\nRecordá que tu monto es de " + monto)

verificarTransaccion();

monto = monto - transaccion;
monto = monto.toFixed(2);

seleccion.push(new Compras (crypto, transaccion));

for (const listaCompra of seleccion){
alert("Usted realizo la compra de " + listaCompra.nombreCrypto + " por " + listaCompra.precioTrans + " dolares.")}

alert("Su saldo restante es " + monto);

if (monto >= 1){
seguir = prompt("¿Desea seguir transaccionando? Si o No" );

verificarSeguirTransaccionando ();
seguirTransaccionando ();
}


alert("Su transacción fue aprobada. Es la número " + Math.floor((Math.random() * 10000) + 1000));
alert("Muchas Gracias por Confiar en Nosotros")