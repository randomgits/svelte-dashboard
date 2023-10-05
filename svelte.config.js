import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter(),
    // Uncomment this line to make your app SSR (Server-Side Rendered)
    // ssr: false,
    target: '#svelte'
  }
};
