<script>
    import { onMount } from "svelte";
  
    let userEntries = [
        {
            date: '2024-09-01',
            workoutName: 'Chest Day',
            exercises: [
                { name: 'Bench Press', sets: [{ weight: 100, reps: 10 }, { weight: 105, reps: 8 }] }
            ],
            oneRepMax: 135,
        },
        {
            date: '2024-09-02',
            workoutName: 'Leg Day',
            exercises: [
                { name: 'Squat', sets: [{ weight: 150, reps: 12 }, { weight: 160, reps: 10 }] }
            ],
            oneRepMax: 200,
        }
    ];
  
    let workoutName = '';
    let currentExerciseName = '';
    let currentWeight = 0;
    let currentReps = 0;
    let exercises = [];
    let oneRepMax = 0;
  
    // Display date and time
    let currentDate = "";
    function updateDateTime() {
        currentDate = new Date().toLocaleString();
    }
  
    function addExercise() {
        exercises.push({
            name: currentExerciseName,
            sets: [{ weight: currentWeight, reps: currentReps }]
        });
        currentExerciseName = '';
        currentWeight = 0;
        currentReps = 0;
    }
  
    function addSet(index) {
        exercises[index].sets.push({ weight: currentWeight, reps: currentReps });
        currentWeight = 0;
        currentReps = 0;
    }
  
    function updateCurrentDayEntry() {
        const today = new Date().toISOString().split('T')[0];
        const currentEntry = {
            date: today,
            workoutName,
            exercises,
            oneRepMax: calculateOneRepMax()
        };
  
        const currentEntryIndex = userEntries.findIndex(entry => entry.date === today);
        if (currentEntryIndex >= 0) {
            userEntries[currentEntryIndex] = currentEntry;
        } else {
            userEntries.push(currentEntry);
        }
  
        workoutName = '';
        exercises = [];
        oneRepMax = 0;
    }
  
    // Estimate one-rep max using the Epley formula
    function calculateOneRepMax() {
        let max = 0;
        exercises.forEach(exercise => {
            exercise.sets.forEach(set => {
                let estimatedMax = set.weight * (1 + set.reps / 30);
                if (estimatedMax > max) max = estimatedMax;
            });
        });
        return Math.round(max);
    }
  
    onMount(() => {
        updateDateTime();
    });
  </script>
  
  <style>
    :root {
        font-family: Arial, sans-serif;
    }
  
    .container {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
  
    .column {
        flex: 1;
        padding: 20px;
        box-sizing: border-box;
    }
  
    .middle-column {
        flex: 2;
    }
  
    input, textarea {
        display: block;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 8px;
        font-size: 16px;
    }
  
    label {
        font-weight: bold;
    }
  
    button {
        margin-top: 10px;
        padding: 10px;
    }
  </style>
  
  <main>
    <h1>Workout Tracker</h1>
    <p>{currentDate}</p>
  
    <div class="container">
      <!-- Left column: Workout Stats -->
      <div class="column">
        <h2>Statistics</h2>
        <p>Estimated One-Rep Max: {calculateOneRepMax()} lbs</p>
        <p>Workouts Completed: {userEntries.length}</p>
      </div>
  
      <!-- Middle column: Current Workout -->
      <div class="column middle-column">
        <h2>Today's Workout</h2>
  
        <!-- Workout Name -->
        <div class="section">
          <label for="workout-name">Workout Name:</label>
          <input type="text" bind:value={workoutName} placeholder="E.g., Leg Day">
        </div>
  
        <!-- Add Exercise -->
        <div class="section">
          <label for="exercise-name">Exercise Name:</label>
          <input type="text" bind:value={currentExerciseName} placeholder="E.g., Bench Press">
          <label for="weight">Weight:</label>
          <input type="number" bind:value={currentWeight} placeholder="Weight (lbs)">
          <label for="reps">Reps:</label>
          <input type="number" bind:value={currentReps} placeholder="Reps">
          <button on:click={addExercise}>Add Exercise</button>
        </div>
  
        <!-- Display Exercises and Sets -->
        <div>
          <h3>Exercises</h3>
          {#each exercises as exercise, i}
            <div>
              <h4>{exercise.name}</h4>
              {#each exercise.sets as set, j}
                <p>Set {j + 1}: {set.weight} lbs x {set.reps} reps</p>
              {/each}
              <label for="weight">Weight:</label>
              <input type="number" bind:value={currentWeight} placeholder="Weight (lbs)">
              <label for="reps">Reps:</label>
              <input type="number" bind:value={currentReps} placeholder="Reps">
              <button on:click={() => addSet(i)}>Add Set</button>
            </div>
          {/each}
        </div>
  
        <!-- Submit Workout -->
        <button on:click={updateCurrentDayEntry}>Save Workout</button>
      </div>
  
      <!-- Right column: Previous Entries -->
      <div class="column">
        <h2>Previous Workouts</h2>
        {#each userEntries as entry}
          <div>
            <h4>{entry.date} - {entry.workoutName}</h4>
            {#each entry.exercises as exercise}
              <p>{exercise.name}</p>
              {#each exercise.sets as set}
                <p>{set.weight} lbs x {set.reps} reps</p>
              {/each}
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </main>
  