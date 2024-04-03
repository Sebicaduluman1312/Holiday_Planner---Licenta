const About = () => {
    return ( 
        <section id="section-About" className="about-container flex p-10">
            <div className="left-about h-96 w-1/2 mr-5 bg-primary-black">
            </div>
            <div className="right-about w-1/2 flex flex-col justify-center items-right mb-20">
                <h1 className="text-5xl text-primary-black text-right font-bold">About our app</h1>
                <p className="text-right mt-5 text-primary-black">
                    Welcome to our app! We're passionate about travel and exploration. 
                    Our mission is to make your journey unforgettable by providing you
                     with the tools and information you need to discover the world's most 
                     fascinating attractions.
                </p>
            </div>
        </section>
     );
}
 
export default About;