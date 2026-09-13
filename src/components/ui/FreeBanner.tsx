'use client';

import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

export function FreeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6 relative overflow-hidden rounded-2xl"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-90" />

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-200%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Content */}
      <div className="relative px-6 py-4 flex items-center justify-center gap-3">
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <Gift className="w-6 h-6 text-white" />
        </motion.div>

        <div className="text-center">
          <p className="text-white font-bold text-lg">
            100% Free Forever
          </p>
          <p className="text-white/90 text-sm font-medium">
            No sign-in, no premium, no hassle — all handled by ads 🎉
          </p>
        </div>
      </div>
    </motion.div>
  );
}
