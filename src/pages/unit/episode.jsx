import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import app from "../../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import LoadingSpinner from "../../components/Loading";

const fetchEpisode = async (id, linkId) => {
    const db = getDatabase(app);
    const animeRef = ref(db, `movies/animes/${id}`);
    const snapshot = await get(animeRef);

    if (!snapshot.exists()) throw new Error("Anime topilmadi!");

    const animeData = snapshot.val();
    const foundEpisode = animeData.episodes?.find((ep) => ep.linkId == linkId);

    if (!foundEpisode) throw new Error("Epizod topilmadi!");

    return foundEpisode;
};

const Episode = () => {
    const { id, linkId } = useParams();

    const { data: episode, isLoading, error } = useQuery({
        queryKey: ["episode", id, linkId],
        queryFn: () => fetchEpisode(id, linkId),
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-600">{error.message}</div>;

    return (
        <div className="mb-5 px-3">
            <iframe
                src={`${episode?.link}/preview`}
                className="w-full h-[300px] sm:h-[300px] md:h-[500px] rounded-2xl"
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Episode;
