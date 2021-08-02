//Types
export const Types = {
    SETWALLET: '@setWalletData',
    SETADDRESS: '@setAddress'
}

//Reducer

const INITIAL_STATE = { 
    network: '', 
    accounts: [],
    address: '',
};

export default function reducer(
    state = INITIAL_STATE,
    { type, payload }
) {
    switch (type) {
        case Types.SETWALLET:
            return { ...state, network: payload.network, accounts: payload.accounts };
        case Types.SETADDRESS:
            return { ...state, address: payload.address };
        default:
            return state;
    }
};

//ActionS

export const setWalletData = (network, accounts) => ({ type: Types.SETWALLET, payload: { network, accounts } })
export const setAddress = (address) => ({ type: Types.SETADDRESS, payload: { address } })

