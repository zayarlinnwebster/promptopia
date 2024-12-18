import '@styles/global.css';
import Nav from '@components/Nav';
import { ReactNode, Suspense } from 'react';
import Provider from '../components/Provider';
import Loading from '@components/Loading';

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

            {/* Suspense for async data fetching */}
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;
