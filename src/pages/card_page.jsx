import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnimalCard from "../component/AnimalCard";
import Footer from "../component/footer";
import Header from "../component/Header";

const CardPage = () => {
    const location = useLocation()
    console.log(location.state)
    const [card, setCard] = useState({ data: { pet: [] } });
    useEffect(() => request(card, setCard), []);
    const request = (card, setCard) => {
        fetch(`https://pets.сделай.site/api/pets/${location.state}`)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setCard(result);
            })
            .catch(error => console.log('error', error));
    }
    return (
        <div>
            <Header />
            <main style={{ minHeight: "70vh" }} className="m-auto">
                <AnimalCard data={card.data.pet} center={true} />
            </main>
            <Footer />
        </div>
    );
}

export default CardPage;