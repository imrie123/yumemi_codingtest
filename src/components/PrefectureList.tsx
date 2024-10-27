import React, { useEffect, useState } from "react";

type Prefecture = { prefCode: number; prefName: string };

function PrefectureList() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const response = await fetch(
          "https://opendata.resas-portal.go.jp/api/v1/prefectures",
          {
            headers: {
              "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY || "",
            },
          }
        );
        const data = await response.json();
        setPrefectures(data.result);
      } catch (error) {
        console.error("Error fetching prefectures:", error);
      }
    };

    fetchPrefectures();
  }, []);

  return (
    <div>
      <h1>Prefectures</h1>
      <ul>
        {prefectures.map((prefecture) => (
          <li key={prefecture.prefCode}>{prefecture.prefName}</li>
        ))}
      </ul>
    </div>
  );
}

export default PrefectureList;