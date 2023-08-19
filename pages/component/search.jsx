import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";


const Search = () => {

  const [keyword, settKeyword] = useState('')
  const router = useRouter()


  const handleSubmmit = (e) =>{
    e.preventDefault()

    if(keyword){

      router.push(`/?keyword = ${keyword}`)
    }else{
      router.push('/')
    }
  }


  return (
    <form>
      <input type="text" placeholder="Search"
      value={keyword}
      onChange={(e) => settKeyword(e.target.value)}
      required
      
      
      />

      <button 
       className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
       onClick={handleSubmmit}

       >

      <IoMdSearch/>
      </button>



      {/* <button>
       <p>
         Search
        </p>
      </button> */}

      
    </form>
  );
};

export default Search;
