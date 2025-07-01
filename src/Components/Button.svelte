<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  import "../css/button.css";
  const dispatch = createEventDispatcher();

  let showPokeball = false;
  let flash = false;
  let pokeballOpen = false;

  let sound = new Audio("../pokeball.mp3");
  let buttonSound = new Audio("../click.mp3");
  let pokedrop = new Audio("../pokedrop (2).mp3");

  function handleStartClick() {
    showPokeball = true;
    if (!pokedrop.paused) {
      pokedrop.pause();
      pokedrop.currentTime = 0;
    }

    pokedrop.currentTime = 1;
    pokedrop.play();

    const stopPokeDrop = () => {
      if (pokedrop.currentTime >= 2) {
        pokedrop.pause();
        pokedrop.removeEventListener("timeupdate", stopPokeDrop);
      }
    };

    pokedrop.addEventListener("timeupdate", stopPokeDrop);
  }

  function handlePokeballClick() {
    if (!sound.paused) {
      sound.pause();
      sound.currentTime = 0;
    }


    sound.currentTime = 1.3;
    sound.play();


    const stopAt = () => {
      if (sound.currentTime >= 4) {
        sound.pause();
        sound.removeEventListener("timeupdate", stopAt);
      }
    };

    sound.addEventListener("timeupdate", stopAt);


    flash = true;
    pokeballOpen = true;


    setTimeout(() => {
      flash = false;
      dispatch("caughtDad");
    }, 500);
  }
</script>


{#if flash}
  <div class="flash-overlay" transition:fade></div>
{/if}


{#if !showPokeball}
  <button class="shiny-button" on:click={handleStartClick}>
    Start Father's Day
  </button>
{:else}
  <div class="card fade-in">
    <img
      src={pokeballOpen ? "/images/open.png" : "/images/pokeball.png"}
      alt="Pokéball"
      class="pokeball-img bounce"
      on:click={handlePokeballClick}
      in:fly={{ y: -300, duration: 500 }}
    />
    <p>Click the Pokéball to start</p>
  </div>
{/if}

<style>
  @keyframes pokeball-bounce {
    0% {
      transform: translateY(0);
    }
    20% {
      transform: translateY(-25px);
    }
    40% {
      transform: translateY(0);
    }
    60% {
      transform: translateY(-15px);
    }
    80% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-5px);
    }
  }

  .bounce {
    animation: pokeball-bounce 0.6s ease-out;
  }
</style>
