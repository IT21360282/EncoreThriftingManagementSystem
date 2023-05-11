import React, { Component, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Dropdown,
  DropdownItem,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
} from "reactstrap";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { API_URL } from "../../constant/api-config.js";

const Addcategory = () => {
  //Variables to store data
  const [Category_Name, setCategory_Name] = useState("");
  const [Category_ID, setCategory_ID] = useState("");
  const [Price, setPrice] = useState("");
  const [Category_Type, setCategory_Type] = useState("Book");
  const [Description, setDescription] = useState("");
  const [AddModal, setAddModal] = useState(false);
  const [TableData, setTableData] = useState("");

  //Variable to store Data to Update
  const [UCategory_Name, setUCategory_Name] = useState("");
  const [UCategory_ID, setUCategory_ID] = useState("");
  const [UPrice, setUPrice] = useState("");
  const [UCategory_Type, setUCategory_Type] = useState("Book");
  const [UDescription, setUDescription] = useState("");
  const [UpdateModal, setUpdateModal] = useState(false);
  const [UpdateItem, setUpdateItem] = useState("");

  //Variable For Search Keyword
  const [Keyword, setKeyword] = useState("");

  //Variable to store Manager count
  const [BookCount, setBookCount] = useState(0);
  const [ElectronicCount, setElectroniccount] = useState(0);
  const [ClothCount, setClothCount] = useState(0);
  const [FurnitureCount, setFurnitureCount] = useState(0);
  const [ToolCount, setToolCount] = useState(0);
  const [GiftCount, setGiftCount] = useState(0);

  //Add Modal Open/Close
  const addToggle = () => {
    setAddModal(!AddModal);
  };
  //Update Modal Open/Close
  const UpdateToggle = (item) => {
    setUpdateModal(!UpdateModal);
    if (item) {
      setUpdateItem(item._id);
      setUCategory_Name(item.Category_Name);
      setUCategory_ID(item.Category_ID);
      setUPrice(item.Price);
      setUCategory_Type(item.Category_Type);
      setUDescription(item.Description);
    }
  };

  //Create Record Function
  const createRecord = () => {
    if (
      Category_Name == null ||
      Category_Name == "" ||
      Category_Name == undefined
    ) {
      toast.error("Please Enter category Name !!");
    } else if (
      Category_ID == null ||
      Category_ID == "" ||
      Category_ID == undefined ||
      Category_ID.length !== 5
    ) {
      toast.error("Please Enter 5-digit Category ID Number  !!");
    } else if (Price == null || Price == "" || Price == undefined) {
      toast.error("Please Enter Price  !!");
    } else if (
      Description == null ||
      Description == "" ||
      Description == undefined
    ) {
      toast.error("Please Enter Description  !!");
    } else if (
      Category_Type == null ||
      Category_Type == "" ||
      Category_Type == undefined
    ) {
      toast.error("Please Select Category !!");
    } else {
      const model = {
        Category_Name: Category_Name,
        Category_ID: Category_ID,
        Price: Price,
        Category_Type: Category_Type,
        Description: Description,
      };

      //working

      axios
        .post(API_URL + "/categories", model)
        .then((response) => {
          console.log("Response", response);
          if (response.status == 201) {
            toast.success("Successfully Created Record !!");
            setTableData("");
            getData();
          }
        })
        .catch((error) => {
          toast.error("Error While Creating Record !!");
        });
    }
  };

  //Get Count of Each Category
  const getCount = (data) => {
    const bk = data.filter((item) => item.Category_Type === "Books");
    setBookCount(bk.length);

    const ee = data.filter(
      (item) => item.Category_Type === "Electronic & Electrical"
    );
    setElectroniccount(ee.length);

    const cl = data.filter((item) => item.Category_Type === "Clothes");
    setClothCount(cl.length);

    const fur = data.filter((item) => item.Category_Type === "Furniture");
    setFurnitureCount(fur.length);

    const tl = data.filter((item) => item.Category_Type === "Tools");
    setToolCount(tl.length);

    const gf = data.filter((item) => item.Category_Type === "Gifts");
    setGiftCount(gf.length);
  };

  //working
  //Get All Data from Backend
  const getData = () => {
    axios
      .get(API_URL + "/categories")
      .then((response) => {
        console.log(response);
        setTableData(response.data);
        getCount(response.data);
      })
      .catch((error) => {
        toast.error("Error While Fetching Data !!.");
      });
  };
  //Delete Record
  const deleteRecord = (id) => {
    axios
      .delete(API_URL + "/deleteCategories/" + id)
      .then((response) => {
        if (response.status == 200) {
          toast.success("Successfully Deleted Data !!");
          setTableData("");
          getData();
        }
      })
      .catch((error) => {
        toast.error("Error While Deleting Data !!!");
      });
  };

  //update Record
  const updateRecord = () => {
    if (
      UCategory_Name == null ||
      UCategory_Name == "" ||
      UCategory_Name == undefined
    ) {
      toast.error("Please Enter category Name !!");
    } else if (
      UCategory_ID == null ||
      UCategory_ID == "" ||
      UCategory_ID == undefined ||
      UCategory_ID.length !== 5
    ) {
      toast.error("Please Enter Category Number  !!");
    } else if (UPrice == null || UPrice == "" || UPrice == undefined) {
      toast.error("Please Enter Category Price !!");
    } else if (
      UDescription == null ||
      UDescription == "" ||
      UDescription == undefined
    ) {
      toast.error("Please Enter Category Description !!");
    } else if (
      UCategory_Type == null ||
      UCategory_Type == "" ||
      UCategory_Type == undefined
    ) {
      toast.error("Please select Category type  !!");
    } else {
      const modal = {
        Category_Name: UCategory_Name,
        Category_ID: UCategory_ID,
        Price: UPrice,
        Description: UDescription,
        Category_Type: UCategory_Type,
      };

      console.log(modal);

      axios
        .put(API_URL + "/updateCategories/:id" + UpdateItem, modal)
        .then((response) => {
          if (response.data.status == 200) {
            toast.success("Successfully Updated Data !!");
            getData();
            UpdateToggle(!UpdateModal);
          }
        });
    }
  };
  //Search Data
  const searchData = () => {
    axios
      .get(API_URL + "/getCategories/" + Keyword)
      .then((response) => {
        console.log(response);
        setTableData(response.data);
      })
      .catch((error) => {});
  };

  // Form Load event
  useEffect(() => {
    if (TableData == "") {
      getData();
    }
    if (TableData != "") {
    }
  }, []);

  const savePDF = async () => {
    const doc = new jsPDF("p", "pt", "a4");

    doc.setFontSize(15);
    const tableName = "Category Management";
    doc.text(tableName, doc.internal.pageSize.getWidth() / 2, 40, "center"); // Add table name at the center of the page
    doc.text("All Report", 40, 80); // Add "All Report" title with increased y position for the gap
    var data;
    var price = 0;
    var count = 0;

    await axios.get(API_URL + "/categories").then((res) => {
      if (res.data) {
        console.log(res.data);
        data = res.data;
        const headers = [
          [
            "ID",
            "Category_Name",
            "Category_ID",
            "Price",
            "Category_Type",
            "Description",
          ],
        ];
        const datas = res.data.map((elt) => [
          ++count,
          elt.Category_Name,
          elt.Category_ID,
          elt.Price,
          elt.Category_Type,
          elt.Description,
        ]);
        let content = {
          startY: 50,
          head: headers,
          body: datas,
        };

        data.map((res) => {
          price = price + res.cost;
        });

        doc.autoTable(content);
      } else {
        //  sweat("ERROR!", "NIC ERROR!", "error")
      }
    });

    doc.save("report.pdf");
  };

  return (
    <div>
      <h4 className="head-title" style={{ textAlign: "center" }}>
        {" "}
        Category Management{" "}
      </h4>
      <hr />
      <br></br>
      <br></br>
      <div className="btn-inline" style={{width:"98%"}}>
        <div className="btn-inline" style={{width:"25%"}}>
          <input
            style={{ marginLeft: 20, borderRadius:"5px", height:"25px" }}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            type="text"
            placeholder="Search by category Name"
          />
      
          <button className="btn" onClick={() => {searchData();}}>Search</button>
        </div>
      <div >
      <button className="btn btn-primary" onClick={() => {
              savePDF();
      }}> Download Report</button>
      </div>
        <div >
          <button className="btn btn-success" onClick={() => addToggle()}> <i class="fa-solid fa-plus" ></i> Add Record</button>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className='div-frame' style={{marginLeft:"50px", marginRight:"20px", width:"90%"}}>
        <table className="details-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Record No</th>
              <th style={{ textAlign: "center" }}>Category_Name</th>
              <th style={{ textAlign: "center" }}>Category_ID</th>
              <th style={{ textAlign: "center" }}>Price</th>
              <th style={{ textAlign: "center" }}>Category_Type</th>
              <th style={{ textAlign: "center" }}>Description</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {TableData &&
              TableData.map((item, index) => {
                return (
                  <tr>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td style={{ textAlign: "center" }}>{item.Category_Name}</td>
                    <td style={{ textAlign: "center" }}>{item.Category_ID}</td>
                    <td style={{ textAlign: "center" }}>{item.Price}</td>
                    <td style={{ textAlign: "center" }}>{item.Category_Type}</td>
                    <td style={{ textAlign: "center" }}>{item.Description}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          UpdateToggle(item);
                        }}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteRecord(item._id);
                        }}
                      >
                        <i class="fa-regular fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
      <br></br>
      <h2 style={{ textAlign: "center" }}>Category Count</h2>
      <br></br>
      <div>
        <div className='div-frame' style={{marginLeft:"50px", marginRight:"20px", width:"90%"}}>
            <table className='details-table' >
              <thead>
                <tr>
                  <th scope="col" style={{borderTopLeftRadius:"7px"}}>Book Count</th>
                  <th style={{ textAlign: "center" }}>Electronic & Electrical Count</th>
            <th style={{ textAlign: "center" }}>Clothes Count</th>
            <th style={{ textAlign: "center" }}>Furniture Count</th>
            <th style={{ textAlign: "center" }}>Tools Count</th>
                  <th scope="col" style={{border:"none",borderTopRightRadius:"7px",width:"145px"}}>Gift Count</th>
                </tr>
              </thead>
              <tbody scope="raw" >      
              
                <tr>
                  <td style={{ textAlign: "center" }}>{BookCount}</td>
              <td style={{ textAlign: "center" }}>{ElectronicCount}</td>
              <td style={{ textAlign: "center" }}>{ClothCount}</td>
              <td style={{ textAlign: "center" }}>{FurnitureCount}</td>
              <td style={{ textAlign: "center" }}>{ToolCount}</td>
              <td style={{ textAlign: "center" }}>{GiftCount}</td>
                </tr>
              
              </tbody>
            </table>
            </div>
          
          </div>

      {/* Update Item Modal Start */}
      <Modal isOpen={UpdateModal}>
        <ModalHeader>
          <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <a
                onClick={() => {
                  UpdateToggle();
                }}
              >
                x
              </a>
            </div>
          </div>
        </ModalHeader>
        <ModalBody style={{ padding: "25px" }}>
          <div className="row">
            {/* <div className="col-md-3"></div>
        <div className="col-md-6"> */}
            <Card>
              <CardHeader>Update Category</CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Category_Name</label>
                      <input className="form-input-purchasing"
                        type="text"
                        placeholder="Category_Name"
                        value={UCategory_Name}
                        onChange={(e) => {
                          setUCategory_Name(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Category_ID</label>
                      <Input
                        type="text"
                        placeholder="Category_ID"
                        value={Category_ID}
                        onChange={(e) => {
                          setUCategory_ID(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Price</label>
                      <Input
                        type="text"
                        placeholder="Price"
                        value={UPrice}
                        onChange={(e) => {
                          setUPrice(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Description</label>
                      <Input
                        type="text"
                        placeholder="Description"
                        value={UDescription}
                        onChange={(e) => {
                          setUDescription(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                {/* <div className="row">
                 
                 
                </div> */}
                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <label>Category_Type</label>
                      <select
                        value={UCategory_Type}
                        onChange={(e) => {
                          setUCategory_Type(e.target.value);
                        }}
                        className="form-control"
                      >
                        <option value={"Books"}>Books</option>
                        <option value={"Electronic & Electrical Items"}>
                          Electronic & Electrical Items
                        </option>
                        <option value={"Clothes"}>Clothes</option>
                        <option value={"Furniture"}>Furniture</option>
                        <option value={"Tools"}>Tools</option>
                        <option value={"Gifts"}>Gifts</option>
                      </select>
                    </FormGroup>
                  </div>
                </div>
                <br></br>
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-1"></div>
                      <div className="col-md-10">
                        <Button
                          color="success"
                          onClick={() => {
                            updateRecord();
                          }}
                        >
                          Update Record
                        </Button>
                      </div>
                      <div className="col-md-1"></div>
                    </div>
                  </div>
                  <div className="col-md-3"></div>
                </div>
              </CardBody>
            </Card>
            {/* </div>
        <div className="col-md-3"></div> */}
          </div>
        </ModalBody>
      </Modal>

      {/* Add New Item Modal Start */}
      <Modal isOpen={AddModal}>
        <ModalHeader>
          <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <a
                onClick={() => {
                  addToggle();
                }}
              >
                x
              </a>
            </div>
          </div>
        </ModalHeader>
        <ModalBody style={{ padding: "25px" }}>
          <div className="row">
            <Card>
              <CardHeader>Add Category</CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Category Name</label>
                      <Input
                        type="text"
                        placeholder="Category Name"
                        value={Category_Name}
                        onChange={(e) => {
                          setCategory_Name(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Category ID</label>
                      <Input
                        type="text"
                        placeholder="Category ID"
                        value={Category_ID}
                        onChange={(e) => {
                          setCategory_ID(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Price</label>
                      <Input
                        type="text"
                        placeholder="Price"
                        value={Price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <label>Category Type</label>
                      <select
                        onChange={(e) => {
                          setCategory_Type(e.target.value);
                        }}
                        className="form-control"
                      >
                        <option value={"Books"}>Books</option>
                        <option value={"Electronic & Electrical Items"}>
                          Electronic & Electrical Items
                        </option>
                        <option value={"Clothes"}>Clothes</option>

                        <option value={"Furniture"}>Furniture</option>
                        <option value={"Tools"}>Tools</option>
                        <option value={"Gifts"}>Gifts</option>
                      </select>
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <label>Description</label>
                      <Input
                        type="text"
                        placeholder="Description"
                        value={Description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>

                <br></br>

                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-1"></div>
                      <div className="col-md-10">
                        <Button
                          color="success"
                          onClick={() => {
                            createRecord();
                          }}
                        >
                          Create Record
                        </Button>
                      </div>
                      <div className="col-md-1"></div>
                    </div>
                  </div>
                  <div className="col-md-3"></div>
                </div>
              </CardBody>
            </Card>
            {/* </div>
        <div className="col-md-3"></div> */}
          </div>
        </ModalBody>
      </Modal>
      {/* Add New Item Modal End */}
      <br></br>
    </div>
  );
};
export default Addcategory;
