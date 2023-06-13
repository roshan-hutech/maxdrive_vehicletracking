import React, {useEffect, useState} from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import './login.css'
import axios from 'axios';
import { useNavigate,useParams, useLocation,useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import ImageKit from 'imagekit-javascript';
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import authurl from "./authurl";






const Login = () => {
  const navigate= useNavigate()
  const [searchParams]= useSearchParams();
  console.log(searchParams.get("app"))
  const id = useParams()
  const param= useLocation()
  console.log({id},param);
 const [signup, Setsignup]=useState(false)
 const [image, setImage] = useState(null);
 const [attachment, setattachment] = useState(null)
 
const uploadinage=(e,file,name)=>{
  axios
  .post('https://upload.imagekit.io/api/v1/files/upload', {
    file:file,
    fileName:name,
    signature:e.signature,
    publicKey:'public_qnZll6E/nz6L3NJ8oyVlULN4hSY=',
    token:e.token,
    expire:e.expire

    
  },{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    console.log('User profile', response.data);
    console.log('User token', response.data.jwt);
    uploadinage()
  //   sessionStorage.setItem("token", response.data.jwt)
  //   sessionStorage.setItem("UserEmail", response.data.user.email)
    const data = JSON.stringify(response.data.user)

   sessionStorage.setItem('user', data)

  //  navigate("/welcome" )
   auth.Login(response.data.user, response.data.jwt)



  })
  .catch(error => {
    console.log('An error occurred:', error.response);
  });
}



 const uploadImage = async (event) => {
  const file = event.target.files[0];
  // String(e.target.result).split(',')[1]
  const fileName = file.name;
  const extention = fileName.substring(fileName.indexOf('.') + 1)
console.log(file,event.target.files[0],attachment)
const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        const imgdata = {
          file: fileName,
          base64: String(e.target.result).split(',')[1],
          Content_Type: `application/${extention}`,
        }
        setattachment([imgdata])
      }

  const ik = new ImageKit({
    publicKey: 'public_qnZll6E/nz6L3NJ8oyVlULN4hSY=',
    privateKey: 'private_S9Mk9NmcQqYUwFuHKx2FnFUaySQ=',
    urlEndpoint: 'https://ik.imagekit.io/il6gaxx3e',
    authenticationURL:"http://localhost:5000/",
  });
 
  axios
  .post('http://localhost:5000/', {

    
  })
  .then(response => {
    console.log('User profile', response.data);
    console.log('User token', response.data.jwt);
    uploadinage(response.data,file,fileName, )
  //   sessionStorage.setItem("token", response.data.jwt)
  //   sessionStorage.setItem("UserEmail", response.data.user.email)
    const data = JSON.stringify(response.data.user)

   sessionStorage.setItem('user', data)

  //  navigate("/welcome" )
   auth.Login(response.data.user, response.data.jwt)



  })
  .catch(error => {
    console.log('An error occurred:', error.response);
  });

  try {
    const result = await ik.upload({
      file:file,
      fileName:fileName


    });
    setImage(result.url);
  } catch (error) {
    console.log(error);
  }
};
  

const auth = useAuth()
 


    const onFinish = (values) => {
   
        console.log('Success:', values);
        axios
        .post('http://localhost:1337/api/auth/local', {
          identifier:values.Email,
          password: values.password,
        })
        .then(response => {
          console.log('User profile', response.data.user);
          console.log('User token', response.data.jwt);
        //   sessionStorage.setItem("token", response.data.jwt)
        //   sessionStorage.setItem("UserEmail", response.data.user.email)
          const data = JSON.stringify(response.data.user)

         sessionStorage.setItem('user', data)
  
         navigate("/welcome" )
         auth.Login(response.data.user, response.data.jwt)
  
  
  
        })
        .catch(error => {
          console.log('An error occurred:', error.response);
        });
        
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const onSignup=(e)=>{
        console.log(e)
        axios
        .post('http://localhost:1337/api/auth/local/register', {

email:e.Email,
          username:e.username,
          password: e.password,
        })
        .then(response => {
          console.log(response)
          Setsignup(false)
  
  
  
        })
        .catch(error => {
          console.log('An error occurred:', error.response);
        });
      }
      return(
        <div className='loginwraper'>
          {signup? <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onSignup}
    onFinishFailed={onFinishFailed}
    autoComplete="on"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="Email"
      rules={[{ required: true,type:"email", message: 'Please input your Email!' }]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

   
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  :
         
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="on"
  >
    <Form.Item
      label="Email"
      name="Email"
      rules={[{ required: true,type:"email", message: 'Please input your Email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16,  }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <Button type="primary" onClick={()=>{Setsignup(true)}} >Signup</Button>
    </Form.Item>
  </Form>
}

<div>
      <input type="file" onChange={uploadImage} />
      
    </div>
    <IKContext
	publicKey="public_qnZll6E/nz6L3NJ8oyVlULN4hSY="
  privateKey= 'private_S9Mk9NmcQqYUwFuHKx2FnFUaySQ='
	urlEndpoint="https://ik.imagekit.io/il6gaxx3e"
	transformationPosition="/"
	authenticationEndpoint="http://localhost:5000/"
>


<IKUpload fileName="my-upload" />
</IKContext>
  </div>
)
    }

export default Login;