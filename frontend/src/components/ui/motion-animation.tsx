import { motion } from "framer-motion"
import { ReactElement } from "react"

interface MotionAnimationProps {
  motionKey: string
  children: ReactElement
  duration?: number
  delay?: number
  ease?: number[]
}

function MotionAnimation({
  motionKey,
  children,
  delay = 0.5,
  duration = 1.2,
  ease = [0, 0.71, 0.2, 1.01]
}: MotionAnimationProps) {

  return (
    <motion.div
      key={motionKey}
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration,
        delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  )
}

export { MotionAnimation }