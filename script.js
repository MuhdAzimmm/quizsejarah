const questions = [
    {
      questionImage: 'assets/img/q1.png',
      options: [
        { image: 'assets/img/q1a1.png', isCorrect: true },
        { image: 'assets/img/q1a2.png', isCorrect: false },
        { image: 'assets/img/q1a3.png', isCorrect: false },
        { image: 'assets/img/q1a4.png', isCorrect: false },
      ],
    },
    {
      questionImage: 'https://via.placeholder.com/300x200?text=Question+2',
      options: [
        { image: 'https://via.placeholder.com/100?text=Opt1', isCorrect: false },
        { image: 'https://via.placeholder.com/100?text=Opt2', isCorrect: true },
        { image: 'https://via.placeholder.com/100?text=Opt3', isCorrect: false },
        { image: 'https://via.placeholder.com/100?text=Opt4', isCorrect: false },
      ],
    },
    {
    questionImage: 'https://via.placeholder.com/300x200?text=Question+3',
    options: [
        { image: 'https://via.placeholder.com/100?text=Opt1', isCorrect: false },
        { image: 'https://via.placeholder.com/100?text=Opt2', isCorrect: true },
        { image: 'https://via.placeholder.com/100?text=Opt3', isCorrect: false },
        { image: 'https://via.placeholder.com/100?text=Opt4', isCorrect: false },
    ],
    }
  ];
  
  let currentQuestion = 0;
  
  function loadQuestion(index) {
    const qBox = document.getElementById('question-box');
    const aBox = document.getElementById('answer-box');
    qBox.innerHTML = `<img src="${questions[index].questionImage}" alt="Question Image" class="dropzone" id="dropzone">`;
    aBox.innerHTML = '';
  
    questions[index].options.forEach((opt, i) => {
      const img = document.createElement('img');
      img.src = opt.image;
      img.draggable = true;
      img.dataset.correct = opt.isCorrect;
      img.addEventListener('dragstart', dragStart);
      aBox.appendChild(img);
    });
  
    setupDropzone();
  }
  
  function setupDropzone() {
    const dropzone = document.getElementById('dropzone');
    dropzone.addEventListener('dragover', (e) => e.preventDefault());
    dropzone.addEventListener('drop', handleDrop);
  }
  
  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.correct);
  }
  
  function handleDrop(e) {
    e.preventDefault();
    const isCorrect = e.dataTransfer.getData('text/plain') === 'true';
    if (isCorrect) {
      alert('✅ Correct Answer!');
    } else {
      alert('❌ Try Again!');
    }
  }
  
  function createNavigation() {
    const nav = document.getElementById('nav-box');
    for (let i = 0; i < questions.length; i++) {
      const btn = document.createElement('button');
      btn.textContent = i + 1;
      btn.onclick = () => {
        currentQuestion = i;
        loadQuestion(i);
      };
      nav.appendChild(btn);
    }
  }
  
  createNavigation();
  loadQuestion(currentQuestion);
  
  //conffetti style
  // Add the confetti library
const confetti = window.confetti;

// Add clap audio for correct answer
const clapAudio = new Audio('assets/sound/clap.mp3'); // Replace with your clap sound URL

// Function to show a popup with confetti and audio
function showResultPopup(isCorrect) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
      <div class="popup-content">
        <h3>${isCorrect ? '✅ Correct Answer!' : '❌ Try Again!'}</h3>
      </div>
    `;
    
    // Append popup to the body
    document.body.appendChild(popup);
    
    // Trigger confetti for correct answers
    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      clapAudio.play(); // Play clap sound
    }
    
    // Remove the popup after 1 second (1000 ms)
    setTimeout(() => {
      closePopup();
    }, 1000);
  }
  
  // Function to close the popup
  function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  }
  

// Function to close the popup
function closePopup() {
  const popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
  }
}

// Updated handleDrop function to show popup instead of alert
function handleDrop(e) {
  e.preventDefault();
  const isCorrect = e.dataTransfer.getData('text/plain') === 'true';
  showResultPopup(isCorrect);  // Show the result popup with confetti
}
