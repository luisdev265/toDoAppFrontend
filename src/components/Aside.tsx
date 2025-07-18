"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  PanelLeftClose,
  PanelRightClose,
  ClipboardList,
  NotebookPen,
  ChartBarStacked,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Aside() {
  const [isOpen, setIsOpen] = useState<Boolean>(true);

  const handleAsideState = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`h-[100%] bg-[#010101] relative py-4 flex flex-col transition-all duration-400 ease-in-out ${
        isOpen ? "w-72" : "w-15"
      }`}
    >
      <i
        onClick={handleAsideState}
        className={`hover:cursor-pointer absolute right-5 top-4 hover:text-gray-400 transition-all duration-200 ease-in`}
      >
        {isOpen ? (
          <PanelLeftClose className="w-6 g-6" />
        ) : (
          <PanelRightClose className="w-6 g-6" />
        )}
      </i>
      <div className="mt-12">
        <AnimatePresence>
          {isOpen && (
            <motion.p
              className="text-lg pl-2 mx-3 pb-2 border-b border-gray-300 hover:cursor-default"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              Dashboard
            </motion.p>
          )}
        </AnimatePresence>
        <ul className="mt-2">
          <li
            className={`flex px-5 py-2 gap-4 rounded-lg text-center items-center w-full h-12 hover:bg-[#0f0f0f] hover:cursor-pointer transition-all ease-in-out duration-200 ${
              isOpen ? "justify-start" : ""
            }`}
          >
            <Link href="/" className="flex gap-4 w-full h-full items-center">
                <ClipboardList className="w-4 h-4" />
          

              <AnimatePresence>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm"
                  >
                    Tasks
                  </motion.p>
                )}
              </AnimatePresence>
            </Link>
          </li>
          <li
            className={`flex px-5 py-2 gap-4 rounded-lg text-center items-center w-full h-12 hover:bg-[#0f0f0f] hover:cursor-pointer transition-all ease-in-out duration-200 ${
              isOpen ? "justify-start" : ""
            }`}
          >
            <Link
              href="/notes"
              className="flex gap-4 w-full h-full items-center"
            >
                <NotebookPen className="w-4 h-4" />
              <AnimatePresence>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm"
                  >
                    Notes
                  </motion.p>
                )}
              </AnimatePresence>
            </Link>
          </li>
          <li
            className={`flex px-5 py-2 gap-4 rounded-lg text-center items-center w-full h-12 hover:bg-[#0f0f0f] hover:cursor-pointer transition-all ease-in-out duration-200 ${
              isOpen ? "justify-start" : ""
            }`}
          >
            <Link
              href="/categories"
              className="flex gap-4 w-full h-full items-center"
            >
                <ChartBarStacked className="w-4 h-4" />
              <AnimatePresence>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm"
                  >
                    Categories
                  </motion.p>
                )}
              </AnimatePresence>
            </Link>
          </li>
        </ul>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg pl-2 mx-3 pb-2 border-b border-gray-300 hover:cursor-default">
              Filters
            </p>
            <div className="mt-4 mx-3 px-2">
              <p className="text-sm mb-2">Status</p>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-2">
                  <input type="checkbox" className="hover:cursor-pointer" />
                  <p className="text-xs text-yellow-400">Pending</p>
                </li>
                <li className="flex gap-2">
                  <input type="checkbox" className="hover:cursor-pointer" />
                  <p className="text-xs text-green-400">Completed</p>
                </li>
              </ul>
            </div>
            <div className="mt-4 mx-3 px-2">
              <p className="text-sm mb-2">Priority</p>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-2">
                  <input type="checkbox" className="hover:cursor-pointer" />
                  <p className="text-xs text-green-400">Low</p>
                </li>
                <li className="flex gap-2">
                  <input type="checkbox" className="hover:cursor-pointer" />
                  <p className="text-xs text-yellow-400">Medium</p>
                </li>
                <li className="flex gap-2 mb-2">
                  <input type="checkbox" className="hover:cursor-pointer" />
                  <p className="text-xs text-red-400">High</p>
                </li>
              </ul>
            </div>
            <button className="ml-5 px-2 py-1 text-xs bg-blue-500 mt-1 rounded-md hover:bg-blue-600 hover:cursor-pointer transition-colors duration-200">
              Aply
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
