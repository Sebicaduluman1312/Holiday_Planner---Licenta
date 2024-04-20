const AutocompleteModal = (props) => {
    const destinations = props.destinations;
    const modalOn = props.modalOn;
    return ( 
    <div className={`autocomplete-modal h-1/3 w-4/6 bg-primary-white rounded-b-md absolute top-3/4 transform translate-y-1/3 overflow-auto ${!modalOn ? 'hidden' : ''}`}>
            {
                destinations.length > 1 && (
                    destinations.map((item, index) => (
                        <div key={index} className="p-4 text-normal font-semibold cursor-pointer hover:bg-primary-black-blue hover:text-primary-white">{item}</div>
                    ))
                )
            }
        </div>
     );
}
 
export default AutocompleteModal;