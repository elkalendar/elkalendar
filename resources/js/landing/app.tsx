import './bootstrap';
import '../../css/landing.css';
import '@mantine/core/styles.css';
import {createInertiaApp} from '@inertiajs/inertia-react';
import {InertiaProgress} from '@inertiajs/progress';
import {createRoot} from 'react-dom/client';
import {DirectionProvider, MantineProvider} from '@mantine/core';
import {RouteContext} from '@/hooks/useRoute';
import React from 'react';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'elKalendar';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: name => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
    return pages[`./pages/${name}.tsx`]
  },
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
            <App {...props} />
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
