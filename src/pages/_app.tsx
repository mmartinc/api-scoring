import { type AppType } from "next/dist/shared/lib/utils";
import { DM_Sans } from 'next/font/google'

import "~/styles/globals.css";

const dm = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={dm.className}>
      <Component {...pageProps} />
    </main>
  )
};

export default MyApp;
