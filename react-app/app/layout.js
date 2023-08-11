import './globals.css'
import '@fontsource/poppins';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata = {
  title: 'TokenTreats',
  description: 'Elevating Rewards, Every Time',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
