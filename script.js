
var buttonColours = ["red", "blue", "green", "yellow"]; // Array of colors (button IDs)
var gamePattern = []; // Array to hold the game's random pattern
var userClickedPattern = []; // Array to hold the user's clicked pattern
var started = false; // Flag to check if the game has started
var level = 0; // Tracks the current level

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level); // Updates title with the current level
      nextSequence(); // Start the game by generating the first sequence
      started = true; // Prevent the game from restarting until it's over
    }
  });

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id"); // Get the id of the button that was clicked
    userClickedPattern.push(userChosenColour); // Add the clicked color to the user's pattern
    playSound(userChosenColour); // Play the corresponding sound
    animatePress(userChosenColour); // Animate the button press
    checkAnswer(userClickedPattern.length - 1); // Check the user's answer
});

function checkAnswer(currentLevel) {
    // Check if the user's answer matches the game's pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // Check if the user has finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence(); // Move to the next level after 1 second
            }, 1000);
        }
    } else {
        playSound("wrong"); // Play the "wrong" sound
        $("body").addClass("game-over"); // Flash red for game-over
        $("#level-title").text("Game Over, Press Any Key to Restart"); // Update the title
        
        setTimeout(function() {
            $("body").removeClass("game-over"); // Remove game-over effect after 200ms
        }, 200);
        
        startOver(); // Reset the game
    }
}

function nextSequence() {
    userClickedPattern = []; // Reset the user's pattern for the next level
    level++; // Increase the level
    $("#level-title").text("Level " + level); // Update the title with the current level
  
    var randomNumber = Math.floor(Math.random() * 4); // Generate a random number between 0-3
    var randomChosenColour = buttonColours[randomNumber]; // Pick a random color from buttonColours
    gamePattern.push(randomChosenColour); // Add the chosen color to the game pattern
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Animate the button
    playSound(randomChosenColour); // Play the corresponding sound
  }

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed"); // Add the pressed class for visual effect
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed"); // Remove the class after 100ms
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3"); // Load the sound file
    audio.play(); // Play the sound
}

function startOver() {
    level = 0; // Reset the level to 0
    gamePattern = []; // Clear the game pattern
    started = false; // Reset the game started flag
}
  
