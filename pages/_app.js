import { DataProvider } from '../components/DataProvider'
import '../styles/global.css'
// import { Plist } from './plist'

export default function App({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps}>
      </Component>
    </DataProvider>
  )
}
