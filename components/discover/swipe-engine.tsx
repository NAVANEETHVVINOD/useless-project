"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Pet } from "@prisma/client"
import { recordSwipe } from "@/app/actions/swipe"
import { Check, X, Star, MapPin } from "lucide-react"
import { MatchModal } from "@/components/matches/match-modal"

interface SwipeEngineProps {
  initialPets: Pet[]
  userPet: Pet
}

export function SwipeEngine({ initialPets, userPet }: SwipeEngineProps) {
  const [pets, setPets] = useState<Pet[]>(initialPets)
  const [direction, setDirection] = useState<number | null>(null) // 1 = right, -1 = left, 0 = super
  
  // State for the Match Modal
  const [matchedPet, setMatchedPet] = useState<Pet | null>(null)
  
  const handleDragEnd = async (event: any, info: any) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset > 100 || velocity > 500) {
      await swipe("right")
    } else if (offset < -100 || velocity < -500) {
      await swipe("left")
    }
  }

  const swipe = async (swipeDirection: "left" | "right" | "super") => {
    if (pets.length === 0) return

    setDirection(swipeDirection === "right" ? 1 : swipeDirection === "left" ? -1 : 0)
    
    // We only remove the card after animation completes
    setTimeout(async () => {
      const currentPet = pets[0]
      setPets((prev) => prev.slice(1))

      // Wait for exit animation before resetting direction
      setTimeout(() => setDirection(null), 300)

      try {
        const response = await recordSwipe(userPet.id, currentPet.id, swipeDirection)
        if (response?.isMatch) {
          // Trigger match UI
          console.log("It's a Match!")
          setMatchedPet(currentPet)
        }
      } catch (error) {
        console.error("Failed to swipe:", error)
      }
    }, 300)
  }

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      
      {/* Match Modal Overlay */}
      <MatchModal 
        isOpen={!!matchedPet} 
        onClose={() => setMatchedPet(null)}
        currentUserPet={userPet}
        matchedPet={matchedPet!}
      />

      <AnimatePresence>
        {pets.slice(0, 3).reverse().map((pet, index) => {
          // Reversed because we want the first item to render last (on top)
          const isFront = index === 2
          const scale = isFront ? 1 : index === 1 ? 0.95 : 0.9
          const yOffset = isFront ? 0 : index === 1 ? 20 : 40
          
          let rotate = 0;
          if (!isFront) {
            rotate = index === 1 ? -4 : 4;
          }

          return (
            <motion.div
              key={pet.id}
              className="absolute w-full max-w-[340px] h-[500px] bg-white rounded-3xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing border border-border"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ 
                scale: isFront ? 1 : scale, 
                opacity: 1, 
                y: isFront ? 0 : yOffset,
                rotate: isFront ? 0 : rotate,
                zIndex: index
              }}
              exit={{
                x: direction === 1 ? 300 : direction === -1 ? -300 : 0,
                y: direction === 0 ? -300 : 50,
                opacity: 0,
                rotate: direction === 1 ? 20 : direction === -1 ? -20 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={isFront ? handleDragEnd : undefined}
            >
              {/* Pet Photo */}
              <div 
                className="w-full h-[65%] bg-cover bg-center"
                style={{ backgroundImage: `url(${(pet.photos as string[])[0] || '/landing/avatars/dog-1.jpg'})` }}
              >
                <div className="w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    {pet.name}, {pet.age ?? '?'}
                  </h2>
                  <p className="text-sm opacity-90">{pet.breed} • {pet.size}</p>
                </div>
              </div>
              
              {/* Pet Details */}
              <div className="p-6 h-[35%] flex flex-col justify-between">
                <div>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {pet.bio || "No bio provided."}
                  </p>
                  
                  {pet.personality && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(pet.personality as string[]).slice(0, 3).map((trait, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary-dark text-xs font-medium rounded-full">
                          {trait}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-4 border-t pt-4">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    2.5 miles away
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Swipe Controls (Fixed at bottom) */}
      <div className="absolute -bottom-6 w-full max-w-[340px] flex justify-center items-center gap-6 z-50">
        <button 
          onClick={() => swipe("left")}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-red-500 hover:bg-gray-50 transition transform hover:scale-105"
        >
          <X size={32} strokeWidth={3} />
        </button>
        <button 
          onClick={() => swipe("super")}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-blue-500 hover:bg-gray-50 transition transform hover:scale-105"
        >
          <Star size={24} fill="currentColor" />
        </button>
        <button 
          onClick={() => swipe("right")}
          className="w-16 h-16 bg-white shadow-lg shadow-primary/20 rounded-full flex items-center gap-1 justify-center bg-primary text-white hover:bg-primary-dark transition transform hover:scale-105"
        >
          <Check size={32} strokeWidth={3} />
        </button>
      </div>

    </div>
  )
}
