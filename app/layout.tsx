import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import "./styles/fonts/font.css";
import Provider from "./authProvider";
import Theme from "./styles/Theme";
import { authOptions } from "@/config/auth";
import AppProvider from "./storage/Provider";
export const metadata: Metadata = {
  title: "Log Guard",
  description: "secure and transparent asset auction marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log({providerAuth:session})
  if(session){
    const email=session.user?.email
    if(email){
      
    }

  }
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Provider session={session}>
            <Theme>{children}</Theme>
          </Provider>
        </AppProvider>
      </body>
    </html>
  );
}
