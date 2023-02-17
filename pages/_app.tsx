import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import SwiperCore, {
  Autoplay,
  FreeMode,
  Grid,
  Navigation as SwiperNavigation,
  Pagination,
  Scrollbar,
} from 'swiper';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Navigation from '../components/Navigation/Navigation';
import { client } from '../utils/gql';

SwiperCore.use([
  Autoplay,
  FreeMode,
  Pagination,
  Grid,
  SwiperNavigation,
  Scrollbar,
]);

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const [facebookLink, setFacebookLink] = useState<string>(null);
  const [instagramLink, setInstagramLink] = useState<string>(null);
  const [copyrightText, setCopyrightText] = useState<string>(null);
  const [phone, setPhone] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);

  useEffect(() => {
    client
      .HeaderAndFooter()
      .then(
        ({
          general: {
            facebook_link,
            instagram_link,
            copyright_text,
            phone,
            email,
          },
        }) => {
          setFacebookLink(facebook_link);
          setInstagramLink(instagram_link);
          setCopyrightText(copyright_text);
          setPhone(phone);
          setEmail(email);
        }
      );
  }, []);

  return (
    <div className="font-sans text-default">
      <Head>
        <title>Nadácia mesta Bratislava</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.sk" />
      <Script
        strategy="afterInteractive"
        data-domain="nadaciamesta.bratislava.sk"
        src="https://plausible.io/js/plausible.js"
      />
      <div className="flex min-h-screen flex-1 flex-col justify-self-stretch">
        <header>
          <Header facebookLink={facebookLink} instagramLink={instagramLink} />
          <Navigation />
        </header>
        <main className="flex flex-1 flex-col justify-self-stretch">
          <Component {...pageProps} />
        </main>
        <footer>
          <Footer copyrightText={copyrightText} phone={phone} email={email} />
        </footer>
      </div>
    </div>
  )
}

export default CustomApp;
