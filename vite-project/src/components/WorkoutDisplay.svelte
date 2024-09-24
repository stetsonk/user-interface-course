<script>
    export let workout = null;
    
    $: console.log('Received workout:', workout);

    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function calculateTotalVolume(exercise) {
        return exercise.sets.reduce((total, set) => total + (set.reps * set.weight), 0);
    }
</script>

<div class="workout-display">
    {#if workout}
        <h3>{workout.name || 'Workout'} on {formatDate(workout.date)}</h3>
        {#each workout.exercises as exercise}
            <div class="exercise-card">
                <h4>{exercise.name}</h4>
                <div class="exercise-details">
                    <span class="detail-item">Sets: {exercise.sets.length}</span>
                    <span class="detail-item">Total Volume: {calculateTotalVolume(exercise)} lbs</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Set</th>
                            <th>Reps</th>
                            <th>Weight (lbs)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each exercise.sets as set, index}
                            <tr>
                                <td>{index + 1}</td>
                                <td>{set.reps}</td>
                                <td>{set.weight}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/each}
    {:else}
        <p>Select a date with a workout to see the details.</p>
    {/if}
</div>

<style>
    .workout-display {
        padding: 15px;
        background-color: #555;
        border-radius: 8px;
        color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }

    h3 {
        margin-top: 0;
        color: #00d7fd;
        border-bottom: 2px solid #00d7fd;
        padding-bottom: 10px;
    }

    .exercise-card {
        background-color: #444;
        border-radius: 6px;
        padding: 15px;
        margin-bottom: 15px;
        transition: transform 0.2s ease;
    }

    .exercise-card:hover {
        transform: translateY(-2px);
    }

    h4 {
        margin-top: 0;
        color: #00d7fd;
    }

    .exercise-details {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 0.9em;
    }

    .detail-item {
        background-color: #666;
        padding: 5px 10px;
        border-radius: 15px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        text-align: left;
        padding: 8px;
        border-bottom: 1px solid #666;
    }

    th {
        background-color: #333;
        color: #00d7fd;
    }

    tr:last-child td {
        border-bottom: none;
    }

    p {
        text-align: center;
        color: #aaa;
    }
</style>