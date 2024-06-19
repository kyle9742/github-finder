import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  const initialState = {
    users: [],
    user: [],
    loading: false,
    repos: [],
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // const fetchUsers = async () => {
  //   setLoading();
  //   const response = await fetch(`${GITHUB_URL}/users`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });
  //   const data = await response.json();

  //   // setUsers(data);
  //   // setLoading(false);

  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: data,
  //     loading: false
  //   });
  // };

  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({ q: text });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();

    // setUsers(data);
    // setLoading(false);

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    // setUsers(data);
    // setLoading(false);

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_USER",
        payload: data,
        loading: false,
      });
    }
  };
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  const clearUsers = () =>
    dispatch({
      type: "CLEAR_USERS",
    });

    const getUserRepos = async (login) => {
      setLoading();

      const params = new URLSearchParams({
        sort: 'created', 
        per_page: 10, 
      })
  
      const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      const data = await response.json();
  
      dispatch({
        type: 'GET_REPOS',
        payload: data,
        loading: false
      });
    };

  return (
    <GithubContext.Provider
      value={{
        // users,
        // loading,
        // fetchUsers,

        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos, 
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos, 
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
