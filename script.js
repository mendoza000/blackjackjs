/*
2s = dos de espada
2c = dos de trebol
2h = dos de corazon
2d = dos de diamante
*/

let maso = []
const letras = ["S", "C", "H", "D"]
const especiales = ["J", "Q", "K", "A"]
let totalPlayer = 0, totalCPU = 0

const btnPedir = document.querySelector('#btnPedir');
const btnStop  = document.querySelector('#btnStop');
const btnNewStart = document.querySelector('#btnNewStart');
const playerC  = document.querySelector('#jugador-cartas');
const cpuC     = document.querySelector('#cpu-cartas'); 
const scores   = document.querySelectorAll('small');

console.log(scores);

/*funcion para crear el maso y revolverlo*/
const createMaso = () => {
	for (let i = 2; i <= 10; i++) {
		for (letra of letras) {
			maso.push(`${i}${letra}`)
		}
	}

	for (lEsp of especiales) {
		for (letra of letras) {
			maso.push(`${lEsp}${letra}`)
		}
	}

	return maso = _.shuffle(maso)
}

createMaso()

/*funcion para pedir una carta*/

const pedirCarta = () => {

	if (maso.length === 0) throw "No hay mas cartas en el maso";
	return maso.shift();
}

/*Funcion para saber el valor de la newCard*/

const valorCarta = ( carta ) =>{
	const valor = carta.substring(0, carta.length - 1)

	return (!isNaN(valor)) ? parseInt(valor) : (valor === "A") ? 11 : 10
}


const turnoCompu = ( puntosMinimos) =>{
	do{
		const carta = pedirCarta();
		const valor = valorCarta(carta);

		cpuC.innerHTML += (`<img class="carta" src="./assets/cartas/${carta}.png" alt="">`)
		totalCPU = totalCPU + valor
		scores[1].innerText = (`${totalCPU}`)

		if (puntosMinimos > 21) {
			break;
		}
	}while(totalCPU < puntosMinimos && totalCPU < 21);

}



/*Eventos de botones*/

btnPedir.addEventListener('click', function() {
	const carta = pedirCarta();
	const valor = valorCarta(carta);

	playerC.innerHTML += (`<img class="carta" src="./assets/cartas/${carta}.png" alt="">`)
	totalPlayer = totalPlayer + valor
	scores[0].innerText = (`${totalPlayer}`)

	if (totalPlayer > 21) {
		btnPedir.disabled = true
		btnStop.disabled = true
		console.warn("Perdio la partida! 👎");
		alert("Perdio la partida! 👎")
		turnoCompu(totalPlayer)
	}else if (totalPlayer === 21) {
		console.warn("21 puntos, excelente! 👌");
		alert("21 puntos, excelente! 👌")
		btnPedir.disabled = true
		btnStop.disabled = true
		turnoCompu(totalPlayer)
	}

});

/*funcion para acabar el turno*/
btnStop.addEventListener('click', async function() {
	btnPedir.disabled = true;
	btnStop.disabled = true;
	await turnoCompu(totalPlayer);

	if (totalPlayer === 21 && totalCPU > 21) {
		console.log("Gano la partida! 👌");
		alert("Gano la partida! 👌")
	}else if (totalPlayer < 21 && totalCPU > 21) {
		console.log("Gano la partida! 👌");
		alert("Gano la partida! 👌")
	}else{
		console.log("Perdio la partida! 👎");
		alert("Perdio la partida! 👎")
	}
});


btnNewStart.addEventListener("click", function() {
	btnPedir.disabled = false
	btnStop.disabled = false

	totalPlayer = 0, totalCPU = 0
	scores[0].innerText = (`${totalPlayer}`)
	scores[1].innerText = (`${totalCPU}`)
	maso = []
	createMaso()

	playerC.innerHTML = (``)
	cpuC.innerHTML = (``)

})