document.addEventListener("DOMContentLoaded", function() {
    const quizData = [
        {
            question: "1.Quel gaz est le plus important contributeur au réchauffement global anthropique ?",
            a: "Dioxyde de carbone",
            b: "Méthane",
            c: "Ozone",
            d: "Protoxyde d’azote",
            correct: "a"
        },
        {
            question: "2.Quel secteur est le principal émetteur de gaz à effet de serre au niveau mondial ?",
            a: "Agriculture",
            b: "Industrie",
            c: "Transport",
            d: "Bâtiment résidentiel et commercial",
            correct: "c"
        },
        {
            question: "3.Quelle activité humaine est la plus responsable de la perte de biodiversité ?",
            a: "La pollution des océans",
            b: "La déforestation",
            c: "La surpêche",
            d: "Les feux de forêt",
            correct: "b"
        },
        {
            question: "4.Quelle est la principale conséquence de l’acidification des océans ?",
            a: "Augmentation de la population de méduses",
            b: "Dissolution des coquilles de créatures marines",
            c: "Apparition de nouvelles espèces de récifs coralliens",
            d: "Amélioration de la qualité de l’eau",
            correct: "b"
        },
        
            {
                question: "5. Quelle est la principale conséquence de l’acidification des océans ?",
                a: "Diminution du niveau de la mer",
                b: "Refroidissement global du climat",
                c: "Augmentation du niveau de la mer",
                d: "Accroissement de la biodiversité marine",
                correct: "c"
            },
            {
                question: "6. Quelle source d’énergie renouvelable produit le moins d’émissions de carbone ?",
                a: "L’énergie solaire",
                b: "L’énergie éolienne",
                c: "La biomasse",
                d: "L’énergie hydraulique",
                correct: "a"
            },
            {
                question: "7. Quelle stratégie agricole contribue à réduire l’effet de serre ?",
                a: "L’utilisation de fertilisants chimiques",
                b: "La culture intensive de monoculture",
                c: "Le labourage profond des sols",
                d: "L’agroforesterie",
                correct: "d"
            },
            {
                question: "8. Quel processus naturel est essentiel pour capturer le dioxyde de carbone de l’atmosphère ?",
                a: "La photosynthèse",
                b: "La respiration cellulaire",
                c: "La combustion",
                d: "L’évaporation",
                correct: "a"
            },
            {
                question: "9. Qu’est-ce qu’un “puits de carbone” ?",
                a: "Une technologie de capture et de stockage du carbone",
                b: "Un récipient où le carbone est stocké sous forme liquide",
                c: "Un écosystème qui absorbe plus de carbone qu’il n’en émet",
                d: "Une fosse naturelle émettant du carbone dans l’atmosphère",
                correct: "c"
            },
            {
                question: "10. Quel accord international vise à réduire les émissions de gaz à effet de serre ?",
                a: "Le Protocole de Kyoto",
                b: "L’Accord de Paris",
                c: "La Convention de Stockholm",
                d: "La Déclaration de Rio",
                correct: "b"
            },
        
        
    ];



    let currentQuiz = 0;
    let score = 0;
    const submitBtn = document.getElementById('submit');
    const nextBtn = document.getElementById('next');
    const quizContent = document.getElementById('quiz-content');

    const notificationContainer = document.getElementById('notification-container');
    const notificationMessage = document.getElementById('notification-message');
    const notificationClose = document.getElementById('notification-close');

    function loadQuiz() {
        deselectAnswers();
        const currentQuizData = quizData[currentQuiz];
        quizContent.innerHTML = `
            <div class="quiz-header">
                <h2 id="question">${currentQuizData.question}</h2>
            </div>
            <ul>
                ${Object.keys(currentQuizData).map((key) => {
                    if (key !== 'question' && key !== 'correct') {
                        return `
                            <li>
                                <input type="radio" name="answer" id="${key}" class="answer">
                                <label for="${key}">${currentQuizData[key]}</label>
                            </li>`;
                    }
                    return '';
                }).join('')}
            </ul>`;
        submitBtn.disabled = false;
    }

    function deselectAnswers() {
        document.querySelectorAll('.answer').forEach(answerEl => answerEl.checked = false);
    }

    function getSelectedAnswer() {
        return document.querySelector('input[name="answer"]:checked');
    }

    function showAlert(message) {
        notificationMessage.textContent = message;
        notificationContainer.classList.remove('hidden');
        // Scroll to top so the user can see the alert.
        window.scrollTo(0, 0);
    }

    submitBtn.addEventListener('click', () => {
        const answer = getSelectedAnswer();
        const currentQuizData = quizData[currentQuiz];
    
        if (!answer) {
            showAlert('Veuillez sélectionner une option avant de soumettre.');
            return;
        }
    
        // Hide the submit button.
        submitBtn.style.display = 'none';
    
        // Show the next question button if there are more questions.
        if (currentQuiz < quizData.length - 1) {
            nextBtn.style.display = 'block';
        }
    
        // Display whether the selected answer is correct or not.
        let isCorrect = answer.id === currentQuizData.correct;
        const correctAnswerText = currentQuizData[currentQuizData.correct];
        let answerNotification = `<div class="correct-answer mt-4 p-4 border-l-4 ${
            isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
        }">
            <p class="${isCorrect ? 'text-green-700' : 'text-red-700'}">La bonne réponse est: <strong>${correctAnswerText}</strong></p>
        </div>`;
    
        quizContent.insertAdjacentHTML('beforeend', answerNotification);
    
        // Increment score if the answer was correct.
        if (isCorrect) {
            score++;
        }
    
        hideAlert(); // Hide any existing alerts.
    });
    
    function hideAlert() {
        notificationContainer.classList.add('hidden');
    }

    notificationClose.addEventListener('click', hideAlert);

    submitBtn.addEventListener('click', () => {
        const answer = getSelectedAnswer();
        if (!answer) {
            showAlert('Veuillez sélectionner une option avant de soumettre.');
            return;
        }

        if (answer.id === quizData[currentQuiz].correct) {
            score++;
        }

        submitBtn.disabled = true;
        nextBtn.style.display = 'block';
        hideAlert(); // Call this to hide any existing alerts when submit is successful
    });

    nextBtn.addEventListener('click', () => {
        currentQuiz++;
    
        if (currentQuiz < quizData.length) {
            loadQuiz();
            submitBtn.style.display = 'block'; // Show the submit button again for the next question
            nextBtn.style.display = 'none'; // Hide the next button until needed again
        } else {
            quizContent.innerHTML = `
                <h2>Vous avez répondu correctement à ${score} sur ${quizData.length} questions.</h2>
                <button onclick="location.reload()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Recommencer le quiz
                </button>
            `;
            submitBtn.style.display = 'none'; // Hide the submit button after displaying the score
            nextBtn.style.display = 'none'; // Ensure Next button is also hidden
        }
        deselectAnswers();
    });
    loadQuiz();
});