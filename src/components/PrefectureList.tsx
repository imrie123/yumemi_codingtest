import React, { useEffect, useState } from "react";

type Prefecture = { prefCode: number; prefName: string };

function useFetchPrefectures() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setPrefectures(data.result);
      } catch (err) {
        setError("Failed to fetch prefectures");
      } finally {
        setLoading(false);
      }
    };

    fetchPrefectures();
  }, []);

  return { prefectures, loading, error };
}

function PrefectureList() {
  const { prefectures, loading, error } = useFetchPrefectures();
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);

  const handleCheckboxChange = (prefCode: number) => {
    setSelectedPrefs((prev) =>
      prev.includes(prefCode)
        ? prev.filter((code) => code !== prefCode)
        : [...prev, prefCode]
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Prefectures</h1>
      <ul>
        {prefectures.map((prefecture) => (
          <li key={prefecture.prefCode}>
            <label>
              <input
                type="checkbox"
                checked={selectedPrefs.includes(prefecture.prefCode)}
                onChange={() => handleCheckboxChange(prefecture.prefCode)}
              />
              {prefecture.prefName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrefectureList;