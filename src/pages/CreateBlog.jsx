import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateBlog = () => {
    const [blog, setBlog] = useState({
        title : "",
        description : "",
        thumbnail : null
    })
    const navigate = useNavigate()

    const handleCreateBlog = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const res = await axios({
            method : "post",
            url : "http://localhost:5000/api/blogs",
            data : formData
        })
        if (res.data.success === true) {
            setBlog({
                title : "",
                description : "",
            })
            alert("Blog has been created")
            navigate("/dashboard")
        }else {
            alert("Could not create Blog")
        }
    }

    const handleChange = (e) => {
        setBlog({...blog, [e.target.name] : e.target.value})
    }
    

    return (
        <form className='flex flex-col items-center justify-center gap-5' onSubmit={handleCreateBlog}>
            <p className='text-[42px]'>Create New Blog</p>


            <label htmlFor="title" className='flex flex-col gap-1 w-[30%]'>Title
            <input type="text" name='title' id='title' className='border border-solid border-gray-500 w-full rounded-md p-2 outline-none' onChange={handleChange}/>
            </label>

            <label htmlFor="description" className='flex flex-col gap-1 w-[30%]'>Description
            <textarea type="text" name='description' id='description' className='border border-solid border-gray-500 w-full rounded-md p-2 outline-none' onChange={handleChange}/>
            </label>

            {/* <label htmlFor="reviewer_profession" className='flex flex-col gap-1 w-[30%]'>Reviewer Profession
            <input type="text" name='reviewer_profession' id='reviewer_profession' className='border border-solid border-gray-500 w-full rounded-md p-2 outline-none' onChange={handleChange}/>
            </label> */}

            <label htmlFor="thumbnail" className='flex flex-col gap-1 w-[30%]'>Cover Image
            <input type="file" name='thumbnail' id='thumbnail' className='w-full rounded-md' onChange={(e)=>setBlog({...blog, thumbnail : e.target.files[0]})}/>
            </label>

            <button className={`${!blog.title || !blog.description  || !blog.thumbnail ? "bg-[#bbd6e8]" : "bg-[#2D89C8]"} p-2 text-white rounded-md`} type='submit' disabled={!blog.title || !blog.description ? true : false}>Create</button>
        </form>
    )
}

export default CreateBlog