import { volkhov } from '@/styles/fonts'
import Link from 'next/link'

const footerLinks = [
  { text: 'Support Center', url: '/support' },
  { text: 'Invoicing', url: '/invoicing' },
  { text: 'Contract', url: '/contract' },
  { text: 'Careers', url: '/careers' },
  { text: 'Blog', url: '/blog' },
  { text: 'FAQs', url: '/faq' },
]

export default function SiteFooter() {
  return <footer className="mt-10 min-h-36 w-full border-t border-[#dedfe1] px-5 py-6 md:px-7">
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
      <Link href="/" className={`${volkhov.className} text-2xl text-[#484848]`}>FASCO</Link>
      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:gap-x-9">
        {footerLinks.map((link) => <li key={link.url} className="text-xs text-[#555]"><a href={link.url} className="hover:text-black">{link.text}</a></li>)}
      </ul>
    </div>
    <p className="mt-8 text-center text-[10px] text-[#484848]">Copyright © 2022 Xpro. All Rights Reserved.</p>
  </footer>
}
