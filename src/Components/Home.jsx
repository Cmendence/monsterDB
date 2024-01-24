import React from 'react'

export default function Home(){

   return(
      <div className='text-center text-gray-800 h-dvh'>
            <h1 className='uppercase text-3xl font-semibold px-4 py-10'>
               Welcome to our D&D 2e Monster Database!
            </h1>
            <div className='text-base text-center p-4'>
               <p>
                  This project was inspired by a friend who could not find a D&D 2e Monster database with filters to get the 
                  desired type of creature based on hit dice, terrain, AC, or Alignment. 
               </p>
               <p>
                  All credit for the data available here goes to <a className='text-pink-600 font-semibold' href='https://web.archive.org/web/20180818101608/http://lomion.de/cmm/_index.php' target="_blank" rel="noreferrer">lomion.de</a> for the original,
                  and Nicholas Decheine for creating <a className='text-pink-600 font-semibold' href='https://www.completecompendium.com/' target="_blank" rel="noreferrer">Complete Compendium</a>       
                  as well as his generosity for making the entire project publicly available on <a className='text-pink-600 font-semibold' href='https://github.com/decheine/complete-compendium' target='_blank' rel="noreferrer">GitHub</a>.
               </p>
            </div>
      </div>
   )
}