<script>
    import Exercise from './Exercise.svelte';
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    export let exercises = [];
  
    function handleDelete(exercise) {
      dispatch('exerciseDeleted', exercise);
    }
  
    function handleChange(event) {
      dispatch('exerciseChanged', event.detail);
    }
  </script>
  
  <h3>Exercises</h3>
  <ul>
    {#each exercises as exercise (exercise.name)}
      <Exercise
        {exercise}
        onDelete={() => handleDelete(exercise)}
        on:change={handleChange}
      />
    {/each}
  </ul>
  
  <style>
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  </style>