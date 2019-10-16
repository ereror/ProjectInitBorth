import { GET_USER_INFO } from 'actions/userInfo';


const initState = {
    userInfo: {},
    openId: ''
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case GET_USER_INFO:
            console.log(action)
            return {
                ...state,
                openId: action.openId,
            };
        default:
            return state;
    }
}