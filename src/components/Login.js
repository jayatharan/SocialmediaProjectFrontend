import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { Card } from 'react-bootstrap';

const Login = ({ userCheck, getAllPosts, getPersonalDatas }) => {

    const responseGoogle = (response) => {
        const tokenId = response.tokenId
        console.log(tokenId)
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
    //clientId="686177336588-qhhagupocke5qsclkt0n07h9s6c8bbpu.apps.googleusercontent.com"

    return (
        <Card className="p-2 mt-3">
            <b>Login with Google</b>
            <hr />
            <GoogleLogin
                clientId="359230376538-j79misgqm7inonvgpgfkvafa440li4fe.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </Card>
    )
}

export default Login
