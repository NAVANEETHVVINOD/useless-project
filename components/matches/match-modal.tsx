"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Pet } from "@prisma/client"
import { Heart, MessageCircle, Play } from "lucide-react"
import Link from "next/link"

interface MatchModalProps {
  isOpen: boolean
  onClose: () => void
  currentUserPet: Pet
  matchedPet: Pet
}

export function MatchModal({ isOpen, onClose, currentUserPet, matchedPet }: MatchModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-sm bg-gradient-to-b from-primary/20 to-background border-2 border-primary/50 shadow-2xl rounded-3xl p-8 flex flex-col items-center text-center overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                 <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-primary/30 rounded-full blur-[60px]" />
              </div>

              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-dark font-display italic tracking-tight">
                  It's a Match!
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {currentUserPet.name} and {matchedPet.name} are a perfect pair!
                </p>
              </motion.div>

              <div className="flex items-center justify-center gap-4 mb-10 w-full relative">
                {/* User Pet */}
                <motion.div
                  initial={{ x: -100, opacity: 0, rotate: -20 }}
                  animate={{ x: 0, opacity: 1, rotate: -5 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="z-10"
                >
                  <div className="w-28 h-28 rounded-full border-4 border-background shadow-xl overflow-hidden bg-muted">
                    <img 
                      src={(currentUserPet.photos as string[])[0] || '/landing/avatars/dog-1.jpg'} 
                      alt={currentUserPet.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Floating Heart */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg text-primary"
                >
                  <Heart className="w-8 h-8 fill-current" />
                </motion.div>

                {/* Matched Pet */}
                <motion.div
                  initial={{ x: 100, opacity: 0, rotate: 20 }}
                  animate={{ x: 0, opacity: 1, rotate: 5 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="z-10"
                >
                  <div className="w-28 h-28 rounded-full border-4 border-background shadow-xl overflow-hidden bg-muted">
                    <img 
                      src={(matchedPet.photos as string[])[0] || '/landing/avatars/dog-1.jpg'} 
                      alt={matchedPet.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-col gap-3 w-full relative z-30">
                <Link href="/matches">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full h-12 rounded-full bg-primary text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    Send a Message
                  </motion.button>
                </Link>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full h-12 rounded-full bg-secondary text-secondary-foreground font-bold text-base flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Keep Swiping
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
