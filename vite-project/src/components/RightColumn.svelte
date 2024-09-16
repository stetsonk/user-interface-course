<script>
    export let previousEntries = [];
</script>

<div class="right-column">
    <h2>Previous Workouts</h2>
    <ul>
      {#each previousEntries as entry}
        <li>{entry.date}: {entry.name}</li>
      {/each}
    </ul>
</div>

<style>
    .right-column {
      padding: 20px;
      background-color: #555;
      color: white;
      height: 100%;
      width: 25%;
    }
  
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin: 5px 0;
    }
</style>
