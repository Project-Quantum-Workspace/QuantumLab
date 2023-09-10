import { Button, Col, Divider, Row, Space } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminView.css';

export default function index() {
  //////////
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/admin/adminUpdate');
  };
  ////////////

  const url = 'https://my.api.mockaroo.com/data.json?key=e7cb8c20';
  const [user, setUser] = useState(null);

  //notice, if not set useEffect, will run the network forever
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {});
  }, [url]);
  ///////////////

  if (user) {
    return (
      <div>
        <h1>Welcome - User ID: {user.id}</h1>
        <div className="container">
          <Row gutter={[80, 0]}>
            <Col span={6}>
              <div className="avatar">
                <img src={user.avatar} alt="Avatar"></img>
              </div>
            </Col>

            <Col span={15}>
              <h2>User Information</h2>

              <Divider orientation="left"></Divider>
              <div className="userInfor">

                <br></br>
                <Row gutter={48}>
                  <Col className="gutter-row" span={6}>
                    <p>First Name: {user.firstName}</p>
                  </Col>

                  <Col className="gutter-row" span={6}>
                    <p>Last Name: {user.lastName}</p>
                  </Col>
                </Row>

                <br></br>

                <Row>
                  <Col span={8}>
                    <p>Email: <span id='userEmail'>{user.email}</span></p>
                  </Col>
                </Row>

                <br></br>

                <Row gutter={48}>
                  <Col className="gutter-row" span={8}>
                    <p>Password: <span id='userPassword'>{user.password}</span></p>
                  </Col>
                </Row>

                <br></br>

                <Row gutter={48}>
                  <Col className="gutter-row" span={6}>
                    <div>
                      <p>Access Level: <span id='userAcess'>{user.accessLevel}</span></p>
                    </div>
                  </Col>

                  <Col className="gutter-row" span={6}>
                    <p>Account Status:<span id='accountStatus'>{user.accountStatus.toString()}</span></p>
                  </Col>

                  <Col className="gutter-row" span={6}>
                    {/* edit in backend-connector */}
                    <p>Role:{user.accountStatus.toString()}</p>
                   
                  </Col>
                </Row>

                <br></br>
                <br></br>

                <Row gutter={8}>
                  <Col offset={4} className="gutter-row" span={2}>
                    <Space wrap>
                      <Button type="primary" onClick={handleNavigation}>
                        Edit Information
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <br></br>

          <br></br>
        </div>
      </div>
    );
  }
}
