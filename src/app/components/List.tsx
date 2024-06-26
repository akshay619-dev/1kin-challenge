import React from 'react'

interface Props {
    personName: string;
    eyeColor: string;
    homeWorld: string;
    hairColor: string;
   
  }
const List:React.FC<Props> = ({ personName , eyeColor , homeWorld , hairColor}) => {
  return (
    
    <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Name : {personName}</h2>
        <p className="text-lg text-gray-900 font-medium title-font mb-2">HairColor : {hairColor}
        </p>    
        <h2 className="text-lg text-gray-900 font-medium title-font mb-2"> Eye Color :  {eyeColor}</h2>
        <h3 className="text-md text-gray-900 font-medium title-font mb-2"> Home World : {homeWorld}</h3>
        </div>
    </div>

         
  )
}

export default List