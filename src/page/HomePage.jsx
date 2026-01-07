import React from 'react'
import Herosection from '../Component/Herosection'
import Experience from '../Component/Experience'
import { useQuery } from '@tanstack/react-query'
import { getHomeData } from '../../utils/function'

const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['homedata'],
    queryFn: getHomeData
  })

  // 1. Handle Loading and Error states
  if (isLoading) return <div className="py-20 text-center">Loading...</div>
  if (isError || !data) return <div className="py-20 text-center text-red-500">Error loading data.</div>

  // 2. Map the dynamic data to the Hero format
  // We use data[0] if the API returns an array, or just 'data' if it's an object
  // Based on your JSON, it looks like a single object.
  const heroData = {
    name: data.name,
    nickname: data.nickname,
    role: data.role,
    constituency: data.constituency,
    tagline: data.tagline,
    images: data.images,
    stats: data.stats.map(stat => ({
      label: stat.label,
      value: stat.value
    }))
  };

  // 3. Map professional experience
  const professionalExperience = data.professionalExperience || [];

  return (
    <div className="bg-white overflow-hidden">
      {/* Pass the dynamic hero data */}
      <Herosection data={heroData} />
      
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
            Professional <span className="text-red-600 italic">Experience</span>
          </h2>
          <div className="w-20 h-1.5 bg-slate-900 mt-4 rounded-full"></div>
        </div>
        
        {/* Pass the dynamic experience list */}
        <Experience list={professionalExperience} />
      </div>
    </div>
  )
}

export default HomePage