// This function limits the input tag value to just one character
export function limitToOneCharacter(event) {
    const value = event.target.value;
    if (value.length > 1) {
      event.target.value = value.charAt(0);
    }
  }



  // Function for countdown timer (5:00 mins)
export function countdownTimer(callback) {
    let seconds = 5 * 60; // Convert 5 minutes to seconds
    const timerInterval = setInterval(() => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
  
      // Format the remaining time with leading zeros if necessary
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      
      // Call the callback with the formatted time
      if (typeof callback === 'function') {
        callback(formattedTime);
      }
  
      if (seconds === 0) {
        // Timer has reached 0, clear the interval
        clearInterval(timerInterval);
      } else {
        // Decrement the seconds
        seconds--;
      }
    }, 1000); // Update the timer every 1 second (1000 milliseconds)
  }

  