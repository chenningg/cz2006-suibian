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
        className="recommendation flex-container flex-col"
        key={recommendation.header}
      >
        <h4 className="recommendation-title">{recommendation.header}</h4>
        <p className="recommendation-text">{recommendation.text1}</p>
        <p className="recommendation-text">{recommendation.text2}</p>
      </div>
    );
  });

  return <div className="recommendation-list">{recommendationList}</div>;
};

export default RecommendationList;
