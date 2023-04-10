import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretLeft,
  faCaretRight,
  faFaceTired,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { makeBgPath, makePosterPath } from "../utils";
import { BASE_PATH, IVideo } from "../api";
import axios from "axios";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
  height: 91vh;
`;
const Slider = styled.div`
  position: relative;
  top: 50px;
  margin: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftBtn = styled(motion.button)`
  display: flex;
  background-color: transparent;
  color: white;
  border: none;
  font-size: 18px;
  margin-right: 3px;
  cursor: pointer;
`;
const RightBtn = styled(motion.button)`
  display: flex;
  background-color: transparent;
  color: white;
  border: none;
  font-size: 18px;
  margin-left: 3px;
  cursor: pointer;
`;

library.add(faCaretRight);
library.add(faCaretLeft);
library.add(faFaceTired);

const LeftArrow = () => {
  return <FontAwesomeIcon icon="caret-left" />;
};
const RightArrow = () => {
  return <FontAwesomeIcon icon="caret-right" />;
};
const TiredFace = () => {
  return <FontAwesomeIcon icon="face-tired" />;
};

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 13px;
  width: 100%;
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 300px;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  margin-top: 40px;
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  width: 100%;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const SearchBox = styled.div`
  position: absolute;
  top: -40px;
  height: 65px;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const PageControl = styled.div`
  position: fixed;
  background-color: transparent;
  height: 65px;
  width: 100%;
  bottom: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
`;

const ZeroBox = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  background-color: transparent;
  gap: 20px;
  justify-items: center;
  font-size: 40px;
  margin-top: 230px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 101;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vh;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
  z-index: 102;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  top: -80px;
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const offset = 18;

let key = "";
let maxCount = 5;

function Search() {
  const history = useHistory();
  const { scrollY } = useScroll();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/search/:movieId");
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isStart, setStart] = useState(true);
  const [isEnd, setEnd] = useState(false);
  const [videoList, setVideoList] = useState<IVideo[]>([]);

  async function fetchSearch(keyword: string) {
    return await axios
      .get(`${BASE_PATH}/videos/get/${keyword.split(" ").join("")}`)
      .then((res) => setVideoList(res.data))
      .catch((error) => console.log(error));
  }

  if ((count < maxCount && videoList.length == 0) || key != keyword) {
    fetchSearch(keyword as string);
    key = keyword as string;
    setCount((perv) => perv + 1);

    if (videoList.length != 0) {
      setCount(0);
    }
  }
  console.log(videoList);

  const decreaseIndex = () => {
    if (videoList) {
      if (index === 0) {
        setStart(true);
      } else {
        setEnd(false);
        if (index - 1 === 0) {
          setStart(true);
        }
        setIndex((prev) => prev - 1);
      }
    }
  };

  const onBoxClicked = (movieId: number) => {
    history.push(`/search/${movieId}`);
  };

  const onOverlayClick = () => {
    history.go(-1);
  };

  const increaseIndex = () => {
    if (videoList) {
      const totalMovies = videoList.length;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      if (index === maxIndex) {
        setEnd(true);
      } else {
        setStart(false);
        if (index + 1 === maxIndex) {
          setEnd(true);
        }
        setIndex((prev) => prev + 1);
      }
    }
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    videoList?.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  return (
    <>
      <Wrapper>
        <Slider>
          <SearchBox>"{keyword}"으로 검색한 결과입니다.</SearchBox>
          {videoList.length != 0 ? (
            <AnimatePresence>
              <Row>
                {videoList
                  ?.slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      key={movie.id}
                      bgphoto={makeBgPath(movie.id)}
                      onClick={() => onBoxClicked(movie.id)}
                    ></Box>
                  ))}
              </Row>
            </AnimatePresence>
          ) : (
            <ZeroBox>
              <TiredFace />"{keyword}" 검색 결과가 없습니다.
            </ZeroBox>
          )}
          {videoList.length != 0 ? (
            <PageControl>
              <LeftBtn
                style={
                  isStart ? { opacity: 0, cursor: "default" } : { opacity: 1 }
                }
                onClick={decreaseIndex}
              >
                <LeftArrow />
              </LeftBtn>
              {index + 1}
              <RightBtn
                style={
                  (videoList.length <= 18 ? true : isEnd)
                    ? { opacity: 0, cursor: "default" }
                    : { opacity: 1 }
                }
                onClick={increaseIndex}
              >
                <RightArrow />
              </RightBtn>
            </PageControl>
          ) : null}
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          padding: "150px",
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makePosterPath(
                            clickedMovie.id
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </Slider>
      </Wrapper>
    </>
  );
}

export default Search;
