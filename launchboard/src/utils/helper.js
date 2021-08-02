export const setItem = (key, item) => { // set session
    if(item) {
        window.localStorage.setItem(key, item);
    } else {
        window.localStorage.removeItem(key);
    }
}

export const getItem = (key) => {       // get session
    if(key) {
        return window.localStorage.getItem(key);
    }
}

export function MakeAmountStyle(number, is_token_based = false) {
    if(is_token_based == true)
        number = number / 1000000000000000000;
    var styledNumber;
    var unit;
    if(number > 1000000000000){
        styledNumber = number / 1000000000000;
        unit = "T";
    }      
    if(number > 1000000000 && number <= 1000000000000){
        styledNumber = number / 1000000000;
        unit = "G";
    }        
    if(number > 1000000 && number <= 1000000000) {
        styledNumber = number / 1000000;
        unit = "M";
    }
    if(number > 1000 && number <= 1000000) {
        styledNumber = number / 1000;
        unit = "K";
    }
    if(number <= 1000) {
        styledNumber = number;
        unit = "";
    }
    styledNumber = Math.round(styledNumber, 5);
    return styledNumber.toString()+unit;
}