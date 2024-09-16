<script>
    export let stats = {};
  </script>
  
  <div class="left-column">
    <h2>Workout Statistics</h2>
    <ul>
      <li>Estimated 1-Rep Max: {stats.oneRepMax}</li>
      <li>Total Workouts: {stats.totalWorkouts}</li>
      <li>Total Weight Lifted: {stats.totalWeightLifted}</li>
      <!-- Add more stats as needed -->
    </ul>
  </div>
  
  <style>
    .left-column {
      padding: 20px;
      background-color: #333;
      color: white;
      height: 100%;
      width: 25%
    }
  </style>
  