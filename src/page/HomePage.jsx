import React from 'react'
import Herosection from '../Component/Herosection'
import Experience from '../Component/Experience'

const HomePage = () => {
  const heroData = {
    name: "Madhav Sapkota",
    alias: "Subodh",
    role: "System Leadership Specialist & MP",
    constituency: "Sindhupalchok-1",
    tagline: "Bridging the gap between academic research and grassroots infrastructure development.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhoWFDixQJmQkNlNPLSO3MoaplAmHCoQexJ45VZbZORMqsqE7M7lNs4DbScnU2WwgGYYpDtkdRKQlNnxIPp3S3Mznc7PWLP4pQ-ACtoFkI_A&s=10"
    ],
    stats: [
      { label: "Focus Area", value: "Rural Dev." },
      { label: "Expertise", value: "Policy Analysis" },
      { label: "Background", value: "Social Research" }
    ]
  };

  const professionalExperience = [
    {
      year: "2020 - Present",
      role: "Policy Researcher & System Strategist",
      organization: "Rural Development Sector",
      description: "Published research on 'Sustainable Political Leadership Based on System Thinking,' focusing on how creative collaboration transforms rural society and local governance."
    },
    {
      year: "2015 - 2021",
      role: "Post-Disaster Reconstruction Coordinator",
      organization: "Sindhupalchok Relief Initiatives",
      description: "Managed large-scale logistical operations and stakeholder coordination for the reconstruction of Sindhupalchok following the 2015 earthquake."
    },
    {
      year: "2010 - 2015",
      role: "Grassroots Infrastructure Project Lead",
      organization: "Local Development Committees",
      description: "Directed rural electrification and road connectivity projects, ensuring technical standards met the needs of isolated Himalayan communities."
    },
    {
      year: "2005 - 2010",
      role: "Social Mobilization Specialist",
      organization: "Community Outreach Programs",
      description: "Developed frameworks for civic participation and democratic engagement, helping local citizens access governmental resources effectively."
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      <Herosection data={heroData} />
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
            Professional <span className="text-red-600 italic">Experience</span>
          </h2>
          <div className="w-20 h-1.5 bg-slate-900 mt-4 rounded-full"></div>
        </div>
        <Experience list={professionalExperience} />
      </div>
    </div>
  )
}

export default HomePage