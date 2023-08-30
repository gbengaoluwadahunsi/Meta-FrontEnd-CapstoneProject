
import  { useState , useReducer  } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const initializeTimes = async () => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const times = await fetchAPI(formattedDate);
  return times;
};

const availableTimesReducer = async (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      const updatedTimes = await fetchAPI(action.selectedDate); // Pass selected date
      return updatedTimes;
    default:
      return state;
  }
};

const calculateUpdatedTimes = (selectedDate) => {
  // For now, just return the same available times regardless of the date
  return initializeTimes();
};


const BookingForm = ({availableTimes, setAvailableTimes, submitForm }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [selectedOccasion, setSelectedOccasion] = useState('Choose occasion');
  const [isFormValid, setIsFormValid] = useState(false);
  const [times, dispatch] = useReducer(availableTimesReducer, initializeTimes());
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  const availableOccasions = [
    'Choose occasion' ,'Birthday', 'Anniversary', 'Bridal/Baby', 'Live Entertainment',
    'Product Launch', 'Just Because I want to', 'Others'
  ];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    const updatedTimes = calculateUpdatedTimes(event.target.value); // Implement this function
    dispatch({ type: 'UPDATE_TIMES', times: updatedTimes }); // Pass updatedTimes to the reducer
    validateForm();
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    validateForm();
  };

  const handleGuestsChange = (event) => {
    setNumberOfGuests(parseInt(event.target.value));
    validateForm();
  };

  const handleOccasionChange = (event) => {
    setSelectedOccasion(event.target.value);
    validateForm();
  };

  const validateForm = () => {
    setIsFormValid(
      selectedDate !== '' &&
      selectedTime !== 'choose time' &&
      numberOfGuests > 0 &&
      selectedOccasion !== 'choose occasion'
    );
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setSelectedDate("");
    setSelectedTime("Choose time");
    setNumberOfGuests(1);
    setSelectedOccasion("Choose Occasion");
    setIsFormSubmitted(true);
    

    

    if (isFormValid) {
      dispatch({ type: 'UPDATE_TIMES' });
      console.log('Form submitted successfully!');
      // You can perform further actions here, like sending the form data to an API
    } else {
      console.log('Form submission failed: Some fields are missing.');
    }
    
  };

  return (
    <section className='form-container'>
      <h1>TABLE RESERVATION FORM</h1>
      <form className='reservation-form' method='post'  onSubmit={handleSubmit}>
        <div>
            <label htmlFor="res-date">Choose date</label>
            <input type="date" id="res-date" name="date"  required value={selectedDate}  onChange={handleDateChange}/>
        </div>
        
        <div>
            <label htmlFor="res-time">Choose time</label>
            <select id="res-time" name="time"  required value={selectedTime} onChange={handleTimeChange}>
                {availableTimes.map(time => (
                    <option key={time} value={time}>{time}</option>
                ))}
            </select>
        </div>

        
        <div>
            <label htmlFor="guests">Number of guests</label>
            <input type="number"  min="1" max="10" id="guests" name ="number"  required value={numberOfGuests} onChange={handleGuestsChange}/>
        </div>

        <div>
            <label htmlFor="occasion">Occasion</label>
            <select
                id="occasion"
                name="occasion"
                required
                value={selectedOccasion}
                onChange={handleOccasionChange}>
                <option value="" disabled>Select an occasion</option>
                {availableOccasions.map(occasion => (
                <option key={occasion} value={occasion}>
                    {occasion}
                </option>
                ))}
            </select>
</div>

        
        <div>
            <button disabled = {!selectedDate || selectedTime === 'Choose time' || numberOfGuests < 1 ||selectedOccasion === 'Choose occasion'} type="submit">Make Your Reservation </button>
        </div>
      </form>
        
    </section>
  );
}

BookingForm.propTypes = {
  availableTimes: PropTypes.array.isRequired,
  setAvailableTimes: PropTypes.func.isRequired,
};
export default BookingForm;

