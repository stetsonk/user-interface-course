<script>
    import Button from '../Button.svelte';
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    let newExercise = { name: '', sets: [] };
  
    function addExercise() {
      if (newExercise.name) {
        dispatch('exerciseAdded', { ...newExercise });
        newExercise = { name: '', sets: [] };
      } else {
        alert('Please enter an exercise name.');
      }
    }
  </script>
  
  <div class="add-exercise">
    <h3>Add Exercise</h3>
    <input type="text" bind:value={newExercise.name} placeholder="Exercise Name" />
    <Button label="Add Exercise" onClick={addExercise} styleClass="default"/>
  </div>
  
  <style>
    .add-exercise {
      margin-top: 20px;
    }
    input {
      padding: 8px;
      margin: 5px;
      width: 200px;
    }
  </style>