import React, {useEffect, useState} from 'react'
import ReactModal from 'react-modal'
import axios from 'axios'
import DeleteOtherPurchase from './DeleteOtherPurchase'
import FilterOtherPurchases from './FilterOtherPurchases'

export default function TestPurchasing() {
  const [otherPurchaseDetails, setOtherPurchaseDetails] = useState([])
  const [isOpen,setIsOpen] = useState(false)
  const [searchQuery,setSearchQuery] = useState("")
  const [test,setTest] = useState("")

  useEffect(() => {
    axios.get("http://localhost:8000/purchasingGet/otherPurchase/getSorted").then(res => {
      setOtherPurchaseDetails(res.data.existingDetails)  
    })
  }, [])

  function search (){
    axios.get(`http://localhost:8000/purchasingGet/otherPurchase/search?q=${searchQuery}`).then(res => {
      setOtherPurchaseDetails(res.data.searchedDetails) 
            
    })
    setTest("tested")
  }

  function handlePopUp(){
    setIsOpen(!isOpen)
  }

  function handleSearchInput(e){
    const value = e.target.value
    setSearchQuery(value)
    search()
  }

  return (
    <div className='Purchasing-others'>
                <h2 style={{marginTop:"70px"}}>Display&nbsp;&nbsp;{test}<span style={{color:"#ff5520"}}>{searchQuery}</span></h2>
                <div className='btn-inline'>
                    <div><span type='submit' className='search' ><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input className='search' style={{width:"500px"}} name='searchQuery' placeholder='Search Details By PurchaseID or Title or Shop Name' value={searchQuery} onChange={handleSearchInput} ></input></div>
                    <FilterOtherPurchases/>
                    <button className='btn-inline' onClick={search} style={{width:"200px"}}>Clear Filter</button>
                </div>
                <br/>
                <br/>
        
                <div className='div-frame'>
                    <table className='details-table'>
                        <thead>
                            <tr>
                                <th scope="col" style={{borderTopLeftRadius:"7px",borderBottom:"2px solid #ff5520",width:"8%"}}>PurID</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"8%"}}>Title</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"12%"}}>Purchased Date</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"11%"}}>Purchased For</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"9%"}}>Total Cost</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"8%"}}>Total Qty</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"18%"}}>Shop</th>
                                <th scope="col" style={{border:"none",borderTopRightRadius:"7px",borderBottom:"2px solid #ff5520",width:"25%"}}>Options</th>
                            </tr>
                        </thead>
                    </table>
                    <div  style={{overflowY:"scroll",height:"36vh"}} >  
                            <table className='details-table'  >
                            <tbody scope="raw" >      
                                {otherPurchaseDetails.map((results, index)=>(
                                <tr>
                                    <td style={{width:"8%"}}>{results.purID}{results.purDigitID}</td>
                                    <td style={{width:"8%"}} title={results.title}>{results.title}</td>
                                    <td style={{width:"12%"}}>{results.purchasedDate}</td>
                                    <td style={{paddingLeft:"none", paddingRight:"none",width:"11%"}}>{results.purchasedSection}</td>
                                    <td style={{width:"9%"}}>{results.totalCost}</td>
                                    <td style={{width:"8%"}}>{results.totalQty}</td>
                                    <td style={{width:"18%"}}>{results.shop}</td>
                                    <td style={{padding:"5px",border:"none",width:"25%"}}>
                                        <div className='btn-inline-table'>
                                            <a href={`/purchasing/update-purchase/${results._id}`}><button type="button" className="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i> Update</button></a>
                                            <DeleteOtherPurchase purID = {results.purID} purDigitID = {results.purDigitID} title = {results.title} section = {results.purchasedSection} shop = {results.shop} ID = {results._id} />
                                            <a href={`/purchasing/spec-purchase/${results._id}`}><button type="button" className="btn btn-primary"><i class="fa fa-circle-ellipsis"></i> More</button></a>     
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='spec-btn-inline' style={{marginTop:"20px", width:"35%"}}>
                    <div className='btn-inline'>
                        <a href={`/purchasing/display-purchases`}><button className="btn btn-primary" ><i class="fa-solid fa-rotate-right"></i>&nbsp;&nbsp;Refresh</button></a> 
                        <a href={`/purchasing/purchasing-home`}><button className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;&nbsp;Home</button></a> 
                        <a><button className="btn btn-primary" onClick={handlePopUp} title='Download Details of Other Purchases in PDF Format'><i class="fa-solid fa-download"></i>&nbsp;&nbsp;Generate PDF</button></a> 
                    </div> 
                </div>
                <ReactModal isOpen={isOpen} onRequestClose={handlePopUp} className="popUp90 zoom-in">
                    <div>
                        <h2>PDF Including All Other Purchases Details is Generated</h2>
                        <h4>A preview of the PDF is below & You can download it by 'Download' button</h4>
                        <div className='PDFpreview'>
                            <h1 style={{color:"#ff5520"}}>Encore Thrifting Store</h1>
                            <h3>Details of All Stock Orders</h3>
                            <table className='pdfTable'  id='purchasesTable'>
                                <thead>
                                    <tr>
                                        <th scope="col">PurID</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Purchased Date</th>
                                        <th scope="col">Purchased For</th>
                                        <th scope="col">Total Cost</th>
                                        <th scope="col">Total Qty</th>
                                        <th scope="col">Shop</th>
                                    </tr>
                                </thead>
                                <tbody scope="raw" >    
                                    {otherPurchaseDetails.map((results,index)=>(
                                    <tr>
                                        <td>{results.purID}{results.purDigitID}</td>
                                        <td title={results.title}>{results.title}</td>
                                        <td>{results.purchasedDate}</td>
                                        <td>{results.purchasedSection}</td>
                                        <td>{results.totalCost}</td>
                                        <td>{results.totalQty}</td>
                                        <td>{results.shop}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='spec-btn-inline' style={{marginTop:"20px",marginBottom:"20px", width:"35%"}}>
                            <div className='btn-inline'>
                                <a href={`/purchasing/display-orders`}><button className="btn btn-primary" ><i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back</button></a> 
                                <a><button className="btn btn-primary"  title="Download This in PDF Format"><i class="fa-solid fa-download"></i>&nbsp;&nbsp;Download PDF</button></a> 
                            </div> 
                        </div>
                    </div>
                </ReactModal>
            </div>
  )
}
