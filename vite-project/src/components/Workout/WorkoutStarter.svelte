<script>
    import Button from '../Button.svelte';
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    export let workoutTypes = [];
    export let mostFrequentWorkout = null;
  
    let workoutName = '';
    let workoutType = '';
    let workoutDate = '';
  
    function startWorkout() {
      if (workoutName && workoutDate && workoutType) {
        dispatch('startWorkout', { name: workoutName, type: workoutType, date: workoutDate });
      } else {
        alert('Please enter a workout name, type, and date.');
      }
    }
  
    function quickStartWorkout() {
      if (mostFrequentWorkout) {
        workoutType = mostFrequentWorkout;
        workoutName = `${mostFrequentWorkout} Workout`;
        workoutDate = new Date().toISOString().split('T')[0]; // Today's date
        startWorkout();
      } else {
        alert('No previous workouts found. Please start a new workout manually.');
      }
    }
  </script>
  
  <div class="start-workout">
    <h2>Start New Workout</h2>
    <input type="text" bind:value={workoutName} placeholder="Workout Name"/>
    <select bind:value={workoutType}>
      <option value="">Select Workout Type</option>
      {#each workoutTypes as type}
        <option value={type}>{type}</option>
      {/each}
    </select>
    <input type="date" bind:value={workoutDate} />
    <Button label="Start Workout" onClick={startWorkout} styleClass="default"/>
    {#if mostFrequentWorkout}
      <Button label={`Quick Start ${mostFrequentWorkout}`} onClick={quickStartWorkout} styleClass="primary"/>
    {/if}
  </div>
  
  <style>
    .start-workout {
      text-align: center;
      margin: 20px;
      padding: 20px;
      background-color: #333;
      color: white;
      border-radius: 8px;
    }
    input, select {
      padding: 8px;
      margin: 5px;
      width: 200px;
    }
  </style>