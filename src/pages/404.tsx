import Image from 'next/image';
import React from 'react'

const  Custom404 = () => {
    return (
        <div className="w-1/3 mx-auto flex flex-col items-center justify-center h-screen">
          <div className=" w-full py-5 px-8 rounded-lg">
            <div className="text-center pt-5">
              
             <div className="my-5">
             <div className="font-bold text-xl ">Halaman tidak ditemukan</div>
              <p className="text-sm">harap periksa lagi <strong>URL</strong> yang anda tuju </p>
             </div>
              <div>
               
              </div>
            </div>
    
          </div>
        </div>
  
      );
}

export default  Custom404