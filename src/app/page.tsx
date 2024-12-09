import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">欢迎来到内容管理系统</h1>
        <p className="text-center text-gray-600">
          这是一个基于 Next.js 和 Nest.js 构建的现代化内容管理系统
        </p>
      </div>
    </main>
  );
}
