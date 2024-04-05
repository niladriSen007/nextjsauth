import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <h1 className="text-4xl text-center text-white">Welcome to Next.js</h1>
      {/* <div className="flex justify-center">
        <Image src="/next.svg" alt="Next.js Logo" width={200} height={200} />
      </div> */}
    </div>
  );
}
