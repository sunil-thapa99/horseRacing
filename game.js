/*
Name: Sunil Thapa
Un ID: 17421492
*/
var countForLaps = 1;
var resultOrder;
var offsetLeft;
var offsetTop;
var interval;
var lastTurnToGameOver = false;
var rightMovement=false;
var finishLapMovement = false;

//This make motion of horse running to right
function runHorseAtRight(){
	var height= window.innerHeight;
	if(rightMovement == true){
		var numberOfHorseInRace = document.getElementsByClassName('horse');
		for(var i=0; i < numberOfHorseInRace.length; i++){
			//This helps to animate horse running movement	
			numberOfHorseInRace[i].className= 'horse standRight runRight';
			offsetLeft = numberOfHorseInRace[i].offsetLeft;
			var generateARandomNumber = Math.ceil(Math.random()*3);
			numberOfHorseInRace[i].style.left = offsetLeft + generateARandomNumber + 'px'; 
			var width= window.innerWidth;
			//Limitation for horse so that it turns down at certain point
			if(offsetLeft > 0.67*(width) && offsetLeft > 0.78*(width)){
				clearInterval(interval);	
				rightMovement=false;				
				interval = setInterval(runHorseAtBottom, 15);
			} 	
		}
	}
}
//This make motion of horse running to bottom 
function runHorseAtBottom(){
	var methodFindNumberHorse = document.getElementsByTagName('select')[0];
	var numberOfhorse = methodFindNumberHorse.length;
	for(var i=1; i <= numberOfhorse; i++){
		var moveHorse = document.getElementById('horse'+i);
		//This helps to animate horse running movement	
		moveHorse.className = 'horse standDown runDown';
		offsetTop = moveHorse.offsetTop;
		var generateARandomNumber = Math.ceil(Math.random()*3);
		moveHorse.style.top = offsetTop + generateARandomNumber + 'px'; 
		var height= window.innerHeight;
		//Limitation for horse so that it turns left at certain point
		if(offsetTop > 0.7*(height) && offsetTop > 0.81*(height)){
			clearInterval(interval);
			interval = setInterval(runHorseAtLeft, 15);
		} 	
	}	
}
//This make motion of horse running to left
function runHorseAtLeft(){
	var methodFindNumberHorse = document.getElementsByTagName('select')[0];
	var numberOfhorse = methodFindNumberHorse.length;
	for(var i=numberOfhorse; i >= 1; i--){
		var moveHorse = document.getElementById('horse'+i);
		//This helps to animate horse running movement
		moveHorse.className = 'horse standLeft runLeft';
		offsetLeft = moveHorse.offsetLeft;
		var generateARandomNumber = Math.ceil(Math.random()*3);
		moveHorse.style.left = offsetLeft - generateARandomNumber + 'px'; 
		var width= window.innerWidth;
		//Limitation for horse so that it turns top at certain point
		if(offsetLeft < 0.14*(width) && offsetLeft < 0.0598*(width)){
			clearInterval(interval);
			interval = setInterval(runHorseAtTop, 15);
		} 	
	}
}
//This make motion of horse running to top
function runHorseAtTop(){
	var methodFindNumberHorse = document.getElementsByTagName('select')[0];
	var numberOfhorse = methodFindNumberHorse.length;
	for(var i=numberOfhorse; i >= 1; i--){
		var moveHorse = document.getElementById('horse'+i);
		//This helps to animate horse running movement
		moveHorse.className = 'horse standUp runUp';
		offsetTop = moveHorse.offsetTop;
		offsetLeft = moveHorse.offsetLeft;
		var generateARandomNumber = Math.ceil(Math.random()*3);
		moveHorse.style.top = offsetTop - generateARandomNumber + 'px'; 
		var height= window.innerHeight;
		var numberOfLapForHorse = document.getElementById('numberOfLaps').value;
		//Limitation for horse so that it turns towards finishing track at certain point
		if(offsetTop > 0.01*(height) && offsetTop < 0.05*(height)){
			//This acts when lap is about to finish
			if(parseInt(numberOfLapForHorse) == countForLaps){
				finishLapMovement = true;
				clearInterval(interval);
				interval = setInterval(finishLap, 15);
			}
			// This acts through out the lap is running
			else{
				countForLaps++;
				rightMovement = true;
				clearInterval(interval);
				interval = setInterval(runHorseAtRight, 15);
			}
		}
	}	
}
//This helps to move right when we are closer to finishing track
var horsePositionAfterRaceOver = [];
function finishLap(){
	if(finishLapMovement == true){
		var numberOfHorseInRace = document.getElementsByClassName('horse');
		for(var i=0; i < numberOfHorseInRace.length; i++){
			offsetLeft = numberOfHorseInRace[i].offsetLeft;
			var width= window.innerWidth;
			//Runs a bit distance far from finish line
			if (offsetLeft >= width * 0.05 && offsetLeft < width * 0.32) {
				numberOfHorseInRace[i].style.left = offsetLeft + (Math.ceil(Math.random()*3)) + 'px';
				numberOfHorseInRace[i].className = 'horse runRight';
				var elementStartButton = document.getElementById('start');
				elementStartButton.innerHTML = 'Start Race';
				//adding event to start button
				elementStartButton.addEventListener('click', clickEvent);
				// enabling bet amount, bet horse, no. of laps, track chage, button navigating next track 
				document.getElementById('amount').disabled = false;
				document.getElementById('bethorse').disabled = false;
				document.getElementById('numberOfLaps').disabled = false;
				document.getElementById('trackChange').disabled = false;
				document.getElementById('clickButton').disabled=false;
				document.getElementById('odd').disabled = false;
				lastTurnToGameOver = true;
			}
			//Stopping horse after finishing track
			if (lastTurnToGameOver == true && offsetLeft >= width * 0.27 && offsetLeft <= width * 0.32) {
				numberOfHorseInRace[i].className = 'horse standRight';
			}
			var FinishLineWinner = document.getElementById('startline');
			//Getting distance of startline 
			var positionLeft = FinishLineWinner.offsetLeft;
			if(offsetLeft == positionLeft){
				//Each horse completing the finish line is pushed to the array
				horsePositionAfterRaceOver.push('horse'+(i+1));
				var displayResult = document.getElementById('results');
				resultOrder = document.getElementsByTagName('td');
				// Publishing the result 
				resultOrder[1].className = horsePositionAfterRaceOver[0];
				resultOrder[3].className = horsePositionAfterRaceOver[1];
				resultOrder[5].className = horsePositionAfterRaceOver[2];
				// Making sure that there are every horse in the result 
				var horseOne = horsePositionAfterRaceOver.includes('horse1');
				if(horseOne == false){
					resultOrder[7].className = 'horse1';
				}
				var horseTwo = horsePositionAfterRaceOver.includes('horse2');
				if(horseTwo == false){
					resultOrder[7].className = 'horse2';
				}
				var horseThree = horsePositionAfterRaceOver.includes('horse3');
				if(horseThree == false){
					resultOrder[7].className = 'horse3';
				}
				var horseFour = horsePositionAfterRaceOver.includes('horse4');
				if(horseFour == false){
					resultOrder[7].className = 'horse4';
				}
				console.log(horsePositionAfterRaceOver);
				// Betting on the horse
				var betAmount = document.getElementById('amount').value;
				var betHorse = document.getElementById('bethorse');
				var totalFund = document.getElementById('funds').innerHTML;
				var getOdd = document.getElementById('odd');
				//Checking the user choosed horse
				var selectedHorseForBet = betHorse.options[betHorse.selectedIndex].value;
				//Checking odds selected by the user
				var oddsApplied = getOdd.options[getOdd.selectedIndex].value;
				//Checking whether user choosed horse is first or not 
				var first = horsePositionAfterRaceOver[0].includes(selectedHorseForBet);
				if(horsePositionAfterRaceOver.length == 1){
					if(first == true){
						//If won this statements executes
						alert('You have won(x'+oddsApplied+') amount.');
						var total = parseInt(totalFund) + parseInt(betAmount) * parseInt(oddsApplied);
						if(total > 0){
							document.getElementById('funds').innerHTML = total.toString();
						}
						else{
							document.getElementById('funds').innerHTML = 0;
						}
					}
					else{
						//If lost this statements executes
						alert('You have lost your bet amount(x'+oddsApplied+')');
						var total = parseInt(totalFund) - parseInt(betAmount) *parseInt(oddsApplied);
						if(total > 0){
							document.getElementById('funds').innerHTML = total.toString();
						}
						else{
							document.getElementById('funds').innerHTML = 0;
						}
					}
				}
			}
		}
		//Making sure horse dont run very far away
		if(offsetLeft > width*0.32){
			finishLapMovement=false;
		}
	}
}
function goToNewTrack(){
	// Changing track
	var trackRecord = document.getElementById('trackChange');
	if(trackRecord != ''){
		window.location = trackRecord.value;
	}
}
function start(){
	// Making sure at each horse racing the array length is 0
	horsePositionAfterRaceOver = [];
	var disableStartButton = document.getElementById('start');
	var totalFund = document.getElementById('funds').innerHTML;
	var lapSelected = document.getElementById('numberOfLaps');
	var amountForBet = document.getElementById('amount');
	//Starting the race
	if(amountForBet.value != "" && lapSelected.value != "" && (amountForBet.value <= parseInt(totalFund))){
		amountForBet.disabled = true;
		lapSelected.disabled = true;
		interval = setInterval(runHorseAtRight, 15);
		disableStartButton.innerHTML = 'Reset';
		var betHorse = document.getElementById('bethorse').disabled = true;
		document.getElementById('clickButton').disabled=true;
		document.getElementById('odd').disabled = true;
		var trackRecord = document.getElementById('trackChange').disabled = true;
		disableStartButton.removeEventListener('click', clickEvent);
	}
	//Prohibiting user to run the game before betting on the horse, choosing horse, number of laps
	else{
		if(amountForBet.value == ""){
			alert("Enter Bet Amount.");
		}
		else if(amountForBet.value > parseInt(totalFund)){
			alert("Your maximum amount: £" + totalFund + ".");
		}
		else if(amountForBet.value <= 0){
			alert("You don't have enough balance to continue this game. Please reload the game.");
		}
		if(lapSelected.value == ""){
			alert("Enter number of laps.");
		}
	}
	//Making sure horse stay before start line
	var racingHorse = document.getElementsByClassName('horse');
	for (var i = 0; i < racingHorse.length; i++) {
		racingHorse[i].style.left = window.innerWidth * 0.21 + 'px';
		racingHorse[i].style.top  <= window.innerHeight *  0.21 + 'px';
		rightMovement = true;
	}
	
}
function clickEvent(){
	start();
}
// This function is called when start button is pressed.
function callFunctionAfterLoading(){
	var elementStartButton = document.getElementById('start');
	elementStartButton.addEventListener('click', clickEvent);
}

// callFunctionAfterLoading is called after page loading
document.addEventListener('DOMContentLoaded', callFunctionAfterLoading);