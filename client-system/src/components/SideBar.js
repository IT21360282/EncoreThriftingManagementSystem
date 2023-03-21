import React from 'react'
import Tabs from './Tabs';

export default function SideBar() {
  return (
    <div className="SideBar">
      <Tabs>
        <div label={<i class="fa-solid fa-bars"></i>}>
          <div className='tabBody'>
            <a href={`/dashboard-home`}><button className='system'><i class="fa-solid fa-table-cells-large"></i>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</button></a><br/><br/>
            <a href={`/order-home`}><button className='system'><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;&nbsp;Order Management</button></a><br/><br/>
            <a href={`/financial-home`}><button className='system'><i class="fa-solid fa-hand-holding-dollar"></i>&nbsp;&nbsp;&nbsp;&nbsp;Financial Management</button></a><br/><br/>
            <a href={`/employee-home`}><button className='system'><i class="fa-solid fa-id-card"></i>&nbsp;&nbsp;&nbsp;&nbsp;Employee Management</button></a><br/><br/>
            <a href={`/stock-home`}><button className='system'><i class="fa-solid fa-boxes-stacked"></i>&nbsp;&nbsp;&nbsp;&nbsp;Stock Management</button></a><br/><br/>
            <a href={`/supplier-home`}><button className='system'><i class="fa-solid fa-truck-field"></i>&nbsp;&nbsp;&nbsp;&nbsp;Supplier Management</button></a><br/><br/>
            <a href={`/purchasing-home`}><button className='system'><i class="fa-solid fa-bag-shopping"></i>&nbsp;&nbsp;&nbsp;&nbsp;Purchasing Management</button></a><br/><br/>
            <a href={`/delivery-home`}><button className='system'><i class="fa-solid fa-truck"></i>&nbsp;&nbsp;&nbsp;&nbsp;Delivery Management</button></a>
          </div>
        </div>
        <div label={<i class="fa-solid fa-house"></i>}>
          <h4>This is Home</h4>
        </div>
        <div label={<i class="fa-solid fa-gear"></i>}>
          <div className='setting'> 
            <div><h4>Dark Mode</h4></div>
            <div>
              <label class="switch">
              <input type="checkbox"/>
              <span class="slider round"></span>
              </label>
            </div>
          </div><div className='setting'> 
            <div><h4>Setting 2</h4></div>
            <div>
              <label class="switch">
              <input type="checkbox"/>
              <span class="slider round"></span>
              </label>
            </div>
          </div><div className='setting'> 
            <div><h4>Setting 3</h4></div>
            <div>
              <label class="switch">
              <input type="checkbox"/>
              <span class="slider round"></span>
              </label>
            </div>
          </div><div className='setting'> 
            <div><h4>Setting 4</h4></div>
            <div>
              <label class="switch">
              <input type="checkbox"/>
              <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
