import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
    },
  },
};
const getMonthWiseData = graphData => {
  let labels = [];
  let data = [];
  let currentMonth = moment().format("M");
  for (let i = currentMonth - 6; i <= currentMonth; i++) {
    labels.push(moment(i, "M").format("MMM"));
  }
  labels?.map((item1, key1) => {
    let maxValue = 0;
    let scoreArray = graphData
      ?.filter(i => moment(i?.date)?.format("MMM") === item1)
      ?.map(i1 => i1?.masteryScore);
    scoreArray?.map((i, k) => {
      if (i && i > maxValue) {
        maxValue = i;
      }
      return {};
    });
    data?.push(maxValue);
    return {};
  });
  return { labels, data };
};
const getDefaultData = graphData => {
  let labels = [];
  let data = [];
  graphData?.map((item, key) => {
    item?.date && labels.push(moment(item?.date)?.format("DD MMM"));
    item?.masteryScore && data?.push(item?.masteryScore);
  });
  return { labels, data };
};
const getGraphData = (graphData, initialDate) => {
  let { data, labels } = initialDate
    ? getDefaultData(graphData)
    : getMonthWiseData(graphData);
  // let {data,labels}=getDefaultData(graphData)
  return {
    labels: labels,
    datasets: [
      {
        label: "Mastery score",
        data: data,
        fill: true,
        borderColor: "rgb(0, 0, 0,0.5)",
        borderWidth: 1,
        tension: 0.5,
        pointRadius: 3,
        pointStyle: "circle",
      },
    ],
  };
};
export function LineChart({ graphData, initialDate }) {
  return <Line options={options} data={getGraphData(graphData, initialDate)} />;
}
