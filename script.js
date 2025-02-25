document.addEventListener('DOMContentLoaded', function () {
    // Set the end date of the presidential term (January 21, 2029 at noon EST)
    const termEndDate = new Date('January 21, 2029 12:00:00 EST');

    // Set the start date of the presidential term (January 20, 2025 at noon EST)
    const termStartDate = new Date('January 20, 2025 12:00:00 EST');

    // Total duration of the term in milliseconds
    const totalTermDuration = termEndDate - termStartDate;

    // Set up fireworks
    const canvas = document.getElementById('fireworks-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const firework = new Firework(canvas);

    // Track the last minute value to detect changes
    let lastMinute = -1;

    function updateCountdown() {
        // Get current date and time
        const now = new Date();

        // Calculate the time remaining
        const timeRemaining = termEndDate - now;

        // Calculate time elapsed since term start
        const timeElapsed = now - termStartDate;

        // Calculate progress percentage
        const progressPercentage = (timeElapsed / totalTermDuration) * 100;

        // If the term has ended
        if (timeRemaining <= 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            document.getElementById('milliseconds').textContent = '000';
            document.getElementById('progress-bar').style.width = '100%';
            document.getElementById('progress-percentage').textContent = '100%';
            return;
        }

        // Calculate days, hours, minutes, seconds, and milliseconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        const milliseconds = Math.floor(timeRemaining % 1000);

        // Check if minute has changed
        if (lastMinute !== -1 && minutes !== lastMinute) {
            // Launch fireworks at random positions
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * (canvas.height / 2);
                    firework.launch(x, y);
                }, i * 300);
            }
        }

        // Update the last minute
        lastMinute = minutes;

        // Update the HTML elements
        document.getElementById('days').textContent = days.toLocaleString();
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        document.getElementById('milliseconds').textContent = milliseconds.toString().padStart(3, '0');

        // Update progress bar
        document.getElementById('progress-bar').style.width = progressPercentage.toFixed(2) + '%';
        document.getElementById('progress-percentage').textContent = progressPercentage.toFixed(1) + '%';
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Update the countdown every 10 milliseconds for smooth millisecond display
    setInterval(updateCountdown, 10);

    // Initial call to set the values immediately
    updateCountdown();
}); 