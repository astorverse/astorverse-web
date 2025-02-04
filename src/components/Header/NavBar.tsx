import React, { useState, useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import { FiGithub, FiMenu, FiSettings } from "react-icons/fi";
// import logo from "~assets/svgs/logo.svg";
interface NavBarProps {
  pathname: string; // 현재 경로를 전달받음
  initialShowNav?: boolean; // 초기 표시 여부를 전달받음 (optional)
  useScrollHide?: boolean; // 스크롤 숨김 기능 사용 여부
}

export default function NavBar({
  initialShowNav = false,
  pathname,
  useScrollHide = true, // 기본값은 true로 설정
}: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(initialShowNav);
  const [isAdmin, setIsAdmin] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // TODO: 서버에서 관리자 여부 확인
    const isLoggedIn = document.cookie.includes("isLoggedIn");
    setIsAdmin(isLoggedIn);
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!useScrollHide) return; // 스크롤 숨김 기능이 꺼져있으면 동작하지 않음

      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    }, 200);

    if (useScrollHide) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [useScrollHide]);

  const menuItems = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
  ];

  const isActive = (href: string) => {
    const lowerCasePathname = pathname.toLowerCase();
    const lowerCaseHref = href.toLowerCase();
    if (lowerCaseHref === "/") {
      return lowerCasePathname === "/";
    }
    return lowerCasePathname.startsWith(lowerCaseHref);
  };

  return (
    <>
      <header
        className={`w-full bg-skin-fill shadow-md ${
          useScrollHide
            ? `fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out will-change-transform ${
                showNav ? "translate-y-0" : "-translate-y-full"
              }`
            : "relative" // fixed 대신 relative를 사용하여 실제 공간을 차지하도록 함
        }`}
      >
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          {/* 로고 섹션 */}
          <div className="flex items-center space-x-12">
            <a
              href="/"
              className="flex items-center text-2xl font-extrabold text-black-accent"
            >
              {/* <img src={logo.src} alt="astor" className="mr-2 h-8 w-8" /> */}
              <span>astorverse</span>
            </a>

            {/* PC용 메뉴 */}
            <div className="hidden space-x-6 sm:flex">
              {menuItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-medium transition hover:text-skin-secondary ${
                    isActive(item.href) ? "text-skin-accent" : "text-black-base"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* 오른쪽 아이콘들 */}
          <div className="flex items-center space-x-4">
            {/* Admin 링크 */}
            {isAdmin && (
              <a
                href="/admin"
                className={`hover:bg-skin-card-muted rounded p-2 text-skin-base transition hover:text-skin-accent focus:outline-none ${
                  pathname.startsWith("/admin") ? "text-skin-accent" : ""
                }`}
                title="관리자"
              >
                <FiSettings className="h-6 w-6" />
              </a>
            )}

            {/* GitHub 링크 */}
            <a
              href="https://github.com/astorverse"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-skin-card-muted rounded p-2 text-skin-base transition hover:text-skin-accent focus:outline-none"
            >
              <FiGithub className="h-6 w-6" />
            </a>

            {/* 모바일 메뉴 토글 버튼 */}
            <button
              className="focus:outline-none sm:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Toggle Menu</span>
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </nav>

        {/* 모바일 메뉴 */}
        {isOpen && (
          <div className="border-t border-skin-line sm:hidden">
            <div className="flex flex-col space-y-2 px-4 py-3">
              {menuItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-medium transition hover:text-skin-secondary ${
                    isActive(item.href) ? "text-skin-accent" : "text-black-base"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
