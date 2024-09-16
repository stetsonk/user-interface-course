<script>
    import Set from './Set.svelte';
    import Button from './Button.svelte';
    
    export let exercise = { name: '', sets: [] };
    export let onDelete; // Function passed in from the parent to handle deletion
    
    let newSet = { weight: 0, reps: 0 };
    
    function addSet() {
      exercise.sets = [...exercise.sets, { ...newSet }];
      newSet = { weight: 0, reps: 0 }; // Reset the new set input
    }
    
    function handleDelete() {
      if (onDelete) {
        onDelete(exercise); // Call the delete function passed from the parent
      }
    }
  </script>
    
  <li class="exercise">
    <div class="exercise-header">
      <h4>{exercise.name}</h4>
      <Button label="Delete Exercise" onClick={handleDelete} styleClass="delete-button" />
    </div>
    
    <!-- Labels and Inputs -->
    <div class="exercise-labels">
      <div class="input-group">
        <label for="weight-input">Weight</label>
        <input id="weight-input" type="number" bind:value={newSet.weight}/>
      </div>
      <div class="input-group">
        <label for="reps-input">Reps</label>
        <input id="reps-input" type="number" bind:value={newSet.reps}/>
      </div>
    </div>
    
    <!-- <button on:click={addSet} id="add-set-button">Add Set</button> -->
    <Button label="Add Set" onClick={addSet} styleClass="default" />
  
    <h5>Sets</h5>
    <ul>
      {#each exercise.sets as set, i}
        <Set {set} key={i} />
      {/each}
    </ul>
  </li>
    
  <style>
    .exercise {
      background-color: #555;
      margin: 10px 0;
      padding: 10px;
      border-radius: 4px;
    }
    
    .exercise-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    
    .exercise-labels {
      display: flex;
      gap: 20px;
      margin-bottom: 10px;
    }
    
    .input-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: auto;
    }
    
    label {
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    input {
      padding: 8px;
      box-sizing: border-box;
      width: 100px;
      text-align: center;
    }
    
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  </style>
  