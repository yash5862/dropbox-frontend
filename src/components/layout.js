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
          <div className="dashbordBody">
            <div className="header"></div>
            <div className="row m-5">
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="container">{children}</section>
    </>
  );
};
