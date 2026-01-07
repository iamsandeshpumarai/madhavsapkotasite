import axiosapi from "./api";

export const sendHomedata = async (payloaddata) => {
    try {
        const data = new FormData();

        // 1. Append simple text fields
        data.append("name", payloaddata.name);
        data.append("nickname", payloaddata.nickname);
        data.append("role", payloaddata.role);
        data.append("constituency", payloaddata.constituency);
        data.append("tagline", payloaddata.tagline);

        // 2. Append the actual Image Files from your computer
        payloaddata.images.forEach((file) => {
            // Only append if it's a real File object
            if (file instanceof File) {
                data.append("image", file);
            }
        });

        // 3. Stringify the Arrays (Stats & Experience) 
        // FormData only accepts strings or blobs
        data.append("stats", JSON.stringify(payloaddata.stats));
        data.append("professionalExperience", JSON.stringify(payloaddata.professionalExperience));

        const response = await axiosapi.put('api/profiles', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return response.data;
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
};



export const getHomeData = async()=>{
    try{
const data = await axiosapi.get('api/profiles')
return data.data.data[0]
    }
    catch(err){
console.log(err)
    }
}



export const sendAboutData = async(payloaddata) =>{
    try{
const data = await axiosapi.put('api/about',payloaddata)
return data
    }
    catch(err){
        console.log(err)
    }
}

export const fetchAboutData = async()=>{
    try{
const data = await axiosapi.get('api/about')
return data
    }
    catch(err){
        console.log(err)
    }
}

export const getAboutData = async()=>{
    try{
        const data = await axiosapi.get('api/about')
        return  data.data.data
    }
    catch(err){
        console.log(err)
    }
}

export const sendConstituencyData = async(payloaddata)=>{
    try{
        const data = await axiosapi.put("api/constituencies",payloaddata)
        return data
    }
    catch(err){
        console.log(err)
    }
}

export const getAllConstituencyData = async() =>{
    try{
const data = await axiosapi.get('api/constituencies')
return data.data.data
    }
    catch(err){
        console.log(err)
    }
}

// events 
export const getAllEvents =async()=>{
try{
const data = await axiosapi.get('api/events') 
return data.data.data   
}
catch(err){
console.log(err)
}
}


export const updateEvent =async(id,payload)=>{
    const data = await axiosapi.put(`api/events/${id}`,payload)
    return data.data.data
}





export const createEvent =async(payload)=>{
const data = await axiosapi.post('api/events',payload)
return data.data.data
    
}


export const deleteEvent =async(id)=>{
const data = await axiosapi.delete(`api/events/${id}`)
 return data.data.data   
}

export const getAllNews = async() =>{
 const data = await axiosapi.get('/api/news')
 return data.data.data   
}
export const updateNews = async(id,payload) =>{
const data = await axiosapi.put(`api/news/${id}`,payload)

return data.data.data
}

export const createNews = async(payload) =>{
const data = await axiosapi.post('api/news',payload)
return data.data.data
}
export const deleteNews = async(id) =>{
const data = await axiosapi.delete(`api/news/${id}`)

return data.data.data
}


export const CreateGallery = async(payload)=>{
const data = await axiosapi.post('api/gallery',payload)
return data.data.data
}

export const getGalleryData = async() =>{
    const data = await axiosapi.get('api/gallery')
    return data.data.data
}

export const deleteGalleryData = async (id) => {
    const response = await axiosapi.delete(`api/gallery/${id}`);
    return response.data;
};

export const updateGalleryData = async (id, formData) => {
    // Use PUT or PATCH for updates
    const response = await axiosapi.put(`api/gallery/${id}`, formData);
    return response.data;
};


export const getContactData = async()=>{
    const data = await axiosapi.get('api/contacts')
    return data.data.data[0]
    
}
export const updateContactData = async(payload)=>{

    const data = await axiosapi.put(`api/contacts`,payload)
    return data
}

export const sendMessage = async(payload)=>{
    const data = await axiosapi.post('api/messages',payload)
    return data
}
export const getMessages = async()=>{
    const data = await axiosapi.get('api/messages')
    return data.data.data
}

export const deleteMessage = async(id)=>{
    const data = await axiosapi.delete(`api/messages/${id}`)
    return data.data.data
}

export const getAuthme = async() =>{
    const data = await axiosapi.get('api/auth/me')
    return data.data.data
}

export const Datalogout = async()=>{
    const data = await axiosapi.get('api/auth/logout')
    return data
}