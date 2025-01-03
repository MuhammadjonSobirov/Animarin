import { useState } from "react";
import { storage } from "../firebaseConfig"; // Firebase konfiguratsiyasini import qiling
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [videoURL, setVideoURL] = useState("");

  // Video faylini tanlash
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
    }
  };

  // Videoni Firebase Storage ga yuklash
  const handleUpload = () => {
    if (!video) return;

    setUploading(true);

    // Firebase Storage ga faylni yuklash
    const videoRef = ref(storage, `videos/${video.name}`);
    const uploadTask = uploadBytesResumable(videoRef, video);

    // Yuklash jarayoni
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Yuklash holatini tekshirish (progress bar yaratish mumkin)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading video: ", error);
        setUploading(false);
      },
      () => {
        // Yuklash tugallangandan so'ng URLni olish
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoURL(downloadURL);
          setUploading(false);
          alert("Video uploaded successfully!");
        });
      }
    );
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {uploading ? "Uploading..." : "Upload Video"}
      </button>
      {videoURL && (
        <div>
          <p>Video uploaded successfully. You can view it here:</p>
          <video controls width="300">
            <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
