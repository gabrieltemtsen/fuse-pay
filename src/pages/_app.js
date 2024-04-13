import { App } from 'konsta/react';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    // Wrap our app with App component
    <App dark={true} safeAreas={true} theme={"parent" ?  "material" : "ios"}>
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;