import { ErrorProvider } from 'contexts/ErrorContext'
import { KeyProvider } from 'contexts/KeyContext'
import { ModalProvider } from 'contexts/ModalOpen'
import type { AppProps } from 'next/app'

import '../../public/styles/main.css'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <KeyProvider>
          <ErrorProvider>
            <Component {...pageProps} />
          </ErrorProvider>
        </KeyProvider>
      </ModalProvider>
    </AuthProvider>
  )
}

export default MyApp
