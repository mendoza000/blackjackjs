
(() => {

	'use strict'

	let maso = [], 
		puntosJugadores = [] 

	const letras = ["S", "C", "H", "D"],
		  especiales = ["J", "Q", "K", "A"]

	const btnPedir = document.querySelector('#btnPedir'),
	      btnStop  = document.querySelector('#btnStop'),
	      btnNewStart = document.querySelector('#btnNewStart'),
	      playerC  = document.querySelector('#jugador-cartas'),
	      cpuC     = document.querySelector('#cpu-cartas'), 
	      scores   = document.querySelectorAll('small');

	/*Inicializa el juego*/
	const initGame = (numPlayers = 2) =>{
		maso = []
		puntosJugadores = []
		createMaso()


		for (let i = 0; i < numPlayers; i++) puntosJugadores.push(0)

		btnPedir.disabled = false
		btnStop.disabled = false

		for(let i = 0; i < scores.length; i++) scores[i].innerText = ("0")

		playerC.innerHTML = ("")
		cpuC.innerHTML = ("")
	};


	/*funcion para crear el maso y revolverlo*/
	const createMaso = () => {
		for (let i = 2; i <= 10; i++) {
			for (let letra of letras) maso.push(`${i}${letra}`)
		}

		for (let lEsp of especiales) {
			for (let letra of letras) maso.push(`${lEsp}${letra}`)
		}

		return maso = _.shuffle(maso)
	}

	initGame()

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

	const acumularPuntos = (turno, carta) =>{
		puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)
		scores[turno].innerText = (`${puntosJugadores[turno]}`)
	}

	const turnoCompu = ( puntosMinimos) =>{
		do{
			const carta = pedirCarta();
			const valor = valorCarta(carta);

			cpuC.innerHTML += (`<img class="carta animate__animated animate__rotateInDownLeft" src="./assets/cartas/${carta}.png" alt="">`)
			
			acumularPuntos(puntosJugadores.length-1, carta)

			if (puntosMinimos > 21) break;

		}while(puntosJugadores[puntosJugadores.length-1] < puntosMinimos && puntosJugadores[puntosJugadores.length-1] < 21);

	}



	/*Eventos de botones*/

	btnPedir.addEventListener('click', async function() {
		const carta = pedirCarta();
		const valor = valorCarta(carta);

		playerC.innerHTML += (`<img class="carta animate__animated animate__rotateInDownLeft" src="./assets/cartas/${carta}.png" alt="">`)

		await setTimeout(function() {
			const ls = playerC.querySelectorAll('img');

			ls[0, ls.length-1].setAttribute('class', 'carta');
		}, 1000);

		acumularPuntos(0, carta)

		if (puntosJugadores[0] > 21) {
			btnPedir.disabled = true
			btnStop.disabled = true
			turnoCompu(puntosJugadores[0])
			setTimeout(function() {
				console.warn("Perdio la partida! 👎");
				alert("Perdio la partida! 👎")
			}, 20);
		}else if (puntosJugadores[0] === 21) {
			btnPedir.disabled = true
			btnStop.disabled = true
			turnoCompu(puntosJugadores[0])

			setTimeout(function() {
				console.warn("21 puntos, excelente! 👌");
				alert("21 puntos, excelente! 👌")
			}, 20);
		}

	});

	/*funcion para acabar el turno*/
	btnStop.addEventListener('click', async function() {
		btnPedir.disabled = true;
		btnStop.disabled = true;
		await turnoCompu(puntosJugadores[0]);

		setTimeout(function() {
			if (puntosJugadores[0] === puntosJugadores[puntosJugadores.length-1]) {
			console.log("Nadie gana, quedaron en tablas. 🤝");
			alert("Nadie gana, quedaron en tablas. 🤝");

			}else if (puntosJugadores[0] === 21 && puntosJugadores[puntosJugadores.length-1] > 21) {
				console.log("Gano la partida! 👌");
				alert("Gano la partida! 👌")

			}else if (puntosJugadores[0] < 21 && puntosJugadores[puntosJugadores.length-1] > 21) {
				console.log("Gano la partida! 👌");
				alert("Gano la partida! 👌")

			}else{
				console.log("Perdio la partida! 👎");
				alert("Perdio la partida! 👎")

			}
		}, 500);

	});


	btnNewStart.addEventListener("click", function() {

		initGame()

	})

})();
