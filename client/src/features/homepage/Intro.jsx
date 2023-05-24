import { Link } from "react-router-dom"

export default function Intro() {

  return (
    <div>
      <h1>Hello ... are you supposed to be here?</h1>
      <h1>Currently, this is for letter sending, but one day, it can be for anyone!</h1>
      <h1>If you're supposed to be here</h1>
    
      <Link to="/sign-in"> Sign In </Link>
      <Link to="/sign-up"> Sign Up </Link>
    </div>
   
  )
}