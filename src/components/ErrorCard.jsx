import RegularButton from "./RegularButton";

export default function ErrorCard({handleClick}){
    return(
        <div className="wrapper wrapper--accent" aria-atomic="true" aria-live="polite" aria-label="Error component">
            <p className="p--large">Sorry, there was an error.</p>
            <p className="p--regular">Please come back later or click the button below to try rstarting the game.</p>
            <RegularButton
             handleClick={handleClick}
             >
                Restart game
            </RegularButton>
        </div>
    )
}