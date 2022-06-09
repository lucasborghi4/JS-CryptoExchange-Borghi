//Verifica si se puso dolar o peso
function verificarmoneda() {
    moneda = moneda.toLowerCase();
    while ((moneda != "dolar") && (moneda != "peso")){

        alert("El usuario escribió una moneda diferente a dolar o peso");
        moneda = prompt ("Intentá nuevamente escribiendo el nombre de tu moneda\nPuede ser dolar o peso");
        moneda = moneda.toLowerCase();
    }
}

//Verifica que el monto que pone la persona sea peso o dolar sea dentro de los límites
function verificarmonto() {
    while( (monto === ''|| isNaN(monto) && (moneda == "dolar")) || ((moneda == "dolar") && (monto <= 0)) || ((moneda == "dolar") && (monto > 300))){
        alert ("Ingresá un número dentro del límite especificado entre 1 y 300 dólares");
        monto = prompt ("Ingresá el monto que quieras invertir\nEl máximo es de 300 dolares"); 
    }
    
    while( (monto === ''|| isNaN(monto) && (moneda == "peso")) || ((moneda == "peso") && (monto < 121)) || ((moneda == "peso") && (monto >   36300)) ){
        alert ("Ingresá un número dentro del límite especificado entre 121 y 36300 pesos ");
        monto = prompt ("Ingresá el monto que quieras invertir\nEl máximo es de 36300 pesos");  
    }
}

//Dolariza el monto en pesos si está en pesos y te dice cuantos dolares tenes para transaccionar
function dolarizarydisponible() {
    if (moneda == "peso") {
        monto = monto / 121;
        alert("Para transacciones dolarizaremos sus pesos\nUsted tiene " + monto + " dolares para invertir") ;
    }
    
    if (moneda == "dolar") {
        alert ("Usted tiene " + monto + " dolares para transaccionar");
    }
}

//Verifica si elejiste una de las cryptos enlistadas
function verificarcrypto() {
    crypto = crypto.toLowerCase();
    while ((crypto != "btc") && (crypto != "eth")){

        alert("El usuario escribió una crypto diferente a las ofrecidas");
        crypto = prompt ("Intentá nuevamente escribiendo el nombre de su crypto\nPuede ser BTC o ETH");
        crypto = crypto.toLowerCase();
    }
}

//Te dice segun tu plata y la crypto seleccionada cuanto vas a obtener
function compracrypto() {
    if (crypto == "btc") { 
        comprabtc = monto / 29000;
        alert("La cotización actual del BTC es de 1 Bitcoin por 29000 dolares \nUsted podrá comprar " + comprabtc + " Bitcoin");
    }
    
    if (crypto == "eth") { 
        compraeth = monto / 1700;
        alert("La cotización actual del ETH es de 1 Ethereum por 1700 dolares \nUsted podrá comprar " + compraeth + " Ethereum");
    }
}

//Arranque de Experiencia

alert("Hola! Bienvenido a LucExchange\nEl mejor lugar para obtener las cryptos más famosas");
alert("Comencemos! Para realizar la operación voy a necesitar los siguientes datos");

//Planteo Moneda con variable Global
let moneda = prompt ("Ingresá el nombre de moneda con la que realizarás la operación\nPuede ser dolar o peso");

verificarmoneda();

//Planteo Monto como variable Global
if (moneda == "dolar") {
    monto = prompt ("Ingresá el monto que quieras invertir\nEl máximo es de 300 dolares");}

if (moneda == "peso") {
    monto = prompt ("Ingresá el monto que quieras invertir\nEl máximo es de 36300 pesos");
}

verificarmonto();

dolarizarydisponible();

//Planteo Crypto como variable global
let crypto = prompt ("¿Que crypto desea comprar? Elija entre BTC o ETH");

verificarcrypto();

compracrypto();

alert("Su transacción fue aprobada. Es la número " + Math.floor((Math.random() * 10000) + 1000));
alert("Muchas Gracias por Confiar en Nosotros");






