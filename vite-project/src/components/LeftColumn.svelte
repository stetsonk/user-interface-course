<script>
  import { onMount } from 'svelte';
  import OneRepMaxGraph from './OneRepMaxGraph.svelte';

  let selectedExercise = 'Squat'; // Default to Squat as per our dummy data
  let workoutEntries = []; 

  onMount(async () => {
    try {
      const response = await fetch('/dummyData.json');
      const data = await response.json();
      workoutEntries = data.previousEntries;
    } catch (error) {
      console.error('Error loading workout data:', error);
    }
  });
</script>

<div class="left-column">
  <h2>Workout Statistics</h2>
  {#if workoutEntries.length > 0}
    <OneRepMaxGraph {workoutEntries} />
  {:else}
    <p>Loading workout data...</p>
  {/if}
</div>

<style>
  .left-column {
    padding: 20px;
    background-color: #333;
    color: white;
    height: 100%;
    width: 25%;
  }
</style>