import '@styles/global.css';
import Nav from '@components/Nav';
import type { ReactNode } from 'react';
import Provider from '../components/Provider';

export const metadata = {
  title: "Promptopia",
  description: 'Discover & Share AI Prompts'
}

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient'></div>
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;