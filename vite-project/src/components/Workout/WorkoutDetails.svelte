<script>
    import ExerciseList from '../Exercise/ExerciseList.svelte';
    import AddExerciseForm from '../Exercise/AddExerciseForm.svelte';
    import Button from '../Button.svelte';
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    export let workout;
  
    function handleExerciseAdded(event) {
      workout.exercises = [...workout.exercises, event.detail];
      dispatch('workoutUpdated', workout);
    }
  
    function handleExerciseDeleted(event) {
      workout.exercises = workout.exercises.filter(ex => ex !== event.detail);
      dispatch('workoutUpdated', workout);
    }
  
    function handleExerciseChanged(event) {
      workout.exercises = workout.exercises.map(ex =>
        ex.name === event.detail.name ? event.detail : ex
      );
      dispatch('workoutUpdated', workout);
    }
  
    function saveWorkout() {
      if (!workout.name.trim() || !workout.type) {
        alert('Please enter a workout name and select a type.');
        return;
      }
      if (!workout.date) {
        alert('Please select a workout date.');
        return;
      }
      dispatch('saveWorkout', workout);
    }
  </script>
  
  <div class="workout-details">
    <h2>{workout.name} ({workout.type})</h2>
    <ExerciseList 
      exercises={workout.exercises}
      on:exerciseDeleted={handleExerciseDeleted}
      on:exerciseChanged={handleExerciseChanged}
    />
    <AddExerciseForm on:exerciseAdded={handleExerciseAdded} />
    <Button label="Save Workout" onClick={saveWorkout} styleClass="primary"/>
  </div>
  
  <style>
    .workout-details {
      background-color: #444;
      color: white;
      padding: 20px;
      border-radius: 8px;
    }
  </style>