import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import ButtonsCard from './buttonsCard';
import { GetProfileRequest } from '../requests';
const ProfileData = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({ email: "", phone: "", name: "", registrationDate: new Date() });
  const [card, setCard] =  useState({ data: { orders: [] } });
  const request = (card, setCard) => {
      fetch("https://pets.сделай.site/api/users/orders", {
          headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
      }).then(response => response.json()).then(result => {
          console.log(result);
          if ('data' in result) {
              if (result.data.orders.length > 0) {
                  document.getElementById("userCards").style.display = 'flex'
                  document.getElementById("noOrders").style.display = 'none'
                  setCard(result)
              }
              else {
                  document.getElementById("userCards").style.display = 'none'
                  document.getElementById("noOrders").style.display = 'block'
              }
          }
      }).catch(error => console.log('error', error));
  }
  useEffect(() => {
      GetProfileRequest(profile, setProfile)
      request(card, setCard)
  }, []);

  const requestUpdate = (key) => {
      fetch(`https://pets.сделай.site/api/users/${key}?${key}=${profile[key]}`, {
          method: "PATCH",
          headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
      }).then(response => response.json()).then(result => {
          console.log(result);
          if ('data' in result) {
              document.getElementById(`success_${key}`).style.display = 'block'
          }
      }).catch(error => console.log('error', error));
  }

  const cards = card.data.orders.map((order) => {
      return <ButtonsCard data={order}/>;
  });

  const handleInputChange = (e) => {
      const { name, value } = e.target;

      setProfile((prevData) => ({...prevData, [name]: value}));
  }

  const handleSubmit = (key) => {
    requestUpdate(key)
      document.getElementById('success_phone').style.display = 'none'
      document.getElementById('success_email').style.display = 'none'
  };

  return (
      <main style={{ "minHeight": "70vh" }}>
          <h2 className="text-center text-white m-auto" style={{ backgroundColor: 'rgb(218, 191, 141)', width: '90%' }}>Личный кабинет</h2>
          <div className="w-25 m-auto minContainer d-flex" style={{flexDirection: "column"}}>
              <form>
                  <div className="row mb-3">
                      <label htmlFor="name" className="col-form-label">Имя</label>
                      <div className="col-sm-10 w-100">
                          <input className="form-control m-auto" id="name" value={profile.name} readOnly />
                      </div>
                  </div>
              </form>
              <form>
                  <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-form-label">Эл. почта</label>
                      <div className="col-sm-10 w-100">
                          <input name="email" type="email" value={profile.email} className={`form-control m-auto`} id="email" onChange={handleInputChange} />
                          <p className='text-center text-success' id='success_email' style={{ display: "none" }}>Почта изменена</p>
                      </div>
                      <p className="btn btn-primary mt-3 w-50 m-auto" style={{border:"none", backgroundColor: 'rgb(218, 191, 141)'}} onClick={() => handleSubmit("email")}>Изменить</p>
                  </div>
                  <div className="row mb-3">
                      <label htmlFor="tel" className="col-form-label">Телефон</label>
                      <div className="col-sm-10 w-100">
                          <input name="phone" type="tel" className={`form-control m-auto`} id="phone" value={profile.phone} onChange={handleInputChange} />
                          <p className='text-center text-success' id='success_phone' style={{ display: "none" }}>Телефон изменен</p>
                      </div>
                      <p className="btn btn-primary mt-3 w-50 m-auto" style={{border:"none",  backgroundColor: 'rgb(218, 191, 141)'}} onClick={() => handleSubmit("phone")}>Изменить</p>
                  </div>
              </form>
              <p>Количество дней с момента регистрации: {Math.floor((new Date() - new Date(profile.registrationDate)) / 86400000) || 0}</p>
              <p onClick={() => {
                  localStorage.setItem("token", null);
                  navigate('/login')
              }} className="btn btn-primary w-50" style={{border:"none", alignSelf: "center",backgroundColor: 'rgb(218, 191, 141)'}}>Выйти</p>
          </div>
          <p className='text-center' id='success' style={{ color: "white" }}>Вы вышли из аккаунта</p>
          <h2 className="text-center text-white m-auto" style={{ backgroundColor: 'rgb(218, 191, 141)', width: '90%' }}>Ваши карточки</h2>
          <p className='text-center' id='noOrders' style={{ display: 'none' }}>Нет объявлений</p>
          <div className="d-flex flex-wrap justify-content-center" id='userCards' style={{display:"none"}}>
              {cards}
          </div>
      </main>
  );
}
export default ProfileData;