"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Loader2, UploadCloud, X } from "lucide-react"

interface ImageUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxPhotos?: number
}

export function ImageUploader({ value = [], onChange, maxPhotos = 6 }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    if (value.length + files.length > maxPhotos) {
      setError(`You can only upload up to ${maxPhotos} photos.`)
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const newUrls: string[] = []

      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          setError('Please upload only image files.')
          continue
        }

        // Create a unique file path: timestamp + random string + extension
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError, data } = await supabase.storage
          .from("pet-photos")
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          console.error("Upload error details:", uploadError)
          throw new Error("Failed to upload image. Make sure the 'pet-photos' bucket exists and is public.")
        }

        if (data?.path) {
          const { data: publicUrlData } = supabase.storage
            .from("pet-photos")
            .getPublicUrl(data.path)
            
          newUrls.push(publicUrlData.publicUrl)
        }
      }

      onChange([...value, ...newUrls])
    } catch (err: any) {
      setError(err.message || "An error occurred during upload.")
    } finally {
      setIsUploading(false)
      // Reset input so the same files can be re-selected if needed
      e.target.value = ""
    }
  }

  const removePhoto = (indexToRemove: number) => {
    // In a real production app, we should also delete the file from Supabase storage here
    // to save space, but for now we just remove from the UI state.
    onChange(value.filter((_, idx) => idx !== indexToRemove))
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-sm text-destructive p-3 bg-destructive/10 rounded-md">
          {error}
        </div>
      )}

      {/* Grid of uploaded images */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          {value.map((url, idx) => (
            <div key={idx} className="relative aspect-square rounded-md overflow-hidden border bg-muted group">
              {/* Using standard img tag for simplicity with external uncontrolled URLs, 
                  Next.js Image requires hostname config */}
              <img 
                src={url} 
                alt={`Pet photo ${idx + 1}`} 
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => removePhoto(idx)}
                className="absolute top-1 right-1 bg-black/50 hover:bg-black p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button area */}
      {value.length < maxPhotos && (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30">
          <input
            type="file"
            id="photo-upload"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <label 
            htmlFor="photo-upload"
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            {isUploading ? (
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            ) : (
              <UploadCloud className="w-10 h-10 text-muted-foreground" />
            )}
            
            <div className="space-y-1">
              <p className="font-medium text-sm">
                {isUploading ? "Uploading..." : `Click or drag to upload photos (${value.length}/${maxPhotos})`}
              </p>
              <p className="text-xs text-muted-foreground">
                JPEG, PNG, WEBP up to 5MB each
              </p>
            </div>
            
            {!isUploading && (
              <Button type="button" variant="outline" size="sm" className="mt-2 pointer-events-none">
                Select Files
              </Button>
            )}
          </label>
        </div>
      )}
    </div>
  )
}
