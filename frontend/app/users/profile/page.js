"use client";

import { useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import LeftColumn from "./components/LeftColumn";
import RightColumn from "./components/RightColumn";
import FooterBar from "./components/FooterBar";
import SosModal from "./components/SosModal";
import UploadDocsModal from "./components/UploadDocsModal";
import QRModal from "./components/QRModal";
import ToolsModal from "./components/ToolsModal";
import EditProfileModal from "./components/EditProfileModal";
import ShareModal from "./components/ShareModal";
import PermissionModal from "./components/PermissionModal";
import { buildPath as buildPathUtil } from "./utils/buildPath";
import Sidebar from "../components/Sidebar";

export default function UserProfile() {
    const [available, setAvailable] = useState(true);
    const [capacity, setCapacity] = useState(1200);
    const [earnings] = useState(25400);
    const [pendingCOD] = useState(1200);
    const [rating] = useState(4.8);

    const [showModal, setShowModal] = useState(false);
    const [files, setFiles] = useState({
        license: null,
        rc: null,
        insurance: null,
        permit: null,
        pan: null,
    });
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");

    const [qrModal, setQrModal] = useState(false);
    const [qrSrc, setQrSrc] = useState("");
    const [editModal, setEditModal] = useState(false);
    const [name, setName] = useState("Rajesh Kumar");
    const [phone, setPhone] = useState("+91 98765 43210");
    const [truckNameState, setTruckNameState] = useState("Tata Ace");

    const [chartMode, setChartMode] = useState("trips");
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const tripsData = [12, 15, 9, 20, 30, 25, 18, 22, 16, 12, 14, 19];
    const ratingData = [
        4.2, 4.4, 4.1, 4.5, 4.6, 4.7, 4.5, 4.6, 4.4, 4.3, 4.2, 4.5,
    ];

    const sampleRecent = Array.from({ length: 36 }).map((_, i) => ({
        from: `Place ${i + 1}`,
        to: `Place ${i + 2}`,
        date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
        price: `₹${(1200 + (i % 10) * 200).toLocaleString()}`,
    }));
    const [recentTrips] = useState(sampleRecent);
    const [tripsPage, setTripsPage] = useState(1);
    const tripsPageSize = 5;
    const tripsTotalPages = Math.ceil(recentTrips.length / tripsPageSize);

    const buildPath = buildPathUtil;
    const [editName, setEditName] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editTruckName, setEditTruckName] = useState("");
    const [editCapacity, setEditCapacity] = useState(capacity);
    const [toolsModal, setToolsModal] = useState(false);
    const [distanceKm, setDistanceKm] = useState(0);
    const [numTolls, setNumTolls] = useState(0);
    const [avgToll, setAvgToll] = useState(0);
    const [fuelEfficiency, setFuelEfficiency] = useState(0);
    const [fuelPrice, setFuelPrice] = useState(0);
    const [avgSpeed, setAvgSpeed] = useState(0);
    const [calcResult, setCalcResult] = useState(null);
    const [truckShareModal, setTruckShareModal] = useState(false);
    const [profileLink, setProfileLink] = useState("");
    const [verificationStatus, setVerificationStatus] = useState("unverified");
    const [permissionModal, setPermissionModal] = useState(false);
    const [sosModal, setSosModal] = useState(false);
    const [sosSending, setSosSending] = useState(false);
    const sosContacts = [
        { name: "Emergency Helpline", phone: "112" },
        { name: "FreightShare Admin", phone: "+919876543210" },
    ];

    async function getLocationString() {
        if (!navigator.geolocation) return "Location not available";
        return new Promise((resolve) => {
            const t = setTimeout(
                () => resolve("Location permission timed out"),
                8000
            );
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    clearTimeout(t);
                    const { latitude, longitude } = pos.coords;
                    resolve(
                        `${latitude.toFixed(5)},${longitude.toFixed(
                            5
                        )} (https://maps.google.com/?q=${latitude},${longitude})`
                    );
                },
                (err) => {
                    clearTimeout(t);
                    resolve("Location not available");
                },
                { enableHighAccuracy: false, timeout: 7000 }
            );
        });
    }

    async function buildSosMessage() {
        const loc = await getLocationString();
        return `EMERGENCY: Driver ${name} (${phone}). Vehicle ${truckNameState} · ${capacity}kg. Location: ${loc}. Please respond immediately.`;
    }

    async function handleCall(number) {
        window.location.href = `tel:${number}`;
    }

    async function handleSms(number) {
        setSosSending(true);
        const msg = await buildSosMessage();
        window.location.href = `sms:${number}?body=${encodeURIComponent(msg)}`;
        setSosSending(false);
    }

    async function handleShareMessage() {
        setSosSending(true);
        const msg = await buildSosMessage();
        try {
            if (navigator.share) {
                await navigator.share({ title: "Emergency", text: msg });
            } else {
                await navigator.clipboard.writeText(msg);
                alert("Share not available — message copied to clipboard");
            }
        } catch (e) {
            // ignore
        } finally {
            setSosSending(false);
        }
    }

    async function handleCopyMessage() {
        const msg = await buildSosMessage();
        try {
            await navigator.clipboard.writeText(msg);
            alert("Emergency message copied");
        } catch (e) {
            alert("Copy failed");
        }
    }

    function handleFileChange(e, key) {
        const file = e.target.files?.[0];
        setFiles((prev) => ({ ...prev, [key]: file }));
    }

    function closeUploadModal() {
        setFiles({
            license: null,
            rc: null,
            insurance: null,
            permit: null,
            pan: null,
        });
        setUploadMessage("");
        setShowModal(false);
    }

    async function handleUpload(e) {
        e.preventDefault();
        setUploadMessage("");

        const anySelected = Object.values(files).some((f) => f);
        if (!anySelected) {
            setUploadMessage("Please select at least one document.");
            return;
        }

        const form = new FormData();
        Object.entries(files).forEach(([key, file]) => {
            if (file) form.append(key, file);
        });

        setUploading(true);
        try {
            const res = await fetch("/api/users/docs", {
                method: "POST",
                body: form,
            });

            if (!res.ok) throw new Error("Upload failed");

            setUploadMessage("Documents uploaded. Verification pending.");
            setVerificationStatus("pending");
            setFiles({
                license: null,
                rc: null,
                insurance: null,
                permit: null,
                pan: null,
            });
            setShowModal(false);
        } catch (err) {
            setUploadMessage("Upload failed. Try again later.");
        } finally {
            setUploading(false);
        }
    }

    function openQr() {
        const url = window.location.href;
        const encoded = encodeURIComponent(url);
        const src = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encoded}&choe=UTF-8`;
        setQrSrc(src);
        setQrModal(true);
    }

    async function downloadQr() {
        const res = await fetch(qrSrc);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "freightshare-qr.png";
        a.click();

        URL.revokeObjectURL(url);
    }

    function closeEditModal() {
        setEditModal(false);
    }

    function submitEdit(e) {
        e.preventDefault();
        setName(editName || name);
        setPhone(editPhone || phone);
        setTruckNameState(editTruckName || truckNameState);
        setCapacity(editCapacity || capacity);
        setEditModal(false);
    }

    const chartData = chartMode === "trips" ? tripsData : ratingData;
    const chartMin = chartMode === "trips" ? 0 : 3.5;
    const chartMax = chartMode === "trips" ? Math.max(...tripsData) : 5;
    const chartInfo = buildPath(chartData, 600, 160, chartMin, chartMax);

    return (
        <div className="min-h-screen bg-[#faf7ff]">
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <ProfileHeader
                            name={name}
                            truckNameState={truckNameState}
                            capacity={capacity}
                            phone={phone}
                            setEditModal={setEditModal}
                            setProfileLink={setProfileLink}
                            setTruckShareModal={setTruckShareModal}
                            earnings={earnings}
                            pendingCOD={pendingCOD}
                            rating={rating}
                        />

                        <div className="mt-6 grid grid-cols-12 gap-6">
                            <LeftColumn
                                available={available}
                                setAvailable={setAvailable}
                                capacity={capacity}
                                setCapacity={setCapacity}
                                chartMode={chartMode}
                                setChartMode={setChartMode}
                                chartInfo={chartInfo}
                                months={months}
                                recentTrips={recentTrips}
                                tripsPage={tripsPage}
                                setTripsPage={setTripsPage}
                                tripsPageSize={tripsPageSize}
                                tripsTotalPages={tripsTotalPages}
                            />

                            <RightColumn
                                files={files}
                                handleFileChange={handleFileChange}
                                setShowModal={setShowModal}
                                earnings={earnings}
                                pendingCOD={pendingCOD}
                                openQr={openQr}
                                verificationStatus={verificationStatus}
                                setVerificationStatus={setVerificationStatus}
                                setUploadMessage={setUploadMessage}
                                setPermissionModal={setPermissionModal}
                                setToolsModal={setToolsModal}
                            />
                        </div>

                        <FooterBar setSosModal={setSosModal} />
                    </div>

                    {sosModal && (
                        <SosModal
                            sosContacts={sosContacts}
                            onClose={() => setSosModal(false)}
                            handleCall={handleCall}
                            handleSms={handleSms}
                            handleShareMessage={handleShareMessage}
                            handleCopyMessage={handleCopyMessage}
                            sosSending={sosSending}
                        />
                    )}
                    <UploadDocsModal
                        show={showModal}
                        onClose={closeUploadModal}
                        files={files}
                        handleFileChange={handleFileChange}
                        uploadMessage={uploadMessage}
                        uploading={uploading}
                        handleUpload={handleUpload}
                    />

                    <QRModal
                        show={qrModal}
                        qrSrc={qrSrc}
                        onClose={() => setQrModal(false)}
                        downloadQr={downloadQr}
                    />

                    <ToolsModal
                        show={toolsModal}
                        onClose={() => setToolsModal(false)}
                        distanceKm={distanceKm}
                        setDistanceKm={setDistanceKm}
                        numTolls={numTolls}
                        setNumTolls={setNumTolls}
                        avgToll={avgToll}
                        setAvgToll={setAvgToll}
                        avgSpeed={avgSpeed}
                        setAvgSpeed={setAvgSpeed}
                        fuelEfficiency={fuelEfficiency}
                        setFuelEfficiency={setFuelEfficiency}
                        fuelPrice={fuelPrice}
                        setFuelPrice={setFuelPrice}
                        calcResult={calcResult}
                        setCalcResult={setCalcResult}
                    />

                    <EditProfileModal
                        show={editModal}
                        onClose={closeEditModal}
                        editName={editName}
                        setEditName={setEditName}
                        editPhone={editPhone}
                        setEditPhone={setEditPhone}
                        editTruckName={editTruckName}
                        setEditTruckName={setEditTruckName}
                        editCapacity={editCapacity}
                        setEditCapacity={setEditCapacity}
                        submitEdit={submitEdit}
                    />
                    <ShareModal
                        show={truckShareModal}
                        onClose={() => setTruckShareModal(false)}
                        profileLink={profileLink}
                    />
                    <PermissionModal
                        show={permissionModal}
                        onClose={() => setPermissionModal(false)}
                        name={name}
                        phone={phone}
                        truckNameState={truckNameState}
                        capacity={capacity}
                    />
                </div>
            </div>
        </div>
    );
}
