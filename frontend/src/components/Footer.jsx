import "../styles/Footer.css";
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
                        <a href="#">Community</a>
                        <a href="/login">Join us</a>
                        <a>Always Care</a>
                    </div>
                    <div class="col-2 foot">
                        <h5 class="pb-3">Quick Links</h5>
                        <a href="/aboutpage">About</a>
                        <a href="/productpage">Products</a>
                        <a href="/contact">Contact</a>
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