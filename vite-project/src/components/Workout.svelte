<script>
    import Exercise from './Exercise.svelte';
    import Button from './Button.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let workout = {
      name: '',
      exercises: [],
      date: ''
    };
    let workoutStarted = false; // Track if the workout has started
  
    let newExercise = {
      name: '',
      weight: 0,
      reps: 0,
      sets: []
    };

    let workoutDate, workoutName;
    let previousWorkouts = [];
  
    function startWorkout() {
      workout.name = workoutName;
      workoutStarted = true;
    }
  
    function addExercise() {
      workout.exercises = [...workout.exercises, { ...newExercise }];
      newExercise = { name: '', weight: 0, reps: 0, sets: [] }; // Reset new exercise
    }

    function deleteExercise(exerciseToDelete) {
    workout.exercises = workout.exercises.filter(exercise => exercise !== exerciseToDelete);
   }

   function saveWorkout() {
    if (workout.name.trim() === '') {
      alert('Please enter a workout name.');
      return;
    }

    workout.date = workoutDate;
    previousWorkouts = [...previousWorkouts, { ...workout }];
    // Reset current workout
    workout = { name: '', exercises: [], date: ''};
    workoutStarted = false;
    dispatch('workoutUpdated', previousWorkouts);
  }
  </script>
  
  <div class="workout">
    {#if !workoutStarted}
      <div class="start-workout">
        <h2>Start New Workout</h2>
        <input type="text" bind:value={workoutName}/>
        <input type="date" bind:value={workoutDate} />
        <Button label="Start Workout" onClick={startWorkout} styleClass="default"/>
      </div>
    {:else}
      <div class="workout-details">
        <h2>{workout.name}</h2>
  
        <h3>Exercises</h3>
        <ul>
          {#each workout.exercises as exercise}
            <Exercise {exercise} onDelete={deleteExercise}/>
          {/each}
        </ul>
  
        <h3>Add Exercise</h3>
        <input type="text" bind:value={newExercise.name} placeholder="Exercise Name" />
        <Button label="Add Exercise" onClick={addExercise} styleClass="default"/>

        <Button label="Save Workout" onClick={saveWorkout} styleClass="default"/>
      </div>
    {/if}
  </div>
  
  <style>
    .workout {
      padding: 20px;
    }
  
    .start-workout {
      text-align: center;
      margin: 20px;
      padding: 20px;
      background-color: #333;
      color: white;
      border-radius: 8px;
    }
  
    .workout-details {
      background-color: #444;
      color: white;
      padding: 20px;
      border-radius: 8px;
    }
  
    input {
      padding: 8px;
      width: 100px;
    }
  
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  </style>
  