import "../styles/Footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <div>
            <footer>
                <div class="row mx-5 pt-5">
                    <div class="col-4 contact-logo">
                        <img src="/img/logo Vanijya.png" alt="" />
                    </div>
                    <div class="col-2 foot">
                        <h5 class="pb-3">Student Community</h5>
                        <Link to="#">Community</Link>
                        <Link to="/contact">Join us</Link>
                        <Link to="/aboutpage">Always Care</Link>
                    </div>
                    <div class="col-2 foot">
                        <h5 class="pb-3">Quick Links</h5>
                        <Link to="/aboutpage">About</Link>
                        <Link to="/productpage">Products</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div class="col-2 social-media foot">
                        <h5 class="pb-3">SOCIAL MEDIA</h5>
                        <span class="me-3"><i class="fab fa-facebook"></i></span>
                        <span class="me-3"><i class="fab fa-instagram"></i></span>
                        <span class="me-3"><i class="fab fa-twitter"></i></span>
                        <span><i class="fab fa-google-plus"></i></span>
                    </div>
                </div>
                <hr />
                <p class="text-center mt-3">
                    Copyright © 2025 developed by Bharti. All rights reserved.
                </p>
            </footer>
        </div>
    );
}