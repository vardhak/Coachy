import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function DashLecture() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [formData, setFormData] = useState({ title: "" });
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false); // Add this at the top
    const [editVideoId, setEditVideoId] = useState(null);
    const [editTitle, setEditTitle] = useState("");


    useEffect(() => {
        if (id) {
            fetchCourses();
            fetchVideos(); // fetch all once
        }
    }, [id]);

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/getCourses/courses_${id}`);
            setCourses(res.data);
        } catch (e) {
            console.error("Error fetching courses:", e);
        }
    };

    const fetchVideos = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/videos/class_${id}_lectures`);
            setVideos(res.data);
        } catch (e) {
            console.error("Error fetching videos:", e);
        }
    };

    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
    const handleCourseSelect = (e) => setSelectedCourse(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCourse) return toast.error("Please select a course.");
        if (!file) return toast.error("Please select a video file.");

        const data = new FormData();
        data.append("video", file);
        data.append("title", formData.title);
        data.append("courseTitle", selectedCourse); // or use helper if needed

        let toastId; // declare toast ID

        try {
            setIsUploading(true);
            toastId = toast.loading("Uploading video, please wait...");

            await axios.post(`${BASE_URL}/upload/class_${id}_lectures`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success("Video uploaded successfully!");
        } catch (e) {
            toast.error("Video upload failed!");
            console.error(e);
        } finally {
            toast.dismiss(toastId); // dismiss that specific loading toast
            setIsUploading(false);
            fetchVideos();
            handleClear();
        }
    };

    // Update video title
    const handleUpdateVideo = async (videoId) => {
        try {
            await axios.put(`${BASE_URL}/update-video/class_${id}_lectures/${videoId}`, {
                title: editTitle,
            });
            toast.success("Video updated!");
            setEditVideoId(null);
            fetchVideos();
        } catch (e) {
            console.error("Update error:", e);
            toast.error("Failed to update video.");
        }
    };

    // Delete video
    const handleDeleteVideo = async (videoId, publicId) => {
        const confirm = window.confirm("Are you sure you want to delete this video?");
        if (!confirm) return;

        try {
            await axios.delete(`${BASE_URL}/delete-video/class_${id}_lectures/${videoId}`, {
                data: { publicId },
            });
            toast.success("Video deleted!");
            fetchVideos();
        } catch (e) {
            console.error("Delete error:", e);
            toast.error("Failed to delete video.");
        }
    };


    const handleClear = () => {
        setFormData({ title: "" });
        setFile(null);
        toast.info("Form cleared");
    };

    const filteredVideos = selectedCourse
        ? videos.filter((v) => v.courseTitle === selectedCourse)
        : [];

    return (
        <div className="p-2">
            <h1 className="text-xl bg-primary text-white p-1 text-center capitalize">
                Manage Video Lectures for {id}
            </h1>

            <Tabs defaultValue="videolist" className="w-full mt-3">
                <TabsList className="w-full">
                    <TabsTrigger value="videolist" className="w-full">Video List</TabsTrigger>
                    <TabsTrigger value="uploadvideo" className="w-full">Upload Video</TabsTrigger>
                    <TabsTrigger value="managevideos" className="w-full">Manage Videos</TabsTrigger>

                </TabsList>

                {/* VIDEO LIST TAB */}
                <TabsContent value="videolist" className="space-y-4 mt-4">
                    <div className="mb-4">
                        <Label htmlFor="filter-course">Filter by Course</Label>
                        <select
                            id="filter-course"
                            value={selectedCourse}
                            onChange={handleCourseSelect}
                            className="w-full border px-3 py-2 rounded mt-1"
                        >
                            <option value="">-- Select a course to view videos --</option>
                            {courses.map((course, index) => (
                                <option key={index} value={course.courseTitle}>
                                    {course.courseTitle}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedCourse ? (
                        filteredVideos.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredVideos.map((vid, index) => (
                                    <div key={index} className="border p-3 rounded shadow-sm hover:shadow-md transition-all">
                                        <video
                                            src={vid.videoUrl}
                                            controls
                                            className="w-full h-[180px] object-cover rounded"
                                        />
                                        <div className="mt-2">
                                            <h3 className="text-base font-semibold text-primary">{vid.title}</h3>
                                            <p className="text-xs text-gray-500">Course: {vid.courseTitle}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Uploaded: {new Date(vid.createdAt).toLocaleString()}<br />
                                                Updated: {new Date(vid.updatedAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No videos found for this course.</p>
                        )
                    ) : (
                        <p>Please select a course to see uploaded videos.</p>
                    )}
                </TabsContent>

                {/* UPLOAD TAB */}
                <TabsContent value="uploadvideo" className="mt-5">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                        <div>
                            <Label htmlFor="course">Select Course</Label>
                            <select
                                id="course"
                                value={selectedCourse}
                                onChange={handleCourseSelect}
                                className="w-full border px-3 py-2 rounded"
                                required
                            >
                                <option value="">-- Choose a course --</option>
                                {courses.map((course, index) => (
                                    <option key={index} value={course.courseTitle}>
                                        {course.courseTitle}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="video">Select Video File</Label>
                            <Input type="file" id="video" accept="video/*" onChange={handleFileChange} required />
                        </div>

                        <div>
                            <Label htmlFor="title">Video Title</Label>
                            <Input id="title" value={formData.title} onChange={handleChange} required />
                        </div>

                        <div className="flex justify-between items-center mt-5 mb-10">
                            <Button type="button" onClick={handleClear} className="cursor-pointer bg-black hover:bg-red-500">
                                Clear
                            </Button>
                            <Button
                                type="submit"
                                className={`cursor-pointer`}
                                disabled={isUploading}
                            >
                                {isUploading ? "Uploading..." : "Upload"}
                            </Button>
                        </div>
                    </form>
                </TabsContent>

                <TabsContent value="managevideos" className="space-y-4 mt-4">
                    {/* Course Filter Dropdown */}
                    <div className="mb-4">
                        <Label htmlFor="manage-course">Select Course</Label>
                        <select
                            id="manage-course"
                            value={selectedCourse}
                            onChange={handleCourseSelect}
                            className="w-full border px-3 py-2 rounded mt-1"
                        >
                            <option value="">-- Select a course --</option>
                            {courses.map((course, index) => (
                                <option key={index} value={course.courseTitle}>
                                    {course.courseTitle}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedCourse ? (
                        videos.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {videos.map((vid) => (
                                    <div
                                        key={vid._id}
                                        className="border p-3 rounded shadow-sm hover:shadow-md transition-all"
                                    >
                                        <video
                                            src={vid.videoUrl}
                                            controls
                                            className="w-full h-[180px] object-cover rounded"
                                        />
                                        <div className="mt-2">
                                            {editVideoId === vid._id ? (
                                                <>
                                                    <Input
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        className="mb-2"
                                                    />
                                                    <div className="flex gap-2">
                                                        <Button onClick={() => handleUpdateVideo(vid._id)} size="sm">
                                                            Save
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setEditVideoId(null)}
                                                            size="sm"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <h3 className="text-base font-semibold text-primary">
                                                        {vid.title}
                                                    </h3>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        Uploaded: {new Date(vid.createdAt).toLocaleString()}<br />
                                                        Updated: {new Date(vid.updatedAt).toLocaleString()}
                                                    </p>
                                                    <div className="flex gap-2 mt-2">
                                                        <Button
                                                            onClick={() => {
                                                                setEditVideoId(vid._id);
                                                                setEditTitle(vid.title);
                                                            }}
                                                            size="sm"
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={() => handleDeleteVideo(vid._id, vid.publicId)}
                                                            size="sm"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No videos found for this course.</p>
                        )
                    ) : (
                        <p>Please select a course to manage videos.</p>
                    )}
                </TabsContent>

            </Tabs>
        </div>
    );
}

export default DashLecture;
