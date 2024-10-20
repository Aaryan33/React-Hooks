import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Countdown = () => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(3);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    shippingAcc: '',
  });

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(timerRef.current);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [minutes, seconds]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      {!isSubmitted && (
        <form onSubmit={handleSubmit}>
          <h2>Enter your shipping information</h2>
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="shippingAcc">Shipping Account:</label>
            <input
              type="text"
              name="shippingAcc"
              id="shippingAcc"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit" className='Submit'>Submit</button>
          </div>
          <div>
            <p>You have {minutes} Minutes, {seconds} Seconds left before confirming order</p>
          </div>
        </form>
      )}
      {isSubmitted && minutes === 0 && seconds === 0 && (
        <div>
          <h2 className='Timeout'>Timeout</h2>
          <hr />
          <p>The cart has timed out. Please try again!</p>
        </div>
      )}
      {isSubmitted && (minutes > 0 || seconds > 0) && (
        <div>
          <h2>Thank you for your order!</h2>
          <p>Your information:</p>
          <ul>
            <li>Full Name: {formData.fullName}</li>
            <li>Contact Number: {formData.contactNumber}</li>
            <li>Shipping Account: {formData.shippingAcc}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Countdown;


// import logo from './logo.svg';
// import './App.css';
// import { useReducer } from "react";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// const initialState = {count:0};

// function reducer(state,action){
//     switch(action.type){
//         case 'increment':
//             return{count :state.count + 1};
//         case 'decrement':
//             return{count: state.count -1};
//         default:
//             throw new Error();        
//     }
// }

// function Counter(){
//     const[state,dispatch] =useReducer(reducer,initialState);
//     return(
//         <>

//             Count:{state.count}
//             <button onClick={()=> dispatch({type:'decrement'})}>-</button>
//             <button onClick={()=> dispatch({type:'increment'})}>+</button>

//         </>
//     )
// }

// export default Counter;



// ------------------------ React Hook Form --------------------------- //

// import React from "react";
// import { useForm } from "react-hook-form";

// const RegisterForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm({mode: "onBlur"});
//   const handleRegistration = (data) => console.log(data);
//   const handleError = (errors) => {};

//   const registerOptions = {
//     name: { required: "Name is required" },
//     email: { required: "Email is required" },
//     password: {
//       required: "Password is required",
//       minLength: {
//         value: 8,
//         message: "Password must have at least 8 characters"
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(handleRegistration, handleError)}>
//       <div>
//         <label>Name</label>
//         <input name="name" type="text" {...register('name', registerOptions.name) }/>
//         <small className="text-danger">
//           {errors?.name && errors.name.message}
//         </small>
//       </div>
//       <div>
//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           {...register('email', registerOptions.email)}
//         />
//         <small className="text-danger">
//           {errors?.email && errors.email.message}
//         </small>
//       </div>
//       <div>
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           {...register('password', registerOptions.password)}
//         />
//         <small className="text-danger">
//           {errors?.password && errors.password.message}
//         </small>
//       </div>
//       <button>Submit</button>
//     </form>
//   );
// };
// export default RegisterForm;


// ------------------------- Assignment 2 - question (1) ----------------------- //


// import React, { useState } from 'react';
// import './App.css';

// const BookList = () => {
//   const [selectedBooks, setSelectedBooks] = useState([]); 
//   const [error, setError] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!selectedBooks.length) {
//       setError(true);
//     } 
//     else {
//       setError(false);
//     }
//   };

//   const handleChange = (event) => {
//     const { checked, value } = event.target;

//     if (checked) {
//       setSelectedBooks([...selectedBooks, value]);
//     } 
//     else {
//       setSelectedBooks(selectedBooks.filter((book) => book !== value));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Choose from wide variety of books avilable in store</h3>
//       {error && <p className='errorpara'>Please select at least one book to continue.</p>}
//       <div>
//         <input
//           type="checkbox"
//           id="book1"
//           name="book"
//           value="zero-to-one"
//           onChange={handleChange}
//         />
//         <label for="book1">Zero to One - Peter Thiel</label>
//       </div>
//       <div>
//         <input
//           type="checkbox"
//           id="book2"
//           name="book"
//           value="monk-who-sold-his-ferrari"
//           onChange={handleChange}
//         />
//         <label for="book2">Monk who sold his Ferrari - Robin Sharma</label>
//       </div>
//       <div>
//         <input
//           type="checkbox"
//           id="book3"
//           name="book"
//           value="wings-of-fire"
//           onChange={handleChange}
//         />
//         <label for="book3">Wings of Fire - A.P.J. Abdul Kalam</label>
//       </div>

//       <button className="Submit" type="submit">Submit</button>
//     </form>
//   );
// };

// export default BookList;

