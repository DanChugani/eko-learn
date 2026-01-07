import { useEffect } from 'react';

const Booking = () => {
    useEffect(() => {
        // Load Calendly script
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
        head.appendChild(script);
    }, []);

    return (
        <section id="booking" className="section bg-white">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Your First Class</h2>
                    <p className="text-gray-600">
                        Schedule a free 15-minute consultation or book your first full lesson directly below.
                        No back-and-forth emails needed.
                    </p>
                </div>

                {/* Calendly Inline Widget Container */}
                <div className="calendly-inline-widget w-full h-[700px] border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
                    data-url="https://calendly.com/kay-tutoring?hide_landing_page_details=1&hide_gdpr_banner=1"
                    style={{ minWidth: '320px', height: '700px' }}>
                </div>
            </div>
        </section>
    );
};

export default Booking;
