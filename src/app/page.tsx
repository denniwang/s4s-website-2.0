import { CollegeLogos } from "./components/CollegeLogos";

export default function Home() {
  return (
    <main className="flex flex-col justify-center">
      <div className="h-[80vh] flex flex-col justify-center content-center align-middle">
        <h1 className="text-center text-8xl">Students4Students</h1>
      </div>
      <CollegeLogos />
    </main>
  )
}
