<script>
    import Header from './components/Header.svelte';
    import LeftColumn from './components/LeftColumn.svelte';
    import MiddleColumn from './components/MiddleColumn.svelte';
    import RightColumn from './components/RightColumn.svelte';

    let stats = {
        oneRepMax: '225 lbs',
        totalWorkouts: 10,
        totalWeightLifted: '10,000 lbs'
    };

    let currentWorkout = {
        name: '',
        exercises: []
    };

    let previousEntries = [];

    function handleWorkoutUpdated(event) {
        previousEntries = event.detail;
    }
</script>

<div class="page-container">
    <Header title="My Workout Tracker" />
  
    <div class="container">
        <LeftColumn {stats} />
        <MiddleColumn {currentWorkout} on:workoutUpdated={handleWorkoutUpdated} />
        <RightColumn {previousEntries} />
    </div>
</div>

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
    }

    .container {
        display: flex;
        flex: 1;
        width: 100%;
    }
</style>
