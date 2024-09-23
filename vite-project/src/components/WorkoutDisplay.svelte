<script>
    export let workout = null; // The workout to display

    // Log the received workout to the console
    $: console.log('Received workout:', workout);
</script>

<div class="workout-display">
    {#if workout}
        <h3>Workout on {workout.date}</h3> <!-- Adjust this line based on your actual data structure -->
        <ul>
            {#each workout.exercises as exercise}
                <li>
                    <strong>{exercise.name}</strong>: {exercise.sets.length} sets
                </li>
            {/each}
        </ul>
    {:else}
        <p>Select a date to see the workout details.</p>
    {/if}
</div>

<style>
    .workout-display {
        padding: 10px;
        background-color: #777;
        border-radius: 4px;
        color: white;
    }
</style>
