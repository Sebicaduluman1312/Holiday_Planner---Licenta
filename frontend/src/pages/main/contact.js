const ContactUs = () => {
    return ( 
        <section id="section-Contact" className="contact-container flex flex-col items-center h-200">
            <h1 className="text-5xl font-bold mt-5">Contact us</h1>
            <p className="mt-2">Got questions or feedback? Contact us anytime!</p>
            <div className="contact-form w-1/3">
                <div className="flex flex-col justify-center items-left">
                    <div className="mt-3 font-medium">Name</div>
                    <input type="text" id="name" name="name" className="border border-gray-500 w-full rounded-md px-4 py-2 mt-1" placeholder="Enter your name"/>
                
                    <div className="mt-3 font-medium">Email</div>
                    <input type="email" name="email" id="email" className="border border-gray-500 w-full rounded-md px-4 py-2 mt-1" placeholder="example@gmail.com" />

                    <div className="mt-3 font-medium">Message</div>
                    <textarea name="message" id="message" cols="30" rows="5" className="px-4 py-2 mt-1 mb-5 rounded-md border border-gray-500"></textarea>
                </div>
                <button className="mb-10 px-4 py-2 bg-primary-black text-primary-white font-semibold rounded-md hover:bg-primary-black-blue">Send message</button>
            </div>
        </section>
     );
}
 
export default ContactUs;