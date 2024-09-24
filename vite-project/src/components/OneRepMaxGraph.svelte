<script>
    import { onMount, afterUpdate } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    Chart.register(...registerables);
   
    export let previousEntries = [];
    let chart;
    let canvas;
    let selectedExercise = '';
    let exercises = [];
   
    $: {
        console.log('Previous Entries:', previousEntries);
        updateExercisesList();
        if (chart) {
            updateChartData();
        }
    }

    $: oneRepMaxData = processData(previousEntries, selectedExercise);

    onMount(() => {
        console.log('Component mounted. Previous Entries:', previousEntries);
        updateExercisesList();
        createChart();
    });

    afterUpdate(() => {
        if (chart) {
            updateChartData();
        }
    });

    function updateExercisesList() {
        exercises = [...new Set(previousEntries.flatMap(entry => 
            entry.exercises.map(ex => ex.name)
        ))];
        if (exercises.length > 0 && !selectedExercise) {
            selectedExercise = exercises[0];
        }
    }

    function calculateOneRepMax(weight, reps) {
        // Brzycki Formula with additional checks
        if (weight <= 0 || reps <= 0 || reps >= 37) {
            console.warn(`Invalid input for 1RM calculation: weight=${weight}, reps=${reps}`);
            return 0;
        }
        return Math.max(0, Math.round(weight * (36 / (37 - reps))));
    }

    function processData(entries, exercise) {
        console.log('Processing data for exercise:', exercise);
        if (!exercise) return [];
        const processedData = entries
            .filter(entry => entry.exercises && entry.exercises.some(ex => ex.name === exercise))
            .map(entry => {
                const exerciseData = entry.exercises.find(ex => ex.name === exercise);
                if (!exerciseData || !exerciseData.sets || exerciseData.sets.length === 0) {
                    console.log('No valid exercise data found for entry:', entry);
                    return null;
                }
                const bestSet = exerciseData.sets.reduce((best, set) => {
                    const currentOneRM = calculateOneRepMax(set.weight, set.reps);
                    const bestOneRM = calculateOneRepMax(best.weight, best.reps);
                    return currentOneRM > bestOneRM ? set : best;
                });
                const oneRepMax = calculateOneRepMax(bestSet.weight, bestSet.reps);
                console.log(`Calculated 1RM for ${entry.date}: ${oneRepMax} (weight: ${bestSet.weight}, reps: ${bestSet.reps})`);
                return {
                    date: entry.date,
                    oneRepMax: oneRepMax
                };
            })
            .filter(data => data !== null && data.oneRepMax > 0)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        console.log('Processed data:', processedData);
        return processedData;
    }

    function createChart() {
        if (canvas) {
            const ctx = canvas.getContext('2d');
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: `Estimated One-Rep Max`,
                        data: [],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Estimated 1RM (lbs)',
                                color: 'white'
                            },
                            ticks: { 
                                color: 'white',
                                callback: function(value) {
                                    return value + ' lbs';
                                }
                            },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Workout Date',
                                color: 'white'
                            },
                            ticks: { color: 'white' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: { color: 'white' }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `1RM: ${context.parsed.y} lbs`;
                                }
                            }
                        }
                    }
                }
            });
            updateChartData();
        }
    }

    function updateChartData() {
        if (chart && oneRepMaxData.length > 0) {
            console.log('Updating chart with data:', oneRepMaxData);
            const labels = oneRepMaxData.map(data => data.date);
            const data = oneRepMaxData.map(data => data.oneRepMax);
            
            // Check for any zero or negative values
            const invalidDataPoints = data.filter(value => value <= 0);
            if (invalidDataPoints.length > 0) {
                console.warn('Found invalid data points:', invalidDataPoints);
            }

            chart.data.labels = labels;
            chart.data.datasets[0].data = data;
            chart.data.datasets[0].label = `Estimated One-Rep Max for ${selectedExercise}`;
            chart.options.scales.y.min = Math.max(0, Math.min(...data) - 10); // Set minimum y-axis value
            chart.update();
        } else {
            console.log('No data to update chart');
        }
    }
</script>

<div class="graph-container">
    {#if previousEntries}
        <select bind:value={selectedExercise}>
            {#each exercises as exercise}
                <option value={exercise}>{exercise}</option>
            {/each}
        </select>
        <div class="chart-container">
            <canvas bind:this={canvas}></canvas>
        </div>
    {:else}
        <p>No exercises found in workout data.</p>
    {/if}
</div>

<style>
    .graph-container {
        background-color: #444;
        padding: 15px;
        border-radius: 8px;
        color: white;
        margin-bottom: 20px;
    }
    .chart-container {
        height: 300px;
        width: 100%;
    }
    select {
        width: 100%;
        padding: 5px;
        margin-bottom: 10px;
        background-color: #555;
        color: white;
        border: 1px solid #666;
        border-radius: 4px;
    }
    p {
        text-align: center;
        color: #aaa;
    }
</style>