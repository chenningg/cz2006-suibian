import React from "react";
import { Link } from "react-router-dom";
import { Recommendation } from "@suibian/commons";

// CSS
import "../css/RecommendationList.css";

type OwnProps = {
  recommendations: Recommendation[];
};

// Functional component
const RecommendationList = (props: OwnProps) => {
  const recommendationList = props.recommendations.map(recommendation => {
    return (
      <div
        className="recommendation flex-container flex-col flex-center-v"
        key={recommendation.header}
      >
        <h4>{recommendation.header}</h4>
        <p>{recommendation.text1}</p>
        <p>{recommendation.text2}</p>
      </div>
    );
  });

  return <div className="recommendation-list">{recommendationList}</div>;
};

export default RecommendationList;
