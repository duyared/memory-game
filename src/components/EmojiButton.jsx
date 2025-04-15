import { decodeEntity } from "html-entities"
import Imagedata from "../../data/images";
export default function EmojiButton({emoji,index,handleClick,selectedCardEntry,matchedCardEntry,category}){
  const btnContent =  
  (selectedCardEntry || matchedCardEntry) 
  ? (category === "habesha-foods" 
      ? emoji?.value || "default_value" // Fallback if emoji.value is undefined
      : decodeEntity(emoji?.htmlCode?.[0] || "") // Fallback for empty array
    )
  : "?";
    const btnAria
     = matchedCardEntry ? `${decodeEntity(emoji.name)} matched` : 
     selectedCardEntry ? `${decodeEntity(emoji.name)} Not matched yet` :
      "Card upside down";

    const btnStyle
     =   matchedCardEntry ? "btn--emoji__back--matched" :
     selectedCardEntry ? "btn--emoji__back--selected" : 
      "btn--emoji__front"

    return (
         <button
            aria-label={`Position ${index + 1}: ${btnAria}`}
            className={`btn btn--emoji ${btnStyle}`}
            onClick={selectedCardEntry ? null : handleClick}
            disabled= {matchedCardEntry}
            aria-live="polite"
            > 
              {
    category === "habesha-foods"  && btnContent != "?" ? (
   
        <img className="btn--image"
        src={`/images/${btnContent}`}  />
   
    ) : (
        btnContent
    )
} 
           

    </button>
    )
}