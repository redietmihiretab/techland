"use client"

import { motion, type MotionProps } from "framer-motion"
import * as React from "react"

import { cn } from "@/lib/utils"

type RevealProps = React.ComponentProps<"div"> &
  MotionProps & {
    delay?: number
  }

export function Reveal({
  className,
  delay,
  ...props
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.61, 0.35, 1], delay }}
      {...props}
    />
  )
}

export { motion }

