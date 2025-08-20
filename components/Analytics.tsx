'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Google Analytics 配置
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function Analytics() {
  useEffect(() => {
    if (GA_MEASUREMENT_ID && typeof window !== 'undefined') {
      // 初始化 Google Analytics
      window.gtag = window.gtag || function(...args: any[]) {
        (window.dataLayer = window.dataLayer || []).push(args)
      }
      
      window.gtag('js', new Date())
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [])

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

// 用于跟踪自定义事件的工具函数
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// 用于跟踪页面浏览的工具函数
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
      page_title: title,
    })
  }
}

// TypeScript 声明
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
