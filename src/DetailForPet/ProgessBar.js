import React from "react";
import { Svg, Circle, G, Text } from "react-native-svg";

const ProgressBar = ({ progress, style }) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Svg width={radius * 2} height={radius * 2} style={style}>
      <G rotation="-90" origin={`${radius}, ${radius}`}>
        <Circle
          stroke="lightgray"
          fill="none"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="gray"
          fill="none"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
        <Text x={radius} y={radius} textAnchor="middle" dy=".3em" fill="gray">
          {`${progress}%`}
        </Text>
      </G>
    </Svg>
  );
};

export default ProgressBar;
