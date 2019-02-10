import xhr from 'xhr';

export const REQUEST_CATEGORY_LIST =
    'CATEGORY_LIST/REQUEST_CATEGORY_LIST';

export const REQUEST_CATEGORY_LIST_SUCCESS =
    'CATEGORY_LIST/REQUEST_CATEGORY_LIST_SUCCESS';

export const REQUEST_CATEGORY_LIST_FAIL =
    'CATEGORY_LIST/REQUEST_CATEGORY_LIST_FAIL';

export const requestCategoryList = () => ({ type: REQUEST_CATEGORY_LIST });
export const requestCategoryListSuccess = data => ({
    type: REQUEST_CATEGORY_LIST_SUCCESS,
    data
});
export const requestCategoryListFail = err => ({
    type: REQUEST_CATEGORY_LIST_FAIL,
    err
});

export const getCategoryList = () => async dispatch => {
    dispatch(requestCategoryList());

    return new Promise((resolve, reject) => {
        xhr(
            {
                uri: `/api/category`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization': `Bearer ${access_token}`,
                    // 'Accept-Language': getState().appData.locale
                },
            },
            (err, res, body) => {
                if (err) {
                    dispatch(requestCategoryListFail(err));
                    reject(err);
                } else if (res.statusCode !== 200) {
                    const errData = JSON.parse(body);
                    dispatch(requestCategoryListFail(err));
                    reject(errData);
                } else {
                    const data = JSON.parse(body);
                    dispatch(requestCategoryListSuccess(data));
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
        case REQUEST_CATEGORY_LIST: {
            return {
                ...state,
                isRequesting: true,
                requestSuccess: false,
                requestError: null,
            }
        }
        case REQUEST_CATEGORY_LIST_SUCCESS: {
            return {
                ...state,
                data: action.data,
                isRequesting: false,
                requestSuccess: true,
                requestError: null,
            }
        }
        case REQUEST_CATEGORY_LIST_FAIL: {
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