import React, { Component, useState } from "react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

import { toast } from "react-toastify";
import { API_URL } from "../../constant/api-config";
Chart.register(CategoryScale);

const CategoryGraph = () => {
  //Variable to category count
  const [BookCount, setBookCount] = useState(0);
  const [ElectronicCount, setElectroniccount] = useState(0);
  const [ClothCount, setClothCount] = useState(0);
  const [FurnitureCount, setFurnitureCount] = useState(0);
  const [ToolCount, setToolCount] = useState(0);
  const [GiftCount, setGiftCount] = useState(0);
  const [TableData, setTableData] = useState("");

  //Get Count of Each Manager
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
  const data = {
    labels: [
      "Books",
      "Electronic & Electrical",
      "Clothes",
      "Furniture",
      "Tools",
      "Gifts",
    ],

    datasets: [
      {
        label: "Popularity of Categories",
        data: [
          BookCount,
          ElectronicCount,
          ClothCount,
          FurnitureCount,
          ToolCount,
          GiftCount,
        ],

        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderWidth: 1,
      },
    ],
  };
  useState(() => {
    if (TableData == "") {
      getData();
    }
    if (TableData != "") {
    }
  });
  return (
    <div>
      <div style={{ marginTop: "70px" }}>
        <Bar
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Category Summery",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};
export default CategoryGraph;
