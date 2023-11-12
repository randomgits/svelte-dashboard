import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";

const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),

    vite: {
      server: {
        proxy: {
          "/api": {
            target:
              "https://cloud-run-microservice-template-python-razcvdqurq-uc.a.run.app",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
    },
  },
};

export default config;
