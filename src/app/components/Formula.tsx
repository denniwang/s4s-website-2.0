import Image from "next/image";

export default function Formula() {
  return (
    <section className="flex flex-col gap-5 justify-center items-center bg-accent p-10 w-[50vw]">
      <h1 className="text-4xl font-bold mb-8">The Winning Formula</h1>

      <ImageTextBlock />
      <TextImageBlock />
    </section>
  );
}

function ImageTextBlock() {
  return (
    <section className="flex flex-row justify-around items-center gap-2 bg-accent p-0 rounded-xl">
      <div className="relative w-3/5 rounded-l-xl overflow-hidden h-[30vh]">
        <Image src="/schools/ucla.jpg" alt="formula" width={500} height={500} />
      </div>
      <div className="w-2/5 p-2">
        <h2 className="text-xl font-bold">Student advice for students</h2>
        <p>
          We know what it&apos;s like to go through the college application process.
          We have been there, done that.
        </p>
      </div>
    </section>
  );
}

function TextImageBlock() {
  return (
    <section className="flex flex-row justify-around items-center gap-2 bg-accent p-0 rounded-xl">
      <div className="w-2/5">
        <h2>Header2</h2>
        <p>
          Our focus is on the fundamentals. Having experienced the same, we have
          realized most students struggle in classes due to a lack of
          understanding of the fundamental &apos;whys&apos; and &apos;hows&apos; of harder subjects.
          Pure memorization of concepts only works for so long. Here at
          CalTutors, we want students to have a strong grasp of the fundamentals
          to unlock their full potential.
        </p>
      </div>
      <div className="relative w-2/5 rounded-l-xl overflow-hidden p-5 h-[30vh]">
        <Image src="/schools/uw.jpg" alt="formula" width={300} height={900} />
      </div>
    </section>
  );
}
