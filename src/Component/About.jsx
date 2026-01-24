import React from 'react';
import { motion } from 'framer-motion';
import Picture1 from '../image/Picture1.jpg';
import Picture2 from '../image/Picture2.png';

const About = () => {
  const aboutextendeddata = {
    introduction: {
      title: "परिचय",
      data: [
        "संघीय संसद्, प्रतिनिधि सभामा सिन्धुपाल्चोक क्षेत्र नं. १ बाट २०८२ फागुन २१ गते हुने निर्वाचनका लागि नेपाली कम्युनिस्ट पार्टी (नेकपा) बाट प्रत्यक्षतर्फका उम्मेदवार माधव सापकोटा (सुबोध) 'Madhav Sapkota Subodh' नेपाली कम्युनिस्ट पार्टी (नेकपा) का केन्द्रीय सदस्य, पूर्व सांसद तथा लोकप्रिय युवा नेता हुन्।",
        "उनको जन्म जनयुद्धको प्रमुख उद्गमस्थल सिन्धुपाल्चोक जिल्लाको चौतारा साँगाचोकगढी नगरपालिका वडा नं. ४ कुविन्डेमा वि.सं. २०३७ चैत २० गते पिता हरिप्रसाद सापकोटा र माता खिलमाया सापकोटाको माइलो सन्तानका रूपमा भएको हो। सापकोटाले सेतीदेवी पञ्चकन्या माध्यमिक विद्यालय कुविन्डे र जुगल बोर्डिङ स्कूल चौताराबाट विद्यालय शिक्षा पूरा गरे।",
        "जनमुक्ति सेनामा स्क्वार्ड कमान्डरदेखि १४ औँ बटालियन कमिसारसम्मको जिम्मेवारी सम्हाले। वि.सं. २०६३ वैशाख १० गते चौतारा आक्रमणका कमान्डर रहँदा गोली लागेर गम्भीर घाइते भए। अहिले पनि उनको शरिरमा गोलिका छर्रा छन् । उनले प्लसटु, स्नातकहुँदै र वि.सं. २०८१ मा राजनीतिशास्त्रमा स्नातकोत्तर पूरा गरे।"
      ],
      image: Picture1
    },
    political: {
      title: "राजनीतिक यात्रा र प्रमुख योगदान",
      data: [
        "विद्यार्थी राजनीतिमा हुँदा खरो र तार्किक नेताका रूपमा परिचित सुबोध केन्द्रीय जिम्मेवारीपछि बौद्धिक, तार्किक, मिलनसार र समन्वयकारी नेताका रूपमा स्थापित छन्। सिन्धुपाल्चोकमा जुरे पहिरो, २०७२ को महाभूकम्प, लिदी पहिरो जस्ता विपत्तिमा तत्काल राहत र उद्धारमा सक्रिय रहेका उनी नागरिकका घर दैलोमा पुग्छन्।",
        "उनी जुगल हिमालका चुचुराहरुको आरोहण खुलाउने, बन्द अवस्थाको तातोपानी नाका खुलाउने, र जुरे पहिरो प्रभावितका लागि राहत वितरण गर्ने प्रमुख पहलकर्ता हुन्। उनिसँग विकास र शुशासनका लागि स्पष्ट दृष्टिकोण छ।"
      ],
      image: Picture2
    },
    otherdata: {
      data: {
        "दृष्टिकोण": [
          "सुशासन र जनमुखी लोकतान्त्रिक शासन प्रणाली",
          "पूर्वाधार, शिक्षा र रोजगारीमार्फत दिगो विकास",
          "विपद् जोखिम न्यूनीकरण र दिगो पुनर्निर्माण",
          "जलवायु परिवर्तनको असर न्यूनीकरण"
        ],
        "मूल्य": [
          "जनताको दुःख–सुखमा सधैं साथ दिने नेतृत्व",
          "सत्य, न्याय र अधिकारका पक्षमा निर्भीक अडान",
          "इमानदारी, पारदर्शिता र जवाफदेहिता",
          "समावेशीता र सामाजिक न्याय"
        ],
        "प्रतिबद्धता": [
          "भ्रष्टाचारविरुद्ध शून्य सहनशीलता",
          "तातोपानी नाका र अरनिको राजमार्ग स्तरोन्नति",
          "शिक्षा र रोजगारीमार्फत युवा पलायन रोक्ने",
          "वातावरण संरक्षणका लागि अन्तर्राष्ट्रिय पहल"
        ]
      }
    }
  };

  // Animation Variants
  const fadeInSide = (direction) => ({
    hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans text-gray-800 overflow-hidden">
      
      {/* 1. Introduction Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row items-center gap-10 mb-24"
      >
        <motion.div variants={fadeInSide('left')} className="w-full md:w-1/3">
          <img 
            src={aboutextendeddata.introduction.image} 
            alt="Profile" 
            className="rounded-2xl shadow-2xl w-full object-cover border-b-8 border-red-600"
          />
        </motion.div>
        <motion.div variants={fadeInSide('right')} className="w-full md:w-2/3">
          <h2 className="text-4xl font-bold text-red-700 mb-6">{aboutextendeddata.introduction.title}</h2>
          {aboutextendeddata.introduction.data.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed mb-4 text-justify">{para}</p>
          ))}
        </motion.div>
      </motion.section>

      {/* 2. Political Journey Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row-reverse items-center gap-10 mb-24"
      >
        <motion.div variants={fadeInSide('right')} className="w-full md:w-1/3">
          <img 
            src={aboutextendeddata.political.image} 
            alt="Political" 
            className="rounded-2xl shadow-2xl w-full object-cover border-b-8 border-red-600"
          />
        </motion.div>
        <motion.div variants={fadeInSide('left')} className="w-full md:w-2/3">
          <h2 className="text-4xl font-bold text-red-700 mb-6">{aboutextendeddata.political.title}</h2>
          {aboutextendeddata.political.data.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed mb-4 text-justify">{para}</p>
          ))}
        </motion.div>
      </motion.section>

      {/* 3. Grid Section (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(aboutextendeddata.otherdata.data).map(([key, list], index) => (
          <motion.div 
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-8 rounded-xl shadow-lg border-t-8 border-red-600"
          >
            <h3 className="text-2xl font-bold text-red-700 mb-6 text-center">{key}</h3>
            <ul className="space-y-4">
              {list.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✓</span>
                  <span className="text-md font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;