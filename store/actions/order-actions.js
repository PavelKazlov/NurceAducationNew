export const SET_ORDER = 'SET_ORDER';

export const setOrder = selectedOrder => {
    // console.log('selectedOrder=>', selectedOrder);
    return { type: SET_ORDER, order: selectedOrder }
};