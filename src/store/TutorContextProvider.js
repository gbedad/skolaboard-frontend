import React, {createContext, useReducer, useContext} from 'react';


export const TutorStateContext = createContext();
export const TutorDispatchContext = createContext();

//const Store = React.createContext();
//Store.displayName = 'Store';

export const TutorProvider = ({children}) => {
  const [state, dispatch] = useReducer(tutorReducer, initialState);

  return <TutorStateContext.Provider value={state}>
    <TutorDispatchContext.Provider value={dispatch}>
      {children}
    </TutorDispatchContext.Provider>
  </TutorStateContext.Provider>
};

export const useTutor = () => {
  return {
    state: useContext(TutorStateContext),
    dispatch : useContext(TutorDispatchContext)
  };
};

const updateUser = JSON.parse(localStorage.getItem("updatecurrentUser"));
console.log(updateUser.picture)

/* 
export const initialState = {form : {name:"",lastname:"", email: "", phone:"", zipcode:"", email2:"", daysPossible:[], topics:[], pedagogical_skills:{}, digital_skills:{}, document:{}, picture :{}, availability:{}, teaching_option:"", course_type:""}};
 */
export const initialState = {form : updateUser};

console.log(initialState)

export const tutorReducer = (state, action) => {
switch (action.type) {
  case "UPDATE_FIELD_PROFILE" : {
    const {key, value} = action.payload;
return {...state, form: {...state.form, [key]: value}}
  }
  default :
  throw new Error(`Unhandled action type: ${action.type}`) 
}
}