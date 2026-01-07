import { motion } from 'framer-motion';

const Pricing = () => {
    return (
        <section id="pricing" className="section bg-gradient-to-br from-indigo-900 to-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-10">
                <svg width="400" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" />
                </svg>
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 justify-center">

                    <div className="text-center lg:text-left lg:w-1/2">
                        <h2 className="text-3xl lg:text-5xl font-bold mb-6">Simple, Accessible Pricing</h2>
                        <p className="text-indigo-200 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                            We believe quality education is a right, not a privilege. That's why we keep our overhead low and our standards high.
                        </p>
                        <ul className="space-y-4 text-left max-w-sm mx-auto lg:mx-0 mb-8">
                            {['No commitments or contracts', 'Pay per class options', 'Bulk lesson discounts available', 'Money-back satisfaction guarantee'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-indigo-100">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <a href="#booking" className="btn bg-emerald-500 text-white hover:bg-emerald-600 border-none">
                            Start Learning Now
                        </a>
                    </div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white text-gray-900 rounded-3xl p-8 lg:p-12 shadow-2xl max-w-md w-full relative"
                    >
                        <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-full text-sm transform rotate-6 shadow-md">
                            Most Popular
                        </div>
                        <div className="text-center">
                            <p className="text-gray-500 font-medium mb-2">Standard Session</p>
                            <div className="flex items-baseline justify-center gap-1 mb-6">
                                <span className="text-5xl font-extrabold text-gray-900">$20</span>
                                <span className="text-xl text-gray-500">/ hour</span>
                            </div>
                            <div className="h-px bg-gray-100 w-full mb-6"></div>
                            <ul className="space-y-4 text-left mb-8">
                                <li className="flex gap-3">
                                    <span className="text-green-500">✓</span> 1-on-1 Personalized Tutoring
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-green-500">✓</span> Ontario Curriculum Aligned
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-green-500">✓</span> Progress Reporting
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-green-500">✓</span> Homework Help Included
                                </li>
                            </ul>
                            <a href="#booking" className="btn btn-primary w-full shadow-lg shadow-indigo-200">
                                Book This Plan
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Pricing;
