import * as ActionTypes from "./ActionTypes";

export const PromotionsReducer = (state={ isLoading: true, errMsg: null, promos: [] },action)=>{
    switch (action.type) {

        case ActionTypes.ADD_PROMOS:
            return {
              ...state,
              isLoading: false,
              errMsg: null,
              promos: action.payload,
            };
      
          case ActionTypes.PROMOS_LOADING:
            return { ...state, isLoading: true, errMsg: null, promos: [] };
      
          case ActionTypes.PROMOS_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload, promos: [] };
            
        default:
            return state;
    }
}