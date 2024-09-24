<script>
  import { createEventDispatcher } from 'svelte';

  export let exercise;
  export let exerciseOptions = []; // Array of predefined exercise options
  const dispatch = createEventDispatcher();

  function updateExercise() {
    dispatch('update', exercise);
  }

  function addSet() {
    exercise.sets = [...exercise.sets, { reps: '', weight: '' }];
    updateExercise();
  }

  function updateSet(index, field, value) {
    exercise.sets[index][field] = value;
    updateExercise();
  }

  function removeSet(index) {
    exercise.sets = exercise.sets.filter((_, i) => i !== index);
    updateExercise();
  }

  function removeExercise() {
    dispatch('remove');
  }
</script>

<div class="exercise">
  <select bind:value={exercise.name} on:change={updateExercise}>
    <option value="" disabled>Select Exercise</option>
    {#each exerciseOptions as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
  
  <button on:click={removeExercise}>Delete Exercise</button>
  
  <h4>Sets</h4>
  {#each exercise.sets as set, index (index)}
    <div class="set">
      <input 
        type="number" 
        bind:value={set.reps} 
        on:input={() => updateSet(index, 'reps', set.reps)} 
        placeholder="Reps"
      />
      <input 
        type="number" 
        bind:value={set.weight} 
        on:input={() => updateSet(index, 'weight', set.weight)} 
        placeholder="Weight"
      />
      <button on:click={() => removeSet(index)}>Remove Set</button>
    </div>
  {/each}
  <button on:click={addSet}>Add Set</button>
</div>

<style>
  .exercise {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #555;
    border-radius: 4px;
  }
  .set {
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
  }
  select, input {
    padding: 5px;
  }
  button {
    padding: 5px 10px;
    background-color: #666;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #777;
  }
</style>
