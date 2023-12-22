import Header from "../component/Header";
import AnimalCard from "../component/AnimalCard";
import Podpiska from "../component/podpiska";
import Footer from "../component/footer";
import React, { useEffect, useState } from 'react';
import AnimalCarousel from "../component/AnimalCarusel";

const Main = ()=>{
    let [card, setCard]=useState({data:{orders:[]}});
    useEffect(()=>req_card(card, setCard), []);
    function req_card(card, setCard) {
        fetch("https://pets.сделай.site/api/pets")
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setCard(result)
            })
            .catch(error => console.log('error', error));
    }
    let  cards=card.data.orders.map((order, index)=>{
        return<AnimalCard data={order}/>;
    })
    return(
        <div>
            <Header/>
            <AnimalCarousel/>
            <h2 className="text-center text-white p-3" style={{ backgroundColor: "rgb(218, 191, 141)" }}>Карточки найденных животных</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4 w-75 m-auto">
                {cards}
            </div>
            <Podpiska/>
           <Footer/>
        </div>
    );
}; 
export default Main;