"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";

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
      <div>
      <h1>People with Brown Hair</h1>
      <ul>
        {getPeople && getPeople.map((person) => (
          <li key={person.name}>
            <p>Name: {person.name}</p>
            <p>Eye Color: {person.eye_color}</p>
            <p>Homeworld: {getHomeWorld[person.homeworld]}</p>
          </li>
        ))}
      </ul>
    </div>
    </main>
  );
}
