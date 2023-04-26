import React, { Component} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'



export default function ItemViewPage() {
    const {id} = useParams()
  return (
    <div>
        {id}
      <ItemViewPageBody id = {id}/>
    </div>
  )
}



class ItemViewPageBody extends Component {
    constructor(props){
        super(props);

        this.state={
            id:props.id,
            specificItemView:[]
        };

    }


    componentDidMount(){
        
        axios.get(`http://localhost:8000/subcategory/get/${this.state.id}`).then(res=>{
            if(res.data.success){
                this.setState({

                    specificItemView:res.data.existingDetails
                });
                console.log(this.state.specificItemView)
            }
        });
    }
    render() {

        
        
        return (
            <div className='stock'>

                <div style={{marginTop:"70px"}}>
                <a href={`/stock/sub-category`}><button className='btn-back' style={{marginLeft:"91%"}}><i class="fa-solid fa-arrow-left"></i> Back</button></a>
                    <div className='form-view' >
                        
                        {this.state.specificItemView?(
                            <div className='view-content-div'>
                                <ul>
                             <img className='view-content-img' style={{width:"250px"}} src={this.state.specificItemView.pImageURL}/><br/>   
                             <li><label className='view-content-data'>Product Name:</label>{this.state.specificItemView.pName}</li><br/>
                             <li><label className='view-content-data'>Product Category:</label>{this.state.specificItemView.pCategory}</li><br/>
                             <li><label className='view-content-data'>Product Quantity:</label>{this.state.specificItemView.pQuantity}</li><br/>
                             <li><label className='view-content-data'>Unit Price:</label>{this.state.specificItemView.pPrice}</li><br/>
                             <li><label className='view-content-data'>Placed Date:</label>{this.state.specificItemView.pPlacedDate}</li><br/>
                             <li><label className='view-content-data'>Product Description:</label><br/>{this.state.specificItemView.pDescription}</li>
                            </ul>
                            </div>
                        ):(
                            <p>Loading..</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

