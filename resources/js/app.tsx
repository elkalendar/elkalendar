import '../css/app.css';
import '@mantine/core/styles.css';
import {createInertiaApp} from '@inertiajs/inertia-react';
import {InertiaProgress} from '@inertiajs/progress';
import {createRoot} from 'react-dom/client';
import {DirectionProvider, MantineProvider} from '@mantine/core';
import {ModalsProvider} from '@mantine/modals';
import {RouteContext} from '@/hooks/useRoute';
import React from 'react';
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'elKalendar';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
  setup({el, App, props}) {
    const root = createRoot(el!);

    return root.render(
      <RouteContext.Provider value={(window as any).route}>
        <DirectionProvider>
          <MantineProvider
            theme={{
              fontFamily: '"Baloo Bhaijaan 2", sans-serif',
            }}
          >
            <ModalsProvider labels={{
              cancel: 'الغاء',
              confirm: 'تأكيد',
            }}
            >
              <App {...props} />
            </ModalsProvider>
          </MantineProvider>
        </DirectionProvider>
      </RouteContext.Provider>,
    );
  },
});

InertiaProgress.init({
  color: '#6366F1',
  showSpinner: true,
  includeCSS: true,
});
