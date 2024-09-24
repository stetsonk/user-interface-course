<script>
    import { onMount } from 'svelte';

    export let workouts = [];

    let goals = [];
    let newGoal = { description: '', target: '', currentValue: '', unit: '' };

    onMount(() => {
        const savedGoals = localStorage.getItem('workoutGoals');
        if (savedGoals) {
            goals = JSON.parse(savedGoals);
        }
    });

    function saveGoals() {
        localStorage.setItem('workoutGoals', JSON.stringify(goals));
    }

    function addGoal() {
        if (newGoal.description && newGoal.target) {
            goals = [...goals, { ...newGoal, id: Date.now() }];
            newGoal = { description: '', target: '', currentValue: '', unit: '' };
            saveGoals();
        }
    }

    function deleteGoal(id) {
        goals = goals.filter(goal => goal.id !== id);
        saveGoals();
    }

    function updateGoal(id, field, value) {
        goals = goals.map(goal => 
            goal.id === id ? { ...goal, [field]: value } : goal
        );
        saveGoals();
    }

    $: {
        // Update current values based on workouts
        console.log('Workouts changed, update goal progress here');
    }
</script>

<div class="goal-tracker">
    <h3>Fitness Goals</h3>
    
    <div class="add-goal">
        <input 
            type="text" 
            bind:value={newGoal.description} 
            placeholder="Goal description"
        />
        <div class="goal-inputs">
            <input 
                type="number" 
                bind:value={newGoal.target} 
                placeholder="Target"
            />
            <input 
                type="text" 
                bind:value={newGoal.unit} 
                placeholder="Unit"
            />
        </div>
        <button on:click={addGoal}>Add Goal</button>
    </div>

    {#each goals as goal (goal.id)}
        <div class="goal-item">
            <span class="goal-description">{goal.description}</span>
            <div class="goal-progress">
                <input 
                    type="number" 
                    value={goal.currentValue} 
                    on:input={(e) => updateGoal(goal.id, 'currentValue', e.target.value)}
                />
                <span>/ {goal.target} {goal.unit}</span>
                <button class="delete-btn" on:click={() => deleteGoal(goal.id)}>×</button>
            </div>
        </div>
    {/each}
</div>

<style>
    .goal-tracker {
        background-color: #444;
        padding: 15px;
        border-radius: 8px;
        color: white;
        margin-bottom: 20px;
    }

    h3 {
        margin-top: 0;
        color: #00d7fd;
        border-bottom: 2px solid #00d7fd;
        padding-bottom: 10px;
        margin-bottom: 15px;
    }

    .add-goal {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 15px;
    }

    .goal-inputs {
        display: flex;
        gap: 10px;
    }

    input {
        padding: 8px;
        border-radius: 4px;
        border: none;
        background-color: #555;
        color: white;
        width: 100%;
    }

    input::placeholder {
        color: #aaa;
    }

    button {
        background-color: #00d7fd;
        color: black;
        border: none;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    }

    .goal-item {
        background-color: #555;
        padding: 10px;
        border-radius: 6px;
        margin-bottom: 10px;
    }

    .goal-description {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .goal-progress {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .goal-progress input {
        width: 60px;
        text-align: center;
    }

    .delete-btn {
        background-color: #ff4136;
        color: white;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        padding: 0;
    }
</style>