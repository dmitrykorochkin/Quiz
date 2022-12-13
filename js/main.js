const questions = [
	{
		question: "В каком году вышла первая часть Терминатора?",
		answers: ["1991", "1985", "1987", "1984"],
		correct: 4,
	},
	{
		question: "Кто сыграл главную роль в фильме Красотка",
		answers: [
			"Джулия Робертс",
			"Дженнифер Энистон",
			"Синди Кроуфорд",
			"Памела Андерсон",
		],
		correct: 1,
	},
	{
		question: "Сколько оскаров взял фильм - Властелин колец: Возвращение короля?",
		answers: [
			"3",
			"7",
			"0",
			"11",
		],
		correct: 4,
	},
	{
		question: "Кто из этих актеров стал губернатором Калифорнии?",
		answers: ["Арнольд Шварценеггер", "Сильвестр Сталлоне", "Микки Рурк", "Дензел Вашингтон"],
		correct: 1,
	},
	{
		question: 'Сколько эпизодов "Звездные войны" всего вышло, на 2022 год',
		answers: ["2", "5", "9", "12"],
		correct: 4,
	},
];
// находим элементы 

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

//переменные игры 
let score = 0; // кол-во правильных ответов 
let questionIndex = 0; // текущий вопрос 

clearPage();
showQwestion();

submitBtn.onclick = checkAnswer;


function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQwestion() {
	//вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	headerContainer.innerHTML = title;

	// варианты ответов 

	let answerNumber = 1;

	for (answerText of questions[questionIndex]['answers']) {
		console.log(answerNumber, answerText);
		const questionTemplate = 
		`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`

		const answerHtml = questionTemplate
									.replace('%answer%', answerText)
									.replace('%number%', answerNumber);



		listContainer.innerHTML += answerHtml;
		answerNumber++;
	}

}

function checkAnswer() {

	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	if (!checkedRadio) {
		submitBtn.blur();
		return;
	}

	const userAnswer = parseInt(checkedRadio.value);
	// question[questionindex]['correct'];

	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
		
	}
	
	if (questionIndex !== questions.length - 1) {

		questionIndex++;
		clearPage();
		showQwestion();
		return;
	} else {
		clearPage();
		showResults();


	}
}

function showResults() {
	console.log('showResults');

	const resultTemplate = 
		`
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
		`;

		let title, message; 
		// находим
		if (score === questions.length) {
			title = 'Поздравляем! 👍',
			message = 'Вы ответили верно на все вопросы!!! 😊';
		} else if ((score *100) / questions.length >= 50 ){
			title = 'Неплохой результат! 😊';
			message = 'Вы дали более половины правильных ответов ✌';
		} else {
			title = 'Стоит постараться! 😊';
			message = 'Пока у вас меньше половины правильных ответов 🤦‍♀️'; 
		}


		let result = `${score} из ${questions.length}`;

		const finalMessage = resultTemplate 
								.replace('%title%', title)
								.replace('%message%', message)
								.replace('%result%', result)


		headerContainer.innerHTML = finalMessage;


		submit.blur();
		submitBtn.innerHTML = 'Начать заново';
		submitBtn.onclick = function() {
			history.go()
		};
}