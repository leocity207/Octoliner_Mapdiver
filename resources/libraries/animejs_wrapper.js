// fabricwrapper.js

// A promise that loads Fabric.js only once
let animejsPromise;

function loadAnimeJS() {
  if (!animejsPromise) {
    animejsPromise = new Promise((resolve, reject) => {
      // If `fabric` is already on `window`, we can resolve immediately
      if (window.fabric) {
        resolve(window.fabric);
        return;
      }

      const script = document.createElement('script');
      script.src = './libraries/animejs.js'; // Adjust the path as necessary
      script.async = false; // Ensure synchronous loading

      script.onload = () => {
        resolve();
      };

      script.onerror = () => reject(new Error('Failed to load Fabric.js'));

      document.head.appendChild(script);
    });
  }
  return animejsPromise;
}

await loadAnimeJS();

// Synchronously exported `anime` that will be assigned after loading
export let anime = window.anime;
