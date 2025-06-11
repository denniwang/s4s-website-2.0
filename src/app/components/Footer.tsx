import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { SiLinktree } from "react-icons/si";
import { FaTiktok } from "react-icons/fa";
export const Footer = () => {
  return (
    <div className="footer mt-20 flex flex-row justify-center bg-gradient-to-t from-blue-200 to-white py-12">
      <div className="my-5 flex w-3/4 flex-col gap-10 lg:gap-0  justify-between lg:flex-row">
        <div className="flex flex-col gap-1">
          <p className="text-lg">© 2025 Students4Students</p>
          <a href="mailto:info@trys4s.com">
            <p className="text-lg hover:underline hover:text-blue-500">
            info@trys4s.com
            </p>
          </a>
          <div className="flex flex-row gap-2">
            <a
              href="https://www.instagram.com/students.4students/"
              target="_blank"
              className="rounded-full bg-background-secondary p-2 transition-colors duration-150 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:text-white"
            >
              <FaInstagram size="20px" />
            </a>
            <a
              href="https://linktr.ee/stu4stu"
              target="_blank"
              className="rounded-full bg-background-secondary p-2 transition-colors duration-150 hover:bg-green-500"
            >
              <SiLinktree size="20px" />
            </a>
            <a
              href="https://www.tiktok.com/@students.4students"
              target="_blank"
              className="rounded-full bg-background-secondary p-2 transition-colors duration-150 hover:bg-black hover:text-white"
            >
              <FaTiktok size="20px" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Link href={"/programs"}>
            <h2 className="transition-colors duration-200 hover:text-blue-500 text-lg">
              Programs
            </h2>
          </Link>

          <Link href={"/about"}>
            <h2 className="transition-colors duration-200 hover:text-blue-500 text-lg">
              About
            </h2>
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="flex-grow"></div>
          <p className="text-md lg:text-lg">
            &quot;Real college help. From students, for students&quot;
          </p>
        </div>
      </div>
    </div>
  );
};
