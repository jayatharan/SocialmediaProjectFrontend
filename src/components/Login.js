import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { Card } from 'react-bootstrap';

const Login = ({ userCheck, getAllPosts, getPersonalDatas }) => {

    const responseGoogle = (response) => {
        const tokenId = response.tokenId
        axios({
            method: "POST",
            url: "http://localhost:5000/user/login",
            data: { tokenId },
        }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data))
            getAllPosts()
            getPersonalDatas()
            userCheck()
        })
    }
    const onFailure = (response)=>{
        console.log(response)
    }

    return (
        <Card className="p-2 mt-3">
            <b>Login with Google</b>
            <hr />
            <GoogleLogin
                clientId="1024970411628-b4s6qus2bui9efecamg85p7e1t9unnsg.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </Card>
    )
}

export default Login
