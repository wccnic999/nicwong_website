import xhr from 'xhr';

export const REQUEST_WORK_LIST =
    'REQUEST_WOR/REQUEST_WORK_LIST';

export const REQUEST_WORK_LIST_SUCCESS =
    'REQUEST_WOR/REQUEST_WORK_LIST_SUCCESS';

export const REQUEST_WORK_LIST_FAIL =
    'REQUEST_WOR/REQUEST_WORK_LISTT_FAIL';

export const requestWorkList = () => ({ type: REQUEST_WORK_LIST });
export const requestWorkListSuccess = data => ({
    type: REQUEST_WORK_LIST_SUCCESS,
    data
});
export const requestWorkListFail = err => ({
    type: REQUEST_WORK_LIST_FAIL,
    err
});

export const getWorkList = () => async dispatch => {
    dispatch(requestWorkList());

    return new Promise((resolve, reject) => {
        xhr(
            {
                uri: `/api/work`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            },
            (err, res, body) => {
                if (err) {
                    dispatch(requestWorkListFail(err));
                    reject(err);
                } else if (res.statusCode !== 200) {
                    const errData = JSON.parse(body);
                    dispatch(requestWorkListFail(err));
                    reject(errData);
                } else {
                    const data = JSON.parse(body);
                    dispatch(requestWorkListSuccess(data));
                    resolve(data);
                }
            }
        )
    })
}

const initialState = {
    data: [],
    isRequesting: false,
    requestSuccess: false,
    requestError: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_WORK_LIST: {
            return {
                ...state,
                isRequesting: true,
                requestSuccess: false,
                requestError: null,
            }
        }
        case REQUEST_WORK_LIST_SUCCESS: {
            return {
                ...state,
                data: action.data,
                isRequesting: false,
                requestSuccess: true,
                requestError: null,
            }
        }
        case REQUEST_WORK_LIST_FAIL: {
            return {
                ...state,
                isRequesting: false,
                requestSuccess: false,
                requestError: action.error,
            }
        }
        default: {
            return state
        }
    }
}