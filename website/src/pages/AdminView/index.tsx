import { Button, Col, Divider, Row, Space } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminView.css';

export default function index() {
  //////////
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/adminUpdate');
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
                <img src="https://i.ibb.co/RDnTcKL/download.jpg" alt="Avatar"></img>
              </div>
            </Col>

            <Col span={15}>
              <h2>User Information</h2>

              <Divider orientation="left"></Divider>
              <div className="userInfor">
                <Row>
                  <Col span={10}>
                    <p>User name: {user.user_name} </p>
                  </Col>
                </Row>

                <br></br>
                <Row gutter={48}>
                  <Col className="gutter-row" span={6}>
                    <p>First Name: {user.first_name}</p>
                  </Col>

                  <Col className="gutter-row" span={6}>
                    <p>Last Name: {user.last_name}</p>
                  </Col>
                </Row>

                <br></br>

                <Row>
                  <Col span={8}>
                    <p>Email: {user.email}</p>
                  </Col>
                </Row>

                <br></br>

                <Row gutter={48}>
                  <Col className="gutter-row" span={8}>
                    <p>Password: {user.password}</p>
                  </Col>
                </Row>

                <br></br>

                <Row gutter={48}>
                  <Col className="gutter-row" span={6}>
                    <p>Access Level: {user.access_level}</p>
                  </Col>

                  <Col className="gutter-row" span={6}>
                    <p>Account Status:??</p>
                  </Col>

                  <Col className="gutter-row" span={6}>
                    <p>Role:??</p>
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
