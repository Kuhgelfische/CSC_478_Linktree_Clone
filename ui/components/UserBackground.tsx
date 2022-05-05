import { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { join } from 'path';

const Box = styled.div`
  position: fixed;
  z-index: 0;
  top: 0;
`
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height
  };
}
function UserBackground({bg}) {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const {width, height} = getWindowDimensions();
    setWidth(width);
    setHeight(height);
  }, []);

  useEffect(() => {
    function handleResize() {
      const {width, height} = getWindowDimensions();
      setWidth(width);
      setHeight(height);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const background = bg ? `/../public/backgrounds/${bg}` : '/../public/backgrounds/USERPLAINWHITE.jpg';

  if(width && height) {
    return (
      <Box>
      <Image
        src={background}
        width={width}
        height={height}
      />
      </Box>)
  }
  return null;
}

export default UserBackground;