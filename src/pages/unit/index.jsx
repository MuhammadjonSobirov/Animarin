import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Loading";
import { getDatabase, ref, get, push } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../../firebaseConfig';
import { useMutation, useQuery } from "@tanstack/react-query";

const fetchAnime = async (id) => {
    const db = getDatabase(app);
    const animeRef = ref(db, `movies/animes/${id}`);
    const snapshot = await get(animeRef);
    if (!snapshot.exists()) {
        throw new Error("Anime topilmadi!");
    }
    return snapshot.val();
};

const fetchComments = async (id) => {
    const db = getDatabase(app);
    const commentsRef = ref(db, `movies/animes/${id}/comments`);
    const snapshot = await get(commentsRef);
    if (!snapshot.exists()) return [];
    return Object.values(snapshot.val());
};

const Unit = () => {
    const { id } = useParams();
    const auth = getAuth(app);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [link, setLink] = useState(false);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const { data, isLoading, error } = useQuery({
        queryKey: ["anime", id],
        queryFn: () => fetchAnime(id),
        enabled: !!id,
    });

    const { data: fetchedComments = [], refetch } = useQuery({
        queryKey: ["comments", id],
        queryFn: () => fetchComments(id),
        enabled: !!id,
    });
    const [comments, setComments] = useState(fetchedComments || []);
    useEffect(() => {
        if (fetchedComments) {
            setComments(fetchedComments);
        }
    }, [fetchedComments]);

    const commentMutation = useMutation({
        mutationFn: async (newCommentData) => {
            const db = getDatabase(app);
            const commentsRef = ref(db, `movies/animes/${id}/comments`);
            await push(commentsRef, newCommentData);
        },
        onSuccess: () => {
            refetch();
        },
    });

    const handleComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const newCommentData = {
            name: currentUser ? currentUser.displayName || "No Name" : "No Name",
            text: newComment,
        };

        commentMutation.mutate(newCommentData);
        setNewComment("");
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-600">{error.message}</div>;

    const shortText = data?.description ? data.description.slice(0, 200) + "..." : "";



    return (
        <div className="dark:text-white xl:flex gap-3 justify-between mb-4">
            <div className="max-w-[800px] w-full">
                <div className="flex mb-5 pr-2 items-center rounded-l-full sm:rounded-full bg-green-100 dark:bg-gray-800">
                    <div>
                        <img
                            className="w-20 min-w-20 h-20 md:w-28 md:min-w-28 md:h-28 rounded-full"
                            src={data?.img || "https://via.placeholder.com/150"}
                            alt={data?.name || "Anime"}
                        />
                    </div>
                    {link ? (
                        <h2 className="text-sm ml-2 sm:text-lg md:text-2xl">
                            Смотреть {data?.name || "Anime"} {selectedEpisode}-серия
                        </h2>
                    ) : (
                        <h2 className="text-sm ml-2 max-w-[600px] sm:text-lg md:text-2xl break-words">
                            Смотреть {data?.name || "Anime"} все серии и сезоны
                        </h2>
                    )}
                </div>

                <div>
                    <Outlet />
                </div>

                <ul className="grid grid-cols-3 md:grid-cols-4 p-4 gap-2">
                    {data?.episodes && Array.isArray(data.episodes) ? (
                        data.episodes.map((episode, index) => (
                            <li
                                onClick={() => {
                                    navigate(`episode/${episode.linkId}`);
                                    setSelectedEpisode(index + 1);
                                    setLink(episode.link);
                                }}
                                key={index}
                                className="mb-2 cursor-pointer text-sm sm:text-lg bg-green-100 dark:bg-gray-800 px-3 py-2 rounded-lg md:text-2xl"
                            >
                                {`${index + 1} серия`}
                            </li>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">
                            Epizodlar mavjud emas.
                        </div>
                    )}
                </ul>

                {/* Kommentlar bo‘limi */}
                <div className="my-6 bg-green-100 dark:bg-gray-800 p-4 rounded-lg mx-4 hidden xl:block">
                    <h3 className="text-lg font-semibold mb-2">Комментарии</h3>
                    <form onSubmit={handleComment} className="flex flex-col gap-2">
                        <input
                            type="text"
                            placeholder="Введите комментарий"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Отправить
                        </button>
                    </form>

                    {/* Kommentlar ro‘yxati */}
                    <div className="mt-4 text-start max-h-[300px] overflow-y-auto">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div
                                    key={index}
                                    className="p-2 border-b dark:border-gray-600 break-words overflow-hidden w-full"
                                >
                                    <strong>{comment.name || "No Name"}:</strong>
                                    <span className="block break-words whitespace-pre-wrap w-full">
                                        {comment.text}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Комментариев пока нет.</p>
                        )}
                    </div>

                </div>
            </div>

            <div className="bg-green-100 dark:bg-gray-800 h-full rounded-2xl p-4 w-[90%] ml-auto mr-auto lg:w-[800px] lg:ml-0 lg:mr-0 xl:max-w-[400px]">
                <p className="text-[12px] text-left sm:text-sm md:text-lg border-b py-4 mb-3 border-black dark:text-gray-300 dark:border-white">
                    Жанры: {data?.janr?.length > 0 ? data.janr.map((genre) => genre.name).join(", ") : "Не указано"}
                </p>
                <p className="text-sm sm:text-lg md:text-2xl">
                    {isExpanded ? data?.description : shortText}
                    {data?.description?.length > 200 && (
                        <button onClick={() => setIsExpanded(!isExpanded)} className="ml-2 text-blue-500 hover:text-blue-700">
                            {isExpanded ? "Скрыть" : "Читать далее"}
                        </button>
                    )}
                </p>
            </div>
            <div className="my-6 bg-green-100 dark:bg-gray-800 rounded-2xl p-4 w-[90%] ml-auto mr-auto lg:w-[800px] lg:ml-0 lg:mr-0 block xl:hidden">
                <h3 className="text-lg font-semibold mb-2">Комментарии</h3>
                <form onSubmit={handleComment} className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Введите комментарий"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Отправить
                    </button>
                </form>

                {/* Kommentlar ro‘yxati */}
                <div className="mt-4 text-start max-h-[300px] overflow-y-auto">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div
                                key={index}
                                className="p-2 border-b dark:border-gray-600 break-words overflow-hidden w-full"
                            >
                                <strong>{comment.name || "No Name"}:</strong>
                                <span className="block break-words whitespace-pre-wrap w-full">
                                    {comment.text}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Комментариев пока нет.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Unit;
