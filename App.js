import React, { useRef, useState } from "react";
import { Animated, Pressable, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const POSITION = useRef(new Animated.ValueXY({ x: 0, y: 300 })).current; //useRef를 사용하지 않으면 마지막에 초기값으로 돌아감
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    //2.함수를 통해 Animated Method들을 통해 변수 핸들링
    Animated.timing(POSITION, {
      toValue: up ? 300 : -300, //변화시킬 값
      useNativeDriver: true, //사용해야만 함 bridge를 사용하지 않음
      duration: 2000,
    }).start(toggleUp);
  };
  const opacity = POSITION.y.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0, 1],
  });
  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const rotation = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            opacity,
            borderRadius,
            transform: [{ rotateY: rotation }, { translateY: POSITION.y }], //변화를 주고 싶은 속성 변수 선언
          }}
        />
      </Pressable>
    </Container>
  );
}
