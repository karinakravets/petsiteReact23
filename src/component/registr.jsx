import React from 'react';
import {useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const RegistrationForm = () => {
        let [user, setUser] = useState();
    
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
    
    
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body : new FormData(document.getElementById("forma")),
                redirect: 'follow'
            };
    
    
            fetch("https://pets.сделай.site/api/register", requestOptions)
                .then(response => response.status)
                .then(result => {
                    console.log(result)
                    if (result === 204) {
                        let message = 'Регистрация прошла успешно!!!';
                        blocks.current.innerText = message;
                        blocks.current.style.background = "#34C924"
                        blocks.current.style.color = "black";
                        blocks.current.style.border = "1px solid rgb(19, 136, 8)"
                        blocks.current.style.display = 'flex';
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
            <div style={{ "minHeight": "70vh" }}>
                <form className="w-50 m-auto p-5 needs-validation" style={{ "min-width": "300px" }} noValidate onSubmit={sign} id='forma'>
                    <div className="mb-3">
                        <label htmlFor="validationTextarea" className="form-check-label">Имя</label>
                        <input name="name"  type="name" pattern='^[А-ЯЁа-яё]{2,30}$' className="form-control" id="validationTextarea" aria-describedby="emailHelp"  required onChange={(e) => setUser({ ...user, name: e.target.value })}/>
                        <div className="invalid-feedback">
                            Пожалуйста, введите сообщение в текстовое поле.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="validationTextarea" className="form-label">Номер телефона</label>
                        <input name="phone" type="tel" pattern='^\+7\d{10}$' className="form-control" id="validationTextarea" aria-describedby="emailHelp" required onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Почта</label>
                        <input name='email' type="email"  className="form-control" id="validationTextarea" aria-describedby="emailHelp" required  onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                        <input name="password" type="password" pattern='^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d]{7,}$' className="form-control" id="validationTextarea"  required onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Повторите пароль</label>
                        <input name="password_confirmation" type="password" className="form-control" pattern='^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d]{7,}$' id="validationTextarea"  required onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })} />
                    </div>
                    <div className="mb-3 form-check">
                        <input name="confirm" type="checkbox" className="form-check-input" id="validationTextarea" required onChange={(e) => setUser({ ...user, confirm: e.target.value })}/>
                        <label className="form-check-label" htmlFor="validationFormCheck1">Согласие на обработку персональных данных</label>
                        <div className="invalid-feedback">Обязательное поле</div>
                    </div>
                    <button type="submit" className="btn btn-danger">Зарегистрироваться</button>
                </form>
                <div className="alert alert-danger w-50 asda m-auto" style={{ "display": "none" }} role="alert" ref={blocks}></div>
            </div>
        );
    };
  
export default RegistrationForm;