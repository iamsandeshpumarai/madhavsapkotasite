import { Loader2 } from 'lucide-react'
import React from 'react'

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-red-600" size={48} />
      </div>
  )
}

export default Loading
