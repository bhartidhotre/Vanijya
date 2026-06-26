'use client';
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.css";
import { io } from "socket.io-client";
import NotificationPanel from "./NotificationPanel";

const navigation = [
  { name: 'Product', href: '/productpage' },
  { name: 'About us', href: '/aboutpage' },
  { name: 'AddProducts', href: '/add_item' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ user, setUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);        
  const [unread, setUnread] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const socketRef = useRef(null);

  // Fetch past notifications
  useEffect(() => {
    if (!user?._id) return;

    const fetchNotifications = async () => {
      try {

        const res = await axios.get(`https://vanijya.onrender.com/api/notifications/${user._id}`);

        // map text -> message and populate senderName
        const mapped = res.data.map(n => ({
          ...n,
          message: n.message,
          senderName: n.senderName || "Unknown User",
        }));
        setNotifications(mapped);
        setUnread(mapped.filter(n => !n.isRead).length);

      } catch (err) {
      console.error("DEBUG: error fetching notifications:", err); // <-- Add this
      }
    };

    fetchNotifications();
  }, [user]);

  // Socket.IO real-time notifications
  useEffect(() => {
    if (!user?._id) return;
    if (!socketRef.current) {
      socketRef.current = io("https://vanijya.onrender.com");
    }

    const socket = socketRef.current;

    // use 'setup' as in backend
    socket.emit("setup", user._id);

    socket.on("notification", (data) => {

      const mapped = {
        ...data,
        message: data.message,
        senderName: data.senderName || "Unknown User",
      };
      setNotifications(prev => [mapped, ...prev]);
      setUnread(prev => prev + 1);
    });

    return () => {
      socket.off("notification");
    };
  }, [user]);

const handleBellClick = async () => {
  setPanelOpen(prev => {
    const opening = !prev; // will it open?

    if (opening) {
      setUnread(0);

      // mark unread notifications as read
      try {
        notifications
          .filter(n => !n.isRead)
          .forEach(async (n) => {
            await axios.put(`https://vanijya.onrender.com/api/notifications/mark-read/${n._id}`);
          });
        setNotifications(prevNotifs => prevNotifs.map(n => ({ ...n, isRead: true })));
      } catch (err) {
        console.error("Failed to mark notifications as read", err);
      }
    }

    return opening;
  });
};


  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between py-3 px-6 lg:px-8 navbar">

        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 logo">
            <img src="./img/logo Vanijya.png" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center p-2.5 text-gray-700">
            <Bars3Icon className="size-6" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="text-sm font-semibold text-gray-900 option">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right-side Icons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* Notification */}
          <div className="relative mr-6">
            <button className="notification-btn" onClick={handleBellClick}>
              <i className="fa-regular fa-bell text-2xl"></i>
              {unread > 0 && <span className="notification-badge">{unread}</span>}
            </button>
          </div>

          {/* Profile Menu */}
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 font-semibold hover:text-blue-600">
              <i className="fa-solid fa-user text-xl accIcon"></i>
              <span>{user ? "Profile" : "Sign In"}</span>
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md ring-1 ring-black/10">
              {!user ? (
                <>
                  <MenuItem>
                    <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-100">Log In</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/signup" className="block px-4 py-2 text-sm hover:bg-gray-100">Register</Link>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                  </MenuItem>
                  <MenuItem>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Log Out
                    </button>
                  </MenuItem>
                </>
              )}
            </MenuItems>
          </Menu>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-sm bg-white p-6 z-50">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img alt="" src="./img/logo Vanijya.png" className="h-8 w-auto" />
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="-m-2.5 p-2.5 text-gray-700">
              <XMarkIcon className="size-6" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                {item.name}
              </Link>
            ))}

            <hr className="my-4" />

{/* MOBILE Notification Button */}
<div className="flex items-center gap-4 px-3">
  <button className="notification-btn" onClick={handleBellClick}>
    <i className="fa-regular fa-bell text-2xl"></i>
    {unread > 0 && <span className="notification-badge">{unread}</span>}
  </button>
  <span className="text-base font-semibold">Notifications</span>
</div>

{/* MOBILE Profile Menu */}
<div className="mt-4 px-3">
  {!user ? (
    <>
      <Link
        to="/login"
        onClick={() => setMobileMenuOpen(false)}
        className="block px-4 py-2 rounded-md text-base font-semibold hover:bg-gray-100"
      >
        Log In
      </Link>

      <Link
        to="/signup"
        onClick={() => setMobileMenuOpen(false)}
        className="block px-4 py-2 rounded-md text-base font-semibold hover:bg-gray-100"
      >
        Register
      </Link>
    </>
  ) : (
    <>
      <Link
        to="/profile"
        onClick={() => setMobileMenuOpen(false)}
        className="block px-4 py-2 rounded-md text-base font-semibold hover:bg-gray-100"
      >
        Profile
      </Link>

      <button
        onClick={() => {
          handleLogout();
          setMobileMenuOpen(false);
        }}
        className="block w-full text-left px-4 py-2 rounded-md text-base font-semibold hover:bg-gray-100"
      >
        Log Out
      </button>
    </>
  )}
</div>

          </div>
        </DialogPanel>
      </Dialog>

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        notifications={notifications}
      />
    </header>
  );
}
