<script>
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import Header from './components/Header.svelte';
    import LeftColumn from './components/LeftColumn.svelte';
    import MiddleColumn from './components/MiddleColumn.svelte';
    import RightColumn from './components/RightColumn.svelte';
    import Toast from './components/Toast.svelte';

    let currentWorkoutStore = writable(null);
    let previousEntries = [];
    let toastMessage = '';
    let showToast = false;

    onMount(async () => {
        try {
            const response = await fetch('dummyData.json');
            const data = await response.json();
            previousEntries = data.previousEntries;
        } catch (error) {
            console.error('Error loading dummy data:', error);
        }
    });

    function handleWorkoutUpdated(event) {
        $currentWorkoutStore = event.detail;
    }

    function handleWorkoutSaved(event) {
        const savedWorkout = event.detail;
        const index = previousEntries.findIndex(w => w.date === savedWorkout.date);
        if (index !== -1) {
            previousEntries[index] = savedWorkout;
        } else {
            previousEntries = [...previousEntries, savedWorkout];
        }
        $currentWorkoutStore = null; // Reset to show new workout menu

        // Show toast notification
        toastMessage = 'Workout saved successfully!';
        showToast = true;
        setTimeout(() => { showToast = false; }, 3000); // Hide toast after 3 seconds
    }

    function handleWorkoutDeleted(event) {
        const deletedWorkout = event.detail;
        previousEntries = previousEntries.filter(w => w.date !== deletedWorkout.date);
        $currentWorkoutStore = null; // Reset to show new workout menu
    }

    function handleWorkoutSelected(event) {
        $currentWorkoutStore = event.detail;
    }

    function handleNewWorkout() {
        $currentWorkoutStore = {
            name: '',
            exercises: [],
            date: new Date().toISOString().split('T')[0] // Today's date
        };
    }
</script>

<div class="page-container">
    <Header title="My Workout Tracker" />
 
    <div class="container">
        <LeftColumn {previousEntries} />
        <MiddleColumn 
            workout={$currentWorkoutStore}
            on:workoutUpdated={handleWorkoutUpdated}
            on:workoutSaved={handleWorkoutSaved}
            on:workoutDeleted={handleWorkoutDeleted}
            on:newWorkout={handleNewWorkout}
        />
        <RightColumn 
            {previousEntries}
            currentWorkoutStore={currentWorkoutStore}
            on:workoutSelected={handleWorkoutSelected}
        />
    </div>

    {#if showToast}
        <Toast message={toastMessage} />
    {/if}
</div>

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
    }
    .container {
        display: flex;
        flex: 1;
        width: 100%;
    }
</style>