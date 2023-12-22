import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";



const Footer = () => {
    return (
    <footer class="mt-5 d-flex justify-content-center" style={{ backgroundColor: "rgb(218, 191, 141)" }}>
        <div className="p-3">petsite@ karina kravets,2023</div>        
        <div className="p-3">Все права защищены</div>
    </footer>);
}

export default Footer;