<script>
  import { createEventDispatcher } from 'svelte';
  import Exercise from '../Exercise/Exercise.svelte'; // Assuming you have this component

  export let workout = null;
  
  const dispatch = createEventDispatcher();

  let workoutName = '';
  let workoutDate = '';
  let exercises = [];

  $: if (workout) {
    workoutName = workout.name || '';
    workoutDate = workout.date || '';
    exercises = workout.exercises || [];
  }

  function handleNameChange() {
    updateWorkout();
  }

  function handleDateChange() {
    updateWorkout();
  }

  function addExercise() {
    exercises = [...exercises, { name: '', sets: [] }];
    updateWorkout();
  }

  function updateExercise(index, updatedExercise) {
    exercises[index] = updatedExercise;
    updateWorkout();
  }

  function removeExercise(index) {
    exercises = exercises.filter((_, i) => i !== index);
    updateWorkout();
  }

  function updateWorkout() {
    const updatedWorkout = {
      ...workout,
      name: workoutName,
      date: workoutDate,
      exercises: exercises
    };
    dispatch('workoutUpdated', updatedWorkout);
  }

  function saveWorkout() {
    if (!workoutName.trim()) {
      alert('Please enter a workout name.');
      return;
    }
    if (!workoutDate) {
      alert('Please select a workout date.');
      return;
    }
    const savedWorkout = {
      name: workoutName,
      date: workoutDate,
      exercises: exercises
    };
    dispatch('workoutSaved', savedWorkout);
  }
</script>

<div class="workout">
  {#if workout}
    <h2>Edit Workout</h2>
    <input 
      type="text" 
      bind:value={workoutName} 
      on:input={handleNameChange} 
      placeholder="Workout Name"
    />
    <input 
      type="date" 
      bind:value={workoutDate} 
      on:change={handleDateChange}
    />
    
    <h3>Exercises</h3>
    {#each exercises as exercise, index (index)}
      <Exercise 
        {exercise} 
        on:update={(e) => updateExercise(index, e.detail)}
        on:remove={() => removeExercise(index)}
      />
    {/each}
    
    <button on:click={addExercise}>Add Exercise</button>
    <button on:click={saveWorkout}>Save Workout</button>
  {:else}
    <p>No workout selected. Please select a workout from the calendar or start a new one.</p>
  {/if}
</div>

<style>
  .workout {
    padding: 20px;
    background-color: #444;
    color: white;
    border-radius: 8px;
  }
  input {
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
  }
  button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #555;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #666;
  }
</style>