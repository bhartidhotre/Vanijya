'use client'
import Signup from './SignupForm'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";
import "../styles/Navbar.css"

export default function Hero() {
  return (
    <div className="hero relative">
      <div className="hero-overlay"></div>

      <div className="relative isolate px-6 pt-14 lg:px-8 z-10">

        <div className="mx-auto  py-32 sm:py-48 lg:py-56">
          <div className="text-center hero-title slide-in">

            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-5xl whitespace-nowrap ">
              <span className='typing'>Welcome to Vanijya :)</span> <br /> Your Smart Campus Marketplace
            </h1>

            <p className="mt-8 text-lg font-medium text-pretty text-gray-200 sm:text-xl/8 fade-slide ">
              From daily essentials to academic supplies — Vanijya makes campus life effortless.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
              >
                Get started
              </a>

              <a href="/aboutpage" className="text-sm/6 font-semibold text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
