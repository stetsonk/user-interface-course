<script>
    import Workout from './Workout.svelte';
    import { createEventDispatcher } from 'svelte';

    export let workout = {
      name: '',
      exercises: []
    };

    const dispatch = createEventDispatcher();

    function handleWorkoutUpdated(event) {
        dispatch('workoutUpdated', event.detail);
    }
</script>

<div class="middle-column">
    <Workout {workout} on:workoutUpdated={handleWorkoutUpdated} />
</div>

<style>
    .middle-column {
        padding: 20px;
        background-color: #444;
        color: white;
        height: 100%;
        width: 50%;
    }
</style>
