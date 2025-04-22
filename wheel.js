// Get references to the modal and button
const wheelModal = document.getElementById('wheelModal');
const startButton = document.getElementById('start-button');
const nameInput = document.getElementById('nameInput');
const addNameButton = document.getElementById('addNameButton');
const spinButton = document.getElementById('spin');
const winner = document.getElementById('winner');
const randomTaskButton = document.getElementById('randomTaskButton');
const randomTaskWrapper = document.getElementById('randomTaskWrapper');
const randomTaskDisplay = document.getElementById('randomTask');
const taskWrapper = document.getElementById('taskWrapper');

let supportTeam = [];

// List of random tasks
const tasks = [
  "Clap two times",
  "Make a cute face",
  "Jump three times",
  "Do a funny dance",
  "Spin around once",
  "Pretend you're a superhero",
  "Say something funny",
  "Act like a chicken for 5 seconds",
];

// Initially hide the modal when the page loads
wheelModal.style.display = 'none';

// Show the modal when the start button is clicked
startButton.addEventListener('click', () => {
  wheelModal.style.display = 'flex'; // Show the modal with flex positioning
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target === wheelModal) {
    wheelModal.style.display = 'none'; // Hide the modal
  }
});

// Function to add name to the supportTeam array
addNameButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (name) {
    supportTeam.push(name);
    alert(`${name} added to the wheel!`);
    nameInput.value = ''; // Clear the input field
  }
});

// Function to select a random winner from the names in supportTeam
function everythingIsAwesome(itis) {
  winner.innerHTML += ' telah terpilih !!!!';
  //setTimeout(JSFX.FWStart, 3000);
}

// Function to simulate spinning the wheel and selecting a winner
function roulette(interval, maxinterval) {
  if (interval >= maxinterval) {
    everythingIsAwesome();
    randomTaskWrapper.style.display = 'block'; // Show the Random Task button
    taskWrapper.style.display = 'block'; // Show the task wrapper
    return;
  }

  var willitbe = supportTeam[Math.floor(Math.random() * supportTeam.length)];
  winner.innerHTML = willitbe;
  setTimeout(function() { roulette(interval * 1.1, maxinterval); }, interval);
}

// Start the roulette when the spin button is clicked
spinButton.addEventListener("click", function() {
  if (supportTeam.length > 0) {
    roulette(10, 100);
    this.classList.add("hidden");
  } else {
    alert("Please add some names before spinning the wheel!");
  }
});

// Function to simulate the spinning effect for the random task selection
function taskRoulette(interval, maxinterval) {
    if (interval >= maxinterval) {
      // Display the randomly selected task when the roulette stops
      randomTaskDisplay.innerHTML = tasks[Math.floor(Math.random() * tasks.length)];
  
      // Optionally add animation effect (like confetti or other effects)
      confetti();
  
      return;
    }
  
    // Display a random task from the tasks array
    const task = tasks[Math.floor(Math.random() * tasks.length)];
    randomTaskDisplay.innerHTML = task;
  
    // Keep simulating the roulette effect with increasing intervals
    setTimeout(function() { taskRoulette(interval * 1.1, maxinterval); }, interval);
  }
  
  // Start the task roulette when the "Random Task" button is clicked
  randomTaskButton.addEventListener('click', () => {
    // Start the task roulette effect when the button is clicked
    taskRoulette(10, 100);
  
    // Optionally hide the random task button after it's clicked
    randomTaskButton.classList.add("hidden");
  });
