
export default function SignIn(){


    return (
        <>
            <form class="user-form" action="" onSubmit={handleNewUser}>
                <label htmlFor="userName">Username:</label>
                <input type="text" name="userName" id="userName" value={userData.userName} onChange={handleChange}/>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" />
                <label htmlFor="password">Password:</label>
                <input type="text" name="password" id="password" />
            </form>
        </>
    )
}