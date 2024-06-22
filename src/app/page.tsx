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
      console.log("data: ", data);
      const peopleWithBrownHair = data.results.filter((person:Person) => person.hair_color.includes('brown'));
      setPeople(data.results)
    
      
      const homeworldPromises = peopleWithBrownHair.map((person:Person) =>
        fetch(person.homeworld).then((res) => res.json())
      );
    
      
      const homeworldData = await Promise.all(homeworldPromises);
    
      const homeworldName = homeworldData.reduce((acc, homeworld) => {
        acc[homeworld.url] = homeworld.name;
        return acc
      });
    
      setHomeWorld(homeworldName)
    
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
              <List key={index} personName={person.name} eyeColor = {person.eye_color} homeWorld={getHomeWorld[person.homeworld]}/>
            ))}
            </div>
   </div>
    </section>  
    </main>
  );
}
