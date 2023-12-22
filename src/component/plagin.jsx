import { React, useState, useEffect } from "react";
import Card from "../components/cards";

const Plag = ({ data, itemsPerPage }) => {
    const [currentData, setCurrentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    useEffect(() => {
        if (data) {
            setTotalPages(Math.ceil(data.length / itemsPerPage));
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            setCurrentData(data.slice(indexOfFirstItem, indexOfLastItem));
        }
        else {
            setCurrentData([]);
            setTotalPages(0);
        }
    }, [data, currentPage, itemsPerPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="row justify-content-center">
                <p className="text-center" id='res'>
                    {data.length > 0 ? "Результаты поиска" : "Нет результатов"}
                </p>
                {currentData.map((item, index) => (
                    <Card key={index} data={item} />
                ))}
            </div>
            <Paginator totalPages={totalPages} paginate={paginate} />
        </div>
    );
};

const Paginator = ({ totalPages, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center d-flex flex-wrap">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Plag;