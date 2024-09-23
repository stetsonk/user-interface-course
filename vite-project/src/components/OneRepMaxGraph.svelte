<script>
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    Chart.register(...registerables);
   
    export let workoutEntries = [];
    let chart;
   
    function calculateOneRepMax(load, reps) {
        return Math.round((100 * load) / (101.3 - 2.67123 * reps));
    }
   
    onMount(() => {
        const canvas = document.getElementById('oneRepMaxChart');
        if (canvas instanceof HTMLCanvasElement) {
            const ctx = canvas.getContext('2d');
            const oneRepMaxData = workoutEntries.map(entry => {
                const squatExercise = entry.exercises.find(ex => ex.name === 'Squat');
                if (squatExercise && squatExercise.sets.length > 0) {
                    const heaviestSet = squatExercise.sets.reduce((max, set) =>
                        set.weight > max.weight ? set : max
                    );
                    return {
                        date: new Date(entry.date),
                        weight: calculateOneRepMax(heaviestSet.weight, heaviestSet.reps)
                    };
                }
                return null;
            }).filter(data => data !== null);
       
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: oneRepMaxData.map(data => data.date.toLocaleDateString()),
                    datasets: [{
                        label: 'Estimated One-Rep Max for Squat',
                        data: oneRepMaxData.map(data => data.weight),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white',
                                font: {
                                    size: 14
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            titleColor: 'white',
                            bodyColor: 'white',
                            titleFont: {
                                size: 16
                            },
                            bodyFont: {
                                size: 14
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Estimated 1RM (lbs)',
                                color: 'white',
                                font: {
                                    size: 14
                                }
                            },
                            ticks: {
                                color: 'white',
                                font: {
                                    size: 12
                                },
                                callback: function(value) {
                                    return value + ' lbs';
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Workout Date',
                                color: 'white',
                                font: {
                                    size: 14
                                }
                            },
                            ticks: {
                                color: 'white',
                                font: {
                                    size: 12
                                },
                                maxRotation: 45,
                                minRotation: 45
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        }
                    }
                }
            });
        }
       
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    });
</script>

<div class="chart-container">
    <canvas id="oneRepMaxChart"></canvas>
</div>

<style>
    .chart-container {
        border: 2px solid #555;
        border-radius: 8px;
        padding: 10px;
        background-color: #444;
        margin: 20px 0;
        height: 300px;
        width: 100%;
    }
</style>