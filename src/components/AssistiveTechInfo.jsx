

export default function AssistiveTechInfo({emojisData,matchedCards}){

    const noOfMatchedCards = matchedCards.length
    const noOfLeftCardsToMatch = emojisData.length - noOfMatchedCards
    return(
        <section className="sr-only" aria-atomic="true" aria-live="polite">
            <h2>Game Status</h2>
            <p>{`Number of matched pairs : ${noOfMatchedCards/2}`}</p>
            <p>{`Number of cards left to match : ${noOfLeftCardsToMatch}`}</p>
        </section>
    )
}