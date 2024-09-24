<script>
  import { onMount } from 'svelte';
  import WorkoutStats from './WorkoutStats.svelte';
  import GoalTracker from './GoalTracker.svelte';
  import OneRepMaxGraph from './OneRepMaxGraph.svelte';

  let selectedExercise = 'Squat'; // Default to Squat as per dummy data
  let workoutEntries = []; 
  export let previousEntries = [];
  $: console.log('LeftColumn received previousEntries:', previousEntries);

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
  <WorkoutStats workouts={workoutEntries}/>
  <GoalTracker workouts={previousEntries} />
  <OneRepMaxGraph {previousEntries} />
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