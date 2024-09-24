<script>
    export let workouts = [];

    $: totalWorkouts = workouts.length;
</script>

<div class="workout-stats">
    <h3>Workout Statistics</h3>
    <div class="stat-card">
        <span class="stat-label">Total Workouts</span>
        <span class="stat-value">{totalWorkouts}</span>
    </div>
</div>

<style>
    .workout-stats {
        background-color: #444;
        padding: 15px;
        border-radius: 8px;
        color: white;
        margin-bottom: 20px;
    }

    h3 {
        margin-top: 0;
        color: #00d7fd;
        border-bottom: 2px solid #00d7fd;
        padding-bottom: 10px;
        margin-bottom: 15px;
    }

    .stat-card {
        background-color: #555;
        padding: 10px;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .stat-label {
        font-size: 0.9em;
    }

    .stat-value {
        font-size: 1.2em;
        font-weight: bold;
        color: #00d7fd;
    }
</style>