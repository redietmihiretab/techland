"use client"

import { Reveal } from "@/components/techland/motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PromoBannerProps {
  title: React.ReactNode
  description: string
  href: string
  backgroundImage: string
  buttonText?: string
  className?: string
}

export function PromoBanner({ 
  title, 
  description, 
  href, 
  backgroundImage, 
  buttonText = "Shop Now",
  className 
}: PromoBannerProps) {
  return (
    <Reveal className={`w-full ${className}`}>
      <div className="relative overflow-hidden rounded-[10px] bg-muted shadow-xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Banner background"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-orange-600/70 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col items-start justify-between gap-6 px-6 py-10 sm:px-12 sm:py-16 md:flex-row md:items-center">
          <div className="max-w-xl text-left">
            <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              {title}
            </h3>
            <p className="mt-3 text-sm font-medium text-orange-50 sm:text-lg">
              {description}
            </p>
          </div>
          
          <Link 
            href={href}
            className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-orange-600 transition-all hover:bg-orange-50 hover:shadow-lg active:scale-95"
          >
            {buttonText}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Reveal>
  )
}
