import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuickSearchRequest } from "../requests";

let attempts = 0

const QuickSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [card, setCard] = useState({ data: { orders: [] } })
    const navigate = useNavigate();

    const submitSearch = (e) => {
        e.preventDefault()
        console.log(searchTerm);
        navigate("/search", { state: { query: searchTerm } }); 
    };

    const onChange = (e) => {
        setSearchTerm(e.target.value)
        if (e.target.value.length > 3) {
            if (attempts > 0) {
                document.getElementById("noSearch").id = 'pets'
                attempts = 0
            }
            setTimeout(() => QuickSearchRequest(e.target.value, card, setCard), 1000)
        }
        else {
            if (attempts == 0) {
                document.getElementById("pets").id = 'noSearch'
            }
            attempts++
        }
    }

    const tipsSet = new Set()
    card.data.orders.map((order) => {
        if (tipsSet.size < 5) {
            tipsSet.add(order.description)
            return <option value={order.description}></option>
        }
    })
    const tips = []
    for (const tip of tipsSet.keys()) {
        tips.push(<option value={tip}></option>)
    }

    return (
        <form className="d-flex minWidth" role="search" onSubmit={submitSearch}>
            <datalist id="pets">
                {tips}
            </datalist>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Поиск"
                aria-label="Поиск"
                list="pets"
                value={searchTerm}
                onChange={onChange}
            />
            <button className="btn btn-outline-light" type="submit" style={{backgroundColor: 'rgb(218, 191, 141)'}}>Поиск</button>
        </form>
    );
}

export default QuickSearch;