import {decodeEntity} from 'html-entities'
import EmojiButton from './EmojiButton';

export default function MemoryCard({ handleClick,data,selectedCards,matchedCards,category={category}}) {

    const emojiArray = data;
    const emojiEl = emojiArray.map((emoji, index) =>{
        const selectedCardEntry = selectedCards.find(card=> card.index === index)
        const matchedCardEntry = matchedCards.find(card=> card.index === index)
        
        const cardStyle = matchedCardEntry ? "card-item--matched" : selectedCardEntry ? "card-item--selected":  "" ;
        return  (
        <li key={index} className={`card-item ${cardStyle}`}>
            <EmojiButton
                handleClick={()=> handleClick(emoji.name,index)}
                emoji={emoji}
                selectedCardEntry={selectedCardEntry}
                matchedCardEntry={matchedCardEntry}
                index={index}
                category={category}
        /> 
       </li>)
    }
       
    )
    
    return <ul className="card-container">{emojiEl}</ul>
}