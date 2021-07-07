import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'

const Login = () => {
    const responseGoogle = (response) => {
    const tokenId = response.tokenId
    axios({
        method:"POST",
        url:"http://localhost:5000/user/login",
        data: {tokenId},
    }).then((response) => {
        localStorage.setItem('user',JSON.stringify(response.data))
        console.log(JSON.parse(localStorage.getItem('user')))
    })
    }
    return (
        <div>
            <h1>Google Login</h1>
            <GoogleLogin
                clientId="1024970411628-b4s6qus2bui9efecamg85p7e1t9unnsg.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Login