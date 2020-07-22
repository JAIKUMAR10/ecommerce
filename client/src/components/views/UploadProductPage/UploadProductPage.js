import React,{ useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title }=Typography;
const{ TextArea }=Input;

const Genres=[
    {key:1,value:"Action"},
    {key:2,value:"Adventure"},
    {key:3,value:"Role-Playing"},
    {key:4,value:"Shooting"},
    {key:5,value:"Racing"},
    {key:6,value:"Sports"},
    {key:7,value:"Family"},
    {key:8,value:"Exclusives"},
    {key:9,value:"Gaming Consoles"},
    {key:10,value:"Accessories"} 
]

function UploadProductPage(props) {
    const [Stock, setStock] = useState(0)
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [GenreValue, setGenreValue] = useState(1)
    const [Images, setImages] = useState([]);

    const onTitleChange=(event)=>{
       setTitleValue(event.currentTarget.value)
    }
    const onDescriptionChange=(event)=>{
        setDescriptionValue(event.currentTarget.value)
     }

     const onPriceChange=(event)=>{
        setPriceValue(event.currentTarget.value)
     }
     const onStockChange=(event)=>{
        setStock(event.currentTarget.value)
     }
    
     const onGenreSelectChange=(event)=>{
        setGenreValue(event.currentTarget.value)
     }
     const updateImages=(newImages)=>{
      setImages(newImages);
     }
     const onSubmit=(event)=>{
         event.preventDefault();
         if(!TitleValue|| !DescriptionValue || !PriceValue || !GenreValue || !Images){
             return alert('Please fill in all details');
         }
         const variables={
             writer:props.user.UserData,
             title:TitleValue,
             description:DescriptionValue,
             price:PriceValue,
             images:Images,
             genres:GenreValue,
             stock:Stock

         }
         Axios.post('/api/product/uploadProduct',variables)
         .then(response=>{
             if(response.data.success){
                alert('Product Successfully Uploaded')
                props.history.push('/')
             }
             else{
                 alert('Failed to upload product')
             }
         });
     }

    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{ textAlign:'center',marginBottom:'2rem'}}>
               <Title level={2}>Upload Gaming Console/Title</Title>
            </div>
        <Form onSubmit>

            <FileUpload refreshFunction={updateImages}/>
            <br />
            <br />
            <label>Title</label>
            <Input
            onChange={onTitleChange}
            value={TitleValue}
              />

            <br />
            <br />
            <label>Description</label>
            <TextArea
            onChange={onDescriptionChange}
            value={DescriptionValue}
              />

            <br />
            <br />
            <label>Price(Rs)</label>
            <Input
            onChange={onPriceChange}
            value={PriceValue}
            type="number"
              />
            <br />
            <br />
            <label>Stock</label>
            <Input
            onChange={onStockChange}
            value={Stock}
            type="number"
              />
            <br />
            <br />
            <label>Genre</label>
            <br />
            <select onChange={onGenreSelectChange}>
            {Genres.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
               
            </select>
            <br />
            <br />

            <Button onClick={onSubmit}>
                Submit
            </Button>
        </Form>
        </div>
    )
}

export default UploadProductPage
