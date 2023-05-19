import React from 'react'
import './myReturn.css'


export default function MyReturn() {
  return (
    <div className='displayBox'>
        <h3 className='pageTitle'>My Returns</h3>
        <div className='returnBox'>
            
            <table id='returnTable'>
                <tr>
                    <th>ORDER#</th>
                    <th>ITEM NAME</th>
                    <th>COUNT</th>
                    <th>DATE</th>
                </tr>
                <tr>
                    <td>01</td>
                    <td>SCIENCE BOOK</td>
                    <td>02</td>
                    <td>02-11-23</td>
                    
                </tr>
                <tr>
                    <td>02</td>
                    <td>MATHS BOOK</td>
                    <td>02</td>
                    <td>02-11-23</td>
                    
                </tr>
                <tr>
                    <td>03</td>
                    <td>HISTORY BOOK</td>
                    <td>01</td>
                    <td>02-11-23</td>
                    
                </tr>
                <tr>
                    <td>04</td>
                    <td>SHIRT</td>
                    <td>01</td>
                    <td>02-11-23</td>
                    
                </tr>
                <tr>
                    <td>05</td>
                    <td>FAN</td>
                    <td>01</td>
                    <td>02-11-23</td>
                    
                </tr>
                <tr>
                    <td>06</td>
                    <td>T-SHIRT</td>
                    <td>01</td>
                    <td>02-11-23</td>
                    
                </tr>
            </table>
        </div>
    </div>

  )
}
