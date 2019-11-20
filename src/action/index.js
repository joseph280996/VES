export const signIn = (user) => dispatch => {
    return {
        type: 'SIGN_IN',
        payload: user
    }
}