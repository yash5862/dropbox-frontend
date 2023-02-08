import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Layout = ({children}) => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

  return (
    <>
      <div>
        <div className="d-flex">
          <div className="sideBar">
            <div className="logo">
              <h1>DropBox</h1>
            </div>
            <Button className="logout" onClick={logout}>Log out</Button>
          </div>
          {children}
        </div>
      </div>
      {/* <section className="container">{children}</section> */}
    </>
  );
};
