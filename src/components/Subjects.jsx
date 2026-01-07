import { motion } from 'framer-motion';

const k12Subjects = [
    'Mathematics (Grades 1-12)',
    'Calculus & Vectors',
    'Advanced Functions',
    'Biology (Grades 9-12)',
    'Chemistry (Grades 9-12)',
    'Physics (Grades 9-12)',
    'English & Literacy',
    'French Immersion Support'
];

const adultSubjects = [
    'IELTS Preparation (Academic & General)',
    'English for Professionals',
    'Basic Computer Skills',
    'Adult Literacy'
];

const Subjects = () => {
    return (
        <section id="subjects" className="section bg-gray-50/50">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Header */}
                    <div className="lg:w-1/3">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Subjects We Teach</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            From kindergarten basics to university prep and adult certification, we cover the full spectrum of learning needs.
                        </p>
                        <a href="#booking" className="btn btn-secondary">
                            Find Your Subject
                        </a>
                    </div>

                    {/* Lists */}
                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">

                        {/* K-12 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                    <span className="font-bold">K12</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">K-12 Education</h3>
                            </div>
                            <ul className="space-y-3">
                                {k12Subjects.map((sub, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        <span>{sub}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Adult Ed */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                                    <span className="font-bold">A+</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Adult Education</h3>
                            </div>
                            <ul className="space-y-3">
                                {adultSubjects.map((sub, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        <span>{sub}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subjects;
