import { Button, Col, Divider, Form, Input, Row, Select, Upload, message } from 'antd';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const DemoBox: React.FC<{ children: React.ReactNode; value: number }> = (props) => (
  <p className={`height-${props.value}`}>{props.children}</p>
);

export default function index() {
  ////////////message
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Upload success',
    });
  };

  const [data, setData] = useState([]);
  /*   const [loading, setLoading] = useState(true); */

  //data
  const [formData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    // other form fields
  });

  type Role = {
    id: number;
    name: string;
  };

  type User = {
    email: string;
    uuid: string;
    id: number;
    firstName: string;
    lastName: string;
    accountStatus: boolean;
    accessLevel: number;
    roles: Role[];
  };

  //define users
  const [users, setUsers] = useState<User[]>([]);

  /*   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/usersUpdate');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);
 */

  useEffect(() => {
    // Make a GET request to your API
    axios
      .get('/api/usersUpdate')
      .then((response) => {
        setData(response.data); // Set the data in your component state

        /*  setLoading(false); */ // Update loading state to indicate that data has been fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        /*  setLoading(false);  */ // Update loading state in case of an error
      });
  }, []);

  ///////////////

  const posturl = 'https://my.api.mockaroo.com/data2.json?key=e7cb8c20&__method=PUT';

  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    axios
      .put(posturl, formData) // Replace with your API endpoint

      .then((response) => {
        setStatusMessage('Form data updated successfully.');
      })

      .catch((error) => {
        setStatusMessage('An error occurred while updating the form data.');
      });
  };

  //////////////////

  const [form] = Form.useForm();

  //////
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/admin/adminView');
  };

  /////////////////
  /////////////////
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, (maxSize - img.width) / 2, (maxSize - img.height) / 2);
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: 'image/png',
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          'image/jpeg',
          0.8,
        );
      };
    };
  };

  const handleUploadButtonClick = (file) => {
    var myHeaders = new Headers();
    /* const token = "adhgsdaksdhk938742937423";
    myHeaders.append("Authorization", `Bearer ${token}`); */

    var formdata = new FormData();
    formdata.append('file', file);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://trickuweb.com/upload/profile_pic', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        const profileurl = JSON.parse(result);
        setImage(profileurl.img_url);
      })
      .catch((error) => console.log('error', error));
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  /////////////////
  /////////////////
  const pfirstName = data.map((user) => user.firstName).join(', ');
  const plastName = data.map((user) => user.lastName).join(', ');
  const pemail = data.map((user) => user.email).join(', ');
  const paccountStatus = data.map((user) => user.accountStatus).join(', ');
  const paccessLevel = data.map((user) => user.accessLevel).join(', ');
  const prole = data.flatMap((user) => user.roles.map((role) => role.name)).join(', ');

  return (
    <div>
      <h1>Welcome -{pfirstName}</h1>

      {/* 
      <p>
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName} - {user.email}
            </li>
          ))}
        </ul>
      </p> */}

      <div className="container">
        <Row gutter={[80, 0]}>
          <Col span={7}>
            {/* ----------------------------------------------------------------*/}
            <div className="image-upload-container">
              <div className="box-decoration">
                <label htmlFor="image-upload-input" className="image-upload-label">
                  {image ? image.name : 'Choose an image'}
                </label>

                <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="upload image"
                      className="img-display-after"
                    />
                  ) : (
                    <img src="/photo.png" alt="upload image" className="img-display-before" />
                  )}

                  <input
                    id="image-upload-input"
                    type="file"
                    onChange={handleImageChange}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                  />
                </div>

                <button className="image-upload-button" onClick={handleUploadButtonClick}>
                  Upload
                </button>
              </div>
            </div>
            {/* ----------------------------------------------------------------*/}
          </Col>

          <Col span={15}>
            <div className="userInfor">
              <h2>Update User Information</h2>
              <Divider orientation="left"></Divider>
              <Form form={form} size="large" layout="vertical">
                <Row gutter={48}>
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="First Name:">
                      <Input
                        placeholder={pfirstName}
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="Last Name:">
                      <Input
                        placeholder={plastName}
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    <Form.Item label="Email:">
                      <Input
                        placeholder={pemail}
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={48}>
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="New Password:">
                      <Input
                        placeholder="Passworrd"
                        type="text"
                        name="password"
                        /* value={formData.password} */
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="Confrim Password:">
                      <Input
                        placeholder="Confirm passworrd"
                        type="text"
                        name="password"
                        /* value={formData.password} */
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={48}>
                  <Col className="gutter-row" span={4}>
                    <Form.Item label="Access Level:">
                      <Select>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col className="gutter-row" span={4}>
                    <Form.Item label="Account Status:">
                      <Select>
                        <Select.Option value="1">1</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col className="gutter-row" span={6}>
                    <Form.Item label="Role">
                      <Select placeholder={prole}>
                        <Select.Option value="Student">Student</Select.Option>
                        <Select.Option value="Admin">Admin</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <br></br>

                <Row gutter={8}>
                  <Col offset={5} className="gutter-row" span={2}>
                    <Form.Item>
                      <DemoBox value={10}>
                        <Button onClick={handleFormSubmit}>Submit</Button>
                      </DemoBox>
                    </Form.Item>
                  </Col>
                  <Col offset={2} className="gutter-row" span={2}>
                    <Button type="primary" onClick={handleNavigation}>
                      Back
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
