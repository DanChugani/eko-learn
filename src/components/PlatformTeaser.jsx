import { motion } from 'framer-motion';

const PlatformTeaser = () => {
    return (
        <section id="platform" className="py-20 bg-gray-900 text-white overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl mix-blend-screen animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-3xl mix-blend-screen animate-blob animation-delay-2000"></div>
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    <div className="lg:w-1/2">
                        <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-purple-300 uppercase bg-purple-900/50 rounded-full border border-purple-700">
                            Coming Soon
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            The Future of Learning <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Powered by AI</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            We're building a state-of-the-art e-learning platform where students can access:
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                'AI-generated personalized worksheets',
                                'Real-time performance analytics & dashboards',
                                'Curated learning paths mapped to goals',
                                'Class management and scheduling tools'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all text-purple-400">
                                        <span className="text-sm font-bold">{i + 1}</span>
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="btn bg-white text-gray-900 hover:bg-gray-100 disabled:opacity-75 disabled:cursor-not-allowed">
                            JoinWaitlist (Coming Soon)
                        </button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        {/* Abstract UI Mockup */}
                        <div className="relative bg-gray-800 rounded-xl border border-gray-700 shadow-2xl p-2">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-700 rounded-b-lg"></div>
                            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                                {/* Fake UI Header */}
                                <div className="h-10 border-b border-gray-800 flex items-center px-4 gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                    </div>
                                </div>
                                {/* Fake UI Body */}
                                <div className="p-6 grid gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-1/3 h-32 bg-gray-800 rounded-lg animate-pulse"></div>
                                        <div className="w-2/3 h-32 bg-gray-800 rounded-lg animate-pulse delay-75"></div>
                                    </div>
                                    <div className="h-40 bg-gray-800 rounded-lg animate-pulse delay-150"></div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-20 bg-gray-800 rounded-lg animate-pulse delay-100"></div>
                                        <div className="h-20 bg-gray-800 rounded-lg animate-pulse delay-200"></div>
                                        <div className="h-20 bg-gray-800 rounded-lg animate-pulse delay-300"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default PlatformTeaser;
