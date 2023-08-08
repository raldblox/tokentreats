import './globals.css'
import '@fontsource/poppins';

export const metadata = {
  title: 'TokenTreats',
  description: 'Elevating Rewards, Every Time',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
