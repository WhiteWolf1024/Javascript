//Types
export const Types = {
    SETID: '@setId',
    SETSTAKES: '@setStakes',
    SETSTAKED: '@setStaked',
    SETTOTALSTAKED: '@setTotalStaked',
    SETDAYSLEFT: '@setDaysLeft',
    SETCOMMITED: '@setCommited',
    SETCOMMITS: '@setCommits',
    SETMIN: '@setMin',
    SETMAX: '@setMax',
    SETNAME: '@setName',
    SETBALANCE: '@setBalance',
    SETEXPIRED: '@setExpired',
    SETPOOLSTATUS: '@setPoolStatus',
    SETCONTENT: '@setContent',
    SETURL: '@setUrl',
    SETMYCOMMITED: '@setMyCommited',
}

//Reducer

const INITIAL_STATE = { 
    id: 1, 
    stakes: '',
    staked: '',
    totalstaked: '',
    daysLeft: '',
    expired: false,
    commited: '',
    commits: '',
    min: 0,
    max: 0,
    name: '',
    balance: 0,
    pool_status: '',
    content: '',
    url: '',
    my_commited: 0
};

export default function reducer(
    state = INITIAL_STATE,
    { type, payload }
) {
    switch (type) {
        case Types.SETID:
            return { ...state, id: payload };
        case Types.SETSTAKES:
            return { ...state, stakes: payload };
        case Types.SETSTAKED:
            return { ...state, staked: payload };
        case Types.SETTOTALSTAKED:
            return { ...state, totalstaked: payload };
        case Types.SETDAYSLEFT:
            return { ...state, daysLeft: payload };
        case Types.SETCOMMITED:
            return { ...state, commited: payload };
        case Types.SETCOMMITS:
            return { ...state, commits: payload };
        case Types.SETMIN:
            return { ...state, min: payload };
        case Types.SETMAX:
            return { ...state, max: payload };
        case Types.SETNAME:
            return { ...state, name: payload };
        case Types.SETEXPIRED:
            return { ...state, expired: payload };
        case Types.SETBALANCE:
            return { ...state, balance: payload };
        case Types.SETPOOLSTATUS:
            return { ...state, pool_status: payload };
        case Types.SETCONTENT:
            return { ...state, content: payload };
        case Types.SETURL:
            return { ...state, url: payload };
        case Types.SETMYCOMMITED:
            return { ...state, my_commited: payload };
        default:
            return state;
    }
};

//ActionS
export const setId = (id) => ({ type: Types.SETID, payload: id })
export const setStakes = (stakes) => ({ type: Types.SETSTAKES, payload: stakes })
export const setStaked = (staked) => ({ type: Types.SETSTAKED, payload: staked })
export const setTotalStaked = (totalstaked) => ({ type: Types.SETTOTALSTAKED, payload: totalstaked })
export const setDaysLeft = (daysLeft) => ({ type: Types.SETDAYSLEFT, payload: daysLeft })
export const setCommited = (commited) => ({ type: Types.SETCOMMITED, payload: commited })
export const setCommits = (commits) => ({ type: Types.SETCOMMITS, payload: commits })
export const setMin = (min) => ({ type: Types.SETMIN, payload: min })
export const setMax = (max) => ({ type: Types.SETMAX, payload: max })
export const setName = (name) => ({ type: Types.SETNAME, payload: name })
export const setExpired = (expired) => ({ type: Types.SETEXPIRED, payload: expired })
export const setBalance = (balance) => ({ type: Types.SETBALANCE, payload: balance })
export const setPoolStatus = (pool_status) => ({ type: Types.SETPOOLSTATUS, payload: pool_status })
export const setContent = (content) => ({ type: Types.SETCONTENT, payload: content })
export const setUrl = (url) => ({ type: Types.SETURL, payload: url })
export const setMyCommited = (my_commited) => ({ type: Types.SETMYCOMMITED, payload: my_commited })
