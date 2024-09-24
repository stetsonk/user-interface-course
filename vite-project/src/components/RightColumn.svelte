<script>
  import { createEventDispatcher } from 'svelte';
  import Calendar from './Calendar.svelte';
  import WorkoutDisplay from './WorkoutDisplay.svelte';

  export let previousEntries = [];
  export let currentWorkoutStore;

  const dispatch = createEventDispatcher();

  function handleWorkoutSelected(event) {
    console.log('Selected workout:', event.detail);  
    dispatch('workoutSelected', event.detail);
  }
</script>

<div class="right-column">
  <h2>Previous Workouts</h2>
  <Calendar {previousEntries} on:workoutSelected={handleWorkoutSelected} />
  <WorkoutDisplay workout={$currentWorkoutStore} />
</div>

<style>
    .right-column {
        padding: 20px;
        background-color: #333;
        color: white;
        height: 100%;
        width: 25%;
    }
    h2 {
        color: #ffffff;
        margin-bottom: 15px;
    }
</style>