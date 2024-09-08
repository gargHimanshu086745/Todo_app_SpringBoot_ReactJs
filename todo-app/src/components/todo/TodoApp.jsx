import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import TodoComponent from './TodoComponent'
import AuthProvider, { useAuth } from '../security/AuthContext'

import './TodoApp.css'

function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={ <LoginComponent /> } />
                        <Route path='/login' element={ <LoginComponent /> } />
                        
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute> 
                        } />
                        
                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent /> 
                            </AuthenticatedRoute>
                        } />

                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent /> 
                            </AuthenticatedRoute>
                        } />
  

                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent /> 
                            </AuthenticatedRoute>
                        } />
                        
                        <Route path='*' element={<ErrorComponent /> } />

                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}




// import { useState } from 'react'
// import {BrowserRouter, Routes,Route,useNavigate,useParams, Link} from 'react-router-dom'
// import './TodoApp.css'
// export default function TodoApp(){
    
//     return (
//         <div className="TodoApp">
//             <BrowserRouter>
//                 <HeaderComponent />
//                 <Routes>
//                     <Route path='/' element={<LoginComponent />} />
//                     <Route path='/login' element={<LoginComponent /> } />
//                     <Route path='/welcome/:username' element={<WelcomeComponent /> } />
//                     <Route path='/todos' element={<ListTodosComponent />} />
//                     <Route path='/logout' element={<LogoutComponent />} />
//                     <Route path='*' element={<ErrorComponent />}></Route>
//                 </Routes>
//             <FooterComponent />
//             </BrowserRouter>
//         </div>
//     )
// }


// function LoginComponent(){

//     const [username,setUsername]=useState('in28minutes')

//     const [password,setPassword]=useState('')

//     const [showSuccessMessage,setShowSuccessMessage]=useState(false)

//     const [showErrorMessage,setShowErrorMessage]=useState(false)

//     const navigate = useNavigate();


    // function handleUsernameChange(event){
        // console.log(event.target.value);
        // setUsername(event.target.value);
    // }

    // function handlePasswordChange(event){
        // console.log(event.target.value);
        // setPassword(event.target.value);
    // }

    // function handleSubmit(event){

    //     if(username==='in28minutes' && password==='dummy')
    //     {
    //         console.log("success");
    //         setShowSuccessMessage(true)
    //         setShowErrorMessage(false)
    //         navigate(`/welcome/${username}`)
    //     }
    //     else
    //     {
    //         console.log("Failed");
    //         setShowSuccessMessage(false)
    //         setShowErrorMessage(true)
    //     }
        // console.log(username);
        // console.log(password);
    // }

    // function SuccessMessageComponent()
    // {
    //     if(showSuccessMessage)
    //     {
    //         return (
    //         <div className="successMessage">Authenticated Successfully</div>
    //         )
    //     }
    //     else{
    //         return null
    //     }
    // }

    // function ErrorMessageComponent()
    // {
    //     if(showErrorMessage)
    //     {
    //         return (
    //         <div className="successMessage">Authenticated Failed. Please check your Credentials</div>
    //         )
    //     }
    //     else{
    //         return null
    //     }
    // }

//     return (
//         <div className="Login">
//             {/* <SuccessMessageComponent /> */}
//             {/* <ErrorMessageComponent /> */}
//             {showSuccessMessage && <div className="successMessage">Authenticated Successfully</div>}
//             {showErrorMessage && <div className="successMessage">Authenticated Failed. Please check your Credentials</div>}
            
//             <h1>Time to Login!</h1>
//             <div className="LoginForm">
//                 <div>
//                     <label>User Name:</label>
//                     <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
//                 </div>

//                 <div>
//                     <label>Password:</label>
//                     <input type="password" name="password" value={password} onChange={handlePasswordChange}></input>
//                 </div>

//                 <div>
//                     <button type="button" name="login" onClick={handleSubmit}>login </button> 
//                 </div>
//             </div>
//         </div>
//     )
// }


// function WelcomeComponent()
// {
//     const {username} = useParams()   

//     console.log(username)
//     return(
//         <div className='WelcomeComponent'>

//         <h1>Welcome {username}</h1>
//         <div className='Welcome'>
//            Manage your todos- <Link to="/todos">Go Here</Link>
//         </div>

//         </div>
//     )
// }

// function ErrorComponent(){
//     return(
//         <div className="ErrorComponent">
                            
//             <h1>We are working really hard</h1>
//             <div>
//                 Apologies for the 404. Reach out to our team at ABC-DEF-GHIJ.
//             </div>

//         </div>
//     )
// }

// function ListTodosComponent(){

//     const today = new Date();

//     const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay() );

//     const todos = [ 
//                     {id:1 , description:'Learn AWS', done:false, targetDate:targetDate},
//                     {id:2 , description:'Learn Full Stack Dev', done:false, targetDate:targetDate},
//                     {id:3 , description:'Learn DevOps', done:false, targetDate:targetDate}
//                     ]

//     return(
//         <div className="container">
                            
//             <h1>Things you want to Do!</h1>
//             <div>
//                 <table className='table'>
//                     <thead>
//                         <tr>
//                             <td>ID</td>
//                             <td>Description</td>
//                             <td>Is Done?</td>
//                             <td>Target Date</td>
//                         </tr>
//                     </thead>
//                     <tbody>
//                     {
//                                 todos.map(
//                                     todo => (
//                                         <tr>
//                                         <td>{todo.id}</td>
//                                         <td>{todo.description}</td>
//                                         <td>{todo.done.toString()}</td>
//                                         <td>{todo.targetDate.toString()}</td>

//                                         </tr>
//                                     )
//                                 )
//                     }
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     )
// }

// function HeaderComponent(){
//     return(
//         <header className="border-bottom border-light border-5 mb-5 p-2">
//         <div className="container">
//             <div className="row">
//                 <nav className="navbar navbar-expand-lg">
//                     <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">in28minutes</a>
//                     <div className="collapse navbar-collapse">
//                         <ul className="navbar-nav">
//                             <li className="nav-item fs-5"><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>
//                             <li className="nav-item fs-5"><Link className="nav-link" to="/todos">Todos</Link></li>
//                         </ul>
//                     </div>
//                     <ul className="navbar-nav">
//                         <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>
//                         <li className="nav-item fs-5"><Link className="nav-link" to="/logout">Logout</Link></li>
//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     </header>

//     )
// }

// function FooterComponent(){
//     return(
//         <footer className="footer">
            
//             <div className="container">
//                 Your Footer

//             </div>

//         </footer>
//     )
// }

// function LogoutComponent(){
//     return(
//         <div className="LogoutComponent">
                            
//             <h1>You Are Logged out!</h1>
//             <div>
//                 Thank you for using our App.  Come Back Soon!
//             </div>

//         </div>
//     )
// }