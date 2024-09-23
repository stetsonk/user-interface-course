<script>
  export let set = { weight: 0, reps: 0 };
  export let setNumber;
  export let onUpdate;
  function handleWeightChange(event) {
    onUpdate({ ...set, weight: +event.target.value });
  }
  function handleRepsChange(event) {
    onUpdate({ ...set, reps: +event.target.value });
  }
</script>

<li class="set">
  <div class="set-number-box">{setNumber}</div>
  <div class="set-details">
    <div class="input-group" id="weight">
      <label for="weight-{setNumber}">Weight</label>
      <input id="weight-{setNumber}" type="number" bind:value={set.weight} on:input={handleWeightChange} />
    </div>
    <div class="input-group" id="reps">
      <label for="reps-{setNumber}">Reps</label>
      <input id="reps-{setNumber}" type="number" bind:value={set.reps} on:input={handleRepsChange} />
    </div>
  </div>
</li>

<style>
  .set {
    display: flex;
    align-items: center;
    padding: 5px;
    background-color: #666;
    margin-bottom: 5px;
    border-radius: 4px;
  }
 
  .set-number-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: 2px solid #fff;
    background-color: #333;
    color: white;
    font-weight: bold;
    margin-right: 10px;
    border-radius: 4px;
  }
  .set-details {
    display: flex;
    margin-left: 20px;
    gap: 50px;
    color: white;
    width: 100%;
  }
  .input-group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    width: 80px;
    padding: 5px;
    text-align: center;
  }
</style>