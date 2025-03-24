import { useState } from "react";

//covers sign in and up screen

export default function SignUp(props) {

    function handleChange(event){
        setUserData [{
            ...userData,
            [event.target.name]: event.target.value // equates userData "names" to values
        }]
    }

    function handleNewUser(event) {
        event.preventDefault()
        setUserData(userData, event)
        createUser(userData)
    }

    return (
        <>
            <form class="user-form" action="" onSubmit={handleNewUser}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" value={userData.firstName} onChange={handleChange} />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" value={userData.lastName} onChange={handleChange}></input>
                <label htmlFor="userName">Username:</label>
                <input type="text" name="userName" id="userName" value={userData.userName} onChange={handleChange}/>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" />
                <label htmlFor="password">Password:</label>
                <input type="text" name="password" id="password" />
            </form>


        </>)

}