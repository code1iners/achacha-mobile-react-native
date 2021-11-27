import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { colors } from "../utils/themes/colors";

const LoadingView = () => {
  return <ActivityIndicator color={colors.darkTextColor} />;
};

export default LoadingView;
