import {combineReducers} from 'redux';

interface ScoreState {
  loading: boolean;
  moreLoading: boolean;
  error: string | null;
  moreError: string | null;
  data: Array<any>;
  isListEnd: boolean;
}

// Define types for the actions
interface LocalRequestAction {
  type: 'LOCAL_REQUEST';
}

interface LocalSuccessAction {
  type: 'LOCAL_SUCCESS';
  data: Array<[string, number]>;
}

interface LocalFailureAction {
  type: 'LOCAL_FAILURE';
  error: string;
}

interface LocalListEndAction {
  type: 'LOCAL_LIST_END';
}

interface ApiRequestAction {
  type: 'API_REQUEST';
  payload: {
    page: number;
  };
}

interface ApiSuccessAction {
  type: 'API_SUCCESS';
  data: Array<[string, number]>;
}

interface ApiFailureAction {
  type: 'API_FAILURE';
  error: string;
}

interface ApiListEndAction {
  type: 'API_LIST_END';
}

// Union type for all possible actions
type ScoreActions =
  | LocalRequestAction
  | LocalSuccessAction
  | LocalFailureAction
  | LocalListEndAction
  | ApiRequestAction
  | ApiSuccessAction
  | ApiFailureAction
  | ApiListEndAction;

// Initial state
const initialState: ScoreState = {
  loading: false,
  moreLoading: false,
  error: null,
  moreError: null,
  data: [],
  isListEnd: false,
};

// Reducer
const ScoreReducers = (
  state = initialState,
  action: ScoreActions,
): ScoreState => {
  console.log({action});
  switch (action.type) {
    case 'LOCAL_REQUEST':
      return {...state, data: [], loading: true};

    case 'LOCAL_SUCCESS':
      return {
        ...state,
        data: [...action.data],
        error: '',
        loading: false,
        moreLoading: false,
      };

    case 'LOCAL_FAILURE':
      return {
        ...state,
        error: action.error,
        data: [],
        loading: false,
        moreLoading: false,
      };

    case 'LOCAL_LIST_END':
      return {
        ...state,
        isListEnd: true,
        loading: false,
        moreLoading: false,
      };

    case 'API_REQUEST':
      if (action.payload.page === 1) {
        return {...state, data: [], loading: true};
      } else {
        return {...state, moreLoading: true};
      }

    case 'API_SUCCESS':
      return {
        ...state,
        data: [...action.data], // TODO: if the api is paginated then the data should be merged with the existing data . data: [...state.data, ...action.data]
        error: '',
        loading: false,
        moreLoading: false,
      };

    case 'API_FAILURE':
      return {
        ...state,
        data: [],
        error: action.error,
        loading: false,
        moreLoading: false,
      };

    case 'API_LIST_END':
      return {
        ...state,
        isListEnd: true,
        loading: false,
        moreLoading: false,
      };

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  score: ScoreReducers,
});

export type RootState = ReturnType<typeof rootReducer>;
