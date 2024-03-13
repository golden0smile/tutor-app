import { CategoryScale, Legend } from "chart.js";
import Chart from "chart.js/auto";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Data } from "../constants/Data";
import styles from "./Pichart.module.scss";

Chart.register(CategoryScale);
Chart.register(Legend);
export const getLabels = graphData => {
  let labelArray = [];
  graphData?.map((item, index) => {
    let v = {
      id: 0,
      topic: "",
      percent: 0,
      color: "",
    };
    if (index < 4) {
      v = {
        id: index + 1,
        topic: `${item?.activity_node?.activityLevelHasTopicNode?.activity_level?.level_name} > ${item?.activity_node?.activityLevelHasTopicNode?.activity_master_topic?.topic_name}`,
        percent: item?.current_mastery_score,
        color: Data[index]?.color,
      };
      labelArray?.push(v);
    } else if (index === 4) {
      v = {
        id: index + 1,
        topic: `Others`,
        percent: item?.current_mastery_score,
        color: Data[index]?.color,
      };
      labelArray?.push(v);
    }
    return {};
  });
  return labelArray;
};
export default function PiChart({ graphData }) {
  const [chartData] = useState({
    labels: getLabels(graphData)?.map((item, i) => item?.topic),
    datasets: [
      {
        LegendsData: getLabels(graphData)?.map(data => data),
        data: getLabels(graphData)?.map(data => data.percent),
        backgroundColor: getLabels(graphData)?.map(data => data.color),
        borderWidth: 0,
      },
    ],
  });
  const GetLegendData = ({ item }) => {
    return (
      <div className={styles.legendRow}>
        <div
          style={{ backgroundColor: item?.color }}
          className={styles.legendIndicates}
        />
        <label className={styles.chartLabel}>{item?.topic}</label>
      </div>
    );
  };
  return (
    <div>
      <div className={styles.container}>
        <div className="chart-container">
          <Pie
            data={chartData}
            className={styles.chart}
            options={{
              plugins: {
                legend: {
                  display: false,
                  position: "right",
                  labels: {
                    usePointStyle: false,
                    boxWidth: 1,
                    pointStyleWidth: 4,
                    boxHeight: 4,
                  },
                },
              },
            }}
          />
        </div>
        <div className={styles.legendsContainer}>
          {chartData?.datasets[0]?.LegendsData?.map((item, i) => {
            return <GetLegendData key={i} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
