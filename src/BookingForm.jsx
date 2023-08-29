
import  { useState } from 'react';

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('choose time');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [selectedOccasion, setSelectedOccasion] = useState('Choose occasion');
  const [isFormValid, setIsFormValid] = useState(false);

  const availableTimes = [
    'Choose time', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const availableOccasions = [
    'Choose occasion' ,'Birthday', 'Anniversary', 'Bridal/Baby', 'Live Entertainment',
    'Product Launch', 'Just Because I want to', 'Others'
  ];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedDate("");
    setSelectedTime("Choose time");
    setNumberOfGuests(1);
    setSelectedOccasion("Choose Occasion");
    

    if (isFormValid) {
    
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
            <input type="date" id="res-date" name="date"  required value={selectedDate} onChange={handleDateChange}/>
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

export default BookingForm;

