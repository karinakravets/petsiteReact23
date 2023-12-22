import Header from "../component/Header";
import Footer from "../component/footer";
import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";


const Auth = ()=>{
    let [user, setUser] = useState();
    let [token, setToken] = useState();
    const navigate = useNavigate()
    let blocks = useRef();

    function sign(e) {
        e.preventDefault();

        const forms = document.getElementById('forma')

        if (!forms.checkValidity()) {
            e.stopPropagation()
            forms.classList.add('was-validated')
            return
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(user);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://pets.сделай.site/api/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if ('data' in result) {
                    localStorage.token = result.data.token
                    setToken(result.data.token)
                    let message = 'Вы успешно вошли !!!';
                    blocks.current.innerText = message;
                    blocks.current.style.background = "#34C924"
                    blocks.current.style.color = "black";
                    blocks.current.style.border = "1px solid rgb(19, 136, 8)"
                    blocks.current.style.display = 'flex';
                    navigate('/profile')
                }
                else
                {
                    let message = 'Вы ввели неправильный логин или пароль!!!';
                    blocks.current.innerText = message;
                    blocks.current.style.background = '#C76864';
                    blocks.current.style.color = "black";
                    blocks.current.style.border = "1px solid #801818"
                    blocks.current.style.display = 'flex';
                }})
            .catch(error => console.log('error', error));
    }
    return (
        <div>
            <Header />
            <h1 className="lineReg">Вход в аккаунт</h1>
            <div style={{"minHeight":"70vh"}}>
                <form className="contei1 w-50 m-auto" noValidate onSubmit={sign} id='forma'>
                    <label htmlFor="validationCustom01" className="form-label">Email</label>
                    <input type="email" className="form-control" id="validationCustom01" required onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <div className="invalid-feedback feed">
                        Введите правильный Mail
                    </div>
                    <label htmlFor="validationCustom02" className="form-label">Пароль</label>
                    <input type="password" pattern='^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d]{7,}$' className="form-control" id="validationCustom02" required onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    <div className="invalid-feedback feed">
                        Латинские буквы обязательно одна заглавная, строчная и цифра, минимум 7 символов
                    </div>
                    <div>
                        <br/>
                        <button className="btn btn-primary" style={{ backgroundColor: 'rgb(218, 191, 141)'}} type="submit">Войти</button>
                    </div>
                </form>
                <div className="alert alert-primary w-50 asda mt-3 m-auto" style={{"display":"none"}} role="alert" ref={blocks}></div>
            </div>
            <Footer className="fooot"/>

        </div>
    );
};
export default Auth;