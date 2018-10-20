import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import { FaBook } from 'react-icons/fa'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default function Header() {
  return (
    <div className="header">
      <h1><Link href="/?page=1"><a><FaBook/>Padgey Nation</a></Link></h1>
      <nav>
        <Link href="/?page=1"><a>Home</a></Link>
        <Link href="/create"><a>New List Item</a></Link>
      </nav>
    </div>
  )
}
