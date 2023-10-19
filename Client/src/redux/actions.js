import axios from "axios";
import { toast } from "react-toastify";
import {
	GET_PROPERTY,
	GET_PROPERTY_DETAIL,
	CLEAN_DETAIL,
	ADD_USER,
	CREATE_PROPERTY,
	ERROR,
	USER_LOGIN,
	FILTERS,
	PROPERTY_EDITED,
	CREATE_BOOKING,
	GET_ALL_BOOKINGS,
	GET_BOOKING,
	GET_ALL_USERS,
	USER_EDITED,
	USER_LOGOUT,
	RESET_STATE,
	PROPERTY_DAYS_EDITED,
	SAVE_PROPERTY,
	REMOVE_FROM_SAVED,
} from "./actions_types";

// const URL = "http://localhost:3001";
export const addPropertyToSaved = (propertyId) => {
	return async (dispatch) => {
		console.log(propertyId);
		try {
			return dispatch({
				type: SAVE_PROPERTY,
				payload: propertyId,
			});
		} catch (error) {
			console.error("Error adding property to saved list:", error);
		}
	};
};

export const getProperty = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("/properties");

			return dispatch({
				type: GET_PROPERTY,
				payload: data,
			});
		} catch (error) {
			return dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
};

export const getPropertyDetail = (id) => async (dispatch) => {
	try {
		const { data } = await axios.get(`/properties/${id}`);
		return dispatch({ type: GET_PROPERTY_DETAIL, payload: data });
	} catch (error) {
		return dispatch({ type: ERROR, payload: error.message });
	}
};

export const cleanDetail = () => {
	return {
		type: CLEAN_DETAIL,
		payload: [],
	};
};

export const createProperty = (values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post("/properties", values);
			toast.success("The property was created successfully");
			return dispatch({
				type: CREATE_PROPERTY,
				payload: data,
			});
		} catch (error) {
			toast.error("Error when creating the property, missing fields");
		}
	};
};

export const editProperty = (propertyEdited) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.put("/properties", propertyEdited);
			return dispatch({
				type: PROPERTY_EDITED,
				payload: data,
			});
		} catch (error) {
			return dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
};

export const editPropertyAvailability = (propertyId, newAvailableDays) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.put(`/properties/${propertyId}`, {
				availableDays: newAvailableDays,
			});
			dispatch({
				type: PROPERTY_DAYS_EDITED,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
};

export const userLogin = (valores) => {
	const url = "/auth/login";
	return async (dispatch) => {
		try {
			const { data } = await axios.post(url, valores);
			const { user } = data;
			dispatch({
				type: USER_LOGIN,
				payload: user,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
};

//!------- User LogOut ---------------
export const userLogOut = () => {
	return {
		type: USER_LOGOUT,
	};
};

export const resetState = () => {
	return {
		type: RESET_STATE,
	};
};
//!-----------------------------------

export const filters = (type, orderPrice) => {
	return {
		type: FILTERS,
		payload: { type, orderPrice },
	};
};

export const updateUser = (userEdited) => {
	console.log("userEdited", userEdited);
	return async (dispatch) => {
		try {
			const { data } = await axios.put("/users", userEdited);
			console.log("soydataAccion", data);
			return dispatch({
				type: USER_EDITED,
				payload: data,
			});
		} catch (error) {
			return dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
};

// export const searchProducto = (query) => {
//   return async (dispatch) => {
//     try {
//       let response;
//       if (!query) {
//         // Si no se proporciona una ciudad, obtén todos los inmuebles
//         response = await axios.get(`${URL}//`);
//       } else {
//         // Si se proporciona una ciudad, realiza la búsqueda por ciudades
//         response = await axios.get(`${URL}/${query}`);
//       }
//       const inmuebles = response.data;
//       dispatch({
//         type: SEARCH_PRODUCTO,
//         payload: inmuebles,
//       });
//     } catch (error) {
//       dispatch({
//         type: ERROR,
//         payload: "City not found",
//       });
//     }
//   };
// };

export const addUser = (user) => async (dispatch) => {
	try {
		const { data } = await axios.post("/users", user);
		console.log("soy data de user", data);
		const { email, password } = data;
		toast.success("User created successfully");
		const userCreated = {
			email,
			password,
		};
		dispatch({ type: ADD_USER, payload: userCreated });
	} catch (error) {
		toast.warning("User already exists");
		dispatch({ type: ERROR, payload: error.message });
	}
};

export const addNewBooking = (bookingData) => async (dispatch) => {
	try {
		const { data } = await axios.post("/bookings", bookingData);
		toast.success("Booking successfull");
		console.log("Booking successfull");
		return dispatch({
			type: CREATE_BOOKING,
			payload: data,
		});
	} catch (error) {
		toast.warning("Error in booking");

		return dispatch({ type: ERROR, payload: error.message });
	}
};

export const getAllBookings = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("/bookings");

			return dispatch({
				type: GET_ALL_BOOKINGS,
				payload: data,
			});
		} catch (error) {
			return dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
};

export const getBooking = (id) => async (dispatch) => {
	try {
		const { data } = await axios.get(`/bookings/${id}`);
		return dispatch({ type: GET_BOOKING, payload: data });
	} catch (error) {
		return dispatch({ type: ERROR, payload: error.message });
	}
};

export const getAllUsers = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("/users");
			return dispatch({
				type: GET_ALL_USERS,
				payload: data,
			});
		} catch (error) {
			return dispatch({
				type: ERROR,
				payload: error.message,
			});
		}
	};
};

// export const filterByUbicacion = (ubicacion) => {

//   return {
//     type: FILTER_BY_UBICACION,
//     payload: ubicacion,
//   };
// };

// export const filterByPrecio = (minPrice, maxPrice, order) => {
//   return {
//     type: FILTER_BY_PRECIO,
//     payload: { minPrice, maxPrice, order },
//   };
// };

// export const filterByPileta = (pileta) => {
//   return{
//   type: FILTER_BY_PILETA,
//   payload: pileta,
//   }
// };

// export const filterByFondo = (fondo) => {
//   return{
//   type: FILTER_BY_FONDO,
//   payload: fondo,
// }};

//   export const orderByResena = (puntuacion) => {
//     return{
//     type: ORDER_BY_RESENA,
//     payload: puntuacion,
//   }
// };

//   export const filterByCategoria = (type) => {

//     return{
//     type: FILTER_BY_CATEGORIA,
//     payload: { type },
//   }
// };
