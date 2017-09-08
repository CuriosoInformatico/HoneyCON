

window.addEventListener('load',
	function(){

		let honeyBee = document.getElementById('honeybee');
		honeyBee.addEventListener('click', honeyBeeOut);

		let bee = honeyBee.getElementsByClassName('bee')[0];

		bee.addEventListener('mouseover', honeyBeeOut);


		function honeyBeeOut(){
			honeyBee.style.marginTop = '-100%';
			honeyBee.style.opacity  = 0;
		}
	});


