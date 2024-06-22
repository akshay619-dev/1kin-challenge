"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import List from "./components/List";

type Person = {
  name: string;
  eye_color: string;
  hair_color: string;
  homeworld: string;
};



export default function Home() {

  const [getPeople , setPeople] = useState<Person[]>([])
  const [getHomeWorld , setHomeWorld ] = useState<{ [key: string]: string }>({})
  useEffect(() => {
    const fetchPeopleData = async () => {

      try{
      const response = await fetch("https://swapi.dev/api/people");
      const data = await response.json();
     // console.log("data: ", data);
          const peopleWithBrownHair = data.results.filter((person:Person) =>  
            person.hair_color &&
            person.hair_color.toLowerCase() !== 'none' &&
            person.hair_color.toLowerCase() !== 'n/a' &&
            person.hair_color.toLowerCase().includes('brown')
        );
       const peopleWithHomeworld = await Promise.all(
        peopleWithBrownHair.map(async (person: Person) => {
          const homeworldData = await fetch(person.homeworld).then((res) => res.json());
          return { ...person, homeworld: homeworldData.name };
        })
      );
      setPeople(peopleWithHomeworld)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    } 

    fetchPeopleData()
  }, []);


  

  return (
    <main className={styles.main}>
     <section className="text-gray-600 body-font">
        <div className="container px-5  mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">People with Brown Hair</h1>
             </div>
             <div className="flex flex-wrap -m-4">
              {getPeople && getPeople.map((person , index ) => (
              <List key={index} personName={person.name} eyeColor = {person.eye_color} homeWorld={person.homeworld} hairColor={person.hair_color}/>
            ))}
            </div>
   </div>
    </section>  
    </main>
  );
}
