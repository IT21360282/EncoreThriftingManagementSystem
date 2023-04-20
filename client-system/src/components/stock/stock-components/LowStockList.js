import React, { Component } from 'react';

class LowStockList extends Component {
    render() {
        const totalProduct = 23
        

        return (
            <div className='stock'>
                <div>

            <div className='btn-inline' style={{marginTop:"80px"}} >
                <div className='semi-preview-container'>Low stock Item<br/>{totalProduct}</div>
                
                


              </div>

            

              <div>
                <a href={`/stock/add-disposed-item`}><button className='btn btn-warning' style={{marginTop:"15px"}}><i class="fa-solid fa-pen-to-square"></i> Add Disposed Item</button></a>
                <table className='content-table'>
                  <thead className='tData'>
                    <tr>
                      <th scope="col"  style={{borderTopLeftRadius:"10px"}}>C/No</th>
                      <th scope="col" >Low stock Item Name</th>
                      <th scope="col" >Item Category</th>
                      <th scope="col" >Item Quantity</th>
                      
                      
                      <th scope="col"  style={{border:"none",borderTopRightRadius:"10px"}}>Option</th>
                    </tr>

                  </thead>
                  <tbody scope="raw">
                  {this.state.disposedItemDetails.map((results,index)=>(
                    <tr>
                      <td >{results.pId}</td>
                      <td >{results.pName}</td>
                      <td >{results.pCategory}</td>
                      <td >{results.pQuantity}</td>
                      

                      <div >
                      
                      <td ><a href={`/stock/view-lowstock-item/${results._id}`}><button className="btn btn-primary">View</button></a></td>
                      </div>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
                
                
                
                
            </div>
                
            </div>
        );
    }
}

export default LowStockList;