import "../styles/AboutUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";


export default function AboutUs() {
    return (
        <div>
            <h1 className="quote">
                <FontAwesomeIcon icon={faQuoteLeft} />{" "}
                Why let good things gather dust, when they can help someone start fresh?{" "}
                <FontAwesomeIcon icon={faQuoteRight} />
            </h1>
            <br /> <br />
            <hr />

            <section class="about">
                <div class="about-wrapper">
                    <div class="container-fluid">
                        <div class="row card">
                            <div class="col-md-6 slide-left-to-right">
                                <img src="/img/about1.avif" alt="" />
                            </div>
                            <div class="col-md-6 info">
                                <h2>About Us</h2>
                                <hr />
                                <p>Vanijya was created with one simple idea —
                                    students shouldn’t have to overspend on items
                                    that seniors no longer need.
                                    Every product shared here gets a new life,
                                    reducing waste and saving money for juniors.
                                    It’s more than a marketplace — it’s a smarter way
                                    for students to support each other.</p>
                            </div>
                        </div>

                        <div class="row card reverse card-2">
                            <div class="col-md-6 slide-left-to-right">
                                <img src="/img/about2.avif" alt="" />
                            </div>
                            <div class="col-md-6 info">
                                <h2>Secure Access</h2>
                                <hr />
                                <p>Vanijya ensures a safe and authentic community
                                    by allowing only students with PRN number and email IDs to register.
                                    This guarantees that every buyer and seller is a genuine member
                                    of your campus, creating a trusted environment for transactions.
                                    No outsiders, no fake accounts — only your own college community.
                                    Your campus stays protected, and your experience stays secure.</p>
                            </div>
                        </div>

                        <div class="row card card-2">
                            <div class="col-md-6 slide-left-to-right">
                                <img src="/img/about5.avif" alt="" />
                            </div>
                            <div class="col-md-6 info">
                                <h2>Affordable Prices</h2>
                                <hr />
                                <p>College life can be expensive, but Vanijya keeps it simple.
                                    All products listed by seniors are offered at prices
                                    much lower than their original cost,
                                    making essentials accessible to every student.
                                    From textbooks to hostel items, everything is budget-friendly
                                    so juniors can start their journey without financial stress.</p>
                            </div>
                        </div>

                        <div class="row card reverse card-2">
                            <div class="col-md-6 slide-left-to-right">
                                <img src="/img/about4.jpg" alt="" />
                            </div>
                            <div class="col-md-6 info">
                                <h2>Product Overview</h2>
                                <hr />
                                <p>Every item sold on Vanijya includes clear and complete details
                                    such as product name, owner’s name, description, condition, and price.
                                    This helps students understand exactly what they are buying
                                    before making any decision.
                                    Transparent information builds trust between seniors and juniors,
                                    so every purchase feels confident and worry-free.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
