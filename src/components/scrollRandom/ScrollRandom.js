import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {random} from "../../redux/actions";

const ScrollRandom = () => {
    const dispatch = useDispatch();
    const randomState = useSelector(state => state.randomReducer.dataGiphyRandom);

    useEffect(() => {
        document.addEventListener("scroll", scrollRandom);
        return function (){
            document.addEventListener("scroll", scrollRandom)
        }
    }, [])

    useEffect(() => {
            dispatch(random())
    }, [])

    const scrollRandom = () => {
        console.log("strat")
    }


    return (
        <div className="container">
            <div className="d-flex flex-wrap justify-content-center">
            {
                randomState.length ? randomState.map((item, index) => {
                    return <img src={item.url} className="gif" key={index}/>
                }) : <div className="text-center mt-2 text-white">
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            }
            </div>
        </div>
    );
};

export default ScrollRandom;