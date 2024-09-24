<script>
    import { createEventDispatcher } from 'svelte';
    import Workout from './workout/Workout.svelte';
  
    export let workout = null;
    const dispatch = createEventDispatcher();
  
    function handleWorkoutUpdated(event) {
      dispatch('workoutUpdated', event.detail);
    }
  
    function handleWorkoutSaved(event) {
      dispatch('workoutSaved', event.detail);
    }

    function handleWorkoutDeleted(event) {
      dispatch('workoutDeleted', event.detail);
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
        on:workoutDeleted={handleWorkoutDeleted}
      />
    {:else}
    <div class="new-workout-menu">
      <h2>Start a New Workout</h2>
      <p>Click the button below to begin a new workout session.</p>
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