import React from 'react'
import './reviews.css'
import { Link } from 'react-router-dom'

export default function MyReviews() {
  return (
    <div className='displayBox'>
        <h3 className='pageTitle'>My Reviews</h3>
        <div className='reviewBox'>
            
            <table id='reviewTable'>
                <tr>
                    <th>ORDER#</th>
                    <th>ITEM NAME</th>
                    <th>COUNT</th>
                    <th>DATE</th>
                    <th>STATUS</th>
                    <th>
                        
                    </th>
                    {/* <th>REVIEW</th> */}
                    {/* <th></th> */}
                </tr>
                <tr>
                    <td>01</td>
                    <td>SCIENCE BOOK</td>
                    <td>02</td>
                    <td>02-11-23</td>
                    <td>DELIVERED</td>
                    <td><Link to='/AddReview'>ADD</Link></td>
                    <td><Link to='/EditReview'>EDIT</Link></td>
                </tr>
                <tr>
                    <td>02</td>
                    <td>MATHS BOOK</td>
                    <td>02</td>
                    <td>02-11-23</td>
                    <td>DELIVERED</td>
                    <td><Link to='/AddReview'>ADD</Link></td>
                    <td><Link to='/EditReview'>EDIT</Link></td>
                </tr>
                <tr>
                    <td>03</td>
                    <td>HISTORY BOOK</td>
                    <td>01</td>
                    <td>02-11-23</td>
                    <td>DELIVERED</td>
                    <td><Link to='/AddReview'>ADD</Link></td>
                    <td><Link to='/EditReview'>EDIT</Link></td>
                </tr>
                <tr>
                    <td>04</td>
                    <td>SHIRT</td>
                    <td>01</td>
                    <td>02-11-23</td>
                    <td>DELIVERED</td>
                    <td><Link to='/AddReview'>ADD</Link></td>
                    <td><Link to='/EditReview'>EDIT</Link></td>
                </tr>
                <tr>
                    <td>05</td>
                    <td>FAN</td>
                    <td>01</td>
                    <td>02-11-23</td>
                    <td>DELIVERED</td>
                    <td><Link to='/AddReview'>ADD</Link></td>
                    <td><Link to='/EditReview'>EDIT</Link></td>
                </tr>
                <tr>
                    <td>06</td>
                    <td>T-SHIRT</td>
                    <td>01</td>
                    <td>02-11-23</td>
                    <td>DELIVERED</td>
                    <td><Link to='/AddReview'>ADD</Link></td>
                    <td><Link to='/EditReview'>EDIT</Link></td>
                </tr>
            </table>
        </div>
    </div>
  )
}
