<script>
    export let label = "Button";
    export let onClick;
    export let type = "button";
    export let styleClass = "";
  </script>
  
  <button type={type} class={styleClass} on:click={onClick}>
    {label}
  </button>
  
  <style>
    button {
      padding: 8px 16px;
      border: none;
      color: white;
      cursor: pointer;
      border-radius: 4px;
    }
  
    .default {
      background-color: #666;
    }
  
    .default:hover {
      background-color: #888;
    }
  
    .delete {
      background-color: #d9534f;
    }
  
    .delete:hover {
      background-color: #c9302c;
    }
    
    /* Add more styles as needed */
  </style>
  