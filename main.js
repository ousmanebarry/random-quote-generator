const quoteArea = document.getElementById("area-quote");
const generateBtn = document.getElementById("quote-generator");
const tweetBtn = document.getElementById("quote-tweet");
const spinner = document.getElementById("js-spinner");
const url = "https://api.quotable.io/random";
const errorMsg = "Couldn't get quote, please try again!";
let globalQuote = new String();

async function fetchData() {
	try {
		const response = await fetch(url);
		// let randomNum = Math.floor(Math.random() * 2);
		// randomNum === 0
		if (response.ok) {
			const data = await response.json();
			return `${data.content} - ${data.author}`;
		} else {
			throw errorMsg;
		}
	} catch (error) {
		return error;
	}
}

function returnedContent() {
	fetchData().then((response) => {
		if (response !== errorMsg) {
			quoteArea.classList.remove("red");
			quoteArea.innerHTML = `<h1>${response}</h1>`;
		} else {
			quoteArea.classList.add("red");
			quoteArea.innerHTML = `<h1>${response}</h1>`;
		}
		globalQuote = response;
		return response;
	});
}

function redirectTweet() {
	if (quoteArea.innerText !== errorMsg) {
		window.open(
			`https://twitter.com/intent/tweet?text=${globalQuote}`,
			"_blank"
		);
		// loadAnimation();
	}
}

function loadAnimation() {
	generateBtn.removeAttribute("id");
	generateBtn.removeEventListener("click", returnedContent);
	spinner.classList.remove("hidden");
}

window.onload(returnedContent());

generateBtn.addEventListener("click", returnedContent);

tweetBtn.addEventListener("click", redirectTweet);
