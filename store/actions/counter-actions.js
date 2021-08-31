export const SET_TEST_INTERVAL = 'SET_TEST_INTERVAL';
export const SET_MAX_TIME = 'SET_MAX_TIME';
// export const SET_PASSED_INTERVAL = 'SET_PASSED_INTERVAL';
// export const SET_MINUTES = 'SET_MINUTES';
// export const SET_SECONDS = 'SET_SECONDS';

export const setTestInterval = testInterval => {
    return { type: SET_TEST_INTERVAL, interval: testInterval }
};
// export const setMaxTime = maxTime => {
//     return { type: SET_MAX_TIME, time: maxTime }
// };
// export const setPassedInterval = passedInterval => {
//     console.log('passedInterval=>', passedInterval);
//     return { type: SET_PASSED_INTERVAL, passedInt: passedInterval }
// };
// export const setMunutes = remainMinutes => {
//     // console.log('remainMinutes=>', remainMinutes);
//     return { type: SET_MINUTES, minutes: remainMinutes }
// };
// export const setSeconds = remainSeconds => {
//     // console.log('remainSeconds=>', remainSeconds);
//     return { type: SET_SECONDS, seconds: remainSeconds }
// };