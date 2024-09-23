<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import Header from './components/Header.svelte';
  import LeftColumn from './components/LeftColumn.svelte';
  import MiddleColumn from './components/MiddleColumn.svelte';
  import RightColumn from './components/RightColumn.svelte';

  let currentWorkoutStore = writable(null);
  let previousEntries = [];

  onMount(async () => {
    try {
      const response = await fetch('dummyData.json');
      const data = await response.json();
      previousEntries = data.previousEntries;
    } catch (error) {
      console.error('Error loading dummy data:', error);
    }
  });

  function handleWorkoutUpdated(event) {
    const updatedWorkout = event.detail;
    $currentWorkoutStore = updatedWorkout;
    
    const index = previousEntries.findIndex(w => w.date === updatedWorkout.date);
    if (index !== -1) {
      previousEntries[index] = updatedWorkout;
    } else {
      previousEntries = [...previousEntries, updatedWorkout];
    }
  }

  function handleWorkoutSelected(event) {
    $currentWorkoutStore = event.detail;
  }

  function handleNewWorkout() {
    $currentWorkoutStore = {
      name: '',
      exercises: [],
      date: new Date().toISOString().split('T')[0] // Today's date
    };
  }
</script>

<div class="page-container">
  <Header title="My Workout Tracker" />
 
  <div class="container">
    <LeftColumn on:newWorkout={handleNewWorkout} />
    <MiddleColumn 
      workout={$currentWorkoutStore}
      on:workoutUpdated={handleWorkoutUpdated}
      on:newWorkout={handleNewWorkout}
    />
    <RightColumn 
      {previousEntries}
      currentWorkoutStore={currentWorkoutStore}
      on:workoutSelected={handleWorkoutSelected}
    />
  </div>
</div>

<style>
  .page-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
  }
  .container {
    display: flex;
    flex: 1;
    width: 100%;
  }
</style>