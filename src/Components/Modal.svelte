<script>
  import { fade, scale } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import "../css/modal.css";
  let pageflip = new Audio("../../click.mp3");
  let current = 0;

  const slides = [
    {
      image: "/images/balloons.jpg",
      text: "Hello, dad. Happy fathers day! Lets take a look at the stuff we have done together since 2025!",
    },
    {
      image: "/images/piccolo.jpg",
      text: "A picture of piccolo at the BBQ, this had original context in the initial codebase but for the sake of the privacy, this is the only two pictures that will be shown .",
    },

  ];

  function playPageFlipSlice() {
    if (!pageflip.paused) {
      pageflip.pause();
      pageflip.currentTime = 0;
    }

    pageflip.currentTime = 1.8; 
    pageflip.play();

    const stopAt = () => {
      if (
        pageflip.currentTime >= pageflip.duration ||
        pageflip.currentTime >= 4
      ) {
        pageflip.pause();
        pageflip.removeEventListener("timeupdate", stopAt);
      }
    };

    pageflip.addEventListener("timeupdate", stopAt);
  }

  function next() {
    current = (current + 1) % slides.length;
    playPageFlipSlice();
  }

  function prev() {
    current = (current - 1 + slides.length) % slides.length;
    playPageFlipSlice();
  }

  function closeModal() {
    dispatch("close");
  }
</script>

<div class="modal" transition:fade>
  <div class="modal-content" transition:scale>
    <button on:click={closeModal} class="close-button">✖</button>

    <img src={slides[current].image} alt="Memory" class="modal-img" />
    <p class="modal-text">{slides[current].text}</p>

    <div class="controls">
      <button on:click={prev} class="nav-button">⬅️</button>
      <button on:click={next} class="nav-button">➡️</button>
    </div>
  </div>
</div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    max-width: 90%;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #333;
  }

  .close-button:hover {
    color: red;
  }

  .modal-img {
    width: 200px;
    height: auto;
    margin-bottom: 1rem;
  }

  .modal-text {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #444;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .nav-button {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .nav-button:hover {
    transform: scale(1.2);
  }
</style>
