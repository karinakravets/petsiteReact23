import React from 'react';
import Header from "../component/Header";
import Search from "../component/search";
import Podpiska from "../component/podpiska";
import Footer from "../component/footer";




const Searchf = ()=>{
    return(
        <div>
            <Header/>
            <Search/>
            <Podpiska/>
           <Footer/>
        </div>
    );
};

export default Searchf;