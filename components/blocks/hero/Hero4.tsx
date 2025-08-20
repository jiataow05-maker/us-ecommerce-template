'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    ChevronRightIcon,
    PlayIcon,
    PauseIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon
} from '@heroicons/react/24/outline'

export interface Hero4Props {
    // 视频配置
    video: {
        src: string // 视频文件路径
        poster: string // 视频封面图
        autoplay?: boolean
        loop?: boolean
        muted?: boolean
    }

    // 内容配置
    content: {
        // 预标题
        pretitle?: string

        // 主标题
        title: {
            main: string
            highlight?: string
            animated?: boolean // 是否启用打字机效果
        }

        // 副标题
        subtitle: string

        // 按钮配置
        buttons: {
            primary: {
                text: string
                href: string
                size?: 'normal' | 'large'
            }
            secondary?: {
                text: string
                href: string
                variant?: 'outline' | 'text'
                icon?: 'play' | 'arrow'
            }
        }

        // 滚动提示
        scrollHint?: {
            text: string
            show: boolean
        }
    }

    // 覆盖层配置
    overlay?: {
        type: 'gradient' | 'solid' | 'none'
        opacity?: number // 0-100
        color?: string // Tailwind 背景色类
    }

    // 动画配置
    animation?: {
        parallax?: boolean // 视差滚动
        fadeIn?: boolean // 淡入动画
        stagger?: boolean // 错开动画
    }

    // 视频控制
    controls?: {
        showPlayButton?: boolean
        showMuteButton?: boolean
        position?: 'bottom-left' | 'bottom-right' | 'top-right'
    }
}

/**
 * Hero4 - 视频背景高级英雄区
 * 
 * 特点：
 * - 沉浸式视频背景
 * - 丰富的动画效果
 * - 视频播放控制
 * - 视差滚动支持
 * - 响应式适配
 */
export function Hero4({
    video,
    content,
    overlay = { type: 'gradient', opacity: 40 },
    animation = { parallax: true, fadeIn: true, stagger: true },
    controls = { showPlayButton: true, showMuteButton: true, position: 'bottom-right' }
}: Hero4Props) {
    const [isPlaying, setIsPlaying] = useState(video.autoplay !== false)
    const [isMuted, setIsMuted] = useState(video.muted !== false)
    const [showControls, setShowControls] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    // 视差滚动
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])

    // 打字机效果
    const [displayedTitle, setDisplayedTitle] = useState('')
    const [titleIndex, setTitleIndex] = useState(0)

    useEffect(() => {
        if (content.title.animated && titleIndex < content.title.main.length) {
            const timeout = setTimeout(() => {
                setDisplayedTitle(content.title.main.slice(0, titleIndex + 1))
                setTitleIndex(titleIndex + 1)
            }, 100)
            return () => clearTimeout(timeout)
        }
    }, [titleIndex, content.title.main, content.title.animated])

    // 视频控制函数
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    // 获取控制按钮位置类
    const getControlsPosition = () => {
        const positions = {
            'bottom-left': 'bottom-6 left-6',
            'bottom-right': 'bottom-6 right-6',
            'top-right': 'top-6 right-6'
        }
        return positions[controls.position || 'bottom-right']
    }

    // 动画变体
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: animation.stagger ? 0.2 : 0,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* 视频背景 */}
            <div className="absolute inset-0 -z-20">
                <motion.div
                    style={animation.parallax ? { y } : {}}
                    className="w-full h-[120%] -mt-[10%]"
                >
                    {/* 如果视频不可用，显示封面图片 */}
                    <div className="absolute inset-0">
                        <Image
                            src={video.poster}
                            alt="视频封面"
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                    </div>

                    {/* 视频层 */}
                    <video
                        ref={videoRef}
                        className="relative w-full h-full object-cover z-10"
                        autoPlay={video.autoplay !== false}
                        loop={video.loop !== false}
                        muted={video.muted !== false}
                        playsInline
                        poster={video.poster}
                        onMouseEnter={() => setShowControls(true)}
                        onMouseLeave={() => setShowControls(false)}
                        onLoadedData={() => {
                            // 视频加载完成后自动播放
                            if (videoRef.current && video.autoplay !== false) {
                                videoRef.current.play().catch(() => {
                                    // 如果自动播放失败，保持静音状态
                                    console.log('Auto-play was prevented')
                                })
                            }
                        }}
                    >
                        <source src={video.src} type="video/mp4" />
                        您的浏览器不支持视频播放。
                    </video>
                </motion.div>
            </div>

            {/* 覆盖层 */}
            {overlay.type !== 'none' && (
                <div
                    className={`absolute inset-0 -z-10 ${overlay.type === 'gradient'
                        ? 'bg-gradient-to-b from-black/20 via-black/40 to-black/60'
                        : overlay.type === 'solid'
                            ? overlay.color || 'bg-black'
                            : ''
                        }`}
                    style={{
                        opacity: overlay.opacity ? overlay.opacity / 100 : 0.4
                    }}
                />
            )}

            {/* 视频控制按钮 */}
            {(controls.showPlayButton || controls.showMuteButton) && (
                <div className={`absolute ${getControlsPosition()} z-30 flex space-x-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-50'
                    }`}>
                    {controls.showPlayButton && (
                        <button
                            onClick={togglePlay}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
                            aria-label={isPlaying ? '暂停视频' : '播放视频'}
                        >
                            {isPlaying ? (
                                <PauseIcon className="w-5 h-5" />
                            ) : (
                                <PlayIcon className="w-5 h-5 ml-0.5" />
                            )}
                        </button>
                    )}

                    {controls.showMuteButton && (
                        <button
                            onClick={toggleMute}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
                            aria-label={isMuted ? '取消静音' : '静音'}
                        >
                            {isMuted ? (
                                <SpeakerXMarkIcon className="w-5 h-5" />
                            ) : (
                                <SpeakerWaveIcon className="w-5 h-5" />
                            )}
                        </button>
                    )}
                </div>
            )}

            {/* 主要内容 */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto"
                    variants={animation.fadeIn ? containerVariants : {}}
                    initial={animation.fadeIn ? "hidden" : "visible"}
                    animate="visible"
                >

                    {/* 预标题 */}
                    {content.pretitle && (
                        <motion.div
                            variants={animation.stagger ? itemVariants : {}}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white border border-white/20">
                                {content.pretitle}
                            </span>
                        </motion.div>
                    )}

                    {/* 主标题 */}
                    <motion.h1
                        className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl mb-8"
                        variants={animation.stagger ? itemVariants : {}}
                    >
                        {content.title.animated ? (
                            <>
                                {displayedTitle}
                                {content.title.highlight && titleIndex >= content.title.main.length && (
                                    <>
                                        {' '}
                                        <span className="text-primary-400">
                                            {content.title.highlight}
                                        </span>
                                    </>
                                )}
                                <span className="animate-pulse">|</span>
                            </>
                        ) : (
                            <>
                                {content.title.main}
                                {content.title.highlight && (
                                    <>
                                        {' '}
                                        <span className="text-primary-400">
                                            {content.title.highlight}
                                        </span>
                                    </>
                                )}
                            </>
                        )}
                    </motion.h1>

                    {/* 副标题 */}
                    <motion.p
                        className="text-xl sm:text-2xl leading-8 text-gray-200 mb-12 max-w-3xl mx-auto"
                        variants={animation.stagger ? itemVariants : {}}
                    >
                        {content.subtitle}
                    </motion.p>

                    {/* 按钮组 */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        variants={animation.stagger ? itemVariants : {}}
                    >
                        {/* 主按钮 */}
                        <Link
                            href={content.buttons.primary.href}
                            className={`inline-flex items-center justify-center rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-transparent ${content.buttons.primary.size === 'large'
                                ? 'px-10 py-5 text-lg'
                                : 'px-8 py-4 text-base'
                                }`}
                        >
                            {content.buttons.primary.text}
                            <ChevronRightIcon className="ml-2 h-5 w-5" />
                        </Link>

                        {/* 副按钮 */}
                        {content.buttons.secondary && (
                            <Link
                                href={content.buttons.secondary.href}
                                className={`inline-flex items-center justify-center font-semibold transition-all duration-300 ${content.buttons.secondary.variant === 'outline'
                                    ? 'rounded-lg border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-base'
                                    : 'text-white hover:text-primary-400 text-lg'
                                    }`}
                            >
                                {content.buttons.secondary.icon === 'play' && (
                                    <PlayIcon className="mr-2 h-6 w-6" />
                                )}
                                {content.buttons.secondary.text}
                                {content.buttons.secondary.icon === 'arrow' && (
                                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                                )}
                            </Link>
                        )}
                    </motion.div>

                    {/* 滚动提示 */}
                    {content.scrollHint?.show && (
                        <motion.div
                            className="mt-16"
                            variants={animation.stagger ? itemVariants : {}}
                        >
                            <div className="flex flex-col items-center space-y-3">
                                <span className="text-sm text-gray-300 font-medium">
                                    {content.scrollHint.text}
                                </span>
                                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center animate-bounce">
                                    <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* 装饰性粒子效果 */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 3) * 20}%`,
                        }}
                        animate={{
                            y: [-10, 10, -10],
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>
        </section>
    )
}
