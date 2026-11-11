import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { NotFoundPage } from '@/components/error-pages'
import { siteUrl } from '@/lib/site'

import '../styles.css'

const siteName = 'Safa & Minhaj | Wedding Invitation · 29 November 2026'
// A versioned static JPEG lets link crawlers fetch the preview without running JavaScript.
const shareImage = `${siteUrl}img/wedding-whatsapp-invitation-v2.jpg`
const shareImageAlt = 'Ivory floral invitation with gold calligraphy for Adv. Safa Janna TK and Muhammed Minhaj NC, 29 November 2026 at NC Convention Centre, Kozhikode.'
const siteDescription = 'With our families, we invite you to celebrate the wedding of Adv. Safa Janna TK and Muhammed Minhaj NC on 29 November 2026 at NC Convention Centre, Pulparamba, Mukkam, Kozhikode.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      { property: 'og:url', content: siteUrl },
      { property: 'og:site_name', content: 'Safa & Minhaj Wedding' },
      { property: 'og:locale', content: 'en_IN' },
      { property: 'og:image', content: shareImage },
      { property: 'og:image:secure_url', content: shareImage },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: shareImageAlt },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { name: 'twitter:title', content: siteName },
      { name: 'twitter:description', content: siteDescription },
      { name: 'twitter:image', content: shareImage },
      { name: 'twitter:image:alt', content: shareImageAlt },
    ],
    links: [{ rel: 'canonical', href: siteUrl }],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
        <Scripts />
      </body>
    </html>
  )
}
