import { useEffect, useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'
import AssistiveTechInfo from './components/AssistiveTechInfo'
import GameOver from './components/GameOver'
import ErrorCard from './components/ErrorCard'
import Imagedata from '../data/images'

export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData,setEmojisData] = useState([])
    const [selectedCards,setSelectedCards] = useState([])
    const [matchedCards,setMatchedCards] = useState([])
    const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)
    const [isError,setIsError] = useState(false)
    const [initialFormData,setInitialFormData] = useState({category:"animals-and-nature",number:10})
    const [formData,setFormData] = useState(initialFormData)
    const [isFirstRender,setIsFirstRender] = useState(true)

    // console.log(formd)
    // console.log("selected cards" ,selectedCards)
    // console.log("mathed cards: ", matchedCards)
    console.log(emojisData)

    useEffect(()=>{
        if(selectedCards.length === 2 && selectedCards.at(0).name == selectedCards.at(1).name){
             setMatchedCards((prevMatchedCards => [...prevMatchedCards,...selectedCards]))
        }
    },[selectedCards])

    useEffect(()=>{
        if(emojisData.length && emojisData.length === matchedCards.length){
            setAreAllCardsMatched(true)
        }
    },[matchedCards])

    function handleFormChange(event){
        const name =event.target.name
        const value = event.target.value
        setFormData((prevValue => ({...prevValue,[name]:value})))
    }

    async function startGame(e) {
        e.preventDefault()
        let data = null;
        try {
         if(formData.category ==='habesha-foods'){
             data = Imagedata
         }
         else{
            const response =  await fetch(`https://emojihub.yurace.pro/api/all/category/${formData.category}`)
          if(!response.ok){
            throw new Error(`Error occured! Status: ${response.status}`)
           }
           data = await response.json();
         }
          const dataSlice = getDataSlice(data)
          const gameData = getEmojisArray(dataSlice)
          setEmojisData(gameData)
          setIsGameOn(true)
          setIsFirstRender(false)

       } catch (error) {
          console.log('fetch error ' ,error.message)
          setIsError(true)
        }
        finally {
            setIsFirstRender(false)
            
        }
    }

    function getDataSlice(data){
      const randomIndices = getRandomIndices(data);
      const dataSlice = randomIndices.map((index)=> data[index])
      return dataSlice
    }
    function getRandomIndices(data) {
      const randomIndicesArray = []
      
      for (let i = 0; i < formData.number/2; i++) {
          const randomNum = Math.floor(Math.random() * data.length)
          if (!randomIndicesArray.includes(randomNum)) {
              randomIndicesArray.push(randomNum)
          } else {
              i--
          }
      }
      
      return randomIndicesArray
  }
    
  function getEmojisArray(data){
    const pairedEmojisArray = [...data,...data]
    const shuffledArray = shuffleArray(pairedEmojisArray)

    return shuffledArray;
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Get a random index
        // Swap elements at i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

    function turnCard(name,index) {
        // const isCardMatched = matchedCards.find(card => card.index ===index)
        if(selectedCards.length < 2){
            setSelectedCards(prevSelectedCards => [...prevSelectedCards,{name,index}])

        }
        else if(selectedCards.length === 2 ){
                setSelectedCards([{name,index}])
            }
    }
    function resetGame(){
        setIsGameOn(false)
        setSelectedCards([])
        setMatchedCards([])
        setAreAllCardsMatched(false)
    }

    function resetError(){
        setIsError(false)
    }
    return (
        <main>
            <h1>Memory</h1>
            {!isError && !isGameOn && 
                <Form 
                   handleSubmit={startGame} 
                   handleChange={handleFormChange} 
                   isFirstRender={isFirstRender}
            />}
            {!isError && isGameOn && !areAllCardsMatched && <AssistiveTechInfo emojisData={emojisData} matchedCards={matchedCards} />}
            {!isError && areAllCardsMatched && <GameOver  handleClick={resetGame}/>}
            {!isError && isGameOn &&  <MemoryCard handleClick={turnCard} data={emojisData} matchedCards={matchedCards} selectedCards={selectedCards} category={formData.category}/>}
            {isError && <ErrorCard handleClick={resetError} />}
        </main>
    )
} 