import { Image } from "lucide-react";
import React from "react";
import youtube from "@/assets/img/youtube.png";
import whatsapp from "@/assets/img/whatap.png";
import insta from "@/assets/img/insta.png";
import github from "@/assets/img/github.png";

function OurProvider() {
  return (
    <>
      <h1 className="flex justify-center items-center text-center text-4xl text-primary font-bold my-10 mt-26">
        Available On
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 mx-auto w-[80%] gap-4 gap-y-10">
        <div className="flex justify-center items-center gap-1">
          <img src={youtube} alt="Image 1" className="w-[30px] h-[30px]" />
          <p className="text-xl text-slate-400 font-bold">YouTube</p>
        </div>
        <div className="flex justify-center items-center gap-1">
          <img src={whatsapp} alt="Image 1" className="w-[30px] h-[30px]" />
          <p className="text-xl text-slate-400 font-bold">WhatsApp</p>
        </div>
        <div className="flex justify-center items-center gap-1">
          <img src={insta} alt="Image 1" className="w-[30px] h-[30px]" />
          <p className="text-xl text-slate-400 font-bold">Instagram</p>
        </div>
        <div className="flex justify-center items-center gap-1">
          <img src={github} alt="Image 1" className="w-[30px] h-[30px]" />
          <p className="text-xl text-slate-400 font-bold">GitHub</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 w-[87%] mt-14 mx-auto">
        <div className="md:col-span-3 shadow-lg rounded-lg border p-4">
          <h1 className="text-lg text-primary capitalize">
            upto 500+ courses available
          </h1>
          <p className="text-slate-400 mt-3 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            assumenda ex, aliquam deleniti minima, autem tenetur ad aut,
            corrupti temporibus quam ullam debitis atque totam!
          </p>
        </div>
        <div className="md:col-span-2 shadow-lg rounded-lg border p-4">
          <h1 className="text-lg text-primary capitalize">
            read and write reviews
          </h1>
          <p className="text-slate-400 mt-3 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            assumenda ex, aliquam deleniti minima, autem tenetur ad aut,
            corrupti temporibus quam ullam debitis atque totam!
          </p>
        </div>
        <div className="md:col-span-2 shadow-lg rounded-lg border p-4">
          <h1 className="text-lg text-primary capitalize">
            leran from best professors
          </h1>
          <p className="text-slate-400 mt-3 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            assumenda ex, aliquam deleniti minima, autem tenetur ad aut,
            corrupti temporibus quam ullam debitis atque totam!
          </p>
        </div>
        <div className="md:col-span-3 shadow-lg rounded-lg border p-4">
          <h1 className="text-lg text-primary capitalize">
            share courses with your friends
          </h1>
          <p className="text-slate-400 mt-3 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            assumenda ex, aliquam deleniti minima, autem tenetur ad aut,
            corrupti temporibus quam ullam debitis atque totam!
          </p>
        </div>
      </div>
    </>
  );
}

export default OurProvider;
