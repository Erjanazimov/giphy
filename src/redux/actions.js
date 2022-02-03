import {RANDOM_SCROLL, SCROLL_STATE} from "./type";
import {toast} from "react-toastify";
const mas = [];
let num = 0;
const data = localStorage.getItem("data");
const parse = JSON.parse(data);

export const trending = (current) => {
        return async dispatch => {
            try {
                const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh&limit=${current}&rating=g`);
                const jsonData = await response.json();
                dispatch({
                    type: SCROLL_STATE,
                    data: jsonData.data,
                })
            } catch (err) {
               toast.error("Ошибка Api" + err)
            }
        }
}

export const random = () => {
        return async dispatch => {
            try {
                    const response = await fetch("https://api.giphy.com/v1/gifs/random?api_key=sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh&limit=50&rating=g");

                    const jsonData = await response.json();

                    if (!parse) {
                        mas.push(jsonData.data.images.downsized);
                        localStorage.setItem("data", JSON.stringify(mas));
                    }

                      const time = setInterval(() => {
                            if (response.ok && num < 10) {
                                funcBefore(dispatch)
                            } else {
                                clearInterval(time)
                            }
                        }, 200)

            } catch (err) {
                toast.error("Ошибка Api" + err)
            }
        }
}

function funcBefore (dispatch) {
    const url = "https://api.giphy.com/v1/gifs/random?api_key=sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh&limit=50&rating=g"
    fetch(url)
        .then(res => res.json())
        .then(data => {
            num++
            mas.push(data.data.images.downsized)
            localStorage.setItem("data", JSON.stringify(mas));

            if (num === 9){
                dispatch(startGet())
            }
        })
}


 export const startGet = () => {
     const data = localStorage.getItem("data");
     const parse = JSON.parse(data);
    return {
        type: RANDOM_SCROLL,
        parse
    }
}
