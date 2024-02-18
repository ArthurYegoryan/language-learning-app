import { ReduxProvider } from "@/redux/provider";

export const metadata = {
  title: 'Language Learning App',
  description: 'Leader platform for learning programming',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
