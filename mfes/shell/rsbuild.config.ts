import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3000,
  },
  dev: {
    assetPrefix: true,
  },
  output: {
    assetPrefix: '',
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'shell',
          remotes: {
            product: 'product@http://localhost:3001/mf-manifest.json',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: '^18.3.1',
            },
            'react-dom': {
              singleton: true,
            },
            '@tanstack/react-router': {
              singleton: true,
              requiredVersion: '^1.62.1',
            },
          },
        }),
      ]);
    },
  },
});
