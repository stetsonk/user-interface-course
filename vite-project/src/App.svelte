<script>
  import { onMount } from "svelte";

  // User data array with dummy data for previous days
  let userEntries = [
      {
          date: '2024-09-01',
          name: 'Stetson',
          journal: 'Had a productive day at work. Feeling good!',
          sleepHours: 8,
          moods: ['energetic', 'motivated'],
          imageUrl: ''
      },
      {
          date: '2024-09-02',
          name: 'Stetson',
          journal: 'Struggled with focus. Maybe too much coffee.',
          sleepHours: 5,
          moods: ['anxious', 'tired'],
          imageUrl: ''
      },
      {
          date: '2024-09-03',
          name: 'Stetson',
          journal: 'Great workout today. Feeling strong.',
          sleepHours: 7,
          moods: ['motivated', 'happy'],
          imageUrl: ''
      }
  ];

  // Data for the current day's entry
  let name = "";
  let journal = "";
  let sleepHours = 0;
  let moods = [];
  let imageUrl = "";

  let averageSleep = 0;
  let moodCounts = {
      energetic: 0,
      anxious: 0,
      motivated: 0,
      happy: 0,
      stressed: 0,
      tired: 0
  };

  // SVG color determination for sleep quality
  let sleepColor = 'white';

  // Run on page load
  onMount(() => {
      computeAndDisplayStats();
      updateDateTime();
  });

  function updateCurrentDayEntry() {
      const today = new Date().toISOString().split('T')[0];
      const currentEntry = {
          date: today,
          name: name || "Anonymous",
          journal,
          sleepHours: sleepHours || 0,
          moods,
          imageUrl: '' // Image handling can be done later
      };

      // Find if today's entry already exists
      const currentEntryIndex = userEntries.findIndex(entry => entry.date === today);
      if (currentEntryIndex >= 0) {
          userEntries[currentEntryIndex] = currentEntry;
      } else {
          userEntries.push(currentEntry);
      }

      computeAndDisplayStats();
  }

  // Compute average sleep and mood counts
  function computeAndDisplayStats() {
      let totalSleep = 0;
      let totalEntries = userEntries.length;

      // Reset mood counts
      for (let mood in moodCounts) {
          moodCounts[mood] = 0;
      }

      userEntries.forEach(entry => {
          totalSleep += entry.sleepHours;
          entry.moods.forEach(mood => {
              if (moodCounts[mood] !== undefined) {
                  moodCounts[mood]++;
              }
          });
      });

      // Calculate average sleep
      averageSleep = totalSleep / totalEntries;

      // Determine sleep SVG color
      sleepColor = averageSleep >= 7 ? "green" : averageSleep >= 4 ? "yellow" : "red";
  }

  // Handle mood checkbox changes
  function toggleMood(mood) {
      if (moods.includes(mood)) {
          moods = moods.filter(m => m !== mood);
      } else {
          moods = [...moods, mood];
      }
  }

  // Display date and time
  let currentDate = "";
  function updateDateTime() {
      currentDate = new Date().toLocaleString();
  }
</script>

<style>
  /* Add your styles here */
  :root {
      font-family: Arial, sans-serif;
  }

  .section {
      margin-bottom: 20px;
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

  .mood-checkboxes {
      display: flex;
      flex-wrap: wrap;
  }

  .mood-checkboxes label {
      margin-right: 15px;
  }

  svg {
      margin-top: 10px;
  }
</style>

<main>
  <h1>Daily Journal</h1>
  <p>{currentDate}</p>

  <!-- Name Entry -->
  <div class="section">
      <label for="name">Name:</label>
      <input type="text" bind:value={name} placeholder="Enter your name">
  </div>

  <!-- Inspirational Quote -->
  <div class="section">
      <blockquote>"Believe you can and you're halfway there." - Theodore Roosevelt</blockquote>
  </div>

  <!-- Image Upload -->
  <div class="section">
      <label for="image-upload">Upload your image:</label>
      <input type="file" id="image-upload"> <!-- Image uploading not yet implemented -->
  </div>

  <!-- Journal Entry -->
  <div class="section">
      <label for="journal-entry">Journal Entry:</label>
      <textarea bind:value={journal} rows="5" placeholder="Write your thoughts here..."></textarea>
  </div>

  <!-- Sleep Hours -->
  <div class="section">
      <label for="sleep-hours">Hours of Sleep:</label>
      <input type="number" bind:value={sleepHours} min="0" max="24">

      <!-- SVG for Sleep Score -->
      <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill={sleepColor}></circle>
      </svg>
  </div>

  <!-- Mood Checkboxes -->
  <div class="section mood-checkboxes">
      <p>How did you feel today?</p>
      <label><input type="checkbox" on:change={() => toggleMood('energetic')}> Energetic</label>
      <label><input type="checkbox" on:change={() => toggleMood('anxious')}> Anxious</label>
      <label><input type="checkbox" on:change={() => toggleMood('motivated')}> Motivated</label>
      <label><input type="checkbox" on:change={() => toggleMood('happy')}> Happy</label>
      <label><input type="checkbox" on:change={() => toggleMood('stressed')}> Stressed</label>
      <label><input type="checkbox" on:change={() => toggleMood('tired')}> Tired</label>
  </div>

  <!-- Submit Button -->
  <div class="section">
      <button on:click={updateCurrentDayEntry}>Save Entry</button>
  </div>

  <!-- Statistics Section -->
  <div class="section">
      <h2>Statistics</h2>
      <p>Average Sleep: {averageSleep.toFixed(2)} hours</p>
      <h3>Mood Counts</h3>
      <div>
          {#each Object.keys(moodCounts) as mood}
              <p>{mood}: {moodCounts[mood]} day(s)</p>
          {/each}
      </div>
  </div>
</main>
