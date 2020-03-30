// A basic thunk-like middleware that supports invoking a function via dispatch.
export const thunkMiddleware = (dispatch, state) => input =>
  input instanceof Function ? input(dispatch, state) : dispatch(input);
