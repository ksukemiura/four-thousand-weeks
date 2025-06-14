document.addEventListener('DOMContentLoaded', () => {
    const birthdayInput = document.getElementById('birthday');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    const weeksGridDiv = document.getElementById('weeksGrid');
    const totalWeeks = 4000;

    const today = new Date();
    const defaultBirthday = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());
    birthdayInput.value = defaultBirthday.toISOString().split('T')[0];

    function calculateWeeksPassed(birthdayDate) {
        const now = new Date();
        const diffInMilliseconds = now - birthdayDate;
        const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.floor(diffInMilliseconds / millisecondsPerWeek);
    }

    function displayWeeksGrid(weeksPassed) {
        weeksGridDiv.innerHTML = '';
        for (let i = 0; i < totalWeeks; i++) {
            const weekSquare = document.createElement('div');
            weekSquare.classList.add('week-square');
            if (i < weeksPassed) {
                weekSquare.classList.add('passed');
            }
            weeksGridDiv.appendChild(weekSquare);
        }
    }

    calculateBtn.addEventListener('click', () => {
        const birthdayString = birthdayInput.value;
        if (!birthdayString) {
            resultDiv.textContent = 'Please enter your birthday.';
            weeksGridDiv.innerHTML = '';
            return;
        }

        const birthdayDate = new Date(birthdayString);
        if (isNaN(birthdayDate.getTime())) {
            resultDiv.textContent = 'Invalid date format. Please use YYYY-MM-DD.';
            weeksGridDiv.innerHTML = '';
            return;
        }
        
        const today = new Date();
        if (birthdayDate > today) {
            resultDiv.textContent = 'Birthday cannot be in the future.';
            weeksGridDiv.innerHTML = '';
            return;
        }

        const weeksPassed = calculateWeeksPassed(birthdayDate);

        if (weeksPassed < 0) {
            resultDiv.textContent = 'Birthday cannot be in the future.';
            weeksGridDiv.innerHTML = '';
            return;
        }
        
        resultDiv.textContent = `You have lived approximately ${weeksPassed} weeks.`;
        displayWeeksGrid(weeksPassed);
    });

    if (birthdayInput.value) {
        const initialBirthday = new Date(birthdayInput.value);
        if (!isNaN(initialBirthday.getTime())) {
            const weeksPassed = calculateWeeksPassed(initialBirthday);
            resultDiv.textContent = `You have lived approximately ${weeksPassed} weeks.`;
            displayWeeksGrid(weeksPassed);
        }
    } else {
        displayWeeksGrid(0);
         resultDiv.textContent = 'Enter your birthday to see your weeks.';
    }
});