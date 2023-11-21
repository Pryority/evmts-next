import "@/styles/globals.css"

import { Metadata } from "next"
import { chains, config } from "@/wagmiConfig"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { WagmiConfig } from "wagmi"

import { siteConfig } from "@/config/site"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${GeistSans.variable} ${GeistMono.variable}`}
      >
        <head />
        <body className={"min-h-screen bg-background font-sans antialiased"}>
          <WagmiConfig config={config}>
            <RainbowKitProvider chains={chains}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                </div>
                <TailwindIndicator />
              </ThemeProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </body>
      </html>
    </>
  )
}
