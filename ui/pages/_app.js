// This is where we can override settings for each page

// We can include Bootstrap on each page
import 'bootstrap/dist/css/bootstrap.min.css';

// Override each page
const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

// Export settings
export default MyApp;