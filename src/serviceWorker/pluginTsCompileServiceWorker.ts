import { rollup, InputOptions, OutputOptions } from 'rollup'
import rollupPluginTypescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import pc from 'picocolors';
import fs from 'node:fs';

const formatConsole = (msg: string) => console.log(`${pc.cyan("[vite-plugin-ts-compile-sw]")} ${msg}`);

export default () => ({
  name: 'compile-typescript-service-worker',
  async writeBundle() {
    console.log();
    formatConsole("Plugin initialized");
    
    // Проверяем существование файла
    if (!fs.existsSync('src/serviceWorker/sw.ts')) {
      formatConsole(pc.yellow("⚠ sw.ts not found, skipping..."));
      return;
    }
    
    const inputOptions: InputOptions = {
      input: 'src/serviceWorker/sw.ts',
      plugins: [
        rollupPluginTypescript({
          // Явно указываем настройки для SW
          compilerOptions: {
            target: 'ES2020',
            module: 'ESNext',
            lib: ['ES2020', 'WebWorker'],
            strict: false,
            skipLibCheck: true,
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            // Убираем конфликтующие настройки
            outDir: undefined,
            rootDir: undefined,
            declaration: false,
            declarationMap: false,
            sourceMap: false,
            noEmit: false,
            noEmitOnError: false,
          },
          include: ['src/serviceWorker/**/*.ts'],
          exclude: ['node_modules', '**/*.test.ts'],
        }),
        nodeResolve({
          browser: true,
          extensions: ['.ts', '.js'],
        }),
      ],
    };
    
    const outputOptions: OutputOptions = {
      file: 'dist/sw.js',
      format: 'es',
      sourcemap: false,
      strict: false,
    };
    
    try {
      formatConsole("Building service worker...");
      const bundle = await rollup(inputOptions);
      formatConsole("Files transpiled, writing bundle...");
      await bundle.write(outputOptions);
      await bundle.close();
      formatConsole(pc.green("✓ Service worker built successfully"));
      
      // Проверяем размер
      if (fs.existsSync('dist/sw.js')) {
        const stats = fs.statSync('dist/sw.js');
        formatConsole(`Size: ${(stats.size / 1024).toFixed(2)} KB`);
      }
    } catch (error) {
      formatConsole(pc.red("✗ Failed to build service worker"));
      console.error(error);
      // Не прерываем сборку, только логируем ошибку
    }
  }
});