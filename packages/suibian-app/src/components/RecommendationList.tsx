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
        className="recommendation flex-container flex row flex-spaced-between"
        key={recommendation.header}
      ></div>
    );
  });

  return <>{recommendationList}</>;
};

export default RecommendationList;
