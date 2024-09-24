<script>
    export let message = '';
    export let type = 'success'; // 'success', 'error', 'info'
    export let duration = 3000; // Duration in milliseconds

    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    let visible = true;

    onMount(() => {
        const timer = setTimeout(() => {
            visible = false;
        }, duration);

        return () => clearTimeout(timer);
    });
</script>

{#if visible}
    <div class="toast {type}" transition:fade={{ duration: 300 }}>
        {message}
    </div>
{/if}

<style>
    .toast {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        z-index: 1000;
    }

    .success {
        background-color: #4CAF50;
    }

    .error {
        background-color: #F44336;
    }

    .info {
        background-color: #2196F3;
    }
</style>