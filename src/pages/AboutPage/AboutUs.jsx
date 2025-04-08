import React from 'react'
import aboutImg from '@/assets/img/about.jpg'

function AboutUs() {
  return (
    <div className='pt-15'>
      <div className='grid min-[850px]:grid-cols-2 grid-cols-1 mt-5 gap-x-5 gap-y-4 px-4 py-10'>
        <div className='flex justify-center flex-col items-center text-center gap-y-3.5'>
          <h1 className='text-4xl font-bold mb-7 capitalize'>we offers the best platform for students to learn things easily</h1>
          <img src={aboutImg} alt="aboutimage" className='w-[400px] rounded-lg' />
          {/* <p className=' text-slate-500 max-w-[350px]'>Sample text. Click to select the text box. Click again or double click to start editing the text.</p> */}
        </div>
        <div className='flex justify-center items-center'>
          <p className='text-lg max-w-[400px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, nisi? Quidem officiis minima asperiores optio adipisci, esse tenetur aliquid perferendis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut excepturi nihil doloribus odio ullam alias laborum suscipit, recusandae cupiditate qui eligendi iste similique, asperiores earum assumenda adipisci voluptate doloremque debitis unde in perferendis modi obcaecati culpa enim? Voluptatum, reiciendis corrupti!</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs