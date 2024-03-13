const colors = {
  green: "#03a900",
  yellow: "#f6911e",
  grey: "#4d4d4d",
  red: "#fb0000",
  black: "#000000",
};

const ContentItem = ({ title1, title2, data, color, data1 }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {title1 && (
        <label style={{ color: color, fontWeight: "bold", fontSize: "12px" }}>
          {title1}
        </label>
      )}
      {title2 && (
        <span style={{ color: color, fontSize: "12px" }}>{title2}</span>
      )}
      {data && <p style={{ fontSize: "12px" }}>{data}</p>}
      {data1 && <p style={{ fontSize: "12px" }}>{data1}</p>}
    </div>
  );
};
const TopicMasteryScoreInfo = () => {
  return (
    <div>
      <ContentItem
        data={
          "A mastery score is an integer from 0 - 100 that indicates a student's competence in a particular topic at a particular year level. A mastery score is always given with a <Year Level> and a <Topic>. This year level and topic is obtained from the Mastery Tree in LCMS."
        }
      />
      <ContentItem
        title1={"High mastery"}
        title2={"Mastery score of more than 70"}
        color={colors.green}
        data={
          "Your child is proficient at this topic and can move on to new topics."
        }
      />
      <ContentItem
        title1={"Mid mastery"}
        title2={"Mastery score of 30 - 69"}
        color={colors.yellow}
        data={
          "Your child is getting the hang of these topics and should practice more to get better at it!"
        }
      />
      <ContentItem
        title1={"Low mastery"}
        title2={"Mastery score of less than 30"}
        color={colors.red}
        data={
          "Your child might be new to the topic and would need time to grasp the fundamental concepts.!"
        }
      />
      <ContentItem
        title1={"No score"}
        color={colors.grey}
        data={
          "Your child will need to complete more questions in that topic to generate a mastery score."
        }
      />
      <ContentItem
        title1={"How is the mastery score calculated?"}
        color={colors.black}
        data={
          "Formula: (No of Q correct on 1st try) / (Total no of Q in Year Level + Topic) * 100% "
        }
        data1={"Rounding: To nearest whole integer"}
      />
    </div>
  );
};
export default TopicMasteryScoreInfo;
