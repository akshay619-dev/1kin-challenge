"use client"
import { useEffect, useState } from "react";
import List from "./components/List";
import styles from "./page.module.css";

type Person = {
  name: string;
  eye_color: string;
  hair_color: string;
  homeworld: string;
};

export default function Home() {

  const [getPeople, setPeople] = useState<Person[]>([])
  const [getColor, setColor] = useState<string>('')
  const [getError , setError] = useState<string>('No Records Found.....')
  const [isIoading , setIsloading] = useState<boolean>(false)
 

  const fetchPeopleData = async (color: string) => {
    setIsloading(true)
    try {
      const response = await fetch("https://swapi.dev/api/people");
      const data = await response.json();
      // console.log("data: ", data);
      console.log(color)
      if (color === ' ') {
        console.log(`all results `, data.results)
        // setPeople(data.results);
        const filterHair = data.results
        const peopleWithHomeworld = await Promise.all(
          filterHair.map(async (person: Person) => {
            const homeworldData = await fetch(person.homeworld).then((res) => res.json());
            return { ...person, homeworld: homeworldData.name };
          })
        );
        setPeople(peopleWithHomeworld);
      } else {
        const filterHair = data.results.filter((person: Person) =>
          person.hair_color &&
          person.hair_color.toLowerCase() !== 'none' &&
          person.hair_color.toLowerCase() !== 'n/a' &&
          person.hair_color.toLowerCase().includes(color)
        );

        const peopleWithHomeworld = await Promise.all(
          filterHair.map(async (person: Person) => {
            const homeworldData = await fetch(person.homeworld).then((res) => res.json());
            return { ...person, homeworld: homeworldData.name };
          })
        );
        setPeople(peopleWithHomeworld)
      }

    } catch (error) {
      setError('Error fetching data')
      console.error('Error fetching data:', error);
    }

    setIsloading(false)
  }

  const handlerHairColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setColor(e.target.value)
    fetchPeopleData(e.target.value)
  }

  useEffect(() => {
    fetchPeopleData(getColor)
  }, []);

  return (
    <main className={styles.main}>


      <section className="text-gray-600 body-font">
        <div className="container px-5  mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">People with Brown Hair</h1>
            <div>
              <label>Select Hair Color : {getColor === '' ? 'All' : getColor.toLocaleUpperCase()} </label>
              <select className="mb-4" onChange={handlerHairColor} value={getColor}>
                <option selected value=" ">Select </option>
                <option value="brown">Brown</option>
                <option value="blond">Blond</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="white">White</option>
              </select>
            </div>
          </div>
        </div>
        {isIoading ? `Loding .....`  :  
        <div className="container px-5  mx-auto">

          <div className="grid grid-cols-4 gap-4 -m-4">
            {getPeople.length > 0 ? getPeople.map((person, index) => (
              <List key={index} personName={person.name} eyeColor={person.eye_color} homeWorld={person.homeworld} hairColor={person.hair_color} />
            )) : <>

              <h1 className="text-l font-medium title-font mb-4 py-14 text-gray-900">{getError}</h1>
            </>}
          </div>
        </div>
        }
      </section>
    </main>
  );
}
