"use client"

import { Pet, Message } from "@prisma/client"
import Link from "next/link"
import { motion } from "framer-motion"

interface FormattedMatch {
  matchId: string
  matchedAt: Date
  myPet: Pet
  otherPet: Pet
  lastMessage: Message | null
}

export function MatchCard({ match }: { match: FormattedMatch }) {
  const { matchId, otherPet, lastMessage } = match
  const photo = (otherPet.photos as string[])[0] || '/landing/avatars/dog-1.jpg'

  return (
    <Link href={`/matches/${matchId}`}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer shadow-sm hover:shadow-xl transition-all"
      >
        <img 
          src={photo} 
          alt={otherPet.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-lg truncate flex items-center gap-1">
            {otherPet.name}
            {lastMessage && !lastMessage.isRead && (
               <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse ml-1" />
            )}
          </h3>
          {lastMessage ? (
            <p className="text-white/80 text-xs line-clamp-1">
              {lastMessage.content}
            </p>
          ) : (
            <p className="text-primary-light text-xs font-medium">
              Say hi! 👋
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
