<script>
    import { createEventDispatcher } from 'svelte';
    import Workout from './Workout/Workout.svelte';
  
    export let workout = null;
    const dispatch = createEventDispatcher();
  
    function handleWorkoutUpdated(event) {
      dispatch('workoutUpdated', event.detail);
    }
  
    function handleWorkoutSaved(event) {
      dispatch('workoutSaved', event.detail);
    }
  
    function startNewWorkout() {
      dispatch('newWorkout');
    }
  </script>
  
  <div class="middle-column">
    {#if workout}
      <Workout 
        {workout} 
        on:workoutUpdated={handleWorkoutUpdated}
        on:workoutSaved={handleWorkoutSaved}
      />
    {:else}
      <div class="no-workout">
        <p>No workout selected. Please select a workout from the calendar or start a new one.</p>
        <button on:click={startNewWorkout}>Start New Workout</button>
      </div>
    {/if}
  </div>
  
  <style>
    .middle-column {
      padding: 20px;
      background-color: #444;
      color: white;
      height: 100%;
      width: 50%;
    }
    .no-workout {
      text-align: center;
      padding: 20px;
    }
    button {
      margin-top: 10px;
      padding: 10px 20px;
      background-color: #00d7fd;
      color: black;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #00b8d9;
    }
  </style>