import { useEffect, useState, useRef } from "react";
import {
  COMMENTS_THREADS_API,
  VIDEO_API,
  YOUTUBE_API_KEY,
  VIDEO_IDS,
  YOUTUBE_VIDEOS_API,
  YOUTUBE_SEARCH_VIDEO_API,
} from "../utils/constants";
const TitleGenerator = () => {
  const [competitorVideos, setCompetitorVideos] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);
  console.log("searchClicked is ", searchClicked);
  const prevSearchText = useRef("");
  const searchText = useRef("");
  console.log(prevSearchText);
  console.log(searchText);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data1 = await fetch(
  //         COMMENTS_THREADS_API +
  //           YOUTUBE_API_KEY +
  //           "&textFormat=plainText&part=snippet&videoId=" +
  //           VIDEO_IDS[0] +
  //           "&maxResults=5"
  //       );

  //       const CommentsThread = await data1.json();
  //       console.log("CommentsThread", CommentsThread);

  //       const data2 = await fetch(
  //         VIDEO_API + VIDEO_IDS[0] + "&key=" + YOUTUBE_API_KEY
  //       );

  //       const singleVideo = await data2.json();

  //       console.log("singleVideo", singleVideo);

  //       const data3 = await fetch(YOUTUBE_VIDEOS_API);

  //       const listOfVideos = await data3.json();

  //       console.log("listOfVideos", listOfVideos);

  //       const data4 = await fetch(
  //         YOUTUBE_SEARCH_VIDEO_API +
  //           searchQuery +
  //           "&type=video&key=" +
  //           YOUTUBE_API_KEY
  //       );

  //       const searchVideos = await data4.json();

  //       console.log("searchVideos", searchVideos);
  //     };

  //     fetchData();
  //   }, []);

  useEffect(() => {
    if (
      searchClicked &&
      searchText.current.value.trim() !== "" &&
      searchText?.current?.value.trim() !== prevSearchText?.current.trim()
    ) {
      fetchCompetitorVideos();
      prevSearchText.current = searchText?.current?.value.trim();
    }
  }, [searchClicked, searchText.current.value]);

  const fetchCompetitorVideos = async () => {
    const searchTerm = searchText.current.value.trim();
    console.log("fetching videos");
    const apiData = await fetch(
      YOUTUBE_SEARCH_VIDEO_API +
        searchTerm +
        "&type=video&key=" +
        YOUTUBE_API_KEY
    );

    const json = await apiData.json();
    console.log(json);

    setSearchClicked(false);
  };

  const handleSearchClick = () => {
    console.log("handleSearchClick");

    //fetchData from youtube api and update the redux
    if (
      searchText?.current?.value.trim() !== "" &&
      searchText?.current?.value.trim() !== prevSearchText?.current.trim()
    ) {
      setSearchClicked(true);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full h-[125px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchClick();
          }}
        >
          <input
            ref={searchText}
            className="outline-none min-w-[300px] border-2 border-teal-700 py-3 rounded-l-full px-5 text-sm font-semibold"
            type="text"
            // value={searchQuery}
            placeholder="Enter the keyword To Rank For"
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-teal-700 text-slate-50 border-r-2  border-y-2 border-l-0 border-teal-700 px-4 py-3 rounded-r-full text-sm font-semibold">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default TitleGenerator;
