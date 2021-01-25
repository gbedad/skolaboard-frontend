import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Beneficiary=  ({userToken}) => {
    const location = useLocation()
    const {email, lastname, name, id}=location.state
console.log(email, id)
console.log(userToken)

    return (
        <div>
            <div>
            <span>id : {id}</span>
            <br/>
            <span>email : {email}</span>
            <br/>
            <span>nom : {name} {lastname}</span>
            <br/>
            </div> 
            <div>
            <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           {errors.email && touched.email && errors.email}
           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           {errors.password && touched.password && errors.password}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik>
            </div>
        </div>
    )
}

export default Beneficiary
