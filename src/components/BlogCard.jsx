import React, { useEffect, useState } from 'react'
import CRUDButtons from './CRUDButtons'
import { Link } from "react-router-dom"
import { Quill } from 'react-quill'

const BlogCard = ({ blog, role, id, handleDelete }) => {
    const host = "http://localhost:5000"



    return (
        <div className='w-[350px] min-h-[500px] border border-solid flex flex-col gap-5 pb-[24px] rounded-[18px] relative blog_card overflow-hidden bg-white DM_Sans'>
            {role==="ADMIN" && <CRUDButtons handleDelete={handleDelete} id={id}/>}
            <img src={`${host}/uploads/${blog?.thumbnail}`} alt="thumbnail" className='rounded-t-[18px] max-h-[200px]'/>
            <div className='flex gap-2 px-[24px]'>
                {blog?.category?.map((category, index) => {
                     return  <p className='text-[#2D89C8] text-[14px] font-bold uppercase Quicksand'>{category}</p> 
                }
                      )}
            </div>
            
            <h4 className='text-[#0D283A] font-bold text-xl line-clamp-2 px-[24px]'>{blog?.title}</h4>
            <p className='text-[#0D283A] text-[14px] line-clamp-3 px-[24px] none' id='desc'
            dangerouslySetInnerHTML={{ __html: blog?.description }}
            />
            {/* <p className='text-[#0D283A] text-[14px] line-clamp-3 px-[24px]'>
                {discription}
            </p> */}
            <Link to={`/blog/${blog?._id}`} className='self-end mt-auto px-[24px] text-[#2D89C8] font-bold uppercase'>Read More</Link>
        </div>
    )
}

export default BlogCard