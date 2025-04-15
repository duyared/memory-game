import { data } from '../../data/data'
import Option from './Option'

export default function Select({ handleChange }) {
    /**
     * Challenge:
     * 1) Use a combination of the Object.entries() method and the .map() method to iterate over the "data" object and create a div similar to those that are currently commented out in the "Form" component. Inside the div there should be a label and a select element, but for now, leave out the option elements.
     * 2) Store all of this in a new variable, "selectEl", and return this variable at the bottom of the component.
     * 
     * 💡 Hints:
     * If you're not sure how to use Object.entries(), then take a look at this scrim: https://v2.scrimba.com/build-a-mobile-app-with-firebase-c0g/~08.
     * You can chain .map() onto Object.entries().
     * Remember to set a key on the div.
     * ⚠️ Warning: Our form will now be broken since there are no option elements in the select menus.
     * 
     */
    const selectEl = Object.entries(data).map(([key, value]) => (
        <div key={key} className='form__inner-wrapper'>
            <label htmlFor={key}>Select {key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <select 
            id={key}
            name={key}
            onChange={handleChange}
            >
               <Option valueArray={value} />
            </select>
        </div>
    ))
    return selectEl

}