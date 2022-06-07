alert("Hola! Bienvenido a LucExchange\nEl mejor lugar para obtener las cryptos más famosas");
alert("Comencemos! Para realizar la operación voy a necesitar los siguientes datos");

let moneda = prompt ("Ingresá el nombre de moneda con la que realizarás la operación\nPuede ser dolar o peso");

while ((moneda != "dolar") && (moneda != "peso")){

    alert("El usuario escribió una moneda diferente a dolar o peso");
    moneda = prompt ("Intentá nuevamente escribiendo el nombre de tu moneda\nPuede ser dolar o peso");
}

if (moneda == "dolar") {monto = prompt ("Ingresá el monto que quieras invertir\nEl máximo es de 300 dolares");}
if(moneda == "peso"){
    monto = prompt ("Ingresá el monto que quieras invertir\nEl máximo es de 36300 pesos");
}

while( (monto === ''|| isNaN(monto) && (moneda == "dolar")) || ((moneda == "dolar") && (monto <= 0)) || ((moneda == "dolar") && (monto > 300))){
    alert ("Ingresá un número dentro del límite especificado");
    monto = prompt ("Ingresá el monto que quieras invertir\nEl máximo es de 300 dolares"); 
}

while( (monto === ''|| isNaN(monto) && (moneda == "peso")) || ((moneda == "peso") && (monto <= 0)) || ((moneda == "peso") && (monto >   36300)) ){
alert ("Ingresá un número dentro del límite especificado");
monto = prompt ("Ingresá el monto que quieras invertir\nEl máximo es de 36300 pesos");  
}

if (moneda == "peso") {
    monto = monto / 121;
    alert("Para transacciones dolarizaremos sus dólares\nUsted tiene " + monto + " dolares para invertir") ;
}

if (moneda == "dolar") {
    alert ("Usted tiene " + monto + " para transaccionar");
}

let crypto = prompt ("¿Que crypto desea comprar? Elija entre BTC o ETH");

while ((crypto != "BTC") && (crypto != "ETH")){

    alert("El usuario escribió una crypto diferente a las ofrecidas");
    crypto = prompt ("Intentá nuevamente escribiendo el nombre de su crypto\nPuede ser BTC o ETH");
}

if (crypto == "BTC") { 
    comprabtc = monto / 29000;
    alert("La cotización actual del BTC es de 1 Bitcoin por 29000 dolares \n Usted podrá comprar " + comprabtc + " Bitcoin");
}

if (crypto == "ETH") { 
    compraeth = monto / 1700;
    alert("La cotización actual del ETH es de 1 Ethereum por 1700 dolares \n Usted podrá comprar " + compraeth + " Ethereum");
}


alert("Su transacción fue aprobada. Es la número " + Math.floor((Math.random() * 10000) + 1000));
alert("Muchas Gracias por Confiar en Nosotros");






