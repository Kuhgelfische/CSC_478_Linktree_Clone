// This is where we can override settings for each page

// We can include Bootstrap on each page
import 'bootstrap/dist/css/bootstrap.min.css';
import LTC_Layout from '../components/layout'
import { useSession } from '../hooks/session'
import '../css/styles.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <LTC_Layout>
      <Component {...pageProps} />
    </LTC_Layout>
  )
}