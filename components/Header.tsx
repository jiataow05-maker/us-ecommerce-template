'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { BackToHallButton } from './admin/BackToHallButton'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

interface HeaderProps {
  variant?: 'default' | 'industrial'
}

export function Header({ variant = 'default' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // 如果是工业风格，返回工业风格的顶部导航
  if (variant === 'industrial') {
    return (
      <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* 左侧：返回主站按钮 */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="group flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-amber-400 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <ArrowLeftIcon className="w-4 h-4 group-hover:text-amber-400 transition-colors duration-200" />
                <span>Back to Store</span>
              </Link>

              <div className="hidden md:block w-px h-6 bg-slate-700"></div>

              <div className="hidden md:flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span className="text-slate-300 text-sm font-medium">Manufacturing Command Center</span>
              </div>
            </div>

            {/* 中间：品牌标识 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">US</span>
              </div>
              <span className="text-white font-bold text-lg hidden sm:block">Industrial Hub</span>
            </div>

            {/* 右侧：快速导航 */}
            <div className="flex items-center gap-3">
              <Link
                href="/account"
                className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors duration-200 text-sm font-medium"
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden sm:block">Account</span>
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors duration-200 text-sm font-medium relative"
              >
                <ShoppingCartIcon className="w-4 h-4" />
                <span className="hidden sm:block">Cart</span>
                <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  0
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    )
  }

  // 普通页面的白色导航栏
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* 返回大厅按钮 - 固定在左上角 */}
      <div className="absolute top-4 left-4 z-60">
        <BackToHallButton />
      </div>

      <nav className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex lg:flex-1 ml-32">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-gradient">
              US Store
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link
            href="/account"
            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors duration-200"
          >
            <UserIcon className="h-5 w-5" />
            Account
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors duration-200 relative"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Cart
            <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-2xl font-bold text-gradient">
                  US Store
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-2">
                  <Link
                    href="/account"
                    className="-mx-3 flex items-center gap-x-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserIcon className="h-5 w-5" />
                    Account
                  </Link>
                  <Link
                    href="/cart"
                    className="-mx-3 flex items-center gap-x-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    Cart (0)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
