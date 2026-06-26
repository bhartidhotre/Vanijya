import "../styles/Contact.css";

export default function ContactUs() {
    return (
        <div>
            <div className="contact-section">
                <div className="contact">
                    <h1>Contact Us</h1>
                    <p>Hey buddy, what’s the issue? Tell us, we’re here to help!</p>
                </div>

                <div className="form">
                    <form action="">
                        <div className="mb-3">
                            <label className="form-label">Your Name</label>
                            <input type="text" className="form-control" placeholder="Enter your name" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Your Email</label>
                            <input type="email" className="form-control" placeholder="name@example.com" />
                        </div>
                        <div className="mb-3">
                            <label class="form-label">Subject</label>
                            <input type="text" class="form-control" placeholder="Tell us your query" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Your Message</label>
                            <textarea class="form-control" rows="3" placeholder="Leave a comment"></textarea>
                        </div>

                        <button class="btn btn-primary btn-lg">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}