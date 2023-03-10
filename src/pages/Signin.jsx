import { React, useState, useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import google from '../img/google.png'
import fb from '../img/fb.png'
import aritzia from '../img/aritzia.png'
import logo from '../img/logo.png'

const Signin = () => {

    const navigate = useNavigate();

    function navigator(event) {
        navigate(`/community`)
    }

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userData);
        setUserData({ email: "", password: "" });
        navigator();
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.post('/api/signin', { email, password })
    //         .then(response => {
    //             console.log(response);
    //             if (response.data.authenticated) {
    //                 setUserData({ email: "", password: "" });
    //                 navigator();
    //             } else {
    //                 // Handle unsuccessful login
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };

    return (
        <Wrapper>
            <Icon src={logo} />
            <Header>Join a community of fashion enthusiasts.</Header>
            <Sign>
                <Sub>Sign In</Sub>
                <Form onSubmit={handleSubmit}>
                    <Input
                    label="Email"
                    type="email" 
                    placeholder="Email"
                    name="email"
                    value={userData.email}
                    required
                    onChange={handleChange} />
                    <Input
                    label="Password"
                    type="password" 
                    placeholder="Password"
                    name="password" 
                    value={userData.password}
                    required
                    onChange={handleChange} />
                    <Submit type="submit">Sign in</Submit>
                </Form> 
                <Cont>
                    <Hr />
                    <Sub style={{ textAlign: 'center', fontSize: '20px', marginTop: '25px' }}>Or continue with</Sub>
                    <Hr />
                </Cont>
                <Items>
                    <Item><Logo style={{ width: '60px', marginLeft: '34px', marginTop: '-5px' }} src={google} /></Item>
                    <Item><Logo style={{ width: '50px', marginLeft: '36px' }} src={fb} /></Item>
                    <Item><Logo style={{ width: '140px', marginTop: '5px' }} src={aritzia} /></Item>
                </Items>
                <Sub style={{ textAlign: 'center', fontSize: '20px', marginTop: '25px' }}>Don't have an account? <Link to="/" style={{ textDecoration: "none" }}>Sign up</Link></Sub>
            </Sign>
        </Wrapper>
    )
}

export default Signin

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 46px;
    margin-bottom: 40px;
`

const Cont = styled.div`
    display: flex;
    align-items: center;   
    justify-content: center;
`

const Hr = styled.hr`
    color: black;
    background-color: black;
    width: 200px;
    border-color: transparent;
    height: 0.5px;
    align-self: center;
    justify-self: center;
    margin-top: 15px;
`

const Header = styled.h1`
    text-align: center;
    font-size: 36px;
    font-family: 'Alegreya Sans', sans-serif;
    font-weight: 500;
`

const Items = styled.div`
    display: flex;
    gap: 30px;
    margin-top: 5px;
`

const Item = styled.div`
    border: 1px solid black;
    border-radius: 8px;
    padding: 24px;
    width: 200px;
    height: 50px;
    align-items: center;
    justify-content: center;
`

const Logo = styled.img`
    align-self: center;
`

const Sub = styled.h3`
    text-align: left;
    font-size: 24px;
    font-weight: 500;
    font-family: 'Exo 2', sans-serif;
`

const Sign = styled.div`
    align-self: center;
    display: flex;
    flex-direction: column;
    width: 600px;
`

const Input = styled.input`
    border: 1px solid black;
    text-color: #969696;
    padding: 24px;
    font-size: 22px;
    font-family: 'Exo 2', sans-serif;
    border-radius: 8px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: -6px;
    gap: 30px;
`

const Submit = styled.button`
    border-color: transparent;
    font-size: 24px;
    font-family: 'Exo 2', sans-serif;
    text-align: center;
    padding: 24px;
    margin-top: 16px;
    color: #969696;
    border-radius: 8px;
    cursor: pointer; 
    &:hover {
        background: black;
        color: white;
    }
`

const Icon = styled.img`
    width: 70px;
    align-self: center;
`