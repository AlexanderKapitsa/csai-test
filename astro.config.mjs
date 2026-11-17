import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import AutoImport from 'astro-auto-import';
import swup from '@swup/astro';
import { i18n } from 'astro-i18n-aut/integration';
import icon from 'astro-icon';
import preact from '@astrojs/preact';
import { getNewsCategories } from './src/data/news-categories';
import RedirectConfigurator from './src/utils/redirect-configurator.js';
import { appSettings } from './app.config.ts'

function fakeT(key) {
  return key;
}

function fakeL(key) {
  return key;
}

const PATH_TO_APPEND_TO_NEWS = '/1';

const defaultLocale = 'uk';
const locales = {
  en: 'en-US',
  uk: 'uk-UA',
};

console.log(JSON.stringify(appSettings, null, '\t'));

// https://astro.build/config
export default defineConfig({
  site: appSettings.siteUrl,
  trailingSlash: appSettings.isProductionBuild ? 'always' : 'never',
  build: {
    format: 'directory',
  },
  redirects: configureRedirects(),
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    tailwind(), // Styling
    AutoImport({
      imports: [
        // Import a component’s default export
        // generates:
        // import A from './src/components/A.astro';
        './src/components/TeacherCard.astro',
        './src/components/NewsCustomComponents/NewsPicture.astro',
        './src/components/NewsCustomComponents/NewsYouTube.astro',
        './src/components/NewsCustomComponents/NewsTweet.astro',
        './src/components/NewsCustomComponents/NewsInstagram/NewsInstagram.astro',
        './src/components/NewsCustomComponents/NewsTelegram/NewsTelegram.astro',
        './src/components/NewsCustomComponents/Table.astro',
      ],
    }),
    mdx(),
    preact({ compat: true }),
    icon(), // Icon library
    // by biggujo: swup makes application behave like an SPA one. But it has a bug:
    // on page change, all but one item in collection disappear until full reload
    // So I disabled it
    // swup({
    //   // Prefetch library
    //   theme: false,
    //   progress: true,
    //   cache: true,
    //   globalInstance: true,
    // }),
    // playformCompress({
    // Asset compressor
    // Path: ['./dist'],
    // Logger: 1,
    // }),
    i18n({
      locales,
      defaultLocale,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@utils': '/src/utils', // Alias for utils
        '@comp': '/src/components', // Alias for components
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
});

function configureRedirects() {
  const redirectConfigurator = RedirectConfigurator.withPathToAppend(
    PATH_TO_APPEND_TO_NEWS
  );

  const fieldAccessFn = (c) => c.baseUrl;

  const redirects = redirectConfigurator.getConfiguredMapFrom(
    getNewsCategories(fakeL, fakeT),
    fieldAccessFn
  );

  return redirects;
}
