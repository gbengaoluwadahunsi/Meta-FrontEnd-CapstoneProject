import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm, { initializeTimes, availableTimesReducer } from './BookingForm';

// Mock fetchAPI function
jest.mock('./path-to-fetchAPI', () => ({
  fetchAPI: jest.fn().mockResolvedValue(['17:00', '18:00', '19:00'])
}));

test('Renders the BookingForm heading', () => {
  render(<BookingForm availableTimes={[]} setAvailableTimes={() => {}} />);
  const headingElement = screen.getByText("TABLE RESERVATION FORM");
  expect(headingElement).toBeInTheDocument();
});

test('initializeTimes returns the correct array of times', async () => {
  const expectedTimes = ['17:00', '18:00', '19:00'];
  const result = await initializeTimes();
  expect(result).toEqual(expectedTimes);
});

test('updateTimes updates available times based on selected date', () => {
  const initialState = ['17:00', '18:00', '19:00'];
  const selectedDate = '2023-09-01'; // Change this to your desired date

  const action = { type: 'UPDATE_TIMES', selectedDate };
  const result = availableTimesReducer(initialState, action);

  // Mocked fetchAPI should return updated times based on selectedDate
  const expectedUpdatedTimes = ['20:00', '21:00', '22:00'];
  expect(result).toEqual(expectedUpdatedTimes);
});

test('Form input fields have correct HTML5 validation attributes', () => {
  render(<BookingForm availableTimes={[]} setAvailableTimes={() => {}} />);
  
  const dateInput = screen.getByLabelText('Choose date');
  expect(dateInput).toHaveAttribute('type', 'date');
  expect(dateInput).toBeRequired();
  
  const timeInput = screen.getByLabelText('Choose time');
  expect(timeInput).toHaveAttribute('name', 'time');
  expect(timeInput).toBeRequired();
  
  const guestsInput = screen.getByLabelText('Number of guests');
  expect(guestsInput).toHaveAttribute('type', 'number');
  expect(guestsInput).toHaveAttribute('min', '1');
  expect(guestsInput).toHaveAttribute('max', '10');
  expect(guestsInput).toBeRequired();
  
  const occasionInput = screen.getByLabelText('Occasion');
  expect(occasionInput).toHaveAttribute('name', 'occasion');
  expect(occasionInput).toBeRequired();
});

test('JavaScript validation functions work correctly', () => {
  render(<BookingForm availableTimes={[]} setAvailableTimes={() => {}} />);
  
  const dateInput = screen.getByLabelText('Choose date');
  const timeInput = screen.getByLabelText('Choose time');
  const guestsInput = screen.getByLabelText('Number of guests');
  const occasionInput = screen.getByLabelText('Occasion');
  
  fireEvent.change(dateInput, { target: { value: '2023-09-01' } });
  fireEvent.change(timeInput, { target: { value: '18:00' } });
  fireEvent.change(guestsInput, { target: { value: '4' } });
  fireEvent.change(occasionInput, { target: { value: 'Birthday' } });
  
  // Now you can assert that the form is valid
  // and also test invalid cases by changing the input values
});

// Other existing tests...
