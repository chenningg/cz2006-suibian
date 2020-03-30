import React from "react";
import { Recommendation } from "@suibian/commons";

// CSS
import "../css/RecommendationList.css";

type OwnProps = {
  recommendations: Recommendation[];
  history: any;
};

// Functional component
const RecommendationList = (props: OwnProps) => {
  const handleClick = e => {
    console.log(e.target.getAttribute("data-value"));
    props.history.push(`/eatery/${e.target.getAttribute("data-value")}`);
  };

  const recommendationList = props.recommendations.map(recommendation => {
    return (
      <div
        className="recommendation flex-container flex-col"
        key={recommendation.header}
        data-value={recommendation.header}
        onClick={handleClick}
      >
        <h4 className="recommendation-title">{recommendation.header}</h4>
        <ul>
          <li className="recommendation-text">{recommendation.text1}</li>
          <li className="recommendation-text">{recommendation.text2}</li>
        </ul>
      </div>
    );
  });

  return <div className="recommendation-list">{recommendationList}</div>;
};

export default RecommendationList;
