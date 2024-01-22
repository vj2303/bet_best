import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditBlog = () => {
    const [blog, setBlog] = useState({
        title : "", 
        description : "",
    })
    
    const { id } = useParams()
    const navigate = useNavigate()

    const handleEditBlog = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const res = await axios({
            method : "patch",
            url : `http://localhost:5000/api/blogs/${id}`,
            data : formData
        })
        if (res.data.success === true) {
            setBlog({
                title : "",
                description : "",
            })
            alert("Blog has been Updated")
            navigate("/dashboard")
        }else {
            alert("Could not update Blog")
        }
    }

    const handleChange = (e) => {
        setBlog({...blog, [e.target.name] : e.target.value})
    }

    useEffect(()=>{
        const getBlog = async() => {
            const res = await axios({
                method : "get",
                url : `http://localhost:5000/api/blogs/${id}`
            })
            if (res.data.success === true) {
                setBlog(res.data.Blog)
            }else(
                alert("Something went wrong")
            )
        }
        getBlog()
    }, [])
    

    return (
        <form className='flex flex-col items-center justify-center gap-5' onSubmit={handleEditBlog}>
            <p className='text-[42px]'>Edit Blog</p>


            <label htmlFor="title" className='flex flex-col gap-1 w-[30%]'>Title
            <input type="text" name='title' id='title' className='border border-solid border-gray-500 w-full rounded-md p-2 outline-none' value={blog?.title} onChange={handleChange}/>
            </label>

            <label htmlFor="description" className='flex flex-col gap-1 w-[30%]'>Description
            <textarea type="text" name='description' id='description' className='border border-solid border-gray-500 w-full rounded-md p-2 outline-none'value={blog?.description} onChange={handleChange}/>
            </label>

            {/* <label htmlFor="reviewer_profession" className='flex flex-col gap-1 w-[30%]'>Reviewer Profession
            <input type="text" name='reviewer_profession' id='reviewer_profession' className='border border-solid border-gray-500 w-full rounded-md p-2 outline-none'/>
            </label> */}

            <label htmlFor="thumbnail" className='flex flex-col gap-1 w-[30%]'>Cover Image
            <input type="file" name='thumbnail' id='thumbnail' className='w-full rounded-md'/>
            </label>

            <button className='bg-[#2D89C8] p-2 text-white rounded-md' type='submit'>Update</button>
        </form>
    )
}

export default EditBlog