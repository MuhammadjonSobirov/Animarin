// src/components/Footer.jsx

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-screen-xl mx-auto px-4 py-8 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    © 2024 MyApp. All Rights Reserved.
                </span>

                <div className="flex mt-4 space-x-6 md:mt-0">
                    <a href="https://www.instagram.com/sob1rov_2o3/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zM12 7.8a4.2 4.2 0 100 8.4 4.2 4.2 0 000-8.4zm0 6.9a2.7 2.7 0 110-5.4 2.7 2.7 0 010 5.4zm4.75-8.2a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z" />
                        </svg>
                    </a>
                    <a
                        href="https://t.me/s_sshd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.184 6.926l-1.757 8.285c-.133.62-.482.768-.976.478l-2.692-1.986-1.297 1.246c-.144.143-.265.264-.542.264l.194-2.771 5.048-4.567c.22-.194-.049-.303-.34-.109l-6.238 3.922-2.688-.84c-.582-.18-.593-.582.121-.856l10.46-4.04c.486-.18.913.109.755.855z" />
                        </svg>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100069191889571" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 5 3.66 9.126 8.438 9.876v-6.98h-2.54v-2.896h2.54V9.704c0-2.508 1.492-3.896 3.78-3.896 1.097 0 2.245.197 2.245.197v2.474h-1.264c-1.245 0-1.63.775-1.63 1.57v1.898h2.773l-.443 2.896h-2.33v6.98C18.3 21.126 22 16.998 22 12c0-5.51-4.45-9.96-9.96-9.96z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

