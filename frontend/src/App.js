import './App.css';
// import NavBar from './components/nav';
// import Post from './components/post';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './userContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';

function App() {
  return (
    <>
    <UserContextProvider>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={
          <IndexPage />
          } />
          <Route path={'/login'} element={
            <LoginPage />
          } />
          <Route path={'/register'} element={
            <RegisterPage />
          } />
          <Route path={'/create'} element={
            <CreatePost />
          } />
          <Route path={'/post/:_id'} element={
            <PostPage />
          } />
        </Route>
      </Routes>
    </UserContextProvider>
    </>
  );
}

export default App;
