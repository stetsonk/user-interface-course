<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let previousEntries = []; // List of previous workouts
    let currentDate = new Date(); // Current date to display
    let daysInMonth = []; // Days to display
    let workoutDates = new Set(); // Store dates with workouts

    // Reactive variables for month and year
    $: currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    $: currentYear = currentDate.getFullYear().toString();

    // Helper function to format date as YYYY-MM-DD
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    // On component mount and when previousEntries changes, update workout dates
    $: {
        workoutDates = new Set(previousEntries.map(entry => entry.date));
        generateCalendar();
    }

    // Get the number of days in the current month
    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    // Generate the calendar days for the current month
    function generateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        daysInMonth = [];
        // Fill in the empty days at the start of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysInMonth.push(null);
        }
        // Add actual days of the month
        for (let i = 1; i <= getDaysInMonth(year, month); i++) {
            daysInMonth.push(i);
        }
    }

    // Move to the previous month
    function prevMonth() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        generateCalendar();
    }

    // Move to the next month
    function nextMonth() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        generateCalendar();
    }

    // Handle day selection
    function selectDate(day) {
        if (day) {
            const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const formattedDate = formatDate(selectedDate);

            console.log(`Selected date: ${formattedDate}`);
        
            // Find the workout for the selected date
            const workout = previousEntries.find(entry => entry.date === formattedDate);
            if (workout) {
                dispatch('workoutSelected', workout);
            } else {
                // Dispatch an event to create a new workout for this date
                dispatch('workoutSelected', { date: formattedDate, exercises: [] });
            }
        }
    }

    // Check if a day has a workout
    function hasWorkout(day) {
        if (!day) return false;
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return workoutDates.has(formatDate(date));
    }
</script>

<div class="calendar">
    <div class="calendar-header">
        <button on:click={prevMonth}>❮</button>
        <span>{currentMonth} {currentYear}</span>
        <button on:click={nextMonth}>❯</button>
    </div>
    <div class="calendar-grid">
        <div class="day-name">Sun</div>
        <div class="day-name">Mon</div>
        <div class="day-name">Tue</div>
        <div class="day-name">Wed</div>
        <div class="day-name">Thu</div>
        <div class="day-name">Fri</div>
        <div class="day-name">Sat</div>

        {#each daysInMonth as day}
            <button 
                type="button"
                class="day {day ? '' : 'empty'}" 
                class:highlight={hasWorkout(day)}
                on:click={() => selectDate(day)}
                aria-label={day ? `Select date ${formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}` : ''}>
                {day}
            </button>
        {/each}
    </div>
</div>

<style>
    .calendar {
        margin-bottom: 20px;
    }

    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
    }

    .day-name, .day {
        background-color: #666;
        padding: 5px;
        text-align: center;
        border-radius: 4px;
    }

    .day {
        cursor: pointer;
    }

    .empty {
        background-color: transparent;
        cursor: default;
    }

    .day:hover {
        background-color: #777;
    }

    .highlight {
        background-color: #00d7fd;
    }
    .highlight:hover {
        background-color: #00b8d9;
    }
</style>