//
// Sticky Header
//
const stickHeader = (): void => {
    document.addEventListener('scroll', () => {
        const scroll = window.scrollY; // Use window.scrollY to detect scroll position
        const bodyElement = document.querySelector('body');
        if (scroll >= 100) {
            bodyElement?.classList.add('scroll');
        } else {
            bodyElement?.classList.remove('scroll');
        }
    });
};

//
//    The Dark Mode System
//
const darkMode = (): void => {

    // helper functions to toggle dark mode
    function enableDarkMode(): void {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkMode(): void {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }

    // determines a new users dark mode preferences
    function detectColourScheme(): void {
        // default to the light theme
        let theme: string = 'light';

        // check the localstorage for a saved 'theme' variable. if it's there, the user has visited before, so apply the necessary theme choices
        if (localStorage.getItem('theme')) {
            theme = localStorage.getItem('theme') || 'default-theme';
        }
        // if it's not there, check to see if the user has applied dark mode preferences themselves in the browser
        else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            theme = 'dark';
        }

        // if there is no preference set, the default of light will be used. apply accordingly
        theme === 'dark' ? enableDarkMode() : disableDarkMode();
    }

    // run on page load
    detectColourScheme();

    // add event listener to the dark mode button toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle?.addEventListener('click', () => {
        // on click, check localstorage for the dark mode value, use to apply the opposite of what's saved
        localStorage.getItem('theme') === 'light' ? enableDarkMode() : disableDarkMode();
    });
}

//
// Toggle Mobile Navigation
//
const mobileNav = (): void => {
    const navbarMenu = document.querySelector<HTMLElement>("#navigation #navbar-menu");
    const hamburgerMenu = document.querySelector<HTMLElement>("#navigation .hamburger-menu");
    const body = document.body;

    // Function to close the menu and re-enable scrolling
    const closeMenu = (): void => {
        hamburgerMenu?.setAttribute("aria-expanded", "false");
        hamburgerMenu?.classList.remove("clicked");
        navbarMenu?.classList.remove("open");
        body.classList.remove("no-scroll"); // Remove class to enable scrolling
        document.removeEventListener('touchmove', preventScroll, { passive: false } as EventListenerOptions); // Re-enable touch scrolling
        document.removeEventListener('click', outsideClickListener); // Remove click listener for outside clicks
    };

    // Function to toggle menu and prevent scrolling when the menu is open
    hamburgerMenu?.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent immediate menu closing
        const isNavOpen = navbarMenu?.classList.contains("open");
        if (!isNavOpen) {
            hamburgerMenu.setAttribute("aria-expanded", "true");
            hamburgerMenu.classList.add("clicked");
            navbarMenu?.classList.add("open");
            body.classList.add("no-scroll"); // Add class to prevent scrolling
            document.addEventListener('touchmove', preventScroll, { passive: false }); // Prevent touch scrolling on mobile devices

            // Add event listener for clicks outside the menu
            document.addEventListener('click', outsideClickListener);

            // Add event listener for clicks on links inside the menu
            const menuLinks = navbarMenu?.querySelectorAll<HTMLAnchorElement>("a");
            menuLinks?.forEach(link => {
                link.addEventListener('click', closeMenu);
            });
        } else {
            closeMenu();
        }
    });

    // Function to detect clicks outside the menu
    const outsideClickListener = (event: MouseEvent): void => {
        if (!navbarMenu?.contains(event.target as Node) && !hamburgerMenu?.contains(event.target as Node)) {
            closeMenu();
        }
    };

    // Function to prevent scrolling
    const preventScroll = (event: TouchEvent): void => {
        event.preventDefault(); // Prevents touch scrolling
    };
};

//
// Forward UTM to other pages - can be useful for analytics
//
const forwardUTM = (): void => {
    const linksNodeList = document.getElementsByTagName('a');
    const allLinks = Array.from(linksNodeList);
    const tale = window.location.search;

    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            link.href = href + tale;
        }
    });
};

//
// Calling functions after loading page content
//
document.addEventListener('DOMContentLoaded', function () {
    forwardUTM();
    stickHeader();
    darkMode();
    mobileNav();
});