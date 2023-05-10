import React, { Component} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'



export default function ViewDamage() {
    const {id} = useParams()
  return (
    <div>
        {id}
      <ViewDamageBody id = {id}/>
    </div>
  )
}



class ViewDamageBody extends Component {
    constructor(props){
        super(props);

        this.state={
            id:props.id,
            specificItemView:[]
        };

    }


    componentDidMount(){
        
        axios.get(`http://localhost:8000/damageditem/get/${this.state.id}`).then(res=>{
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
                <a href={`/stock/damaged-item`}><button className='btn-back' style={{marginLeft:"91%"}}><i class="fa-solid fa-arrow-left"></i> Back</button></a>
                    <div className='form-view' >
                    
                        
                        {this.state.specificItemView?(
                            <div className='view-content-div' style={{marginTop:"10px",paddingTop:"20px"}}>
                                <h2 style={{textAlign:"center" ,color:"#ad6c21",marginTop:"10px",background:"white",borderRadius:"10px",backgroundSize:"100px"}}>{this.state.specificItemView.pName}</h2>
                                <ul>
                             <img className='view-content-img' style={{width:"250px"}} src={this.state.specificItemView.pImageURL}/><br/>   
                             <li><label className='view-content-data'>Product Name:</label>{this.state.specificItemView.pName}</li><br/>
                             <li><label className='view-content-data'>Product Category:</label>{this.state.specificItemView.pCategory}</li><br/>
                             <li><label className='view-content-data'>Product SubCategory:</label>{this.state.specificItemView.pSubCategory}</li><br/>
                             <li><label className='view-content-data'>Product Quantity:</label>{this.state.specificItemView.pQuantity}</li><br/>
                             <li><label className='view-content-data'>Unit Price:</label>{this.state.specificItemView.pPrice}</li><br/>
                             <li><label className='view-content-data'>Placed Date:</label>{this.state.specificItemView.pPlacedDate}</li><br/>
                             <li><label className='view-content-data'>Product Description:</label><br/>{this.state.specificItemView.pReason}</li>
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

