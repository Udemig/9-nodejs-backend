import localImage from "@/assets/space.jpg";
import Image from "next/image";

const remoteImage =
  "https://images.pexels.com/photos/34975211/pexels-photo-34975211.jpeg?_gl=1*uxxphf*_ga*NjI4NzE0NzIzLjE3NTk4NjM4OTU.*_ga_8JE65Q40S6*czE3ODg2OTIwNTMkbzEwJGcxJHQxNzg4NjkyMDc2JGozNyRsMCRoMA..";

const Gallery = () => {
  return (
    <div className="space-y-5 font-bold text-xl">
      <div>
        <h1>Locale Resim (unoptimized)</h1>
        <Image src={localImage} alt="uzay" unoptimized />
      </div>

      <div>
        <h1>Remote Resim</h1>
        <Image src={remoteImage} alt="doğa" width={1280} height={720} />
      </div>

      <div>
        <h1>Locale Resim (0.7mb)</h1>
        <Image src={localImage} alt="uzay" />
      </div>

      <div>
        <h1>Locale Resim (0.1mb)</h1>
        <Image src={localImage} alt="uzay" quality={10} />
      </div>

      <div className="relative h-[30vh]">
        <h1>Locale Resim (priority)</h1>
        <Image src={localImage} alt="uzay" priority fill />
      </div>
    </div>
  );
};

export default Gallery;
