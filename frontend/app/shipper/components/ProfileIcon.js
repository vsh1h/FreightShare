import Image from "next/image";

export default function ProfileIcon() {
  return (
    <div style={{ position: "relative", width: "64px", height: "64px" }}>
      <Image src="/profile.png" alt="Profile icon" fill={true} sizes="64px" />
    </div>
  );
}
