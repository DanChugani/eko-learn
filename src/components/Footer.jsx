const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 lg:py-16">
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                {/* Brand */}
                <div className="space-y-4">
                    <a href="#" className="text-2xl font-bold tracking-tight text-white">
                        eko<span className="text-emerald-400">learn</span>
                    </a>
                    <p className="text-sm leading-relaxed max-w-xs text-gray-400">
                        Empowering students with personalized tutoring and future-ready skills.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Explore</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#features" className="hover:text-emerald-400 transition-colors">Why Us</a></li>
                        <li><a href="#subjects" className="hover:text-emerald-400 transition-colors">Subjects</a></li>
                        <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                        <li><a href="#platform" className="hover:text-emerald-400 transition-colors">E-Learning Platform</a></li>
                    </ul>
                </div>

                {/* Subjects */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Subjects</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-emerald-400 transition-colors">Math (K-12)</a></li>
                        <li><a href="#" className="hover:text-emerald-400 transition-colors">Science & Biology</a></li>
                        <li><a href="#" className="hover:text-emerald-400 transition-colors">Chemistry & Physics</a></li>
                        <li><span className="text-gray-500 cursor-not-allowed">Adult IELTS Prep (Coming Soon)</span></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>Email: <a href="mailto:hello@ekolearn.com" className="hover:text-emerald-400 transition-colors">hello@ekolearn.com</a></li>
                        <li>Phone: <a href="tel:+15551234567" className="hover:text-emerald-400 transition-colors">+1 (555) 123-4567</a></li>
                        <li>Ontario, Canada</li>
                    </ul>
                </div>
            </div>

            <div className="container mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Ekolearn. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
