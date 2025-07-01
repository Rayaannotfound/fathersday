<script>
  import "./css/mainpage.css";
  import Title from "./Components/Title.svelte";
  import Button from "./Components/Button.svelte";
  import Modal from "./Components/Modal.svelte";

  let showModal = false;
</script>

<body>
  <div class="Mainbody">
    <main>
      <Title name="Dad" />
      <p class="maintext">Click here ⬇⬇⬇</p>

      <Button on:caughtDad={() => (showModal = true)} />

      {#if showModal}
        <Modal on:close={() => (showModal = false)} />
      {/if}

      <p>Welcome to your fathers day card. Click the button to get started!</p>
    </main>
  </div>
</body>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    background-color: wheat;
  }

  body,
  html {
    margin: 0;
    padding: 0;
    height: 100%;
    background: linear-gradient(to bottom, rgb(219, 6, 6) 150px, #037de9 150px);
  }

  .Mainbody {
    min-height: 100vh;
    background: linear-gradient(to bottom, pink 150px, #f0f8ff 150px);
  }

  @keyframes hue-shift {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
